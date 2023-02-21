import { React, useEffect, useState } from "react";
import { Box, Input, InputAdornment, Paper, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, getGridNumericOperators } from "@mui/x-data-grid";
import { useMemo } from 'react';
import { gridClasses } from "@material-ui/core";
import { grey } from 'material-ui-colors';
import Button from '@mui/material/Button';
import { json, useNavigate } from "react-router";
import { useDonationContext } from "../components/hoooks/useDonationContext"
import { useAuthContext } from '../components/hoooks/useAuthContext'
import Nav from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { margin, style } from "@mui/system";
import Controls from "../components/controls/Controls";
import { Search } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Popup from '../components/controls/Popup';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//import SearchBar from "material-ui-search-bar";


const CommonDonationList = () => {
  const { donations, dispatch } = useDonationContext()
  const [tableData, setTableData] = useState([])
  const { user } = useAuthContext()
  const [rowId, setRowId] = useState();
  const [popup, setPopup] = useState('close');
  const [isDisabled, setIsDisabled] = useState(false);
  const [filterVal, setFilterVal] = useState('');
  const [searchData, setsearchData] = useState([]);
  const [open, setOpen] = useState(false);
  const [status,setStatus] = useState();

 useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch('/resNewDon', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then((data) => data.json())
        .then((data) => setTableData(data))
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_DONATIONS', payload: json })

      }
    }
    if (user) {
      fetchDonations()
    }
  }, [dispatch, user])


    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
        const res = await fetch(`/api/resDonNew/${tableData[0]._id}`, {
            method :"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                status
            })
        });
  
        if(res.status === 400 || !res){
            window.alert("Invalid Credentials");
            
        }else{
           // window.alert("Login Successfull");
            console.log(tableData[0]._id)
        }
  
    } catch (error) {
        console.log(error);
    }
    
   // setStatus("Confirmed")
    //confirmation popup
    //if yes
    //update the status
    
    //disable the button and discard from tbl
  }



  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [pageSize, setPageSize] = useState(5);
  const columns = useMemo(() => [
    { field: 'donorName', headerName: 'Donor Name', width: 200, headAlign: 'center', headerClassName: 'super-app-theme--header', editable: true },
    { field: 'prefferedArea', headerName: 'Preffered Area', width: 150, editable: true },
    { field: 'address', headerName: 'Address', sort: true, width: 200, editable: true },
    {
      field: 'phone',
      headerName: 'Contact Number',
      width: 170,
      editable: true,
      sortable: false,
      filterable: false
    },
    {
      field: 'donEmail', headerName: 'Donor Email', width: 200,
      type: 'singleSelect',
      valueOptions: ['breakfast', 'lunch', 'dinner'],
      editable: true
    },
    { field: 'foodName', headerName: 'Food Name', sort: true, width: 120, editable: true },
    { field: 'mealType', headerName: 'Meal Type', sort: true, width: 120, editable: true },
    { field: 'foodType', headerName: 'Food Type', sort: true, width: 120, editable: true },
    { field: 'date', headerName: 'Date', sort: true, width: 200, editable: true },
    { field: 'quantity', headerName: 'Needed Food Parcels', sort: true, width: 200, editable: true },
    { field: '_id', headerName: 'Donation ID', sort: true, width: 200 },
    // {
    //   field: 'status', headerName: 'Accept',editComponent: (props)=>(
    //     <Input
    //       defaultValue={props.value || 'Not Accepted'}
    //       onChange={(e)=> props.onChange(e.target.value)}
    //       type="string"
    //     />
    //   ),
      // type: 'actions', renderCell: ({ }) => (<div>
      /* <Button variant="contained" 
                color="success" 
                disabled={isDisabled}
                onClick={handleClickOpen}
                style = {isDisabled ? styles.buttonDisabled : styles.button}>
                Accept
        </Button>  */
        /* <Popup>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Popup> */

      // </div>), width: 150
 // },
    { field: 'status', headerName: 'Action', width: 200, renderCell: (cellValues) => {
      return <div className=' grid grid-cols-2 gap-1'>
                {/* <Button variant="contained" sx={{ bgcolor: "green" }} onClick={""}>{cellValues.row.deliveryStatus}</Button>  */}
                {/* <Input variant="contained" color="success" value={status} */}
                 {/* // dispatch(openModel());
                  // console.log("Cell data ->",cellValues.row);
                  //dispatch(addModelData(cellValues.row));
                  //  console.log("Model data to send Model ->",applicationdata.modalData[0]) */}
                  {/* /> */}
                  
                                                <Select
                                                    name="Accept"
                                                    labelId="demo-select-medium"
                                                    id="demo-select-small"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    
                                                >
                                                    <MenuItem value={status}>
                                                        <em>Action</em>
                                                    </MenuItem>
                                                    <MenuItem value={"Accept"}>Accept</MenuItem>
                                                    {/* <MenuItem value={"Reject"}>Not Accept</MenuItem> */}
                                                   
                                                </Select>
              </div>
} }

    // {field:'_id',headerName:'ID',width:200},
  ], [rowId]);
  const notify = event => {
    <Popup fullScreen={fullScreen} />
    // toast("Confirmed Email Sent to the Donor!");

    event.currentTarget.disabled = true;
    setIsDisabled(true);
  }
  const handleFilter = (e) => {
    let target = e.target;
    // setFilterVal({
    //   fn: items => {
    //     if(e.target.value == ''){
    //       return items;
    //     }else {
    //       return items.filterVal(x=>x.donorName.includes(target.value))
    //     }
    //   }
    // })
    if (target.value == '') {
      setTableData(searchData)
    } else {
      const filterResult = searchData.filter(item => item.donorName.toLowerCase().includes(e.target.value.toLowerCase()) || item.prefferedArea.toLowerCase().includes(e.target.value.toLowerCase()))
      setTableData(filterResult)
    }
    setFilterVal(target.value)
  }

  return (
    <>
      <Nav />
      
      <Box
        sx={{
          height:700,
          width: '100%'
        }}
      >
        
        <Paper>
          <Typography
            variant="h4"
            component='h3'
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
            <h3>Pending Donation Requests</h3>
          </Typography>
          <Toolbar>
            <Controls.Input
              label="Search"
              style={{width:'90%'}}
              InputProps={{
                startAdornment: (<InputAdornment position="start">
                  <Search />
                </InputAdornment>)
              }}

              value={filterVal}
              onInput={(e) => handleFilter(e)} />
              <div >
                                            <Box my={4} mx={'42%'}>

                                                <Controls.Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    text="Submit"
                                                />
                                                </Box>
                                                </div>
          </Toolbar>
          <DataGrid
            columns={columns}
            rows={tableData}
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
              marginBottom: '20%',
              margin: 4,

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
        </Paper>
      </Box>
      <Footer />
    </>
  )
};

export default CommonDonationList;