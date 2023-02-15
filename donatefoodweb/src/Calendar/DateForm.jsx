import { useEffect,useState } from "react";
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors';
import Button from '@mui/material/Button';
import { json, useNavigate } from "react-router";
import { useDonationContext } from "../components/hoooks/useDonationContext"
import {useAuthContext} from '../components/hoooks/useAuthContext'
import Nav from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const DateForm = () => {
 const {donations,dispatch} = useDonationContext()
 const [tableData,setTableData] = useState([])
  const {user} = useAuthContext()
    const [orgs,setOrgs] = useState([]);
    const [rowId,setRowId] = useState();
    // useEffect(() => {
    //   const fetchOrgs = async () => {
    //     const response = await fetch('/api/requests/');
    //     const json = await response.json()
  
    //     if (response.ok) {
    //         setOrgs(json)
    //     }
    //   }
    //   fetchOrgs()
    // }, [])

    useEffect(() => {
      const fetchDonations = async () => {
        const response = await fetch('/getAllIns',{
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        .then((data)=> data.json())
        .then((data) => setTableData(data))
        const json = await response.json()
       

        if(response.ok){
            dispatch({type: 'SET_DONATIONS', payload : json})
            console.log("fvgbhnjmk")
        }
      }
      if(user){
        fetchDonations()
        console.log()
      }
      
    },[dispatch,user])
    
    const navigate = useNavigate();
          const handleButtonClick = () => {
             navigate('/calForDon')
      }
    const [pageSize,setPageSize] = useState(5);
    const columns = useMemo( () => [
        {field:'orgName',headerName:'Organization Name',width:200,headAlign:'center',headerClassName: 'super-app-theme--header',editable:true},
       
        {field:'area',headerName:'City',sort:true,width:200,editable:true},
        {field:'phone',
        headerName:'Contact Number',
        width:170,
        editable:true,
        sortable:false,
        filterable:false
    },
       
    // {field:'date',headerName:'Date',sort:true,width:200,editable:true},
        {field:'calendar',headerName:'View Calendar',
        type:'actions',renderCell: ({}) => (<Button variant="contained" color="success" onClick={handleButtonClick}>Calendar</Button>),width:150},

    ], [rowId]);
    
   
      
  
    return(
      <>
      <Nav/>
       <Box
         sx={{
            height:540,
            width:'100%'
         }}
         >
            <Typography
              variant="h4"
              component='h3'
              sx={{textAlign:'center',mt:3,mb:3}}>
                 <h3>Instant Donation Table</h3>
              </Typography>
              <DataGrid
                columns={columns}
                rows={tableData}
               
                getRowId={row=>row._id}
                rowsPerPageOptions={[5,10,20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={params=>({
             top:params.isFirstVisible ? 0 : 10,
             bottom: params.isLastVisible ? 0 : 10
        })}
        sx = {{
          height:450,
          marginBottom: '10%',
          margin:4,
          [`& .${gridClasses.row}`]:{
              bgcolor:theme=>theme.palette.mode === 'light' ? grey[200] : grey[900],
              
              boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
      }
          
      }}
      onCellEditCommit={params=>setRowId(params.id)}/>

            </Box>
      {/* // <div className='home'>
      // <h2>Donation History</h2>
      // <div className="donations">
      //     {donations && donations.map((donation)=>( */}
      {/* //        <OrganizationDetails key={donation._id} donation={donation}/>
               
            
      //     ))}
      // </div> */}
  {/* // </div> */}
  <Footer/>
  </>
    )
};

export default DateForm;