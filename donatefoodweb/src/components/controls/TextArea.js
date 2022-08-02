import React from 'react'
import { TextField } from '@mui/material';

export default function TextArea(props) {
    const{name,label,value,error=null,onChange, ...other} = props;
  return (

        <TextField
        style ={{width: '100%'}}
            variant="outlined"
            multiline
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />

    )
}
