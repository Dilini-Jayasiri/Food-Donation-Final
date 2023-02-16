import { Divider, Paper, Typography } from '@material-ui/core'
import { Group, MapsHomeWork } from '@mui/icons-material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import PieDonationType from './PieDonationType';
import AreaSummary from './AreaSummary';
// import TableNewDonor from '../../../../pages/Requests/TableNewDonor'
// import ReservedDonors from '../ReservedDonors/ReservedDonors'
// import InstantDonors from '../instantdonors/InstantDonors'
// import Organizations from '../Organizations/Organizations';

const Main = ({setSelectedLink,link}) => {
    // useEffect(()=>{
    //     setSelectedLink(link);
    // },[]);
  return (
    <>
   <Box
    sx={{
        display:{xs:'flex',md:'grid'},
        gridTemplateColumns:'repeat(3,1fr)',
        gridAutoRows:'minmax(100px,auto}',
        gap:4,
        textAlign:'center',
        flexDirection:'column'
    }} >
       <Paper elevation={3} sx={{p:4,width:'90%'}}>
        <Typography variant='h4'>Total Organizations</Typography>
        <Box 
         sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
         }} >
            <Group sx={{height:100,width:100,opacity:0.3,mr:2}}/>
            <Typography variant='h4'>10</Typography>

        </Box>

       </Paper>

       <Paper elevation={2} sx={{p:4,width:'97%'}}>
        <Typography variant='h4'>Total Instant Donors</Typography>
        <Box 
         sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
         }} >
            <MapsHomeWork sx={{height:100,width:100,opacity:0.3,mr:1}}/>
            <Typography variant='h4'>20</Typography>

        </Box>

       </Paper>
       <Paper elevation={3} sx={{p:2,gridColumn:3,gridRow:'1/4',width:'90%'}}>
        <Box>
            <Typography variant='h6'>Most Popular Donation Type</Typography>
            <h9>Reserved Donation</h9>
            {/* <List>

            </List> */}
        </Box>
        <Divider sx={{mt:3,mb:3,opacity:0.7}}/>
        <Box>
            <Typography variant='h6'>Most Popular Donation Area</Typography>
            <h9>Panadura</h9>
            {/* <List>

            </List> */}
        </Box>
        <Divider sx={{mt:3,mb:3,opacity:0.7}}/>
        <Box>
            <Typography variant='h6'>Month of the Highest Number of Donation</Typography>
            <h9>December</h9>
            {/* <List>

            </List> */}
        </Box>
        <Divider sx={{mt:3,mb:3,opacity:0.7}}/>
        <Box>
            <Typography variant='h6'>Most Popular Food Type</Typography>
            <h9>Rice</h9>
            {/* <List>

            </List> */}
        </Box>
       </Paper>
       <Paper elevation={3} sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'99%'}}>
         <PieDonationType/>
       </Paper>
       <Paper elevation={3} sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'99%'}}>
       <Typography>Donation Progress</Typography>
         <AreaSummary/>
       </Paper>
      


   </Box>
   {/* <Box>
     <Paper sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'100%'}}>
        <Box>
            
            <Organizations/>
        </Box>
       </Paper>
   </Box> */}

   {/* <Box>
     <Paper sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'100%'}}>
        <Box>
            
            <ReservedDonors/>
        </Box>
       </Paper>
   </Box> */}

   {/* <Box>
     <Paper sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'100%'}}>
        <Box>
            
            <InstantDonors/>
        </Box>
       </Paper>
   </Box> */}

   </>
  )
}

export default Main

