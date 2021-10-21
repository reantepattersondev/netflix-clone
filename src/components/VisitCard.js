import React from 'react';

const VisitCard = ({data, clickHandler}) => {
    return (
        <div onClick={() => clickHandler(data.id)} style={{width: '45%'}} className='flex items-center justify-center cursor-pointer h-24 bg-red-600 text-white rounded bg-opacity-40 mr-4 mb-4'>
            <h4 style={{wordBreak: 'break-all'}}>{`${data.ip_address}`}</h4>
        </div>
    );
};

export default VisitCard;