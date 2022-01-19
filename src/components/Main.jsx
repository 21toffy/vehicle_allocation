import React, { Children } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import Sider from './Sider'

const Main = props => {
    return (
        <div className="main_container">
        {/* <Navbar openClose = {props.openClose} /> */}
        
        
        {props.Children}


        <div className="content">
            <div className="item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi ipsum distinctio? Minus similique molestias iusto atque voluptate aut quod excepturi ullam! Deserunt, delectus nam.</div>
            <div className="item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi ipsum distinctio? Minus similique molestias iusto atque voluptate aut quod excepturi ullam! Deserunt, delectus nam.</div>
            <div className="item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi ipsum distinctio? Minus similique molestias iusto atque voluptate aut quod excepturi ullam! Deserunt, delectus nam.</div>
            <div className="item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi ipsum distinctio? Minus similique molestias iusto atque voluptate aut quod excepturi ullam! Deserunt, delectus nam.</div>
            <div className="item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi ipsum distinctio? Minus similique molestias iusto atque voluptate aut quod excepturi ullam! Deserunt, delectus nam.</div>
            <div className="item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi ipsum distinctio? Minus similique molestias iusto atque voluptate aut quod excepturi ullam! Deserunt, delectus nam.</div>
        </div>
        </div>
    )
}

Main.propTypes = {

}

export default Main
