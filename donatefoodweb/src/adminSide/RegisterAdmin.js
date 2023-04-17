import React from 'react'
import { NavLink } from 'react-router-dom';
import { UseNavigate } from 'react-router';
import * as orgType from '../organizations/orgType'
import Controls from '../components/controls/Controls'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Nav from '../components/Navbar/Navbar';
import Footer from '../components/Footer';

import { useState } from "react"
import { useSignup } from '../components/hoooks/useSignup';
import { Box, Grid } from '@mui/material';
import {useNavigate} from 'react-router';
import Input from '../components/controls/Input';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role,setRole] = useState('')
  const {signup, error, isLoading} = useSignup()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password,role)

    // try {
    //     const res = await fetch('/api/user/signup', {
    //         method :"POST",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body : JSON.stringify({
    //             email,password,role
    //         })
    //     });
        
    //         navigate('/dashboard');
    //         } catch (error) {
    //     console.log(error);
    // }
    if (email == "admin2018@gmail.com" && password == "dlnmkd97erf") {
        navigate('/dashboard');
    } else if (email == "" && password == "") {
        alert("All fields are required")
    }
    else {
        alert("Email is Already used")
    }
  }


  return (
    <>
    {/* <Nav/> */}
    <div>
    <div className="container shadow my-5">
        <div className="row justify-content-end">
            <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                <h1 className="topic display-4 fw-bolder">Hello Friend</h1>
                <p className="lead text-center">Enter Your Details</p>
                <h5 className="mb-4">OR</h5>
                <NavLink to="/loginAdmin" className="btn btn-outline-light rounded-pill pb-2 w-50">Login</NavLink>
            </div>
            <div className="col-md-6 p-5">
                <h1 className="topic2 display-6 fw-bolder mb-5">REGISTER</h1>
                <form onSubmit={handleSubmit} method={'POST'}>
                  
                    <div class="mb-3">
                       
                        <Input type="email" id="exampleInputEmail1" aria-describedby="emailHelp"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                  
                    <div class="mb-3">
                       
                        <Input type="password" id="exampleInputPassword1"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  
                     <Box my={4} >

</Box>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">I Agree Terms and Conditions</label>
                    </div>
                    <button disabled={isLoading} type="submit" class="btn btn-outline-primary w-100 mt-4 rounded-pill">Register</button>
                    {error && <div className="error">{error}</div>}
                    
                </form>
                
            </div>
        </div>
    </div>
</div>
<Footer/>
</>
  )
}

export default Signup
