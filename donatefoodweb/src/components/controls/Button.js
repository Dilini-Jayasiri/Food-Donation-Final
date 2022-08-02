import React from 'react'
import {Button as MuiButton} from '@mui/material';
import { makeStyles} from '@material-ui/styles';


const useStyles = makeStyles({
    root : {
        marginRight:'5px'
    },
    label : {
        textTransform:'none'
    }
})
export default function Button(props) {

    const {text,size,color,variant,onClick,type, ...other} = props;
    const classes = useStyles();

  return (
    <MuiButton
    variant={variant || "contained"}
     size={size || "large"}
     color={color || "primary"}
     onClick={onClick}
     {...other}
     //type={"submit"}
     classes={{root: classes.root,label: classes.label}}>
         {text}
         

    </MuiButton>
  )
}
