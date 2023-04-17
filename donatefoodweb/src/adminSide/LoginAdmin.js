import { useState } from "react"
import { useLogin } from "../components/hoooks/useLogin";
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Nav from "../components/Navbar/Navbar";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Footer from "../components/Footer";
import { Box, Grid } from '@mui/material';
import Controls from '../components/controls/Controls'
import Input from '../components/controls/Input'
//import { useHistory } from 'react-router-dom';

const LoginAdmin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const { login, isLoading } = useLogin()
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    //const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault()

        //     await login(email, password)

        //     try {
        //       const res = await fetch('/api/user/login', {
        //           method :"POST",
        //           headers: {
        //               "Content-Type" : "application/json"
        //           },
        //           body : JSON.stringify({
        //               email,password
        //           })
        //       });


        //           navigate('/dashboard');

        //      } catch (error) {
        //       console.log(error);
        //   }
        if (email == "admin2018@gmail.com" && password == "dlnmkd97erf") {
            navigate('/dashboard');
        } else if (email == "" && password == "") {
            alert("All fields are required")
        }
        else {
            alert("Invalid Credentials")
        }
    }

    return (
        <>
            {/* <Nav/> */}
            <div>
                <div className="container shadow my-5">
                    <div className="row">
                        <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                            <h1 className="topic display-4 fw-bolder">Welcome Back</h1>
                            <p className="lead text-center">Enter Your Credentials</p>
                            <h5 className="mb-4">OR</h5>
                            <NavLink to="/registerAdmin" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</NavLink>
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
                                        onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />

                                </div>

                                <div class="mb-3">
                                    {/* <label for="exampleInputPassword1" class="form-label">Password</label> */}
                                    <Input type="password" id="exampleInputPassword1"
                                        label="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <button disabled={isLoading} type="submit" class="btn btn-outline-primary w-100 mt-4 rounded-pill" onClick={handleSubmit}>Login</button>
                                {error && <div className="error">{error}</div>}
                                {error && <div className="error">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LoginAdmin;
