// import {React,useState} from 'react';
// import {NavLink} from 'react-router-dom';
// import {useNavigate} from 'react-router';

// const Login = () =>{

//     const navigate = useNavigate();

//     const [user,setUser] = useState({
//         email : '',
//         password : ''
//     }); 

//     //Handle Input
//     const handleChange = (event) => {
//         let name = event.target.name
//         let value = event.target.value

//         setUser({...user, [name]:value})
//     }

//     //Handle Login
//     const handleSubmit = async (event) =>{
//         event.preventDefault();
//         const {email, password} = user;
        // try {
        //     const res = await fetch('/login', {
        //         method :"POST",
        //         headers: {
        //             "Content-Type" : "application/json"
        //         },
        //         body : JSON.stringify({
        //             email,password
        //         })
        //     });

        //     if(res.status === 400 || !res){
        //         window.alert("Invalid Credentials");
        //     }else{
        //         window.alert("Login Successfull");
        //         //window.location.reload();
        //         navigate('/home');
        //     }

        // } catch (error) {
        //     console.log(error);
        // }
    
//     return(
       
//     )
// }

// export default Login;

import { useState } from "react"
import { useLogin } from "./hoooks/useLogin" 
import {Navigate, NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router';
import Nav from "./Navbar/Navbar";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Footer from "./Footer";
import { Box, Grid } from '@mui/material';
import Controls from '../components/controls/Controls'
import Input from '../components/controls/Input'
//import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role,setRole] = useState('')
  const {login, isLoading} = useLogin()
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  //const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password,role)

    try {
      const res = await fetch('/api/user/login', {
          method :"POST",
          headers: {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({
              email,password,role
          })
      });

      if(res.status === 400 || !res){
          window.alert("Invalid Credentials");
      }else{
          window.alert("Login Successfull");
          //window.location.reload();
          navigate('/home');
          localStorage.setItem("role",role)
        console.log(role);
      }

  } catch (error) {
      console.log(error);
  }
    
    // if(error){
    //   alert("Not login")
    // }else{
    //   navigate("/home");
    // }
    // if(email && password == null){
    // navigate('/home');
    // }
    // if(!error){
    //   navigate('/home')
    // }else{
    //   window.alert("Message Not Sent. Try Again Later")
    // }
  }

  return (
    <>
    <Nav/>
    <div>
           <div className="container shadow my-5">
               <div className="row">
                   <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                       <h1 className="topic display-4 fw-bolder">Welcome Back</h1>
                       <p className="lead text-center">Enter Your Credentials</p>
                       <h5 className="mb-4">OR</h5>
                       <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</NavLink>
                   </div>
                   <div className="col-md-6 p-5">
                       <h1 className="topic2 display-6 fw-bolder mb-5">LOGIN</h1>
                       <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                {/* <label for="exampleInputEmail1" class="form-label">Email address</label> */}
                                <Input type="email" id="exampleInputEmail1" 
                                       label="Email Address"
                                       name="email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>
                            
                            </div>
                            {/* <Box my={4} mx={4}>
                                            <Controls.Input
                                                name="email"
                                                label="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                
                                            />
                                        </Box> */}
                                        {/* <Box my={4} mx={4}>
                                            <Controls.Input
                                                type="setPassword"
                                                name="password"
                                                label="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                
                                            />
                                        </Box> */}
                            <div class="mb-3">
                                {/* <label for="exampleInputPassword1" class="form-label">Password</label> */}
                                <Input type="password"  id="exampleInputPassword1"
                                  label="Password"
                                  name="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <Box my={4} >

                          
                                            <FormControl sx={{ width: '100%' }}>
                                                <InputLabel id="demo-simple-select-autowidth-label">User Type</InputLabel>
                                                <Select
                                                    name="role"
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={role}
                                                    label="Organization Type"
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <MenuItem value={role}>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={"Donor"}>Donor</MenuItem>
                                                    <MenuItem value={"Needy Organization"}>Needy Organization</MenuItem>
                                                   
                                                </Select>
                                            </FormControl>
                                        
                                        </Box>
                                        <button disabled={isLoading} type="submit" class="btn btn-outline-primary w-100 mt-4 rounded-pill">Login</button>
                    {error && <div className="error">{error}</div>}
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

export default Login
