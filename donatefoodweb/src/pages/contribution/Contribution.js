import { useEffect, useState } from "react";
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors'; 
import { useDonationContext } from "../../components/hoooks/useDonationContext"
import { useAuthContext } from '../../components/hoooks/useAuthContext'
import Nav from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

const Contribution = () => {
    return(
        <>
        <Nav/>
        <Box sx={{height: '100%',width: '90%'}}>
            <Paper sx={{mt:4,mr:2,ml:10,mb:4,width:'100%'}}>
              <h1>trfyghujkl</h1>  
            </Paper>
        </Box>
        <Footer/>
        </>
    )
}

export default Contribution;