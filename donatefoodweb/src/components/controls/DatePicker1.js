import React from 'react'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import  AdapterDateFns  from '@material-ui/lab/AdapterDateFns';
import {DatePicker} from '@material-ui/lab'
import { TextField } from '@mui/material';

//import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function DatePicker1(props) {

const {name, label, value, onChange,error=null,...other} = props;

const convertToDefEventPara = (name,value) => ({
    target: {
        name,value
    }
})

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
     style ={{width: '100%'}}
      //disbleToolbar  
      varient="inline"
      inputVariant="outlined" 
       label={label}
       format="MM/dd/yyyy"
       name={name}
       value={value}
       onChange={date => onChange(convertToDefEventPara(name,date))}
       
       renderInput={(props) => <TextField 
        varient="inline"
      inputVariant="outlined" 
        {...other}
       {...(error && {error:true,helperText:error})}
         {...props} helperText={null} />}
       />
  </LocalizationProvider>
   
       

  
  )
}
