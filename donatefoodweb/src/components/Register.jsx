import React from 'react'
import { NavLink } from 'react-router-dom';
import { UseNavigate } from 'react-router';
import * as orgType from '../organizations/orgType'
import Controls from '../components/controls/Controls'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { useSignup } from './hoooks/useSignup';
// import { useAuthContext } from "./hoooks/useAuthContext";


// const Register = () => {
//     const [error,setError] = useState(null)
//     const [isLoading,setIsLoading] = useState(null)
//     const {dispatch} = useAuthContext()

//     const navigate = useNavigate();

//     const [user, setUser] = useState({
//         username: '',
//         email: '',
//         password: '',
//        // role: ''
//     });
// //const {signup,error,isLoading} = useSignup()
//     //Handle Inputs
//     const handleInput = (event) => {
        
//         let name = event.target.name;
//         let value = event.target.value;

//         setUser({ ...user, [name]: value });
//     }

//     //Handle Submit
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsLoading(true)
//         setError(null)
//         //Object Destructuring
//         //Store object data into variables
//         const { username, email, password } = user;
//         try {
//             //It is submitted on port 3000 by default 
//             //which is front end but we need to submit it on
//             //backend which is on port 3001. so we need proxy
//             const res = await fetch('/register', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     username, email, password
//                 })
                
//             })
//            const json = await res.json()
//            console.log(res.status)
//             if (res.status === 400 || !res) {
//               window.alert("Already Used Details")
//                 // setIsLoading(false)
//                 // setError(json.error)
//             } else {
//                 window.alert("Registered Successfully");
//                 localStorage.setItem('user',JSON.stringify(json))
//                 dispatch({type:'LOGIN',payload:json})

//                 setIsLoading(false)
//                 navigate('/login')
//             }
//         } catch (error) {
//             console.log(error);
//         }
//        // return { signup, isLoading, error}
//     }
//     return (
        
//     )
// }

// export default Register;


import { useState } from "react"
import { useSignup } from "./hoooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role,setRole] = useState('')
  const {signup, error, isLoading} = useSignup()
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password,role)
  }

  return (
    <div>
    <div className="container shadow my-5">
        <div className="row justify-content-end">
            <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                <h1 className="topic display-4 fw-bolder">Hello Friend</h1>
                <p className="lead text-center">Enter Your Details</p>
                <h5 className="mb-4">OR</h5>
                <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">Login</NavLink>
            </div>
            <div className="col-md-6 p-5">
                <h1 className="topic2 display-6 fw-bolder mb-5">REGISTER</h1>
                <form onSubmit={handleSubmit} method={'POST'}>
                  
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                  
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">User Role</label>
                        <input type="text" class="form-control" id="role" aria-describedby="emailHelp"
                        
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)} />
                       
                    </div>
                    
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">I Agree Terms and Condditions</label>
                    </div>
                    <button disabled={isLoading} type="submit" class="btn btn-outline-primary w-100 mt-4 rounded-pill">Register</button>
                    {error && <div className="error">{error}</div>}
                    
                </form>
                
            </div>
        </div>
    </div>
</div>
  )
}

export default Signup
