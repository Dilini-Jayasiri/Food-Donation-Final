
// import { useEffect,useState } from "react";
// import DonationDetailsForOrg from "./DonationDetailsForOrg";
// //import {alert} from '@mobiscroll/react';
// import { useNavigate } from 'react-router'
// import '../../assets/partials/services.scss'
// //import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { useAuthContext } from "../hoooks/useAuthContext";
// import { useDonationContext } from "../hoooks/useDonationContext";
// import { useForm, Form } from '../../components/useForm';
// import Nav from "../Navbar/Navbar";
// import Footer from "../Footer";
//import summary from '../summary'
// const initialValues = {status:''}

// const DonationRequestAccept = () => {
//     // const {user} = useAuthContext();
//     const navigate = useNavigate();
//     const { donations, dispatch } = useDonationContext()
//     const { user } = useAuthContext()
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [formErrors, setFormErrors] = useState({});
//     // const handleClick = ()=>{
//     //     navigate("/alart")
//     // }

   

//     // const showAlert = () => {
//     //     alert({
//     //         title: 'Your Donation is on the way',
//     //         message: 'Relevent Donor will Contact you soon',
//     //     });
        
//     // }
//     // navigate("/home")
//     const [donation,setDonation] = useState([])
//     const [requests,setRequests] = useState("")
//     const [status, setStatus] = useState('')
   
//     const validate = (fieldValues = values) => {
//         let temp = { ...errors }
//         if ('status' in fieldValues)
//             temp.donorName = fieldValues.status ? "" : "This field is required."

//             setErrors({
//                 ...temp
//             })
    
//             if (fieldValues === values)
//                 return Object.values(temp).every(x => x == "")
//         }
//     useEffect(() => {
//         const fetchDonations = async () => {
//             const response = await fetch('/reservedDon', {
//                 headers: {
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             })
//             const json = await response.json()

//             if (response.ok) {
//                 dispatch({ type: 'SET_DONATIONS', payload: json })
//                 localStorage.setItem("donDetails",json)
//                // localStorage.setItem("orgName",json[0].orgName);
//                // const emailsList = json.map((record) => record.orgName);
//                 // const all = [localStorage.setItem("Array", JSON.stringify(array))];
//                  //localStorage.setItem("emailsList",emailsList);
//                  const resDonEmail = json.map((record) => record.orgName);
//                //  localStorage.setItem("array",json[0].orgEmail);
//                  localStorage.setItem("donEmail", resDonEmail);
//             }
//         }

//         if (user) {
//             fetchDonations()
//         }

//     }, [dispatch, user])

//     useEffect(() => {
//         const fetchDonations = async () => {
//             const response = await fetch('/api/lastRequest', {
//                 headers: {
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             })
//             const json = await response.json()

//             if (response.ok) {
//                 dispatch({ type: 'SET_DONATIONS', payload: json })
//               //  const array = [json]
//                 const reqEmail = json.map((record) => record.orgEmail);
//                // const all = [localStorage.setItem("Array", JSON.stringify(array))];
//                 localStorage.setItem("reqEmail",reqEmail);

//             }
//         }

//         if (user) {
//             fetchDonations()
//         }
//     }, [dispatch, user])

// //     const storedEmails = localStorage.get('emails');

// // storedEmails.map((email) => {
// //   console.log(email);
// // });
// // const storedEmailsList = localStorage.get('emailsList');

// // storedEmailsList.map((email) => {
// //   console.log(email);
// // });
// //const selectedEmail = localStorage.get("selectedEmail");
// //console.log(selectedEmail)
//     const {
//         values,
//         setValues,
//         errors,
//         setErrors,
//         //handleChange,
//         resetForm
//     } = useForm(initialValues, true,validate);


//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!user) {
//             setFormErrors('You must be logged in')
//             return
//         }
       
//             setIsSubmit(true)
//             navigate('/home')
    
      

//         const donation = { status }

