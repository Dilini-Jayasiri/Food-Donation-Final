import { useEffect,useState } from "react";
import { useHistory } from 'react-router-dom';
import {Box, InputAdornment, Paper, Toolbar} from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors';
import RequestActions from './RequestActions';
import Button from '@mui/material/Button';
import { json, useNavigate } from "react-router";
import { useDonationContext } from "../../components/hoooks/useDonationContext"
import {useAuthContext} from '../../components/hoooks/useAuthContext'
import OrganizationDetails from '../../components/OrganizationDetails'
import Nav from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import PopUp from "./PopUp";
import Controls from "../../components/controls/Controls";
import { Search } from "@mui/icons-material";


const TableNewDonor = () => {
 const {donations,dispatch} = useDonationContext()
 const [tableData,setTableData] = useState([])
  const {user} = useAuthContext()
    const [orgs,setOrgs] = useState([]);
    const [rowId,setRowId] = useState();
    const [filterVal,setFilterVal] = useState('');
    const [searchData,setsearchData] = useState([]);
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
        const response = await fetch('/requests/all',{
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
             navigate('/dataCards')
      }
    const [pageSize,setPageSize] = useState(5);
    const columns = useMemo( () => [
        {field:'orgName',headerName:'Organization Name',width:200,headAlign:'center',headerClassName: 'super-app-theme--header',editable:true},
        {field:'orgType',headerName:'Organization Type',width:150,editable:true},
        {field:'city',headerName:'City',sort:true,width:200,editable:true},
        {field:'phone',
        headerName:'Contact Number',
        width:170,
        editable:true,
        sortable:false,
        filterable:false
    },
        {field:'orgEmail',headerName:'Organization Email',width:200,
        type:'singleSelect',
        valueOptions:['breakfast','lunch','dinner'],
      editable:true},
        {field:'quantity',headerName:'Needed Food Parcels',sort:true,width:200,editable:true},
        // {field:'_id',headerName:'ID',width:200},
        {
          field: "calendar",
          headerName: "View Calendar",
          type: "actions",
          renderCell: (params) => (
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                navigate(`/donationShedule/${params.row.orgEmail}`)
              }
            >
              Donation Schedule
            </Button>
          ),
          width: 200,
        },
      ], []);
    
   
    const handleFilter = (e) => {
      let target = e.target;

      if(target.value == ''){
        setTableData(searchData)
      }else {
       const filterResult = searchData.filter(item => item.orgName.toLowerCase().includes(e.target.value.toLowerCase()))
      setTableData(filterResult)
      }
      setFilterVal(target.value)
    }   
  
    return(
      <>
      <Nav/>
       <Box
         sx={{
            height:600,
            width:'100%'
         }}
         >
            <Typography
              variant="h4"
              component='h3'
              sx={{textAlign:'center',mt:3,mb:3}}>
                 <h3>Organization Details Table</h3>
              </Typography>
              <Toolbar>
              <Controls.Input
                 label="Search"
                 
                 InputProps={{
                    startAdornment:(<InputAdornment position="start">
                      <Search/>
                    </InputAdornment>)
                  }}
                 
                       
                /> 
               </Toolbar>     
             
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
  <Footer/>
  </>
    )
};

export default TableNewDonor;