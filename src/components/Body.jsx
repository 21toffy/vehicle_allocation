import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Sider from './Sider'
import Main from './Main'
import Navbar from './Navbar'

const Body = props => {

    const [active, setactive] = useState(false)
    const openClose = () =>{
        setactive(!active)
    }
    

    const closeClose = () =>{
        setactive(false)
    }

    return (
        <div className={`wrapper ${active ? "active":null}` } >
            <Sider  closeClose={closeClose}/>
                <div className="main_container">
                    <Navbar openClose = {openClose} />
                    <div className="content">
                        {props.children}
                    </div>
                </div>           
        </div>
    )
}


export default Body
