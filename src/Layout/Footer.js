import React, { Fragment } from 'react';

const Footer = ({ type }) => {

    const renderFooter = (type) => {
        switch (type) {
            case 'type-1':
                return (<footer style={{ color: '#747474' }} className='relative bg-black bg-opacity-80 2xl:absolute 2xl:w-screen 2xl:bottom-0'>
                    <div className="w-3/5 m-auto bg-none py-8">
                        <div className="flex">
                            <h4 className='opacity-80 mb-8 '>Questions? </h4>
                            <h4 className='opacity-80 mb-8'>Contact us.</h4>
                        </div>
                        <div className='flex flex-wrap justify-between opacity-80'>
                            <ul className="">
                                <li className='mb-3'>FAQ</li>
                                <li>Cookie Preferences</li>
                            </ul>
                            <ul className="">
                                <li className='mb-3'>Help Center</li>
                                <li>Corporate Information</li>
                            </ul>
                            <ul className="">
                                <li>Terms of Use</li>
                                <li>Privacy</li>
                            </ul>
                            
                        </div>
                    </div>
                </footer>);
                break;
            case 'type-2':
                return (<footer style={{ color: '#747474', background: '#f3f3f3' }} className='relative text-white 2xl:absolute 2xl:w-screen 2xl:bottom-0'>
                    <div className="w-5/5 xl:w-3/5 m-auto bg-none py-8 px-10 xl:px-0">
                        <h4 className='opacity-80 mb-8'>Questions? Contact us.</h4>
                        <div className='flex justify-between opacity-80 flex-col xl:flex-row'>
                            <ul>
                                <li className='mb-3'>FAQ</li>
                                <li>Cookie Preferences</li>
                            </ul>
                            <ul>
                                <li className='mb-3'>Help Center</li>
                                <li>Corporate Information</li>
                            </ul>
                            <ul>
                                <li>Terms of Use</li>
                            </ul>
                            <ul>
                                <li>Privacy</li>
                            </ul>
                        </div>
                    </div>
                </footer>);
                break;

        }
    }

    return <Fragment>{renderFooter(type)}</Fragment>
};

export default Footer;