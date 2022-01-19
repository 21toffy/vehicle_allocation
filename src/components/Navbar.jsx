import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Navbar = props => {


    // const [active, setactive] = useState(false)
    // const openClose = () =>{
    //     setactive(!active)
    // }

    return (
        <div className="navbar">
        <div className="hamburger" onClick={()=>props.openClose()}>
            <i className="fas fa-bars" />

        </div>
        <div className="logo">
            <a href="/">Transport Allocation Management System</a>
        </div>
        </div>

    )
}

Navbar.propTypes = {

}

export default Navbar
