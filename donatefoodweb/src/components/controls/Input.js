import { TextField } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import "../../assets/partials/home.scss"


const useStyles = makeStyles({
  inputLabel: {
    color: 'red', // change the color to any desired value
  },
});


export default function Input(props) {
  const classes = useStyles();
    const{name,label,value,error=null,onChange,style, ...other} = props;
  return (
    <TextField
    
    style ={{width: '100%',color:'white'}}
    className={classes.inputLabel}
    
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
