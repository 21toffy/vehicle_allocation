import React, { useState } from 'react'
import Body from '../../components/Body';
import Table from '../../components/Table';
// import Table from '../components/Table';
import {useBusses} from '../../hooks/index'
import AuthComponent from '../AuthComponent';
const Fair = props => {
    const [typeOfBus, setTypeOfBus] = useState('fair');
    const [refreshPage, setRefreshPage] = useState(0);

    let { busses, loading, error } = useBusses(typeOfBus, refreshPage);
    return (
        <Body>
            <AuthComponent />
            <Table  setRefreshPage={setRefreshPage} busses={busses} loading={loading} logic='fair' name='Fair Busses'/>
        </Body>
    )
} 

Fair.propTypes = {

}

export default Fair
