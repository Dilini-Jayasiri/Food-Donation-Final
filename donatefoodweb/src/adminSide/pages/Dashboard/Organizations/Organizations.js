// import { useEffect,useState } from "react";
// import {Box} from '@mui/material';
// import Typography from '@mui/material/Typography';
// import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
// import { useMemo } from 'react';
// import { gridClasses } from "@material-ui/core";
// import { grey } from 'material-ui-colors';
// import OrgActions from './orgActions';


// const Organizations = ({setSelectedLink,link}) => {
//     const [orgs,setOrgs] = useState([]);
//     const [rowId,setRowId] = useState();
//     useEffect(() => {
//       const fetchOrgs = async () => {
//         const response = await fetch('/requests/all');
//         const json = await response.json()
  
//         if (response.ok) {
//             setOrgs(json)
//         }
//       }
//       fetchOrgs()
//     }, [])
//     const [pageSize,setPageSize] = useState(5);
//     const columns = useMemo( () => [
//         {field:'orgName',headerName:'Organization Name',width:150,headAlign:'center',headerClassName: 'super-app-theme--header',editable:true},
//         {field:'orgType',headerName:'Organization Type',width:150,editable:true},
//         {field:'city',headerName:'City',sort:true,width:200,editable:true},
//         {field:'phone',
//         headerName:'Contact Number',
//         width:170,
//         editable:true,
//         sortable:false,
//         filterable:false
//     },
//         {field:'orgEmail',headerName:'Organization Email',width:100,
//         type:'singleSelect',
//         valueOptions:['breakfast','lunch','dinner'],
//       editable:true},
//         {field:'quantity',headerName:'Needed Food Parcels',sort:true,width:100,editable:true},
//         {field:'active',headerName:'Active',width:100,editable:true,editable:true},
//         {field:'_id',headerName:'ID',width:200},
//         {field:'action',headerName:'Action',
//         type:'actions',
//         renderCell:(params) => (<OrgActions {...{params,rowId,setRowId}}/>),width:150},
//     ], [rowId]);
//     return(
//        <Box
//          sx={{
//             height:540,
//             width:'100%'
//          }}
//          >
//             <Typography
//               variant="h3"
//               component='h3'
//               sx={{textAlign:'center',mt:3,mb:3}}>
//                 Manage Needed Organization
//               </Typography>
//               <DataGrid
//                 columns={columns}
//                 rows={orgs}
               
//                 getRowId={row=>row._id}
//                 rowsPerPageOptions={[5,10,20]}
//         pageSize={pageSize}
//         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//         getRowSpacing={params=>({
//              top:params.isFirstVisible ? 0 : 10,
//              bottom: params.isLastVisible ? 0 : 10
//         })}
//         sx = {{
//           height:450,
//           marginBottom: '10%',
//           margin:4,
//           [`& .${gridClasses.row}`]:{
//               bgcolor:theme=>theme.palette.mode === 'light' ? grey[200] : grey[900],
              
//               boxShadow: 2,
//           border: 2,
//           borderColor: 'primary.light',
//           '& .MuiDataGrid-cell:hover': {
//             color: 'primary.main',
//           },
//       }
          
//       }}
//       onCellEditCommit={params=>setRowId(params.id)}/>

//             </Box>
//     )
// };

// export default Organizations;

// // import React,{useEffect} from 'react'

// // const Organization = (setSelectedLink,link) => {
// //   useEffect(() => {
// //     setSelectedLink(link)
// //   },[])
// //   return (
// //     <div>org</div>
// //   )
// // }

// // export default Organization

import { useEffect,useState } from "react";
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import { useDonationContext } from "../../../../components/hoooks/useDonationContext"
import {useAuthContext} from '../../../../components/hoooks/useAuthContext'
import OrganizationDetails from '../../../../components/OrganizationDetails'


const Organization = () => {
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
      }
      
    },[dispatch,user])
    
    const navigate = useNavigate();
          const handleButtonClick = () => {
             navigate('/calForDon')
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
        {field:'calendar',headerName:'View Calendar',
        type:'actions',renderCell: ({}) => (<Button variant="contained" color="success" onClick={handleButtonClick}>Calendar</Button>),width:150},

    ], [rowId]);
    
   
      
  
    return(
      <>
     
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
                 <h3>Organization Details Table</h3>
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
  
  </>
    )
};

export default Organization;