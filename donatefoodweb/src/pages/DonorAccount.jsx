import React from 'react'
import GradientButton from 'react-linear-gradient-button/lib/GradientButton'
import { Box, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navLinkStyles = () =>{
    return{
     
      textDecoration:  'none',
     
      
  
    }
  }

export default function DonorAccount() {
  return (
    <div className='account' >
        <center>
            <Box my={5}>
        <GradientButton>
            Edit Profile
        </GradientButton></Box>
        <Box my={5}>
        <NavLink style={navLinkStyles} to="/donationSummary">
        <GradientButton>
            Last Donation Status
        </GradientButton>
        </NavLink> 
        </Box>
        <Box my={5}>
        <GradientButton>
            View Donation History
        </GradientButton></Box>
        <Box my={5}>
        <NavLink style={navLinkStyles} to="/calendar">
        <GradientButton>
            Change the Date
        </GradientButton>
        </NavLink>
        </Box>
        </center>
        
    </div>
  )
}
