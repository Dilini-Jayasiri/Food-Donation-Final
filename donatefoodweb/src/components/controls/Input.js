import { TextField } from '@mui/material';
import React from 'react'

export default function Input(props) {
    const{name,label,value,error=null,onChange, ...other} = props;
  return (
    <TextField
    
    style ={{width: '100%'}}
                variant="outlined"
                label={label}
                name={name}
                 value={value}
                 onChange={onChange}
                 {...other}
                 {...(error && {error:true,helperText:error})}
                 
               />
  )
}
