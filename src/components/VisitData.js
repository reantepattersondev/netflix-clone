import { useState, useContext } from 'react';
import { Store } from '../context/store';
import VisitCard from './VisitCard';
import VisitDataDetails from './VisitDataDetails';
import db from '../firebase/firebase';

import './styles.css';


const VisitData = () => {
    const [detailsId, setDetailsId] = useState(null);
    const [details, setDetails] = useState(false);
    const [state, dispatch] = useContext(Store);

    const clickHandler = (id) => {
        setDetailsId(id);
        setDetails(true);
    }
    const handlePaymentBillingData = (id) => {
        if(window.confirm('Are you sure to delete?'))
        {
            db.collection('visit-data').doc(id).delete()
            .then( () => {
                const visitDataFiltered = state.visitData.filter(data => id !== data.id)
                
                setDetails(false);
                dispatch({ type: 'VISIT_DATA', payload: visitDataFiltered });
            })
        }
    }
    const renderDataCard = state.visitData.map((data, i) => <VisitCard key={i} data={data} clickHandler={clickHandler}/>)

    return (
        <div className='flex flex-wrap'>
            <div style={{height: 560}} className='flex flex-wrap w-1/2 overflow-y-scroll'>
                 {renderDataCard}
            </div>
           
            {details ? <VisitDataDetails 
                        data={state.visitData.filter(data => detailsId === data.id)}
                        onDeletePaymentData={handlePaymentBillingData} /> : null}
        </div>
    );
};

export default VisitData;