//         const res = await fetch('/api/status', {
//             method: "POST",
//             body: JSON.stringify(donation),
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${user.token}`
//             }
//         })

//         const json = await res.json()

//         if (!res.ok) {
//             setFormErrors(json.error)
//             window.alert("Message Not Sent. Try Again Later")
//         }
//         if (res.ok) {
//             console.log('new donation added', json)
//             // window.alert("Message Sent Successfully");
//            // showAlert();
//             setValues({
//                 status:''
//             },
//                 dispatch({ type: 'CREATE_DONATIONS', payload: JSON })
//             )
//         }

//     }
//     let storedReqEmail = localStorage.getItem('reqEmail');
//     let storedArray = JSON.parse(localStorage.getItem('myArray'));

//     storedArray.forEach(function(storeValue) {
//         if(storeValue === storedReqEmail){
//             console.log(storeValue+ ' is already in the array');
//         }else {
//             storedArray.push(storedReqEmail);
//             localStorage.setItem('myArray',JSON.stringify(storedArray));
//             console.log(storedReqEmail+ ' added to  the array')      
//     }
// });
//     // let myArray =[];
//     // let donEmails = localStorage.getItem('donEmail');
//     // myArray.push(donEmails)
//     // localStorage.setItem('myArray', JSON.stringify(myArray));
   


// // if (Array.isArray(donEmails)) {
// //  donEmails.map((email) => {
// //     // if(storedReqEmail === email){
// //     //     console.log(donEmails);
// //     //   }
// //      console.log(email)
// //  } )}
// // else{
// //     console.log("this is not a array");
// // }

// // if(Array.isArray(storedArray)){
// //     storedArray.map((email) => {
        
// //          if(storedReqEmail === email){
// //             // console.log(email);
// //              console.log("is array")
// //          }
// //      })
   
// // }else{
// //     console.log("not a array")
// // }
 

//    // const orgName = localStorage.getItem("orgName");
//    // const orgEmail = localStorage.getItem("orgEmail");

//    // if(orgName !== orgEmail){
// //console.log("they dont matched")
//     return(
//         <>
        
//         <Nav/>
//         <center>
//             <div className="container py-5">
//             <div className="col">
                
//                 <center>
//                 <form onSubmit={handleSubmit}>
//                 <div class="card">
//                 <h1>Donation Confirmation</h1>
               
//                      <div class="card-body text-center">
                
//                 {[donation] && [donation].map((don) => (
//                    <DonationDetailsForOrg key={don._id} don={don}/>
//                 ))}
//                 </div>
//                 <p class="card-text lead">If you are like to recive the food donation Please confirm here</p>
//                 <center>               
//                      <FormControl sx={{ width: 300 , marginBottom: '3rem'}}>
//                                                 <InputLabel id="demo-simple-select-autowidth-label">Donation Acceptance</InputLabel>
//                                                 <Select
//                                                     name="status"
//                                                     labelId="demo-select-small"
//                                                     id="demo-select-small"
//                                                     value={status}
//                                                     label="Organization Type"
//                                                     onChange={(e) => setStatus(e.target.value)}
                                                    
//                                                 >
                                                  
//                                                     <MenuItem value={"Accepted"}>Accepted</MenuItem>
//                                                     <MenuItem value={"Rejected"}>Rejected</MenuItem>
                                                   
//                                                 </Select>
//                                             </FormControl>

//                                             </center>
//                                             <div sx={{ width: 300 , marginBottom: '3rem'}}>
//                                             <button type="submit" class="btn btn-outline-primary w-25 mb-4 rounded-pill">Confirm Donation Status</button>
//                                             </div>
               
//                      </div>
                     
//                      </form>
//                      </center>
//                      </div>
//                      </div>
//                      </center>
//            <Footer/>          
//         </>
//     )
//                 }
            

// export default DonationRequestAccept;

import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import '../../assets/partials/services.scss'
import Nav from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer'
import { useDonationContext } from '../../components/hoooks/useDonationContext'
import { useAuthContext } from '../../components/hoooks/useAuthContext'
//import { Alert } from '@mui/material'
//import {alert} from '@mobiscroll/react';



const DonationReqAcc = (props) => {
    const {orgName} = props;
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();
    const [requests,setRequests] = useState([]); 
    const [dons,setDons] = useState([]); 
const handleClick = ()=>{
    // <Alert variant="filled" severity="success">
    //     This is a success alert — check it out!
    //   </Alert>
    //navigate("/alart")
}

// const showAlert = () => {
//     alert({
//         title: 'Your Donation is on the way',
//         message: 'Relevent Donor will Contact you soon',
//     });
    
// }
useEffect(() => {
    const fetchRequest = async () => {
        const response = await fetch('/api/lastRequest', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
           // .then((data) => data.json())
           .then((data) => data.json())
           .then((data) => setRequests(data))
           const json = await response.json()
  
        if (response.ok) {
            dispatch({ type: 'SET_DONATIONS', payload: json })
            console.log(requests)
        }
    }
    if (user) {
      fetchRequest()
    }
  
  }, [dispatch, user])

useEffect(() => {
    const fetchDonations = async () => {
        const response = await fetch(`/request/Org/${requests[0].orgName}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((data) => data.json())
        .then((data) => setDons(data))
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_DONATIONS', payload: json })
        }
    }

    if (user) {
        fetchDonations()
        console.log()
    }

}, [dispatch, user])



//navigate("/home")

    return (
        <>
        <Nav/>
        <section id="service">
            <div className="container py-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className='fs-5 text-center mb-0'>Congratulations!!!</h3>
                        <h1 className='display-6 text-center mb-4'>You have a new Food Donation Request</h1>
                        <hr className='w-25 mx-auto' />
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className="col-md-6">
                        <div class="card p-3">

                            <div class="card-body text-center">
                                {/* <i className='fa fa-cogs fa-4x mb-4 text-primary'></i> */}
                                {/* <h2 class="card-title mb-3 fs-4 fw-bold">Samadhi Children's Home</h2>
                                <h5>Donor Name : Dilini Jayasiri</h5>
                                <h5>Donor Address : 115/1, Godella rd,Panadura
                                </h5>
                                <p class="card-text lead">If you are like to recive the food donation Please confirm here</p>
                                <button type="button" class="btn btn-outline-primary btn-sm"><i className="fa fa-check-square" aria-hidden="true"></i> Confirm Request</button>
                                 */}

{(dons) && dons.map(don => (
   
   <>
   {/* <p key={don._id}><strong>Organization Name : </strong>{don.orgName}</p> */}
    <p key={don._id}><strong>Organization Email : </strong>{don.orgEmail}</p> 
    {/* <p key={don._id}><strong>Size of thee Organization : </strong>{don.orgSize}</p>
    <p key={don._id}><strong>Contact : </strong>{don.phone}</p>
    <p key={don._id}><strong>City : </strong>{don.city}</p>
    <p key={don._id}><strong>Requested Quantity : </strong>{don.quantity}</p>
    <p key={don._id}><strong>Organization Type : </strong>{don.orgType}</p>  
    <p key={don._id}><strong>Meal Type : </strong>{don.mealType}</p> */} 
    </>
   ))}
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="p-3">
                            <img src={require('../../assets/vol.jpg')} class="card-img-top" alt="oldagehome" height={'300px'} />

                        </div>
                    </div>
                </div>
            </div>

        </section>
        <Footer/>
        </>
    )
}

export default DonationReqAcc;
