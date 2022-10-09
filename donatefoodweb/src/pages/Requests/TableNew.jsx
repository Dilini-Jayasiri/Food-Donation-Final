import React, { useEffect,useState} from 'react'
import {Box,Typography} from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { gridClasses } from '@material-ui/core';
import { grey } from 'material-ui-colors';
import '@material-ui/styles';
import { Row, Col } from 'react-bootstrap'

 const TableNew = () => {
    const [requests,setRequests] = useState([]);
    useEffect(() => {
        const fetchRequests = async () => {
          const response = await fetch('/requests');
          const json = await response.json()
    
          if (response.ok) {
            setRequests(json)
          }
        }
        fetchRequests()
      }, [])
const [pageSize,setPageSize] = useState(5);
const columns = useMemo( () => [
        {field:'orgName',headerName:'Organization Name',width:200,headAlign:'center',headerClassName: 'super-app-theme--header'},
        {field:'orgType',headerName:'Organization Type',width:200},
        {field:'city',headerName:'City',sort:true,width:150},
        {field:'phone',
        headerName:'Contact Number',
        width:170,
        
        sortable:false,
        filterable:false
    },
        {field:'orgEmail',headerName:'Organization Email',width:200},
        {field:'quantity',headerName:'Needed Food Parcels',sort:true,width:170}, 
        {field:'action',headerName:'Action',width:150}
        // {field:'_id',headerName:'Id',width:220},
        // {field:'actions',headerName:'Actions',type:'actions',renderCell:params => <RequestActions></RequestActions>},
    //     {field:'selection',
    //      headerName:'Selection',
    //      width:100,
    //      type:'singleSelect',
    //     valueOptions:['Select','Not Select'],
    // editable:true, }
    ], [])

  return (
   <Box
   
    sx = {{
        height:600,
        width:'90%',
        alignContent:'center'
    }}
    >
        {/* <Typography
        varient='h3'
        component='h3'
        sx={{textAlign:'center',mt:3,mb:3}}
         >
           Request Table</Typography> */}
            <center> 
                <Col xs={12} className='md-5 mt-4 mb-4 align-middle'>
                    <h2>Request List</h2>
                </Col>
                </center>
           <div style={{ display: 'flex', height: '100%', marginBottom:'30%'}}>
  <div style={{ flexGrow: 1 }}>
    
        <DataGrid
        
        columns={columns}
        rows={requests}
        getRowId={(row)=>row._id}
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
            marginLeft:'10%',
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
        />
        
        
        </div>
        </div>
        
    </Box>
  )
};

export default TableNew;
