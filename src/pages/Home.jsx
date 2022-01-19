import React, { useState, useEffect } from 'react'
import Body from '../components/Body';
import Table from '../components/Table';
import { useBusses, useHome } from '../hooks/index'
import AuthComponent from './AuthComponent';
import Metrics from './Metrics';
 
const Home = props => {
    const [typeOfBus, setTypeOfBus] = useState('all');
    let { busses, loading, error } = useBusses(typeOfBus);
    let { home } = useHome()


    return (
        <Body>
        <AuthComponent />


            {/* metric ends  */}
            <div className='item'>
                All Vehicles
                <h3>{home.all_busses}</h3>
            </div>
            <div className='item'>
                Vehicles In Transit
                <h3>{home.busses_in_use}</h3>
            </div>
            <div className='item'>
                Good Vehicles
                <h3>{home.good_busses}</h3>
            </div>
            <div className='item'>
                Fair Vehicles
                <h3>{home.fair_busses}</h3>
            </div>
            <div className='item'>
                Bad vehicles
                <h3>{home.bad_busses}</h3>
            </div>
            <div className='item'>
                Vehicles Under maintenance
                <h3>{home.busses_in_fix}</h3>
            </div>

            <div className='form-item'>
                <Metrics />
                <Table busses={busses} loading={loading} logic='xxx' name='' />
            </div>
        </Body>
    )
}

Home.propTypes = {

}

export default Home
