import { useEffect, useState } from "react";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import { useDonationContext } from "../components/hoooks/useDonationContext"
import { useAuthContext } from '../components/hoooks/useAuthContext'
//import OrganizationDetails from '../../components/OrganizationDetails'

const TableNewDonor = () => {
    const { donations, dispatch } = useDonationContext()
    const [tableDataRes, setTableDataRes] = useState([])
    const [tableDataIns, setTableDataIns] = useState([])
    const [tableDataResNew, setTableDataResNew] = useState([])
    const { user } = useAuthContext()
    const [orgs, setOrgs] = useState([]);
    const [rowId, setRowId] = useState();


    useEffect(() => {
        const fetchDonations = async () => {
            const response = await fetch('/api/reservedDonations/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then((data) => data.json())
                .then((data) => setTableDataRes(data))
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
            }
        }
        if (user) {
            fetchDonations()
        }

    }, [dispatch, user])

    useEffect(() => {
        const fetchDonations = async () => {
            const response = await fetch('/api/instantDonations/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then((data1) => data1.json())
                .then((data1) => setTableDataIns(data1))
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
            }
        }
        if (user) {
            fetchDonations()
        }

    }, [dispatch, user])

    useEffect(() => {
        const fetchDonations = async () => {
            const response = await fetch('/api/resDonNew/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then((data2) => data2.json())
                .then((data2) => setTableDataResNew(data2))
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_DONATIONS', payload: json })
            }
        }
        if (user) {
            fetchDonations()
        }

    }, [dispatch, user])



    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/calForDon')
    }
    const [pageSize, setPageSize] = useState(5);
    const columns = useMemo(() => [
        { field: 'orgName', headerName: 'Organization Name', width: 200, headAlign: 'center', headerClassName: 'super-app-theme--header', editable: true },
        { field: 'date', headerName: 'Date', sort: true, width: 200, editable: true,headAlign: 'center' },
        { field: 'foodName', headerName: 'Food Name', sort: true, width: 200, editable: true ,headAlign: 'center'},
        { field: 'quantity', headerName: 'Needed Food Parcels', sort: true, width: 300, editable: true,headAlign: 'center' },
        { field: 'mealType', headerName: 'Meal Type', width: 200,headAlign: 'center'},
        { field: 'foodType', headerName: 'Food Type', width: 200,headAlign: 'center'}


    ], [rowId]);
    if(tableDataResNew.length === 0 && tableDataIns.length === 0 && tableDataRes.length ===0 ) {
        return null;
     }else if(tableDataRes.length === 0){
        alert("No Reserved Donations")
     }else if(tableDataIns.length === 0){
        alert("No Instant Donations")
     }else if(tableDataRes.length ===0){
        alert("No Donations")
     }
    
    return (
        
        <Box
            sx={{
                height: '100%',
                width: '90%'
            }}
        >      
           <Typography
                variant="h2"
                component='h2'
                sx={{ textAlign: 'center', marginTop:'5%' }}>
                <h3>Donation History</h3>
            </Typography>
            <Typography
                variant="h4"
                component='h3'
                sx={{ textAlign: 'left',marginTop:'2%',marginLeft:'5%' }}>
                <h3>My Reserved Donation Details Table</h3>
            </Typography>
            

            
            <DataGrid
               className="restable"
                columns={columns}
                rows={tableDataRes}
                getRowId={row => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                getRowSpacing={params => ({
                    top: params.isFirstVisible ? 0 : 10,
                    bottom: params.isLastVisible ? 0 : 10
                })}
                sx={{
                    height: 450,
                    "&::-webkit-scrollbar": {
                        width: 20,
                    },
                    overflow:"hidden",
                    marginBottom: '2%',
                    marginLeft:20,
                    //margin: 6,
                    [`& .${gridClasses.row}`]: {
                        bgcolor: theme => theme.palette.mode === 'light' ? grey[200] : grey[900],

                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }

                }}
                onCellEditCommit={params => setRowId(params.id)} />


 <Typography
                variant="h4"
                component='h3'
                sx={{ textAlign: 'left',marginTop:'2%',marginLeft:'5%'  }}>
                <h3>My Instant Donation Details Table</h3>
            </Typography>
<DataGrid
                columns={columns}
                rows={tableDataIns}

                getRowId={row => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                getRowSpacing={params => ({
                    top: params.isFirstVisible ? 0 : 10,
                    bottom: params.isLastVisible ? 0 : 10
                })}
                sx={{
                    height: 450,
                    marginBottom: '2%',
                    marginLeft:20,
                    //margin: 6,
                    [`& .${gridClasses.row}`]: {
                        bgcolor: theme => theme.palette.mode === 'light' ? grey[200] : grey[900],

                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }

                }}
                onCellEditCommit={params => setRowId(params.id)} />
            
 <Typography
                variant="h5"
                component='h5'
                sx={{ textAlign: 'left', marginTop:'2%',marginLeft:'5%'  }}>
                <h3>My Reserved Donation Details Without Selecting Organization</h3>
            </Typography>
<DataGrid
                columns={columns}
                rows={tableDataResNew}

                getRowId={row => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                getRowSpacing={params => ({
                    top: params.isFirstVisible ? 0 : 10,
                    bottom: params.isLastVisible ? 0 : 10
                })}
                sx={{
                    height: 450,
                    marginBottom: '5%',
                    marginLeft:20,
                    //margin: 6,
                    [`& .${gridClasses.row}`]: {
                        bgcolor: theme => theme.palette.mode === 'light' ? grey[200] : grey[900],

                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }

                }}
                onCellEditCommit={params => setRowId(params.id)} />

        </Box>

        

        // <div className='home'>
        // <h2>Donation History</h2>
        // <div className="donations">
        //     {donations && donations.map((donation)=>(
        //        <OrganizationDetails key={donation._id} donation={donation}/>


        //     ))}
        // </div>
        // </div>
    )
};

export default TableNewDonor;