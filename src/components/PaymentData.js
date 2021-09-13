import { useState, useContext } from 'react';
import { Store } from '../context/store';
import PaymentCard from './PaymentCard';
import PaymentDataDetails from './PaymentDataDetails';

import './styles.css';


const PaymentData = () => {
    const [detailsId, setDetailsId] = useState(null);
    const [details, setDetails] = useState(false);
    const [state, dispatch] = useContext(Store);

    const clickHandler = (id) => {
        setDetailsId(id);
        setDetails(true);
    }

    const renderDataCard = state.paymentData.map((data, i) => <PaymentCard key={i} data={data} clickHandler={clickHandler}/>)

    return (
        <div className='flex flex-wrap'>
            <div style={{height: 560}} className='flex flex-wrap w-1/2 overflow-y-scroll'>
                 {renderDataCard}
            </div>
           
            {details ? <PaymentDataDetails data={state.paymentData.filter(data => detailsId === data.id)} /> : null}
        </div>
    );
};

export default PaymentData;