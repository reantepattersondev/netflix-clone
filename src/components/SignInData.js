import { useState, useContext } from 'react';
import { Store } from '../context/store';
import SignInCard from './SignInCard';
import SignInDataDetails from './SignInDataDetails';

import './styles.css';


const SignInData = () => {
    const [detailsId, setDetailsId] = useState(null);
    const [details, setDetails] = useState(false);
    const [state, dispatch] = useContext(Store);

    const clickHandler = (id) => {
        setDetailsId(id);
        setDetails(true);
    }

    const renderDataCard = state.signInData.map(
        (data, i) => <SignInCard
                        key={i} 
                        id={data.id} 
                        title={data.email} 
                        clickHandler={clickHandler}/>
    )

    return (
        <div className='flex flex-wrap'>
            <div style={{height: 560}} className='flex flex-wrap w-1/2 overflow-y-scroll'>
                 {renderDataCard}
            </div>
           
            {details ? <SignInDataDetails data={state.signInData.filter(data => detailsId === data.id)} /> : null}
        </div>
    );
};

export default SignInData;