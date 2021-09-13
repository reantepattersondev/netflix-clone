import React from 'react';

const PaymentDataDetails = ({data, onDeletePaymentData}) => {

    return (
        <div className='px-8 py-4 text-lg text-white font-thin' style={{minHeight: '50vh'}}>
            <div className='mb-4'><span className='opacity-80 mr-6'>Name:</span>{`${data[0].fname} ${data[0].lname}`}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Card Number:</span>{data[0].cardNum}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Expiry:</span>{data[0].expiry}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>CVC:</span>{data[0].cvc}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Ip Address:</span>{data[0].ip_address}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Time:</span>{data[0].logged_at}</div>
            {/* Delete Button */}
            <div className='mb-4'>
                <button
                    type="button"
                    className='bg-red-600 w-full py-3 px-4 rounded text-white font-bold mb-3'
                    onClick={() => onDeletePaymentData(data[0].id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PaymentDataDetails;