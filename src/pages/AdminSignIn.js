import { useState, useRef, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Store } from '../context/store';
import db from '../firebase/firebase';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const AdminSignIn = () => {
    const [adminCredential, setAdminCredential] = useState(null);
    const [signInError, setSignInError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [state, dispatch] = useContext(Store);


    useEffect(() => {
        db.collection('admin').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                setAdminCredential(doc.data());
            })
        });
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (email === adminCredential.email && password === adminCredential.password) {
            dispatch({ type: 'IS_LOGGED_IN' });
        } else {
            setSignInError(true);
        }

    }
    return (
        <Fragment>
            <Header type='type-1' />
            <div className=''>
                {state.isAdminLoggedIn ? <Redirect to='/admin' /> : null}
                <div className='fixed min-h-full -z-10 opacity-90 min-w-full min-h-screen min-w-screen left-0 top-0 bg-black'></div>

                <div className='relative w-4/5 lg:w-4/12 p-16 m-auto rounded bg-black bg-opacity-70 z-10 my-12'>
                    <h4 className='text-red-600 text-3xl font-bold mb-6'>Admin Sign in</h4>
                    <form onSubmit={(e) => submitHandler(e)} className='text-white'>
                        <input className='bg-gray-700 py-3 px-4 w-full rounded mb-6' onChange={(e) => setEmail(e.target.value)} ref={emailRef} type='email' value={email} placeholder='Email' />
                        <input className='bg-gray-700 py-3 px-4 w-full rounded mb-2' onChange={(e) => setPassword(e.target.value)} ref={passwordRef} value={password} placeholder='Password' type='password' />
                        {signInError ? <p className='text-red-600'>Wrong admin credentials</p> : null}
                        <button onClick={(e) => submitHandler(e)} className='bg-red-600 mt-6 w-full py-3 px-4 rounded text-white font-bold mb-8'>Sign In</button>
                    </form>
                </div>
            </div>
            <Footer type='type-1' />
        </Fragment>

    );
};

export default AdminSignIn;