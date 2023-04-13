import React from 'react'
import GradientButton from 'react-linear-gradient-button/lib/GradientButton'
import { Box, Grid, requirePropFactory } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Col, Button, Row } from 'react-bootstrap';
import "../assets/office.jpg"
import { margin } from '@mui/system';
import Footer from '../components/Footer';
import Nav from '../components/Navbar/Navbar';

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

export default function OrgAccount() {
  return (
    <>
    <Nav/>
        <div className='account' >
      <Col xs={4}><center><h1>No one has ever</h1>
        <h1>become poor</h1>
        <h1>from giving</h1>

      </center>
      </Col>
      <Col> <img src={require("../assets/donate.gif")} alt="image" /></Col>
      {/* <center> */}
      <Col xs={4}>
        <center>
          <Box my={5}>
            {/* <NavLink style={navLinkStyles} to="/">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >Edit Profile</GradientButton>
            </NavLink> */}

          </Box>
          <Box my={5}>
            <NavLink style={navLinkStyles} to="/donationReqAcc">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} > Donation Requests</GradientButton>
            </NavLink>
          </Box>

          <Box my={5}>
            <NavLink style={navLinkStyles} to="/requestSummary">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >View Request Details</GradientButton>
            </NavLink>
          </Box>

          <Box my={5}>
            <NavLink style={navLinkStyles} to="/dataCards">
              <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >View Donation Shedule</GradientButton>
            </NavLink>
          </Box>
          
        </center>
      </Col>
      {/* </center> */}


    </div>
    <Footer/>
    </>
  )
}
