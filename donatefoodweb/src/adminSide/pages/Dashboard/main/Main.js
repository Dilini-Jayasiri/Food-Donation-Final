import { Divider, Paper, Typography } from '@material-ui/core'
import { Group, MapsHomeWork } from '@mui/icons-material'
import React, { useEffect,useRef,useState } from 'react'
import Box from '@mui/material/Box';
import ReactToPrint from 'react-to-print';
import PieDonationType from './PieDonationType';
import PieChartDistrict from './PieChartDistricts'
import AreaSummary from './AreaSummary';
import GradientButton from 'react-linear-gradient-button'
import IconButton from '@mui/material/IconButton';
import TableNewDonor from '../../../../pages/Requests/TableNewDonor'
import ReservedDonors from '../ReservedDonors/ReservedDonors'
import InstantDonors from '../instantdonors/InstantDonors'
import Organizations from '../Organizations/Organizations';

import { useDonationContext } from '../../../../components/hoooks/useDonationContext'
import { useAuthContext } from '../../../../components/hoooks/useAuthContext'
import Button from '../../../../components/controls/Button';

const Main = () => {
    const { donations, dispatch } = useDonationContext()
    const { user } = useAuthContext()
    const [orgCount,setOrgCount] = useState([]);
    const [mostInstDon,setMostInsDons] = useState([]);
    const [mostResDon,setMostResDons] = useState([]);
    const [insCount,setInsCount] = useState([]);
    const [resCount,setResCount] = useState([]);
    const orgCountArray = Object.values(orgCount);
    const insCountArray = Object.values(insCount);
    const resCountArray = Object.values(resCount);
    const componentRef = useRef();
    // const handlePrint = ReactToPrint({
    //       content: () => componentRef.current,
    //       documentTitle : 'new document',
    //       onafterprint: ()=> alert('Print success')
    // });

    useEffect(() => {
        const fetchResDonation = async () => {
            const response = await fetch('/api/request/count', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
               // .then((data) => data.json())
               .then((data) => data.json())
               .then((data) => setOrgCount(data))
               const json = await response.json()
      
            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
                console.log(orgCount)
            }else{
                console.log("nott")
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])
      useEffect(() => {
        const fetchResDonation = async () => {
            const response = await fetch('/total-count-ins', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
               // .then((data) => data.json())
               .then((data) => data.json())
               .then((data) => setInsCount(data))
               const json = await response.json()
      
            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
                console.log(insCount)
            }else{
                console.log("nott")
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])

      useEffect(() => {
        const fetchResDonation = async () => {
            const response = await fetch('/total-count-res', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
               // .then((data) => data.json())
               .then((data) => data.json())
               .then((data) => setResCount(data))
               const json = await response.json()
      
            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
                console.log(resCount)
            }else{
                console.log("not")
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])

      useEffect(() => {
        const fetchResDonation = async () => {
            const response = await fetch('/api/reserved-donors/top', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
               // .then((data) => data.json())
               .then((data) => data.json())
               .then((data) => setMostResDons(data))
               const json = await response.json()
      
            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
                console.log(orgCount)
            }else{
                console.log("nott")
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])

      useEffect(() => {
        const fetchResDonation = async () => {
            const response = await fetch('/api/instant-donors/top', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
               // .then((data) => data.json())
               .then((data) => data.json())
               .then((data) => setMostInsDons(data))
               const json = await response.json()
      
            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
                console.log(orgCount)
            }else{
                console.log("nott")
            }
        }
        if (user) {
            fetchResDonation()
        }
      
      }, [dispatch, user])

  return (
    <>
          <div>
              <ReactToPrint
                trigger={() => {
                  return (
                    <GradientButton style={{ backgroundImage: `linear-gradient(to right, #1abc9c 50%, #16a085 100%)`, }} >
                        Print the Report
                    </GradientButton>
                    // <Button>

                    //   <IconButton
                    //     color="primary"
                    //     aria-label="upload picture"
                    //     component="label"
                    //   >
                    //     <DownloadForOfflineIcon />
                    //   </IconButton>
                    // </Button>
                  );
                }}
                content={() => componentRef.current}
                documentTitle="Enuno Customer Demograhy Report"
                pageStyle="print"
                onAfterPrint={() => {
                 // toast.success("The file Downloaded");
                }}
                onPrintError={() => {
                 // toast.error("File Does't Downloaded");
                }}
              />
            </div>
{/* <ReactToPrint
     trigger={()=>{
        return<button>Print the page</button>
     }}
     content={()=>this.componentRef}
     documentTitle='new document'
     pageStyle="print"
/> */}
<div ref={componentRef} style={{width:'100%', height:window.innerHeight}}>
    {/* <button onClick={handlePrint}>Print</button> */}
   <Box
        sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "minmax(100px,auto}",
            gap: 1,
            textAlign: "center",
            flexDirection: "column",
    }} >
       <Paper elevation={3} sx={{mt:2,p:4,width:'90%'}}>
        <Typography variant='h4'>Total Registered Organizations</Typography>
        {orgCountArray && orgCountArray.map(countOrg => (
          <Box 
          key={countOrg}
         sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
         }} >
            <Group sx={{height:100,width:100,opacity:0.3,mr:2}}/>
            <Typography variant='h4'>{countOrg}</Typography>

        </Box>
        ))}
      

       </Paper>

       <Paper elevation={3} sx={{mt:2, p: 2 ,width:'90%'}}>
    <Typography variant="h4">Total Instant Donations</Typography>
    {insCountArray && insCountArray.map((countins) => (
        <Box
          key={countins}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapsHomeWork sx={{height:100,width:100,opacity:0.3,mr:1}}/>
          <Typography variant="h4">{countins}</Typography>
        </Box>
      ))}
  </Paper>
  <Paper elevation={3} sx={{ mt:2,p: 2,width:'90%' }}>
    <Typography variant="h4">Total Reserved Donations</Typography>
    {resCountArray &&
      resCountArray.map((countOrg) => (
        <Box
          key={countOrg}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
         <MapsHomeWork sx={{height:100,width:100,opacity:0.3,mr:1}}/>
          <Typography variant="h4">{countOrg}</Typography>
        </Box>
      ))}
  </Paper>
  <Paper elevation={3} sx={{p:3,gridColumn:4,gridRow:'1/4',width:'90%'}}>
       <Box>
       
     
            <Typography variant='h6'>Top Reserved Donors For This Month</Typography>
            {mostResDon && mostResDon.map(resDon => (
            <ul>
            <li>{resDon._id}</li>
            </ul>
            ))}
        </Box>
        <Divider sx={{mt:3,mb:3,opacity:0.7}}/>
        <Box>
            <Typography variant='h6'>Top Instant Donors For This Month</Typography>
            {mostInstDon && mostInstDon.map(instDon => (
            <ul>
            <li>{instDon._id}</li>
            </ul>
            ))}
        </Box>
        <Divider sx={{mt:3,mb:3,opacity:0.7}}/>
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
       <Paper elevation={3} sx={{p:2,gridColumn:'1/4',mt:2,mr:2,width:'96.5%'}}>
       <PieDonationType/>
       <PieChartDistrict/>
       </Paper>
       <Paper elevation={3} sx={{p:2,gridColumn:'1/4',mt:2,mr:2,width:'96.5%'}}>
       <Typography>Donation Progress</Typography>
         <AreaSummary/>
       </Paper>
      


   </Box>
   <Box>
     <Paper sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'100%'}}>
        <Box>
            
            <Organizations/>
        </Box>
       </Paper>
   </Box>

   <Box>
     <Paper sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'100%'}}>
        <Box>
            
            <ReservedDonors/>
        </Box>
       </Paper>
   </Box>

   <Box>
     <Paper sx={{p:2,gridColumn:'1/3',mt:2,mr:2,width:'100%'}}>
        <Box>
            
            <InstantDonors/>
        </Box>
       </Paper>
   </Box>
</div>
   </>
  )
}

export default Main

