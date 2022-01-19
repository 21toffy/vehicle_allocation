import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

import { baseURL } from '../utils/baseUrl';



const Table = (props) => {
    console.log(props)
    const [formData, setFormData] = useState({
        name: '',
    })


    const [busState, setbusState] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(0)

    const [inUseData, setinUseData] = useState({ in_use: false });

    const [goodData, setGoodData] = useState({
        condition: "good"
    });
    const [badData, setBadData] = useState({
        condition: 'bad'
    });
    const [fairData, setFairData] = useState({
        condition: "fair"
    });
    const [umData, setUmData] = useState({
        under_maintenance: false
    });
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [success, setSucces] = useState(null)

    const handleChange = (e) => {
        if (props.logic == "in_use") {
            setinUseData(
                {
                    ...inUseData,
                    [e.target.name]: e.target.value
                }
            )
        } else if (props.logic == "good") {
            setGoodData(
                {
                    ...goodData,
                    [e.target.name]: e.target.value
                }
            )
        } else if (props.logic == "bad") {
            setBadData(
                {
                    ...badData,
                    [e.target.name]: e.target.value
                }
            )
        } else if (props.logic == "fair") {
            setFairData(
                {
                    ...fairData,
                    [e.target.name]: e.target.value
                }
            )
        } else if (props.logic == "under_maintenance") {
            setUmData(
                {
                    ...umData,
                    [e.target.name]: e.target.value
                }
            )
        } else {

        }
    }

    useEffect(() => {
        console.log(refresh)
    }, [refresh])



    const noLongerUnderMaintenance =(e)=>{
        e.preventDefault()
        setloading(true)
        axios({
            method: "patch",
            url: `${baseURL}/edit-bus/${busState.id}/`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {under_maintenance: true, condition:"bad"},
        }).then(function (result) {
            if (result.status = 200) {
                setloading(false)
                console.log(result.data.data)
                setSucces('Bus Status Edited Successfully')
                seterror(null)

                props.setRefreshPage(Math.random() * 10);

                setTimeout(() => {
                    setSucces(null)
                    seterror(null)
                    setIsModalVisible(false);

                  }, 400);    
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


    var final_data = props.logic == "in_use" ? inUseData :
        props.logic == "good" ? goodData :
            props.logic == "bad" ? badData :
                props.logic == "fair" ? fairData :
                    props.logic == "under_maintenance" ? umData :
                        null


    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const submitEdit = (e) => {
        e.preventDefault()
        setloading(true)
        axios({
            method: "patch",
            url: `${baseURL}/edit-bus/${busState.id}/`,
            headers: {
                "Content-Type": "application/json",
            },
            data: final_data,
        }).then(function (result) {
            if (result.status = 200) {
                setloading(false)
                console.log(result.data.data)
                setSucces('Bus Status Edited Successfully')
                seterror(null)

                props.setRefreshPage(Math.random() * 10);
                setTimeout(() => {
                    setSucces(null)
                    seterror(null)
                    setIsModalVisible(false);

                  }, 400);    
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



console.log(refresh)

    return (
        <>
            <Modal title="Vehicle details" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
            {success ? <div className="alert alert-success text-center" role="alert">{success}</div> : null}
                {error ? <div className="alert alert-danger text-center" role="alert">{error}</div> : null}


                <form onSubmit={submitEdit} className="d-flex justify-content-around flex-row">
                    <div className="col-md-6">
                        {
                            props.logic == 'good' ?
                                <select className="form-select" id="condition" aria-label="Default select example" name="condition" defaultValue={formData.goodData}
                                    onChange={handleChange} required>
                                    <option selected>Change vehicle condition</option>
                                    <option value="fair">fair</option>
                                    <option value="bad">bad</option>
                                </select> :
                                props.logic == "bad" ?
                                    <select className="form-select" id="condition" aria-label="Default select example" name="condition" defaultValue={formData.badData}
                                        onChange={handleChange} required>
                                        <option selected>Change vehicle condition</option>
                                        <option value="good" >good</option>
                                        <option value="fair">fair</option>

                                    </select> :
                                    props.logic == "fair" ?
                                        <select className="form-select" id="condition" aria-label="Default select example" name="condition" defaultValue={formData.fairData}
                                            onChange={handleChange} required>
                                            <option selected>Change vehicle condition</option>
                                            <option value="good" >good</option>
                                            <option value="bad">bad</option>
                                        </select> : null
                        }
                    </div>

                    {
                        (props.logic == "in_use" || props.logic == "under_maintenance") ? null :
                            <button className='btn btn-primary btn-block text-center mb-2'>{loading ?
                                <div className="spinner-border"></div>
                                : "change"}</button>
                    }
                </form>

                {props.logic == "under_maintenance" ?
                    <button onClick={submitEdit} className='btn btn-primary btn-small btn-block'>
                       {loading ?
                    <div className="spinner-border"></div>
                    : " No longer under maintenance"}
                    </button>
                    :
                    props.logic == "in_use" ?
                        <button onClick={submitEdit} className='btn btn-primary btn-small btn-block'>
                             {loading ?
                    <div className="spinner-border"></div>
                    : " vehicle no longer in use"}
                           
                        </button>
                        : null}

                <p><span className="text-large">vehicle Name:</span>{busState.name}   </p>
                <p><span className="text-large">vehicle Model:</span>{busState.model}   </p>
                <p><span className="text-large">fuel consumption rate:</span>{busState.fuel_consumption}   </p>
                <p><span className="text-large">vahicle capacity:</span>{busState.seat_capacity}   </p>
                <p><span className="text-large">vehicle status:</span>{busState.in_use ? 'in transit' : 'free'}   </p>
                <p><span className="text-large">vahicle engine:</span>{busState.engine}   </p>
                <p><span className="text-large">Vehicle seat capacity:</span>{busState.seat_capacity}   </p>
                <p><span className="text-large">vehicle plate number:</span>{busState.plate_number}   </p>

                {
                    props.logic  != "under_maintenance" ?
                        <button onClick={noLongerUnderMaintenance} className='btn btn-warning text-white btn-block text-center'>
                           {loading ?
                                <div className="spinner-border"></div>
                                : "put vehicle under maintenance"}
                            
                        </button> : null

                }
            </Modal>
                <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>

            <MaterialTable
                title={props.name}
                columns={[
                    { title: 'Vehicle name', flex: 1,field: 'name' },
                    { title: 'Fuel consumption', flex: 1,field: 'fuel_consumption' },
                    { title: 'Condition', flex: 1,field: 'condition' },
                    { title: 'In Use', flex: 1,field: 'in_use' },
                    { title: 'Model', flex: 1,field: 'model' },
                    { title: 'Plate number', flex: 1,field: 'plate_number' },
                    {
                        title: 'Under Maintenane',
                        flex: 1,field: 'under_maintenance',
                        // lookup: { 34: 'İstanbul', 63: 'Şanlurfa' },
                    },
                ]}
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => {
                            setbusState(rowData);
                            setIsModalVisible(true);
                            console.log(rowData);
                            
                        }
                    }
                ]}
                data={props.busses}
                options={{
                    filtering: true
                }}
                
                components={{
                    Action: props => (
                        <>
                            <button
                                className='bntn btn-warning text-white radius-1 p-2 m-1 btn-sm'
                                onClick={(event) => props.action.onClick(event, props.data)}>edit</button>
                        </>
                    ),
                    
                }}
            />
                </div>
        </>
    )
}

export default Table;




