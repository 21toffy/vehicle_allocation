import React, { useState, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../utils/baseUrl';



const Login = () => {

    const authContext = useContext(AuthContext);
    console.log(authContext)
    const [loginSuccess, setLoginSuccess] = useState();
    const [loginError, setLoginError] = useState();
    const [redirectOnLogin, setRedirectOnLogin] = useState(
        false
    );
    const [loginLoading, setLoginLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const submitCredentials = (e) => {
        e.preventDefault()
        setLoginLoading(true)
        const credentials = {
            username: username,
            password: password
        }

        axios({
            method: "post",
            url: `${baseURL}/token/`,
            headers: {
                "Content-Type": "application/json",
            },
            data: credentials,
        })
            .then(function (result) {

                if ((result.status = 200)) {
                    setLoginLoading(false)
                    console.log(result.data)
                    localStorage.setItem('access', result.data.access);
                    setLoginError(null);

                    setTimeout(() => {
                        setRedirectOnLogin(true);
                    }, 700);
                }


            })
            .catch((error) => {
                setLoginLoading(false)
                setLoginError(false)

                setLoginError(error.response.data.detail)
                console.log(error.response.data.detail)
                console.log({ ...error });
            });


    }
    const access = localStorage.getItem('access');
    if (access) {

        return <Redirect to="/" />
    }
    return <>
        {/* {redirectOnLogin && <Redirect to="/dashboard" />} */}

        <div className="w-full">


            <div className="container  justify-content-center">
                <div className="row">
                    <div className="card mt-5 mx-auto p-5 col-sm-6 col-sm-offset-3">
                        <h3 className='text-center py-2'>Vehicle Allocation Management System </h3>
                        <h4 className='text-center text-primary py-3'>Login</h4>
                        {loginError ?
                            <div className="alert alert-danger text-center" role="alert">
                                {loginError}
                            </div>
                            :
                            loginSuccess ?

                                <div className="alert alert-success text-center" role="alert">
                                    Login successful
                                </div>
                                :
                                null

                        }
                        <form onSubmit={submitCredentials}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input required type="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div className="form-group text-center">
                                {
                                    loginLoading ?
                                        <button type="submit" className="my-5 btn btn-warning text-center">
                                            <div class="spinner-border text-black" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </button> :
                                        <button type="submit" className="my-5 btn btn-warning text-center">Login</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </>

};


export default Login;