import React from 'react';

const SignInCard = ({title, clickHandler, id}) => {
    return (
        <div onClick={() => clickHandler(id)} style={{width: '45%'}} className='flex items-center justify-center cursor-pointer h-24 bg-red-600 text-white rounded bg-opacity-40 mr-4 mb-4'>
            <h4>{title}</h4>
        </div>
    );
};

export default SignInCard;