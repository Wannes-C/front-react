import React, { useContext, useState } from 'react';
import AppContext from "@context";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import '../styles.css'



const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other} 
                    style={{background: '	#e92063', color:'white'}}>
      <Typography variant="h6" >{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} style={{color:'white'}}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);





export default function CustomizedDialogs() {
  ///////////////////////////////////////////////////////////////////////////////////////////STATES
  ////const[state-element, function to change state] = React.useState(defailt value)
  const [open, setOpen] = React.useState(false);
  const { context, setContext } = useContext(AppContext);
  const [objectGuid, setObjectGuid] = React.useState('');
  const [damageAmount, setdamageAmount] = React.useState(0);




  ////////////////////////////////////////////////////////////////////////////////////////open and close functions for pop-up
  //open and close functions for pop-up
  const handleClickOpen = () => {
    if (context.selection[0] !== undefined) {
      //if object selected
      setOpen(true);
      setObjectGuid(context.selection[0].guid);


    } else{
      //if no object selected
      setOpen(true);
    }
  };





  const handleClose = () => {
    setOpen(false);
    setObjectGuid('');
  };

  ////////////////////////////////////////////////////////////////////////////////////////SEARCH WITHIN SELECTION

  const optionSelection = ()=>{
    if(objectGuid === ''){
      return
    } else{
        return(
          <div>

            <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Search within one selected object</div>
            </Typography>

            <Typography className="domain" gutterBottom>
            {damageAmount} currently occuring damage(s)
            </Typography>

            <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>


          </div>
        )
      }
    }



 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RETURN
  return (
    <div>

      <Button variant="contained" size="small" color="primary" 
                        style={{marginLeft: "30%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={handleClickOpen}
                  >Test</Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Search damage
        </DialogTitle>
        <DialogContent dividers>
          


          <Typography gutterBottom>
          {optionSelection()}
          </Typography>


          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Search among all object</div>
          </Typography>
          
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>








        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClose} size="small" color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleClose} variant="contained" size="small" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
