import React, { useEffect,useState} from 'react'
import '../../assets/partials/services.scss'
import { Box, Grid } from '@mui/material';
import GradientButton from 'react-linear-gradient-button'
import { NavLink } from 'react-router-dom';
import { useDonationContext } from "../../components/hoooks/useDonationContext"
import { useAuthContext } from '../../components/hoooks/useAuthContext'
import Nav from '../Navbar/Navbar';
import Footer from '../Footer';

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

const RequestSummary =()=>{
  const { donations, dispatch } = useDonationContext()
  const { user } = useAuthContext()
    const [requests,setRequests] = useState([]); 
    const [err,setErr] = useState();
    console.log(requests)


// useEffect(() => {
//   const fetchRequest = async () => {
//       const response = await fetch('/api/lastRequest',{
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }})
//       const json = await response.json()
//        console.log(json)

//       if(response.ok){
//         dispatch({ type: 'SET_DONATIONS', payload: json })
//           console.log(json)
//       }else{
//         console.error("fvghbnj");
//       } 
//   }
//   fetchRequest()
//   console.log(requests)
// },[])
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


    return(
      <>
       <Nav/>
        <center>
            <div className="container py-5">
            <div className="col-md-5">
                <center>
                <div class="card p-2">
                {/* <h1>Donation Confirmation</h1> */}
                     <div class="card-body text-center">
                    
         
   <h3>My Request Summary
   </h3>
   {requests.map(don => (
   
   <>
   <p key={don._id}><strong>Organization Name : </strong>{don.orgName}</p>
   <p key={don._id}><strong>Organization Email : </strong>{don.orgEmail}</p>
    <p key={don._id}><strong>Size of thee Organization : </strong>{don.orgSize}</p>
    <p key={don._id}><strong>Contact : </strong>{don.phone}</p>
    <p key={don._id}><strong>City : </strong>{don.city}</p>
    <p key={don._id}><strong>Requested Quantity : </strong>{don.quantity}</p>
    <p key={don._id}><strong>Organization Type : </strong>{don.orgType}</p>  
    <p key={don._id}><strong>Meal Type : </strong>{don.mealType}</p>
    </>
   ))}
                        <center>
                        <Box my={5}>
            <NavLink style={navLinkStyles} to="/">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >Update Request</GradientButton>
            </NavLink>
          </Box>
          </center>
     

        

                     </div>
                     
                </div>
                
                </center>
                </div>
       
    </div>

   </center>
   <Footer/>
</>
    )
}

export default RequestSummary;