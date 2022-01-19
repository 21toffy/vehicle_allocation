import React, { useState } from 'react'
import Body from '../../components/Body';
import Table from '../../components/Table';
// import Table from '../components/Table';
import {useBusses} from '../../hooks/index'
import AuthComponent from '../AuthComponent';
const InUse = props => {
    const [typeOfBus, setTypeOfBus] = useState('in_use');
    const [refreshPage, setRefreshPage] = useState(0);

    let { busses, loading, error } = useBusses(typeOfBus, refreshPage);
    return (
        <Body>
            <AuthComponent />
            <Table  setRefreshPage={setRefreshPage} busses={busses} loading={loading} logic='in_use' name='Busses in transit/ On the move'/>
        </Body>
    )
}
 
InUse.propTypes = {

}

export default InUse
