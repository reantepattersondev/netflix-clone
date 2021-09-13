import React from 'react';

const BillingDataDetails = ({data}) => {

    return (
        <div className='px-12 py-4 text-lg text-white font-thin' style={{minHeight: '50vh'}}>
            <div className='mb-4'><span className='opacity-80 mr-6'>Name:</span>{data[0].fullname}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Address:</span>{data[0].address}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Phone:</span>{data[0].phone}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>City:</span>{data[0].city}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>State:</span>{data[0].state}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Zip:</span>{data[0].zip}</div>
            <div><span className='opacity-80 mr-6'>Country:</span>{data[0].country}</div>
        </div>
    );
};

export default BillingDataDetails;