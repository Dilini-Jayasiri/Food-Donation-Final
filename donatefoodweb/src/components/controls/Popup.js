import * as React from 'react';
//import Button from '@mui/material/Button';
//import Button from './Button';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Popup() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
    toast("Confirmed Email Sent to the Donor!");
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Button variant="contained" 
                color="success" 
                //disabled={isDisabled}
                onClick={handleClickOpen}
                //style = {isDisabled ? styles.buttonDisabled : styles.button}
                >
                    
                Accept
        </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are You Sure You Want To Receive This Food Donation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will send to the relevent donor and you have to contact them for more details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Confirm
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cansel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}