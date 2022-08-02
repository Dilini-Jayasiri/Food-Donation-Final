import React, {useState} from 'react'
import { Paper,TableBody,TableCell,TableRow } from '@material-ui/core';
import { makeStyles} from '@material-ui/styles';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { Box,Grid, InputAdornment, Toolbar } from '@mui/material';
import UseTable from "../components/UseTable";
import Controls from '../components/controls/Controls';
import * as OrgType from "../organizations/orgType";
import {Search} from "@mui/icons-material"
//import getAllRequests from '../pages/Requests/Requests'

const theme = createTheme({
   pageContent:{
    spacing:1
   }
});

theme.spacing(5);

const useStyles = makeStyles((theme) => ({
  searchInput:{
    width:'100%'
  },
  newButton : {
    position:'absolute',
    left:'10%'
  }
}
))

const headCells = [
  {id:'orgName',label:'Organization Name'},
  {id:'orgType',label:'Organization Type'},
  {id:'city',label:'City'},
  {id:'phone',label:'Contact Number'},
  {id:'orgEmail',label:'Email'},
  {id:'quantity',label:'Needed Food Parcels',disableSorting:true},
]



export default function OrgList() {
  const classes = useStyles();
const [records,setRecords] = useState(OrgType.getAllRequests());
  const [filterFn,setFilterFn] = useState({fn:items => {return items; } });
  const [openPopup,setOpenPopup] = useState(false);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaginAndSorting

  }=UseTable(records,headCells,filterFn); 

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if(target.value == "")
           return items;
        else 
            return items.filter(x => x.orgName.toLowerCase().includes(target.value))
      }
    })
  }

  const addOrEdit = (request,resetForm) => {
    OrgType.insertRequests(request)
    resetForm()
    setOpenPopup(false);
    setRecords(OrgType.getAllRequests())
  }

  return (
    <>
      <Box mx={4} mt={4}>
        <h1>Requests</h1>
      </Box>

      <Box ml={10} marginRight={5} my={4} pt={3}>
       
        <Paper className={classes.pageContent} >
          <ThemeProvider theme={theme}>
            <Box>
              <Grid>
               <Box ml={10} marginRight={5} pt={3}> 
           
            </Box> 
            </Grid>
            </Box>

            <Toolbar>
                <Controls.Input
                 label="Search Request"
                 className={classes.searchInput}
                 InputProps = {{
                   startAdornment : (<InputAdornment position='start'>
                     <Search/>
                   </InputAdornment>)
                   
                 }} 
                 onChange={handleSearch}
                 />
                  </Toolbar>
            <TblContainer>
              <TblHead className="tableHead"/>
                 <TableBody>
                   {
                     recordsAfterPaginAndSorting().map(item => 
                      (<TableRow key={item.id}>
                        <TableCell>{item.orgName}</TableCell>
                        <TableCell>{item.orgType}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.orgEmail}</TableCell>
                        <TableCell>{item.quantity}</TableCell>

                      </TableRow>))
                   }
                 </TableBody>

            </TblContainer>
            <TblPagination/>
          </ThemeProvider>

        </Paper>
        </Box>
    </>
  )
}
