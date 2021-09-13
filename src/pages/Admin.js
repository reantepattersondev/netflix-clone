import { Fragment, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Store } from '../context/store';

import SignInData from '../components/SignInData';
import BillingData from '../components/BillingData';
import PaymentData from '../components/PaymentData';

import Header from '../Layout/Header';
import Footer from '../Layout/Footer';


const Admin = () => {
    const [activeData, setActiveData] = useState('signin');
    const [state, dispatch] = useContext(Store);

    return (
        <Fragment>
            <Header type='type-1' />
            <div className='p-4 lg:p-12' style={{ minHeight: '50vh' }}>
                {!state.isAdminLoggedIn ? <Redirect to='/admin/signin' /> : null}
                <div className='fixed min-h-full -z-10 opacity-90 min-w-full min-h-screen min-w-screen left-0 top-0 bg-black'></div>
                <div className='flex justify-between relative z-30'>
                    <div className='relative flex flex-col items-start w-2/12'>
                        <button onClick={() => setActiveData('signin')} className={`text-white w-full text-left mb-6 ${activeData === 'signin' ? 'bg-red-600' : null} w-full p-3 rounded`}>Sign In Data</button>
                        <button onClick={() => setActiveData('billing')} className={`text-white w-full text-left mb-6 ${activeData === 'billing' ? 'bg-red-600' : null} w-full p-3 rounded`}>Billing Data</button>
                        <button onClick={() => setActiveData('payment')} className={`text-white w-full text-left ${activeData === 'payment' ? 'bg-red-600' : null} w-full p-3 rounded`}>Payment Data</button>
                    </div>
                    <div className='w-9/12'>
                        {activeData === 'signin' ? <SignInData /> : null}
                        {activeData === 'billing' ? <BillingData /> : null}
                        {activeData === 'payment' ? <PaymentData /> : null}
                    </div>
                </div>
            </div>
            <Footer type='type-1' />
        </Fragment>

    );
};

export default Admin;