import React, { useEffect,useState} from 'react'
import '../assets/partials/services.scss'
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import GradientButton from 'react-linear-gradient-button'
import { Card } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const navLinkStyles = () => {
    return {
      //fontWeight:  'bold',
      //fontSize:'20px',
      textDecoration: 'none',
      borderRadius: '20'
      //color:'#fff',
      //background:'#7600dc',
  
  
    }
  }
<style>
@import url('https://fonts.googleapis.com/css2?family=Schoolbell&display=swap');
</style>
// const divStyle = () =>{
//   return{
    
// }
// }

const DonationSummaryDonor =()=>{
    const [donorName,setDonorName] = React.useState('');
    const [phone,setPhone] = React.useState('');
    const [donEmail,setdonEmail] = React.useState('');
    const [donations,setDonation] = useState([]); 
    const [id,setId] = useState()
    const params =useParams();
    console.log(donations)

//var name=localStorage.getItem(donorName);
// getDonorData = () =>{
//   axios.get('/reservedDon')
//     .then((response) => {
//       const data = response.data;
//       this.s({donation:data});
//       console.log("Data has been received");
//     })
//     .catch(()=>{
//       alert('Error retriving data');
//     });
// }
// async function getDon() {
//   try{
//       const dons = await ReservedDonation.find().sort({_id:-1}).limit(1);
//       console.log(dons);
//   }catch(error){
//   console.log(error.message);
//   }
// }
//getDon();
useEffect(()=>{
  getDonationDetails();
},[])

const getDonationDetails = async ()=>{
  console.warn(params)
  let result = await fetch(`/reservedDon/get/${params.id}`);
  result = await result.json();
  console.warn(result);
}

const updateDonation = async () => {
  console.warn(donorName,phone,donEmail)
}
    useEffect(() => {
        const fetchDonation = async () => {
          const {response} = await axios.get('/reservedDon/get');
          setDonation(response);
          console.log('donation',response);
          const json = await response.json()
    
          if (response.ok) {
            setDonation(json)
          }
        }
        fetchDonation()
      }, []);
    return(
        <center>
            <div className="container py-5">
            <div className="col-md-5">
                <center>
                <div class="card p-2">
                {/* <h1>Donation Confirmation</h1> */}
                     <div class="card-body text-center">
                      {/* <h4>RESERVED  DONATION</h4> */}
                        {/* <i className='fa fa-cogs fa-4x mb-4 text-primary'></i> */}
                        {/* <h5 class="card-title mb-3 fs-4 fw-bold">Children's Home</h5> */}
                        {/* <input type="text" value={id} onChange={e => setId(e.target.value)} /> */}
      {/* <div>{donations.donorName}</div> 
                        <div className='sumP'>
                          
                        {donations.map(post => {
      <div key={post.id}>
        <h5>{post.donname}</h5> */}
        {/* <p>{post.setPhone}</p>
        <p>{post.setdonEmail}</p> */}
        {/* <p>{post.address}</p>
        <p>{post.orgName}</p>
        <p>{post.date}</p>
        <p>{post.foodName}</p>
        <p>{post.quantity}</p>
        <p>{post.mealType}</p>
        <p>{post.foodType}</p> */}
        {/* </div>
    })} */}
                        {/* {don.map(org => (org._id))} 
          */}
   <h3>Your Donation Summary
   </h3>
                        <p>Donor name : Dilini Jayasiri</p>
                        <p>Donor Type : Individual </p>
                        <p> Conatct No : 0716613876 </p>
                        
                        <p> Address :Panadura </p>
                       
                        <p> Date :21.12.2022 </p>
                        <p> Food Name : Rice</p>
                        <p> Quantity :60 </p>
                        <p> Meal Type :Lunch </p>
                        <center>
                        <Box my={5}>
            <NavLink style={navLinkStyles} to="/">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >Contact Donor</GradientButton>
            </NavLink>
          </Box>
          </center>
                        {/* </div> */}
                        {/* {localStorage.getItem('donname') && (
            <div>
               Name: <p>{localStorage.getItem('donname')}</p>
            </div>
         )} */}

        

                        {/* <center>
                                    <GradientButton
                                        style={{ width: '40%' }}
                                        onClick={''}
                                        type="submit"
                                        text="Submit">
                                        Confirm Donation
                                        <i className="fa fa-paper-plane ms-2"></i>
                                    </GradientButton>
                                    </center> */}
                     </div>
                     
                </div>
                
                </center>
                </div>
       
    </div>

   </center>

    )
}

export default DonationSummaryDonor;