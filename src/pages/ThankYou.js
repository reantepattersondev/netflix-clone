import { Fragment } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import checkmark from '../assets/checkmark.png';

const ThankYou = () => {
    return (
        <Fragment>
            <Header type='type-2' />
            <div className=''>
                <div className='relative mt-24 flex items-center flex-col justify-center z-30'>
                    <img src={checkmark} alt='icon' />
                    <p className='text-gray-600 text-xl my-4'>STEP 2 OF 2</p>
                    <h4 className='text-2xl font-bold text-black'>Thanks for your confirm!</h4>
                </div>
            </div>
            <Footer type='type-2' />
        </Fragment>

    );
};

export default ThankYou;