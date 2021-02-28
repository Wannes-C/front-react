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
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import '../styles.css'

//import ontology-classes for classification
import MWVDTimberclasses from './ClassesOntologies/TimberMWVD'
import MWVDNaturalStoneclasses from './ClassesOntologies/NaturalStoneMWVD'
import MWVDPaperclasses from './ClassesOntologies/PaperMWVD'
import MWVDTextileclasses from './ClassesOntologies/TextileMWVD'
import CDOclasses from './ClassesOntologies/ConcreteCDO'
// import IMPORT_MY_ONTOLOGY_ARRAY from './ClassesOntologies/MY_ONTOLOGY'
    // add at optionClassification() (1x) and defineClassificationOptions() (2x)



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
  const [damageOrPattern, setDamageOrPattern] = React.useState("Search damage");

  const [checkCurrentlyOccurring, setCheckCurrentlyOccurring] = React.useState(false);
  
  const [checkLabel, setCheckLabel] = React.useState(false);
  const [label, setLabel] = React.useState('');

  const [checkClassification, setCheckClassification] = React.useState(false);
  const [classificationOptions, setClassificationOptions] = React.useState([]);
  const [classification, setClassification] = React.useState([]);

  const [checkProperties, setCheckProperties] = React.useState(false);

  const [checkTask, setCheckTask] = React.useState(false);

  const [checkDate, setCheckDate] = React.useState(false);
  const [dateOptions, setDateOptions] = React.useState('Exact');
  const [date, setDate] = React.useState('');

  const [checkObjectGuid, setCheckObjectGuid] = React.useState(false);
  const [objectGuid, setObjectGuid] = React.useState('');



  ////////////////////////////////////////////////////////////////////////////////////////open and close functions for pop-up
  const handleClickOpen = () => {
    setOpen(true);
    setDamageOrPattern('Search damage')

    setCheckCurrentlyOccurring(false)
    setCheckLabel(false)
    setCheckClassification(false)
    setClassificationOptions([])
    setClassification([])
    setCheckProperties(false)
    setCheckTask(false)
    setCheckObjectGuid(false)
    setObjectGuid('')
    setCheckDate(false)
    setDateOptions('Exact')
    setDate('')
  };

  
  const handleClose = () => {
    setOpen(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////DAMAGE OR PATTERN OPTION

    //set Radio and state after search option selection
    const setRadio = (element) => {
      document.getElementById(element).checked = true
        setDamageOrPattern(element)

        setCheckCurrentlyOccurring(false)
        setCheckLabel(false)
        setCheckClassification(false)
        setClassificationOptions([])
        setClassification([])
        setCheckProperties(false)
        setCheckTask(false)
        setCheckObjectGuid(false)
        setObjectGuid('')
        setCheckDate(false)
        setDateOptions('Exact')
        setDate('')
    };

    ////////////////////////////////////////////////////////////////////////////////////////SEARCH COMPONENT



    const searchComponent = ()=>{

      ////////////////////////////////////////////SEARCH DAMAGE
      if(damageOrPattern === "Search damage"){
        return(
          <div>



            <Typography className='interTitleBox' gutterBottom>
              <div className='interTitle' >Filter options</div>
            </Typography>

            <Typography className="searchOptions">
              <input type="checkbox" id="checkCurrentlyOccurring"  onClick={()=>toggleCurrentlyOccurring()}></input>
              <label for="checkCurrentlyOccurring">Currently occurring</label> 
            </Typography>
            <Typography gutterBottom>
              {/* dummy */}
            </Typography>

            <Typography className="searchOptions">
              <input type="checkbox" id="checkLabel"  onClick={()=>toggleLabel()}></input>
              <label for="checkLabel" > Name</label> 
            </Typography>
            <Typography gutterBottom>
              {optionLabel()}
            </Typography>

            <Typography className="searchOptions">
              <input type="checkbox" id="checkClassification"  onClick={()=>toggleClassification()}></input>
              <label for="checkClassification" > Classification</label> 
            </Typography>
            <Typography gutterBottom>
              {optionClassification()}
            </Typography>

            <Typography className="searchOptions">
              <input type="checkbox" id="checkProperties"  onClick={()=>toggleProperties()}></input>
              <label for="checkProperties" > Properties</label> 
            </Typography>
            <Typography gutterBottom>
              {optionProperties()}
            </Typography>

            <Typography className="searchOptions">
              <input type="checkbox" id="checkTask"  onClick={()=>toggleTask()}></input>
              <label for="checkTask" > Tasks</label> 
            </Typography>
            <Typography gutterBottom>
              {optionTask()}
            </Typography>

            <Typography className="searchOptions">
              <input type="checkbox" id="checkDate"  onClick={()=>toggleDate()}></input>
              <label for="checkDate"> Date of assessment</label> 
            </Typography>
            <Typography gutterBottom>
              {optionDate()}
            </Typography>

            <Typography className="searchOptions">
              <input type="checkbox" id="checkObjectGuid"  onClick={()=>toggleObjectGuid()}></input>
              <label for="checkObjectGuid"> Object GUID</label> 
            </Typography>
            <Typography gutterBottom>
              {optionObjectGuid()}
            </Typography>


            <Button autoFocus  variant="contained" size="small" color="primary" style={{left: '475px'}}>
              Search
            </Button>






            <Typography className='interTitleBox' gutterBottom>
              <div className='interTitle' >Results</div>
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




             

            {/* <Typography className='interTitleBox' gutterBottom>
              <div className='interTitle' >Assign damage topology</div>
            </Typography> */}

          </div>
        )
      }

      ////////////////////////////////////////////SEARCH PATTERN
      if(damageOrPattern === "Search pattern"){
        return(
          <div>search pattern</div>
        )
      }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FILTER OPTIONS DAMAGE
  ////////////////////////////////////////////////////////////////////////////////////////CURRENTLY OCCURRING


  const toggleCurrentlyOccurring = () => {
    if(document.getElementById("checkCurrentlyOccurring").checked===true){
      setCheckCurrentlyOccurring(true)
     }else{
       setCheckCurrentlyOccurring(false)
     }
  };


    ////////////////////////////////////////////////////////////////////////////////////////LABEL

    //toggle use of Label-filter
    const toggleLabel = () => {
      if(document.getElementById("checkLabel").checked===true){
        setCheckLabel(true)


       }else{
         setCheckLabel(false)
         setLabel('')
       }
    };



    //return input
    const optionLabel = ()=>{
      if(checkLabel === false){
        return
      }

      if(checkLabel === true){
        return(
          <Typography className ="searchOptionElab" gutterBottom>
          <TextField   id="label" label="Filter by damage name" variant="outlined" className="dropdownComponent" 
                      value={label}
                      onChange={handleLabelChange}/>
        </Typography>
        )
      }
    }


       //set input as state
    const handleLabelChange = (event) => {
      setLabel(event.target.value);
    };


      ////////////////////////////////////////////////////////////////////////////////////////CLASSIFICATION

    //toggle use of Classification-filter
    const toggleClassification = () => {
      if(document.getElementById("checkClassification").checked===true){
        setCheckClassification(true)

       }else{
         setCheckClassification(false)
         setClassificationOptions([])
         setClassification([])
       }
    };



        //return input
        const optionClassification = ()=>{
          if(checkClassification === false){
            return
          }
    
          if(checkClassification === true){
            return(
              <div>

              <Typography className="searchOptionElab">
                Select ontologies for obtaining classification options
              </Typography>
              <Typography className="searchOptionElab">
                <input type="checkbox" id="toggleCDO" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
                <label for="toggleCDO" className="checkBoxClose" >Concrete Damage (CDO)</label> 
              </Typography>
              <Typography className="searchOptionElab">
                <input type="checkbox" id="toggleMWVDTimber" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
                <label for="toggleMWVDTimber" className="checkBoxClose" >Timber damage (MVW-D)</label> 
              </Typography>
              <Typography className="searchOptionElab">
                <input type="checkbox" id="toggleMWVDNaturalStone" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
                <label for="toggleMWVDNaturalStone" className="checkBox" >Natural stone damage (MVW-D)</label> 
              </Typography>
              <Typography className="searchOptionElab">
                <input type="checkbox" id="toggleMWVDPaper" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
                <label for="toggleMWVDPaper" className="checkBox" >Paper damage (MVW-D)</label> 
              </Typography>
              <Typography className="searchOptionElab">
                <input type="checkbox" id="toggleMWVDTextile" className="checkBox" onClick={()=>defineClassificationOptions()}></input>
                <label for="toggleMWVDTextile" className="checkBox" >Textile damage (MVW-D)</label> 
              </Typography>
              {/* <Typography className="searchOptionElab">
                <input type="checkbox" id="toggle_MY_ONTOLOGY" className="checkBox" onClick={()=>defineClassificationOptions()}></input>
                <label for="toggle_MY_ONTOLOGY" className="checkBox"> MY ONTOLOGY NAME </label> 
              </Typography> */}
              
       
       
              <Typography className="searchOptionElab">
                 Select classification options from the list
              </Typography>

              <div className="searchOptionElab">
                <FormControl variant="outlined" className="dropdownComponent">

                  <Select
                    multiple
                    value={classification}
                    onChange={handleClassificationChange}
                     renderValue={(selected) => selected.join(", ")}
                  >
                  {classificationOptions.map((element) => (
                    <MenuItem key={element} value={element}>
                      <Checkbox checked={classification.indexOf(element) > -1} />
                      <ListItemText primary={element} />
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>

            </div>
            )
          }
        }



        //define dropdown option

  const defineClassificationOptions = ()=>{
    setClassification([])

  if (document.getElementById("toggleCDO").checked===true) {
    var OptionCDO = CDOclasses
  } else {
    OptionCDO = []
  }
  
  
  if (document.getElementById("toggleMWVDTimber").checked===true) {
    var OptionMWVDTimber = MWVDTimberclasses
  } else {
    OptionMWVDTimber = []
  }
  
  
  if (document.getElementById("toggleMWVDNaturalStone").checked===true) {
    var OptionMWVDNaturalSTone = MWVDNaturalStoneclasses
  } else {
    OptionMWVDNaturalSTone = []
  }
  
  
  if (document.getElementById("toggleMWVDPaper").checked===true) {
    var OptionMWVDPaper = MWVDPaperclasses
  } else {
     OptionMWVDPaper = []
  }
  
  
  if (document.getElementById("toggleMWVDTextile").checked===true) {
    var OptionMWVDTextile = MWVDTextileclasses
  } else {
    OptionMWVDTextile =[]
  }

  // if (document.getElementById("Option_MY ONTOLOGY").checked===true) {
  //   var Option_MY_ONTOLOGY = IMPORT_MY_ONTOLOGY_ARRAY
  // } else {
  //   Option_MY_ONTOLOGY =[]
  // }

  
  setClassificationOptions(OptionCDO.concat(OptionMWVDTimber).concat(OptionMWVDNaturalSTone).concat(OptionMWVDPaper).concat(OptionMWVDTextile))
  //Add '.concat(Option_MY_ONTOLOGY)
 }
 
 
 
 
 //set selected dropdown as state
 const handleClassificationChange = (event) => {
  setClassification(event.target.value);
 };


    ////////////////////////////////////////////////////////////////////////////////////////PROPERTIES

    //toggle use of Properties-filter
    const toggleProperties = () => {
      if(document.getElementById("checkProperties").checked===true){
        setCheckProperties(true)

       }else{
         setCheckProperties(false)
       }
    };



    //return input
    const optionProperties = ()=>{
      if(checkProperties === false){
        return
      }

      if(checkProperties === true){
        return(
          <Typography className ="searchOptionElab" gutterBottom>
              [Under construction]
        </Typography>
        )
      }
    }


        ////////////////////////////////////////////////////////////////////////////////////////TASKS

    //toggle use of Task-filter
    const toggleTask = () => {
      if(document.getElementById("checkTask").checked===true){
        setCheckTask(true)

       }else{
         setCheckTask(false)
       }
    };



    //return input
    const optionTask = ()=>{
      if(checkTask === false){
        return
      }

      if(checkTask === true){
        return(
          <Typography className ="searchOptionElab" gutterBottom>
              [Under construction]
        </Typography>
        )
      }
    }


    ////////////////////////////////////////////////////////////////////////////////////////DATE

    //toggle use of ObjectGuid-filter
    const toggleDate = () => {
      if(document.getElementById("checkDate").checked===true){
        setCheckDate(true)


       }else{
         setCheckDate(false)
         setDate('')
       }
    };



    //return input
    const optionDate = ()=>{
      if(checkDate === false){
        return
      }

      if(checkDate === true){
        return(
          <div>


            <Typography className ="searchOptionElab" gutterBottom>
              <form>
                <div className="radio">
                  <input id="Before" type="radio" name="optradio" onClick={()=> {setDateRadio("Before")}}></input>
                  <label for="Before"> Before</label>
                </div>
                <div className="radio">
                  <input id="Exact" type="radio" name="optradio" onClick={()=> {setDateRadio("Exact")}}></input>
                  <label for="Exact"> Exact </label>
                </div>
                <div className="radio">
                  <input id="After" type="radio" name="optradio" onClick={()=> {setDateRadio("After")}}></input>
                  <label for="After"> After </label>
                </div>
              </form>
            </Typography>



            <Typography className ="searchOptionElab" gutterBottom>
              <TextField  id="date" variant="outlined" 
                          type="date"     
                          value={date}
                         onChange={handleDateChange}
              />
            </Typography>

          </div>
        )
      }
    }



    //set Radio and state after search option selection
    const setDateRadio = (element) => {
      document.getElementById(element).checked = true
        setDateOptions(element)
    };



       //set date input as state
       const handleDateChange = (event) => {
        setDate(event.target.value)
      };



    ////////////////////////////////////////////////////////////////////////////////////////OBJECT GUID

    //toggle use of ObjectGuid-filter
    const toggleObjectGuid = () => {
      if(document.getElementById("checkObjectGuid").checked===true){
        setCheckObjectGuid(true)


       }else{
         setCheckObjectGuid(false)
         setObjectGuid('')
       }
    };



    //return input
    const optionObjectGuid = ()=>{
      if(checkObjectGuid === false){
        return
      }

      if(checkObjectGuid === true){
        return(
          <Typography className ="searchOptionElab" gutterBottom>
          <TextField   id="objectGuid" label="Filter by object GUID" variant="outlined" className="dropdownComponent" 
                      value={objectGuid}
                      onChange={handleObjectGuidChange}/>
        </Typography>
        )
      }
    }


       //set input as state
    const handleObjectGuidChange = (event) => {
      setObjectGuid(event.target.value);
    };





 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RETURN
  return (
    <div>

      <Button variant="contained" size="small" color="primary" 
                        style={{marginLeft: "30%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={handleClickOpen}
                  >Search</Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {damageOrPattern}
        </DialogTitle>
        <DialogContent dividers style={{width: "600px"}}>
          



          {/* <Typography className ="domain" gutterBottom>
            <form>
              <div className="radio">
                <input id="Search damage" type="radio" name="optradio" onClick={()=> {setRadio("Search damage")}}></input>
                  <label for="Search damage"> Search damage</label>
              </div>
              <div className="radio">
                <input id="Search pattern" type="radio" name="optradio" onClick={()=> {setRadio("Search pattern")}}></input>
                  <label for="Search pattern"> Search damage pattern </label>
              </div>
             </form>
          </Typography> */}


          <Typography gutterBottom>
            {searchComponent()}
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
