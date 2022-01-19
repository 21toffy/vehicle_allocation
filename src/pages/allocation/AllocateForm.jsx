import React, { useState } from 'react'
import axios from 'axios';
import States from './States';
import { baseURL } from '../../utils/baseUrl';
import { useLocations } from '../../hooks';
import mark from '../../images/mark.png'
import { Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import AuthComponent from '../AuthComponent';
import Body from '../../components/Body';




const AllocateForm = props => {

    const [distance, setDistance] = useState('all');

    const history = useHistory()
    let { locations,  setLocations } = useLocations(distance);

    const [formData, setFormData] = useState({
        location: '',
        passangers: null
    });

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [success, setSucces] = useState(null)

    const [busChosen, setBusChosen] = useState(null)
    const [driverName, setDriverName] = useState(null)
    const [dateOfJourney, setDateOfJourney] = useState(null)
    const [vehicleCondition, setVehicleCondition] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);



    const [suitableBusses, setSuitable] = useState(null)


const [response, setResponse] = useState({})



    const allocaionData = {
        number_of_passengers: formData.passangers,
        location: formData.location,
        bus: busChosen,
        driver: driverName,
        date_of_journey: dateOfJourney,
        vehicle_condition: vehicleCondition,
    }


    const allocateBus = (e) =>{
        e.preventDefault()
        setloading(true)
        console.log(formData)
        if (formData.passangers <= 0) {
            seterror('something went wrong contact admin')
            setloading(false)
        } else {
            axios({
                method: "post",
                url: `${baseURL}/allocate-suitable/`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: allocaionData,
            }).then(function (result) {
                if (result.status = 200) {
                    setloading(false)
                    setSucces('Bus Allocated Successfully')
                    seterror(null)
                    handleCancel()
                    console.log(result.data)
                    setResponse(result.data.data)
                    setIsSuccessModalVisible(true)
                    setTimeout(() => {
                        setSucces(null)
                        seterror(null)
                        setLocations([])
                        setFormData({
                            location: '',
                            passangers: null
                        })

                    }, 1000);
                }
            })
                .catch((error) => {
                    setloading(false)

                    setSucces(null)
                    seterror(error.response.data.message)

                });

        }
    }



    const showModal = (e) => {
        console.log(e)
        setIsModalVisible(true);
        setBusChosen(e.id)
        setVehicleCondition(e.condition)
        
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };





    const handleChange = (e) => {
        console.log(formData)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const selectChange = (e) => {
        console.log(formData)
        setFormData({
            ...formData,
            location: e.target.value
        });
    }

    const getSuitableBusses = (e) => {
        e.preventDefault()
        setloading(true)
        console.log(formData)
        if (formData.passangers <= 0) {
            seterror('Number of passengers field can not be empty!!!')
            setloading(false)
        } else {
            axios({
                method: "post",
                url: `${baseURL}/suitable/`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: formData,
            }).then(function (result) {
                if (result.status = 200) {
                    setloading(false)
                    console.log(result.data)
                    setSuitable(result.data)
                    setSucces('Sorry No suitable vehicle for journey available at the moment ')
                    seterror(null)
                   
                    setTimeout(() => {
                        setSucces(null)
                        seterror(null)

                    }, 1000);
                }
            })
                .catch((error) => {
                    setloading(false)

                    setSucces(null)
                    seterror(error.response.data.message)

                });

        }
    }


const handleCancelSuccess =()=>{
    setIsSuccessModalVisible(false)
    history.push("/")
}
 

    return (
        <Body>
        <div  className="form-item">
        <AuthComponent />
        <Modal title="" visible={isSuccessModalVisible} onOk={handleOk} onCancel={handleCancelSuccess} footer={null}>
            <div className="text-center">
            <img src={mark} className='w-50 h-50 my-5' alt="" />
            <h4>vehicle allocated Successfully</h4>
            </div>
        </Modal>


            <Modal title="Allocate vehicle " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            {success ? <div className="alert my-4 alert-success text-center" role="alert">{success}</div> : null}
                    {error ? <div className="alert my-4 alert-danger text-center" role="alert">{error}</div> : null}
                <form onSubmit={allocateBus} className="row g-3">
                    <div className="mb-3">
                        <label htmlFor="driver" className="form-label">Driver name</label>
                        <input type="text" className="form-control" id="driver" aria-describedby="" name="driver" value={driverName}
                            onChange={(e)=>setDriverName(e.target.value)} required />
                        {/* <div id="" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
  
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date of Journey</label>
                        <input type="date" className="form-control" id="date" aria-describedby="" name="date" value={dateOfJourney}
                            onChange={
                                (e)=>setDateOfJourney(e.target.value)
                            } required />
                    </div>



                    <div className='text-center mt-3'>
                            <button type="submit" className='btn btn-primary btn-sm btn-block text-center'>
                                submit
                            </button>
                        </div>

                </form>



            </Modal>



            <div className="form-item">
                <h3>
                    Fill in Form to find suitable vehicles for journey
                    {success ? <div className="alert my-4 alert-success text-center" role="alert">{success}</div> : null}
                    {error ? <div className="alert my-4 alert-danger text-center" role="alert">{error}</div> : null}
                </h3>
                <form onSubmit={getSuitableBusses} className="row g-3">
                    <div className="mb-3">
                        <label htmlFor="passangers" className="form-label">Number of passangers going on trip</label>
                        <input type="number" className="form-control" id="passangers" aria-describedby="" name="passangers" value={formData.passangers}
                            onChange={handleChange} required />
                        {/* <div id="" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>


                    <select className="form-select" aria-label="Default select example" name="location"
                        onChange={selectChange} required>
                        <option value="">Select a Network</option>
                        {locations ?
                            locations.map(st => (
                                <option key={st.id} value={st.destination}>{st.destination}</option>
                            ))
                            : null}
                    </select>


                    <button type="submit" className="btn btn-primary">{loading ?
                        <div className="spinner-border"></div>
                        : "Submit"}</button>
                </form>

                {
                    loading && "loading..."

                }





            </div>
            {suitableBusses ?

                suitableBusses.map(suit => (

                    <div key={suit.id} className='item'>

                        <h6 className="card-subtitle mb-2 ">
                            name: <span className='text-muted'>{suit.name}</span>
                        </h6>
                        <h6 className="card-subtitle mb-2 ">
                            year of creation: <span className='text-muted'>{suit.year}</span>
                        </h6>
                        <h6 className="card-subtitle mb-2 ">
                            Engine type: <span className='text-muted'>{suit.engine}</span>
                        </h6>
                        <h6 className="card-subtitle mb-2 ">
                            Vehicle condition: <span className='text-muted'>{suit.condition}</span>
                        </h6>
                        <h6 className="card-subtitle mb-2 ">
                            Fuel consumption rate: <span className='text-muted'>{suit.fuel_consumption}</span>
                        </h6>
                        <h6 className="card-subtitle mb-2 ">
                            Plate number: <span className='text-muted'>{suit.plate_number}</span>
                        </h6>
                        <h6 className="card-subtitle mb-2 ">
                            Seat capacity: <span className='text-muted'>{suit.seat_capacity}</span>
                        </h6>
                        <div className='text-center mt-3'>
                            <button onClick={()=>showModal(suit)} className='btn btn-primary btn-sm btn-block text-center'>
                                Allocate
                            </button>
                        </div>



                    </div>
                ))
                : null}
                </div>
        </Body>
    )
}



export default AllocateForm
