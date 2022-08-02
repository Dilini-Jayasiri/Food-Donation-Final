import { Dialog, DialogContent, DialogTitle, Typography} from '@mui/material';
import React from 'react'
import { makeStyles} from '@material-ui/styles';
import Controls from './controls/Controls'
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles(() => ({
  dialogWrapper : {
    padding:'16px',
    position:'absolute',
    top:'40px'
    
  },
  dialogTitle:{
        paddingLeft:'0px'
  }
}))
export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup} = props;
    const classes=useStyles();

  return (
    <Dialog open={openPopup} maxWidth="md" className={{ paper :classes.dialogWrapper}}>
        <DialogTitle className={classes.dialogTitle}>
         <div style={{display:'flex'}}>
           <Typography varient="h6" component="div" style={{flexGrow:1}}>
              {title}
           </Typography>
           <Controls.ActionButton
           color="secondary"
           onClick={() => {setOpenPopup(false)}} >
             <CloseIcon/>

           </Controls.ActionButton>
         </div>
        </DialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
    </Dialog>
  )
}
