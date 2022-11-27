import React from 'react'
import GradientButton from 'react-linear-gradient-button/lib/GradientButton'
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navLinkStyles = () =>{
    return{
     
      textDecoration:  'none',  
    }
  }

export default function ReciverAccount() {
  return (
    <div>
      <container>
        <center>
            <Box my={5}>
        <GradientButton>
            Edit Profile
        </GradientButton></Box>
        <Box my={5}>
        {/* <NavLink style={navLinkStyles} to="/donationSummary"> */}
        <GradientButton>
            Pending Donation Request
        </GradientButton>
        {/* </NavLink>  */}
        </Box>
        </center>
        </container>
    </div>
  )
}
