import { useEffect,useState } from "react";
import {Box, Paper} from '@mui/material';
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
//import SearchBar from "material-ui-search-bar";


const CommonDonationList = () => {
const {donations,dispatch} = useDonationContext()
const [tableData,setTableData] = useState([])
const {user} = useAuthContext()
const [rowId,setRowId] = useState();
const [popup,setPopup] = useState('close');

    const open = () => {
      switch(popup){
        case "close":
          setPopup("open");
          return;
        case "open":
          setPopup("close");
        default:
          setPopup("close");
          return;
      }
    }

    useEffect(() => {
      const fetchDonations = async () => {
        const response = await fetch('/resNewDon',{
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        .then((data)=> data.json())
        .then((data) => setTableData(data))
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_DONATIONS', payload : json})
            
        }
      }
      if(user){
        fetchDonations()
        console.log(json)
      }
    },[dispatch,user])
    
const navigate = useNavigate();
          const handleButtonClick = () => {
             navigate('/calForDon')
      }
const [pageSize,setPageSize] = useState(5);
const columns = useMemo( () => [
        {field:'donorName',headerName:'Donor Name',width:200,headAlign:'center',headerClassName: 'super-app-theme--header',editable:true},
        {field:'prefferedArea',headerName:'Preffered Area',width:150,editable:true},
        {field:'address',headerName:'Address',sort:true,width:200,editable:true},
        {field:'phone',
        headerName:'Contact Number',
        width:170,
        editable:true,
        sortable:false,
        filterable:false
    },
        {field:'donEmail',headerName:'Donor Email',width:200,
        type:'singleSelect',
        valueOptions:['breakfast','lunch','dinner'],
      editable:true},
      {field:'foodName',headerName:'Food Name',sort:true,width:120,editable:true},
      {field:'mealType',headerName:'Meal Type',sort:true,width:120,editable:true},
      {field:'foodType',headerName:'Food Type',sort:true,width:120,editable:true},
      {field:'date',headerName:'Date',sort:true,width:200,editable:true},
      {field:'quantity',headerName:'Needed Food Parcels',sort:true,width:200,editable:true},
      {field:'staus',headerName:'Accept',
      type:'actions',renderCell: ({}) => (<Button variant="contained" color="success" onClick={handleButtonClick}>Accept</Button>),width:150}
// {field:'_id',headerName:'ID',width:200},
    ], [rowId]); 
    return(
      <>
      <Nav/>
       <Box
         sx={{
            height:600,
            width:'100%'
         }}
         >
            <Paper>
                {/* <SearchBar
                   value={searched}
                   onChange={(serachVal) => requestSearch(searchVal)}
                   onCancelSearch={() => canselSearch()}
                /> */}
          <Typography
              variant="h4"
              component='h3'
              sx={{textAlign:'center',mt:3,mb:3}}>
                 <h3>Pending Donation Requests</h3>
            </Typography>            
              {/* <Box marginLeft={170}>  <Button variant="contained" color="success" onClick={(e) => open(true)}>Sheduler</Button></Box> */}
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
      </Paper>
        </Box>
  <Footer/>
  </>
    )
};

export default CommonDonationList;