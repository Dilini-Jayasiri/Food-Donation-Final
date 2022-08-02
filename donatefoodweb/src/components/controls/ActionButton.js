import { makeStyles, ThemeProvider} from '@material-ui/styles';
import { palette, spacing } from '@mui/system';
import React from 'react'
import Button from './Button';

const useStyles = makeStyles(ThemeProvider=>({
    root: {
        minWidth:0,
        margin:spacing(0.5)
    },
    secondary: {
        //backgroundColor : palette.secondary.light,
        '& .MuiButton-label': {
           // color: palette.secondary.main,
        }
    },
    primary : {
        //backgroundColor: palette.primary.light,
        '& .MuiButton-label' : {
           // color : palette.primary.main,
        }
    }
}))
export default function ActionButton(props) {

const {color,children,onClick} = props;
const classes=useStyles();
  return (
    <Button
    className={`${classes.root} ${classes[color]}`}
    onClick={onClick} >
        {children}
    </Button>
  )
}
