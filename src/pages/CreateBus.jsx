import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { baseURL } from '../utils/baseUrl';
import AuthComponent from './AuthComponent';
import Body from '../components/Body';


const CreateBus = props => {

    const [formData, setFormData] = useState({
        name: '',
        engine: '',
        model: '',
        fuel_consumption: '',
        plate_number: '',
        seat_capacity: 0,       
        condition: '',
        year: 0,
        in_use:false,
        under_maintenance:false,
    });

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [success, setSucces] = useState(null)




    const submitFormData= (e) =>{
        e.preventDefault()
        setloading(true)
        console.log(`${baseURL}/create/bus/`)
        axios({
            method: "post",
            url: `${baseURL}/create/bus/`,
            headers: {
                "Content-Type": "application/json",
            },
            data :formData,
          }).then(function (result) {
            if (result.status = 200){
                setloading(false)
                console.log(result.data.data)
                setSucces('Buss Created')
                seterror(null)
                setFormData({
                        name: '',
                        engine: '',
                        model: '',
                        fuel_consumption: '',
                        plate_number: '',
                        seat_capacity: 0,       
                        condition: '',
                        year: 0,
                        in_use:false,
                        under_maintenance:false,
                    })
                // setTimeout(() => {
                //     setRedirectOnLogin(true);
                //   }, 700);              
            }
          })
          .catch((error) => {
            setloading(false)
        
            setSucces(null)
            seterror(error.response.data.message)
            console.log(error.response.data.message)
          console.log({...error});
        });
    }
 

const handleChange = (e)=> {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
  }

    return (
        <Body>
        <div  className="form-item">
            <AuthComponent />
        <h3>
            Create Buse/ vehicles
                {
                    success ?
                    <div className="alert alert-success text-center" role="alert">
                    {success}
                    </div>
: null
                }
        </h3>
        <form onSubmit={submitFormData} className="row g-3">
            <div className="mb-3 col-md-6">
                <label htmlFor="name" className="form-label">Vehicle name</label>
                <input type="text" className="form-control" id="name" aria-describedby="" name="name" value={formData.name} 
                onChange={handleChange} required/>
                {/* <div id="" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3 col-md-6">
                <label htmlFor="engine" className="form-label">Engine name</label>
                <input type="text" className="form-control" id="engine" aria-describedby="" name="engine" value={formData.engine} 
                onChange={handleChange} required/>
            </div>

            <div className="mb-3 col-md-6">
                <label htmlFor="model" className="form-label">vehicle model</label>
                <input type="text" className="form-control" id="model" aria-describedby="" name="model" value={formData.model} 
                onChange={handleChange} required/>
            </div>

            <div className="mb-3 col-md-6">
            <label htmlFor="fuel_consumption" className="form-label">fuel consumption</label>
                <select className="form-select" id="fuel_consumption"  aria-label="Default select example" name="fuel_consumption" defaultValue={formData.fuel_consumption} 
                onChange={handleChange} required>
                    <option selected>Open this select menu</option>
                    <option value="low" >low</option>
                    <option value="fair">fair</option>
                    <option value="high">high</option>
                </select>
            </div>

            <div className="mb-3 col-md-6">
                <label htmlFor="plate_number" className="form-label">plate number</label>
                <input type="text" className="form-control" id="plate_number" aria-describedby="" name="plate_number" value={formData.plate_number} 
                onChange={handleChange} required/>
            </div>

            <div className="mb-3 col-md-6">
                <label htmlFor="seat_capacity" className="form-label">vehicle seat_capacity</label>
                <input type="number" className="form-control" id="seat_capacity" aria-describedby=""name="seat_capacity" value={formData.seat_capacity} 
                onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
            <label htmlFor="condition" className="form-label">vehicle condition</label>
                <select className="form-select" id="condition"  aria-label="Default select example"name="condition" value={formData.condition} 
                onChange={handleChange} required>
                    <option selected>Open this select menu</option>
                    <option value="good" >good</option>
                    <option value="fair">fair</option>
                    <option value="bad">bad</option>
                </select>
            </div>

            <div className="mb-3 col-md-6">
                <label htmlFor="year" className="form-label">year of production </label>
                <input type="number" className="form-control" id="year" aria-describedby="" name="year" value={formData.year} 
                onChange={handleChange} required/>
            </div>
            
            

 
            <button type="submit" className="btn btn-primary">{loading ? 
            <div className="spinner-border"></div>
            
            :"Submit"}</button>

        </form>
        </div>
        </Body>

    )
}

CreateBus.propTypes = {

}

export default CreateBus
