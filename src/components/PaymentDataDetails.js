import React from 'react';

const PaymentDataDetails = ({data}) => {

    return (
        <div className='px-8 py-4 text-lg text-white font-thin' style={{minHeight: '50vh'}}>
            <div className='mb-4'><span className='opacity-80 mr-6'>Name:</span>{`${data[0].fname} ${data[0].lname}`}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Card Number:</span>{data[0].cardNum}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Expiry:</span>{data[0].expiry}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>CVC:</span>{data[0].cvc}</div>
        </div>
    );
};

export default PaymentDataDetails;