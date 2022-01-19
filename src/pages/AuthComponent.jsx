import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import Body from '../components/Body';


const AuthComponent = props => {
    const history = useHistory()
    useEffect(() => {
        const access_token = localStorage.getItem('access');
        if(!access_token){
            history.push('/login')
        }
    }, [])
    return (
        <>
            {null}
        </>
    )
}

AuthComponent.propTypes = {

}

export default AuthComponent
