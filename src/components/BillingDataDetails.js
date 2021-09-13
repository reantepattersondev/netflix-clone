import React from 'react';

const BillingDataDetails = ({data, onDeleteBillingData}) => {

    return (
        <div className='px-12 py-4 text-lg text-white font-thin' style={{minHeight: '50vh'}}>
            <div className='mb-4'><span className='opacity-80 mr-6'>Name:</span>{data[0].fullname}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Address:</span>{data[0].address}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Phone:</span>{data[0].phone}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>City:</span>{data[0].city}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>State:</span>{data[0].state}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Zip:</span>{data[0].zip}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Country:</span>{data[0].country}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Ip Address:</span>{data[0].ip_address}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Time:</span>{data[0].logged_at}</div>
            {/* Delete Button */}
            <div className='mb-4'>
                <button
                    type="button"
                    className='bg-red-600 w-full py-3 px-4 rounded text-white font-bold mb-3'
                    onClick={() => onDeleteBillingData(data[0].id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BillingDataDetails;