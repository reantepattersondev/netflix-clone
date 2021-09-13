import React from 'react';

const SignInDataDetails = ({data}) => {

    return (
        <div className='px-12 py-4 text-lg text-white font-thin' style={{minHeight: '50vh'}}>
            <div className='mb-4'>
                <span className='opacity-80 mr-6'>
                    Email:
                </span>
                {data[0].email}
            </div>
            <div className='mb-4'>
                <span className='opacity-80 mr-6'>
                    Password:
                </span>
                {data[0].password}
            </div>
            <div className='mb-4'>
                <span className='opacity-80 mr-6'>
                    Ip Address:
                </span>
                {data[0].ip_address}
            </div>
            <div className='mb-4'>
                <span className='opacity-80 mr-6'>
                    Time:
                </span>
                {data[0].logged_at}
            </div>
        </div>
    );
};

export default SignInDataDetails;