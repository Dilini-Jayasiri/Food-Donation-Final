import React from 'react'
import {Col,Row,Button} from 'react-bootstrap';
import '../assets/partials/donationType.scss';
import GradientButton from 'react-linear-gradient-button'
import { NavLink } from 'react-router-dom';
import { width } from '@mui/system';
import "../assets/partials/image.scss";
import { Box, Grid, requirePropFactory } from '@mui/material';
const navLinkStyles = () =>{
   return{
    
     textDecoration:  'none',

   }
 }
const DonationType =() => {
  return (
   <Row className='donationType'>
        
       
         <img src={require("../assets/child.jpg")} alt="image" className="w-100 mt-0 h-50"/>
        
           <h2 className='topic2 mt-4'>Pick Donation Type</h2>
       
        <Col xs={12} className='md-5 my-3'>
           <center>
              {/* <GradientButton colors={['#4c669f', '#3b5998', '#192f6a']}>  */}

              
            <NavLink style={navLinkStyles} to="/instantDonation">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >Instant Donation</GradientButton>
            </NavLink>
         
        </center>
     </Col>
     <Col xs={12} className='md-5 my-3'>
           <center>
              <label>(YOU  CAN  MAKE  YOUR  DONATION  RIGHT  NOW)</label>
           </center>
        </Col><Col xs={12} className='md-5 mt-4 mb-2'>
           <center>
           
            <NavLink style={navLinkStyles} to="/reservedDonation">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >Reserved Donation</GradientButton>
            </NavLink>
         
           
           </center>
        </Col><Col xs={12} className='md-5 my-3'>
           <center>
              <label>(YOU CAN RESERVED A DATE  AND  MAKE  YOUR  DONATION)</label>
           </center>
        </Col>
     </Row>
  )
}

export default DonationType;
