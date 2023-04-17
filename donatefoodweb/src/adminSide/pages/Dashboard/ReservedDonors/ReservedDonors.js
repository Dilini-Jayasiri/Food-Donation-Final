import { useEffect,useState } from "react";
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors';
import DonorActions from './ResDonActions';


const ReservedDonors = ({setSelectedLink,link}) => {
    const [donors,setDonors] = useState([]);
    const [rowId,setRowId] = useState();
    useEffect(() => {
      const fetchInstDonors = async () => {
        const response = await fetch('/reservedDon');
        const json = await response.json()
  
        if (response.ok) {
          setDonors(json)
        }
      }
      fetchInstDonors()
    }, [])
    const [pageSize,setPageSize] = useState(5);
    const columns = useMemo( () => [
        {field:'donorName',headerName:'Donor Name',width:200,headAlign:'center',headerClassName: 'super-app-theme--header',editable:true},
        {field:'donEmail',headerName:'Donor Email',width:240,editable:true},
        {field:'address',headerName:'Address',sort:true,width:200,editable:true},
        {field:'phone',
        headerName:'Contact Number',
        width:170,
        editable:true,
        sortable:false,
        filterable:false
    },
        {field:'mealType',headerName:'Meal Type',width:100,
        type:'singleSelect',
        valueOptions:['breakfast','lunch','dinner'],
      editable:true},
        {field:'quantity',headerName:'Needed Food Parcels',sort:true,width:100,editable:true},
        {field:'foodType',headerName:'Food Type',width:100,editable:true},
       
        // {field:'_id',headerName:'ID',width:200},
        {field:'action',headerName:'Action',
        type:'actions',
        renderCell:(params) => (<DonorActions {...{params,rowId,setRowId}}/>),width:150},
    ], [rowId]);
    return(
       <Box
         sx={{
            height:540,
            width:'100%'
         }}
         >
            <Typography
              variant="h4"
              component='h4'
              sx={{textAlign:'center',mt:3,mb:3}}>
                Manage Reserved Donations
              </Typography>
              <DataGrid
                columns={columns}
                rows={donors}
               
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
    )
};

export default ReservedDonors;

// import React, { useEffect } from 'react'

// const ReservedDonors = (setSelectedLink,link) => {
//   useEffect(() => {
//     setSelectedLink(link)
//   },[])
//   return (
//     <div>ReservedDonors</div>
//   )
// }

// export default ReservedDonors