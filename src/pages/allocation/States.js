import React, { useState } from 'react'
import PropTypes from 'prop-types'

const States = props => {
    
    return (
        <select className="form-select" id="location" aria-label="Default select example" name="location" defaultValue={props.formData.location}
        onChange={props.handleChange} required>
        <option selected>Change vehicle condition</option>
        <option value="ogun">ogun</option>
        <option value="lagos">lagos</option>
        <option value="Kaduna">Kaduna</option>
        <option value="katsina">katsina</option>
        <option value="jos">jos</option>
        <option value="abuja">abuja</option>
        </select>
    )
}


export default States
