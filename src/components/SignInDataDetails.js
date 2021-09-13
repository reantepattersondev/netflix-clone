import React from 'react';

const SignInDataDetails = ({data, onDeleteSignInData}) => {
    return (
        <div>
            <div className='px-12 py-4 text-lg text-white font-thin' style={{minHeight: '20vh'}}>
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
                
                {/* Delete Button */}
                <div className='mb-4'>
                    <button
                        type="button"
                        className='bg-red-600 w-full py-3 px-4 rounded text-white font-bold mb-3'
                        onClick={() => onDeleteSignInData(data[0].id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default SignInDataDetails;