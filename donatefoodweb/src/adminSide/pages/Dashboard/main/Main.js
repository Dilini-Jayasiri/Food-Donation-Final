import { Divider, Paper, Typography } from '@material-ui/core'
import { Group, MapsHomeWork } from '@mui/icons-material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';

const Main = ({setSelectedLink,link}) => {
    // useEffect(()=>{
    //     setSelectedLink(link);
    // },[]);
  return (
   <Box
    sx={{
        display:{xs:'flex',md:'grid'},
        gridTemplateColumns:'repeat(3,1fr)',
        gridAutoRows:'minmax(100px,auto}',
        gap:3,
        textAlign:'center',
        flexDirection:'column'
    }} >
       <Paper elevation={3} sx={{p:4}}>
        <Typography variant='h4'>Total Organizations</Typography>
        <Box 
         sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
         }} >
            <Group sx={{height:100,width:100,opacity:0.3,mr:1}}/>
            <Typography variant='h4'>10</Typography>

        </Box>

       </Paper>

       <Paper elevation={3} sx={{p:4}}>
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
       <Paper elevation={3} sx={{p:2,gridColumn:3,gridRow:'1/4'}}>
        <Box>
            <Typography>Recently Added Organizations</Typography>
            {/* <List>

            </List> */}
        </Box>
        <Divider sx={{mt:3,mb:3,opacity:0.7}}/>
        <Box>
            <Typography>Recently Added Donors</Typography>
            {/* <List>

            </List> */}
        </Box>
       </Paper>
   </Box>
  )
}

export default Main