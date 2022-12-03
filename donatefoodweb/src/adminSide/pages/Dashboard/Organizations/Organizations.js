import { useEffect,useState } from "react";
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors';
import OrgActions from './orgActions';


const Organizations = ({setSelectedLink,link}) => {
    const [orgs,setOrgs] = useState([]);
    const [rowId,setRowId] = useState();
    useEffect(() => {
      const fetchOrgs = async () => {
        const response = await fetch('/requests');
        const json = await response.json()
  
        if (response.ok) {
            setOrgs(json)
        }
      }
      fetchOrgs()
    }, [])
    const [pageSize,setPageSize] = useState(5);
    const columns = useMemo( () => [
        {field:'orgName',headerName:'Organization Name',width:150,headAlign:'center',headerClassName: 'super-app-theme--header',editable:true},
        {field:'orgType',headerName:'Organization Type',width:150,editable:true},
        {field:'city',headerName:'City',sort:true,width:200,editable:true},
        {field:'phone',
        headerName:'Contact Number',
        width:170,
        editable:true,
        sortable:false,
        filterable:false
    },
        {field:'orgEmail',headerName:'Organization Email',width:100,
        type:'singleSelect',
        valueOptions:['breakfast','lunch','dinner'],
      editable:true},
        {field:'quantity',headerName:'Needed Food Parcels',sort:true,width:100,editable:true},
        {field:'active',headerName:'Active',width:100,editable:true,editable:true},
        {field:'_id',headerName:'ID',width:200},
        {field:'action',headerName:'Action',
        type:'actions',
        renderCell:(params) => (<OrgActions {...{params,rowId,setRowId}}/>),width:150},
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
              component='h3'
              sx={{textAlign:'center',mt:3,mb:3}}>
                Manage Needed Organization
              </Typography>
              <DataGrid
                columns={columns}
                rows={orgs}
               
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

export default Organizations;