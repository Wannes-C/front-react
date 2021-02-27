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
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  const [openAlert, setOpenAlert] = React.useState(false);
  const { context, setContext } = useContext(AppContext);
  const [objectGuid, setObjectGuid] = React.useState('');
  const [stateSelection, setStateSelection] = React.useState('');



    ////////////////////////////////////////////////////////////////////////////////////////open and close functions for pop-up
  //open and close functions for pop-up
  const handleClickOpen = () => {
    if (context.selection[0] !== undefined) {
      setOpen(true);
      setObjectGuid(context.selection[0].guid);

      setStateSelection('')


    } else{
      setOpenAlert(true);
    }
  };




  const handleClose = () => {
    setOpen(false);
  };


    //open/close alert
    const handleCloseAlert = () => {
      setOpenAlert(false);
    };

//////////////////////////////////////////////////////////////////////////////////////DAMAGE HISTORY


//set selected dropdown as state
const handleStateSelection = (event) => {
  setStateSelection(event.target.value);
};

//////////////////////////////////////////////////////////////////////////////////////DAMAGES


const optionDamages = ()=>{
  if(stateSelection !== ''){
    return(
      <div>
       
       <Typography className="domain" gutterBottom>
          Day of creation: ## / ## / ####
        </Typography>
        <Typography className="domain" gutterBottom>
          Occuring damages: #
        </Typography>

       
       
       
       
       
       
       
       
        <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Occuring damages</div>
        </Typography>


        <Typography  className='domain'>
            <input type="checkbox" id="damage1" className="checkBox"></input>
            <label for="damage1" className="checkBox" >damage1</label> 
        </Typography>
        <Typography className='domain'>
            <input type="checkbox" id="damage2" className="checkBox"></input>
            <label for="damage2" className="checkBox" >damage2</label> 
        </Typography>
        <Typography className='domain'>
            <input type="checkbox" id="damage3" className="checkBox"></input>
            <label for="damage3" className="checkBox" >damage3</label> 
        </Typography>
        <Typography className='domain'>
            <input type="checkbox" id="damage4" className="checkBox"></input>
            <label for="damage4" className="checkBox" >damage4</label> 
        </Typography>



      </div>
    )
  } else{
      return
    }
}


 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RETURN
  return (
    <div>

      <Button variant="contained" size="small" color="primary" 
        style={{marginLeft: "30%", marginBottom: 10, marginTop: 10, width: 160}}
        onClick={handleClickOpen}
      >Overview</Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Damage overview for selected object
        </DialogTitle>
        <DialogContent dividers style={{width: "600px"}}>


        <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Damage history</div>
          </Typography>

        <div className="dropdown" style={{paddingTop: '25px'}}>
          <FormControl variant="outlined" className="dropdownComponent">
            <Select
              native
              value={stateSelection}
              onChange={handleStateSelection}
            >
              <option value="">No state selected</option>
              <option value="Damage state 1">Damage state 1 - 06/02/2020 - 1 damage(s)</option>
              <option value="Damage state 2">Damage state 2 - 24/08/2020 - 5 damage(s)</option>
              <option value="Damage state 3">Damage state 3 - 15/10/2020 - 2 damage(s)</option>
            </Select>
          </FormControl>
        </div>
          



        <Typography gutterBottom>
          {optionDamages()}
        </Typography>



        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClose} size="small" color="primary">
          Cancel
        </Button>
        <Button autoFocus onClick={handleClose} variant="contained" size="small" color="primary">
          exit
        </Button>
        </DialogActions>
      </Dialog>







      <div>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select an object first
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>





    </div>
  );
}
