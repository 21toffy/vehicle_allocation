import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { baseURL } from '../utils/baseUrl';
import AuthComponent from './AuthComponent';
import Body from '../components/Body';


const CreateLocation = props => {

    const [formData, setFormData] = useState({
        destination: '',
        distance_in_km: 0
    });

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [success, setSucces] = useState(null)




    const submitFormData = (e) => {
        e.preventDefault()
        setloading(true)
        console.log(`${baseURL}/create/location/`)
        axios({
            method: "post",
            url: `${baseURL}/create/location/`,
            headers: {
                "Content-Type": "application/json",
            }, 
            data: formData,
        }).then(function (result) {
            if (result.status = 200) {
                setloading(false)
                console.log(result.data.data)
                setSucces('Location created')
                seterror(null)
                setFormData({
                    destination: '',
                    distance_in_km: 0,
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
                console.log({ ...error });
            });
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Body>
            <div>

            <h3>
                {success ? <div className="alert alert-success text-center" role="alert">{success}</div> : null}
                {error ? <div className="alert alert-danger text-center" role="alert">{error}</div> : null}
                Create locations


            </h3>
            <AuthComponent />
           <div>
           <form onSubmit={submitFormData} className="row g-3">
                <div className="mb-3">
                    <label htmlFor="destination" className="form-label">Location/Destination Name</label>
                    <input type="text" className="form-control" id="destination" aria-describedby="" name="destination" value={formData.destination}
                        onChange={handleChange} required />
                    {/* <div id="" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>

                <div className="mb-3">
                    <label htmlFor="distance_in_km" className="form-label">Distance in kilometer</label>
                    <input type="number" className="form-control" id="distance_in_km" aria-describedby="" name="distance_in_km" value={formData.distance_in_km}
                        onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{loading ?
                    <div className="spinner-border"></div>
                    : "Submit"}</button>
            </form>
           </div>
                        </div>
        </Body>

    )
}

CreateLocation.propTypes = {

}

export default CreateLocation
