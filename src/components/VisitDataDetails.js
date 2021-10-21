import React from 'react';

const VisitDataDetails = ({data, onDeletePaymentData}) => {

    return (
        <div className='px-8 py-4 text-lg text-white font-thin' style={{height: '560px',overflow:'scroll',maxWidth: "50%", wordBreak: "break-all" }}>
        <div className='mb-4'><span className='opacity-80 mr-6'>Ip Address:</span>{data[0].ip_address}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Device:</span>{data[0].device}</div>
            <div className='mb-4'><span className='opacity-80 mr-6'>Browser:</span>{data[0].browser}</div>
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

export default VisitDataDetails;