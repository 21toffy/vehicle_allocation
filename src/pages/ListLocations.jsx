import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import LocationTable from '../components/LocationTable'
import { Redirect, useHistory } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import Body from '../components/Body';




const ListLocations = props => {

    return (
        <Body>
            <AuthComponent />
            <LocationTable />
        </Body>
    )
}

ListLocations.propTypes = {

}

export default ListLocations
