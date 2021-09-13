import { useState, useContext } from 'react';
import { Store } from '../context/store';
import BillingCard from './BillingCard';
import BillingDataDetails from './BillingDataDetails';
import db from '../firebase/firebase';

import './styles.css';


const BillingData = () => {
    const [detailsId, setDetailsId] = useState(null);
    const [details, setDetails] = useState(false);
    const [state, dispatch] = useContext(Store);

    const clickHandler = (id) => {
        setDetailsId(id);
        setDetails(true);
    }
    const handleDeleteBillingData = (id) => {
        if(window.confirm('Are you sure to delete?'))
        {
            db.collection('billing-data').doc(id).delete()
            .then( () => {
                const billingDataFiltered = state.billingData.filter(data => id !== data.id)
                
                setDetails(false);
                dispatch({ type: 'BILLING_IN_DATA', payload: billingDataFiltered });
            })
        }
    }
    const renderDataCard = state.billingData.map((data, i) => <BillingCard key={i} data={data} clickHandler={clickHandler}/>)

    console.log(state);

    return (
        <div className='flex flex-wrap'>
            <div style={{height: 560}} className='flex flex-wrap w-1/2 overflow-y-scroll'>
                 {renderDataCard}
            </div>
           
            {details ? <BillingDataDetails 
                        data={state.billingData.filter(data => detailsId === data.id)}
                        onDeleteBillingData={handleDeleteBillingData} /> : null}
        </div>
    );
};

export default BillingData;