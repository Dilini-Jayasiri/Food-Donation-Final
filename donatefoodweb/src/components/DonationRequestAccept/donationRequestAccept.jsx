
import { useEffect,useState } from "react";
import DonationDetailsForOrg from "./DonationDetailsForOrg";
import {alert} from '@mobiscroll/react';
import { useNavigate } from 'react-router'
import '../../assets/partials/services.scss'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useAuthContext } from "../hoooks/useAuthContext";
import { useDonationContext } from "../hoooks/useDonationContext";
import { useForm, Form } from '../../components/useForm';
//import summary from '../summary'
const initialValues = {status:''}

const DonationRequestAccept = () => {
    // const {user} = useAuthContext();
    const navigate = useNavigate();
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const handleClick = ()=>{
        navigate("/alart")
    }

   

    const showAlert = () => {
        alert({
            title: 'Your Donation is on the way',
            message: 'Relevent Donor will Contact you soon',
        });
        
    }
    // navigate("/home")
    const [donation,setDonation] = useState([])
    const [requests,setRequests] = useState("")
    const [status, setStatus] = useState('')
   
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('status' in fieldValues)
            temp.donorName = fieldValues.status ? "" : "This field is required."

            setErrors({
                ...temp
            })
    
            if (fieldValues === values)
                return Object.values(temp).every(x => x == "")
        }

    useEffect(() => {
        const fetchDonation = async () => {
            const response = await fetch('/api/reservedDonation/last'
                // headers:{
                //     'Authorization' : `Bearer ${user.token}`
                // }
            )
            const json = await response.json()

            if(response.ok){
                setDonation(json)
            } 
        }
        // if(user){
        fetchDonation()
        //}
    },[])
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        //handleChange,
        resetForm
    } = useForm(initialValues, true,validate);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setFormErrors('You must be logged in')
            return
        }
       
            setIsSubmit(true)
            navigate('/home')
    
      

        const donation = { status }

        const res = await fetch('/api/status', {
            method: "POST",
            body: JSON.stringify(donation),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setFormErrors(json.error)
            window.alert("Message Not Sent. Try Again Later")
        }
        if (res.ok) {
            console.log('new donation added', json)
            // window.alert("Message Sent Successfully");
            showAlert();
            setValues({
                status:''
            },
                dispatch({ type: 'CREATE_DONATIONS', payload: JSON })
            )
        }

    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    
       
    
    //     try {
    //       const res = await fetch('/api/status', {
    //           method :"POST",
    //           headers: {
    //               "Content-Type" : "application/json"
    //           },
    //           body : JSON.stringify({
    //               status
    //           })
    //       });
    
    //       if(res.status === 400 || !res){
    //           window.alert("Invalid Credentials");
    //       }else{
    //           window.alert("Donation Confirmed");
    //           //window.location.reload();
    //         //   navigate('/home');
    //       }
    
    //   } catch (error) {
    //       console.log(error);
    //   }
        
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
      

    // useEffect(() => {
    //     const fetchRequests = async () => {
    //         const response = await('/api/requests')
    //         const json = await response.json()

    //         if(response.ok){
    //            setRequests(json)
    //         }
    //     }
    //     fetchRequests()
    // },[])

    

    return(
        <center>
            <div className="container py-5">
            <div className="col">
                
                <center>
                <form onSubmit={handleSubmit}>
                <div class="card">
                <h1>Donation Confirmation</h1>
               
                     <div class="card-body text-center">
                
                {[donation] && [donation].map((don) => (
                   <DonationDetailsForOrg key={don._id} don={don}/>
                ))}
                </div>
                <p class="card-text lead">If you are like to recive the food donation Please confirm here</p>
                <center>               
                     <FormControl sx={{ width: 300 , marginBottom: '3rem'}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Donation Acceptance</InputLabel>
                                                <Select
                                                    name="status"
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={status}
                                                    label="Organization Type"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    
                                                >
                                                  
                                                    <MenuItem value={"Accepted"}>Accepted</MenuItem>
                                                    <MenuItem value={"Rejected"}>Rejected</MenuItem>
                                                   
                                                </Select>
                                            </FormControl>

                                            </center>
                                            <div sx={{ width: 300 , marginBottom: '3rem'}}>
                                            <button type="submit" onClick={showAlert} class="btn btn-outline-primary w-25 mb-4 rounded-pill">Confirm Donation Status</button>
                                            </div>
               
                     </div>
                     
                     </form>
                     </center>
                     </div>
                     </div>
                     </center>
                     
        
    )
}

export default DonationRequestAccept;

// import React from 'react'
// import { useNavigate } from 'react-router'
// import '../../assets/partials/services.scss'
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import {alert} from '@mobiscroll/react';



// const DonationReqAcc = () => {
//     const navigate = useNavigate();
// const handleClick = ()=>{
//     navigate("/alart")
// }

// const showAlert = () => {
//     alert({
//         title: 'Your Donation is on the way',
//         message: 'Relevent Donor will Contact you soon',
//     });
    
// }
// navigate("/home")

//     return (
        // <section id="service">
        //     <div className="container py-5">
        //         <div className="row">
        //             <div className="col-12">
        //                 <h3 className='fs-5 text-center mb-0'>Congratulations!!!</h3>
        //                 <h1 className='display-6 text-center mb-4'>You have a new Food Donation Request</h1>
        //                 <hr className='w-25 mx-auto' />
        //             </div>
        //         </div>
        //         <div className='row mt-5'>
        //             <div className="col-md-6">
        //                 <div class="card p-3">

        //                     <div class="card-body text-center">
        //                         {/* <i className='fa fa-cogs fa-4x mb-4 text-primary'></i> */}
        //                         <h5 class="card-title mb-3 fs-4 fw-bold">Children's Home</h5>

        //                         <p class="card-text lead">If you are like to recive the food donation Please confirm here</p>
        //                         <button type="button" onClick={showAlert}  class="btn btn-outline-primary btn-sm"><i className="fa fa-check-square" aria-hidden="true"></i> Confirm Request</button>
                                
                                
        //                     </div>
                            
        //                 </div>
        //             </div>
        //             <div className="col-md-6">
        //                 <div class="p-3">
        //                     <img src={require('../../assets/vol.jpg')} class="card-img-top" alt="oldagehome" height={'300px'} />

        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // </section>
//     )
// }

//export default DonationReqAcc;
