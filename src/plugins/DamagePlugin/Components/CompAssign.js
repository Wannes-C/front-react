import React from 'react';
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
  //states
  ////const[state-element, function to change state] = React.useState(defailt value)
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('');

  //open and close functions for pop-up
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setType('damageType');
  };

  //set Radio and state after type selection
  const setRadio = (damageType) => {
    document.getElementById(damageType).checked = true
      setType(damageType)
  };


  // const testing =()=>{
  //   console.log(type)
  // }


  //Change options depending on choice
  const changeDialog = ()=>{
    if(type === 'damageGeneral'){
      return(
        <p></p>
      )
    }

    if(type === 'damageArea'){
      return(
        <div>
          <Typography className='interTitleBox' gutterBottom>
           
            <div className='interTitle' >Damage topology</div>

          </Typography>

          <p>assign damage elements</p>
          <p>assign damage pattern</p>
        </div>
      )
    }

    if(type === 'damageElement'){
      return(
        <div>
          <Typography className='interTitleBox' gutterBottom>
           
            <div className='interTitle' >Damage topology</div>

          </Typography>
       
          <p>assign adjacent element</p>
          <p>assign to damage pattern</p>
        </div>
      )
    }
 }

  


  return (
    <div>

      <Button variant="contained" size="small" color="primary" 
                        style={{marginLeft: "30%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={handleClickOpen}
                  >Assign</Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Assign new damage
        </DialogTitle>
        <DialogContent dividers>
          
          
        <Typography className='interTitleBox' gutterBottom>
           
           <div className='interTitle' >Damage type</div>

          </Typography>
          
          
          <Typography gutterBottom>
            <form>
              <div className="radio">
                <input id="damageGeneral" type="radio" name="optradio"></input>
                  <label onClick={()=> {setRadio("damageGeneral")}}> Damage</label>
              </div>
              <div className="radio">
                <input id="damageArea" type="radio" name="optradio"></input>
                  <label onClick={()=> {setRadio("damageArea")}}> Damage area </label>
              </div>
              <div className="radio">
               <input id="damageElement" type="radio" name="optradio"></input> 
                <label onClick={()=> {setRadio("damageElement")}}> Damage element </label>
              </div>
             </form>
          </Typography>





          <Typography gutterBottom>
            {changeDialog()}
            {/* {testing()} */}
          </Typography>


          <Typography className='interTitleBox' gutterBottom>
           
            <div style={{marginLeft: "10px"}} > Damage label</div>

          </Typography>

          
          
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
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
