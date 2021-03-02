import React, { useContext, useState, useEffect } from 'react';
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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import '../styles.css'

import {queryMultiple, queryGraphSelect, updateGraph, getGraph} from 'lbd-server'

//import ontology-classes for classification
import MWVDTimberclasses from './ClassesOntologies/TimberMWVD'
import MWVDNaturalStoneclasses from './ClassesOntologies/NaturalStoneMWVD'
import MWVDPaperclasses from './ClassesOntologies/PaperMWVD'
import MWVDTextileclasses from './ClassesOntologies/TextileMWVD'
import CDOclasses from './ClassesOntologies/ConcreteCDO'
// import CLASS_ONTOLOGY_IMPORT from './ClassesOntologies/CLASS_ONTOLOGY'
    //->search for 'CLASS_ONTOLOGY'

import FungiMWV from './TasksOntologies/FungiMWV'
import InsectMWV from './TasksOntologies/InsectMWV'
import PreventionMWV from './TasksOntologies/PreventionMWV'
import TimberMWV from './TasksOntologies/TimberMWV'
// import TASK_ONTOLOGY_IMPORT from './TasksOntologies/TASK_ONTOLOGY'
    //->search for 'TASK_ONTOLOGY'


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

  const [type, setType] = React.useState('');
  const [defectStructuralSwitch, setDefectStructuralSwitch] = React.useState({checkedA: false});
  const [defectStructural, setDefectStructural] = React.useState('Defect');
  const [classification, setClassification] = React.useState('');
  const [classificationOptions, setClassificationOptions] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const [label, setLabel] = React.useState('');
  const [date, setDate] = React.useState('');
  const [objectGuid, setObjectGuid] = React.useState('');
  const [checkClassification, setCheckClassification] = React.useState(false);

  const [orderTask, setOrderTask] = React.useState(false);
  const [ontologyTask, setOntologyTask] = React.useState([]);
  const [ontologyTaskOptions, setOntologyTaskOptions] = React.useState([]);
  const [checkOntologyTask, setCheckOntologyTask] = React.useState(false);
  const [checkCommentTask, setCheckCommentTask] = React.useState(false);
  const [commentTask, setCommentTask] = React.useState('');

  // const [checkProperties, setCheckProperties] = React.useState(false);
  // const [checkDocuments, setCheckDocuments] = React.useState(false);
  const [checkComment, setCheckComment] = React.useState(false);
  const [checkNewState, setCheckNewState] = React.useState(false);


  //states for SPARQL
const [sparqlClassification, setSparqlClassification] = React.useState('');
const [sparqlComment, setSparqlComment] = React.useState('');
  

  ////////////////////////////////////////////////////////////////////////////////////////open and close functions for pop-up
  const handleClickOpen = () => {
    if (context.selection[0] !== undefined) {
      setOpen(true);
      setObjectGuid(context.selection[0].guid);

      setType('Damage');
      setDefectStructuralSwitch({checkedA: false})
      setDefectStructural('Defect');
      setComment('');
      setLabel('');
      setDate('');
      setCheckClassification(false)

      setOrderTask('');
      setCheckOntologyTask(false)
      setCheckCommentTask(false)
      setCommentTask('')
      setCheckOntologyTask('')
      setOntologyTaskOptions([])
      setOntologyTask([])
      // setCheckDocuments('');
      setCheckComment('');
      setClassificationOptions([]);
      setCheckNewState(false)

      setSparqlComment('')
      setSparqlClassification('')
      
    } else{
      setOpenAlert(true);
    }
  };


  // const handleClickOpen = () => {
  //   setOpen(true);
  // };


  const handleClose = () => {
    setOpen(false);
  };


  //open/close alert
  const handleCloseAlert = () => {
    setOpenAlert(false);
    };



//////////////////////////////////////////////////////////////////////////////////////QUERY testin
const [objectURI, setObjectURI] = React.useState('');


const queryObjectURI = `PREFIX props: <https://w3id.org/props#>
PREFIX bot: <https://w3id.org/bot#>
PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
PREFIX schema: <http://schema.org/>
SELECT ?obj
WHERE {
    ?obj props:globalIdIfcRoot/schema:value "${objectGuid}" .
}`



//first query for: 

  //('already existing damage-history')
  //all damage names (for this object) -> ?name a dot:Damage. (objGUID dot:hadDamage ?name) -> unique name (query when opening pop-up?)
  //object GUID if new state must be made
  //check if already a state is existant is user doesn't check 'make new one'


//Assign damage query:

const assignDamageQuery =
`PREFIX props: <https://w3id.org/props#>
PREFIX bot: <https://w3id.org/bot#>
PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
PREFIX schema: <http://schema.org/>
PREFIX dot: <https://w3id.org/dot#>
PREFIX mwv-d: <https://w3id.org/con-tax/damages/mwv#>
PREFIX cdo: <https://wisib.de/ontologie/damage/cdo#>

INSERT DATA {
  {damageState} dot:hasDamage inst:${label}_${objectGuid} ;
                dot:has${type} inst:${label}_${objectGuid} .

  inst:${label}_${objectGuid} a dot:${type}, dot:${defectStructural} .
  ${sparqlClassification}
  ${sparqlComment}

}`


//add prefixes for added ontologies CLASS_ONTOLOGY and/or TASK_ONTOLOGY in SPARQL query



//inst prefix?

//enkel query uitvoeren indien bepaalde waarden (bv type, label(+unique!),..) zijn ingegeven !!!!!!!!!

     






const testing = ()=>{

          console.log(assignDamageQuery)

}



/////////////////////////////////////////////////////////////////////////////////////TYPE
  //set Radio and state after type selection
  const setRadio = (damageType) => {
    document.getElementById(damageType).checked = true
      setType(damageType)

      // starts defining object URI
      // executeQueryObjectURI (queryObjectURI);
  };

  const handleSwitchChange = (event) => {
    setDefectStructuralSwitch({ ...defectStructuralSwitch, [event.target.name]: event.target.checked });
       
    if(defectStructuralSwitch.checkedA === false){
      setDefectStructural("StructuralDamage")
    }
    if(defectStructuralSwitch.checkedA === true){
      setDefectStructural("Defect")
    }
  };



 //////////////////////////////////////////////////////////////////////////////////////CLASSIFICATION
//check Classification
const toggleClassification = () => {
  if(document.getElementById("checkClassification").checked===true){
    setCheckClassification(true)
    setClassificationOptions([])
   }else{
     setCheckClassification(false)
     setClassification('')
     setSparqlClassification('')
     setSparqlComment('')
   }
};


//display classification
const optionClassification = ()=>{
 if(checkClassification === true){
   return(
     <div>

       <Typography className="domain">
         Select ontologies for obtaining classification options
       </Typography>
       <Typography className="domain">
         <input type="checkbox" id="toggleCDO" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
         <label for="toggleCDO" className="checkBoxClose" >Concrete Damage (CDO)</label> 
       </Typography>
       <Typography className="domain">
         <input type="checkbox" id="toggleMWVDTimber" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
         <label for="toggleMWVDTimber" className="checkBoxClose" >Timber damage (MVW-D)</label> 
       </Typography>
       <Typography className="domain">
         <input type="checkbox" id="toggleMWVDNaturalStone" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
         <label for="toggleMWVDNaturalStone" className="checkBox" >Natural stone damage (MVW-D)</label> 
       </Typography>
       <Typography className="domain">
         <input type="checkbox" id="toggleMWVDPaper" className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
         <label for="toggleMWVDPaper" className="checkBox" >Paper damage (MVW-D)</label> 
       </Typography>
       <Typography className="domain">
         <input type="checkbox" id="toggleMWVDTextile" className="checkBox" onClick={()=>defineClassificationOptions()}></input>
         <label for="toggleMWVDTextile" className="checkBox" >Textile damage (MVW-D)</label> 
       </Typography>
       {/* <Typography className="domain">
          <input type="checkbox" id="toggle_CLASS_ONTOLOGY" className="checkBox" onClick={()=>defineClassificationOptions()}></input>
          <label for="toggle_CLASS_ONTOLOGY" className="checkBox"> CLASS_ONTOLOGY_NAME </label> 
        </Typography> */}


       <Typography className="domain">
         Assign a classification from the list
       </Typography>
       
       <div className="dropdown">
         <FormControl variant="outlined" className="dropdownComponent">
           <Select
             native
             value={classification}
             onChange={handleClassificationChange}
           >
             <option value="">No classification</option>
             {myClassificationOptions}

           </Select>
         </FormControl>
       </div>
     </div>
   )
 } else{
     return(
       <p></p>
     )
   }
}




//define dropdown option

const defineClassificationOptions = ()=>{

  
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

   // if (document.getElementById("Option_CLASS_ONTOLOGY").checked===true) {
  //   var Option_CLASS_ONTOLOGY = CLASS_ONTOLOGY_IMPORT
  // } else {
  //   Option_CLASS_ONTOLOGY =[]
  // }
 
 setClassificationOptions(OptionCDO.concat(OptionMWVDTimber).concat(OptionMWVDNaturalSTone).concat(OptionMWVDPaper).concat(OptionMWVDTextile))
 //Add '.concat(Option_CLASS_ONTOLOGY)
}


//convert to dropdown
let myClassificationOptions = classificationOptions.map((element, i) => {
 return <option value= {element} key={i}>{element}</option>
})



//set selected dropdown as state
const handleClassificationChange = (event) => {
 setClassification(event.target.value);



 if(CDOclasses.includes(event.target.value) === true){
  var classPrefix = 'cdo:'
 }
 if(MWVDTimberclasses.includes(event.target.value) === true || MWVDNaturalStoneclasses.includes(event.target.value) === true || MWVDPaperclasses.includes(event.target.value) === true || MWVDTextileclasses.includes(event.target.value) === true){
   classPrefix = 'mwv-d:'
 }
//  if(CLASS_ONTOLOGY_IMPORT.includes(event.target.value) === true){
//    classPrefix = 'CLASS_ONTOLOGY_PREFIX'
//  }


 setSparqlClassification(`inst:${label}_${objectGuid} a ${classPrefix}${event.target.value} .`)
};




 //////////////////////////////////////////////////////////////////////////////////////TASK
//check Task
const toggleTask = () => {
  if(document.getElementById("checkTask").checked===true){
    setOrderTask(true)
   }else{
     setOrderTask(false)
     setCheckOntologyTask(false)
     setCheckCommentTask(false)
     setCommentTask('')
   }
};

//display Task
const optionTask = ()=>{
  if(orderTask === true){
    return(
      <div>
        <Typography className="taskOption">
          <input type="checkbox" id="checkOntologyTask"  onClick={()=>toggleOntologyTask()}></input>
          <label for="checkOntologyTask" className="checkBox" >Elaborate with ontology-based task</label> 
        </Typography>
        <Typography gutterBottom>
          {optionOntologyTask()}
        </Typography>

        <Typography className="taskOption">
          <input type="checkbox" id="checkCommentTask"  onClick={()=>toggleCommentTask()}></input>
          <label for="checkCommentTask" className="checkBox" >Elaborate with comment</label> 
        </Typography>
        <Typography gutterBottom>
          {optionCommentTask()}
        </Typography>
      </div>
    )
  } else{
      return
    }
}



const toggleOntologyTask = () => {
  if(document.getElementById("checkOntologyTask").checked===true){
    setCheckOntologyTask(true)
   }else{
    setCheckOntologyTask(false)
   }
};

const toggleCommentTask = () => {
  if(document.getElementById("checkCommentTask").checked===true){
    setCheckCommentTask(true)
   }else{
     setCheckCommentTask(false)
     setCommentTask('')
   }
};





//////////////////////////////////////////////////display Ontology Task
const optionOntologyTask = ()=>{
  if(checkOntologyTask === true){
    return(
      <div>

      <Typography className="ontologyTaskOptions">
         Select ontologies for obtaining classification options
       </Typography>
       <Typography className="ontologyTaskOptions">
         <input type="checkbox" id="toggleTimberMVWT" className="checkBoxClose" onClick={()=>defineTaskOptions()}></input>
         <label for="toggleTimberMVWT" className="checkBoxClose" >Degraded timber repair (MVW-T)</label> 
       </Typography>
       <Typography className="ontologyTaskOptions">
         <input type="checkbox" id="toggleFungiMVWT" className="checkBoxClose" onClick={()=>defineTaskOptions()}></input>
         <label for="toggleFungiMVWT" className="checkBoxClose" >Fungi control (MVW-T)</label> 
       </Typography>
       <Typography className="ontologyTaskOptions">
         <input type="checkbox" id="toggleInsectMVWT" className="checkBoxClose" onClick={()=>defineTaskOptions()}></input>
         <label for="toggleInsectMVWT" className="checkBox" >Insect control (MVW-T)</label> 
       </Typography>
       <Typography className="ontologyTaskOptionsDropdown">
         <input type="checkbox" id="togglePreventionMVWT" className="checkBoxClose" onClick={()=>defineTaskOptions()}></input>
         <label for="togglePreventionMVWT" className="checkBox" >Insects-and-fungi-prevention (MVW-T)</label> 
       </Typography>
       {/* <Typography className="domain">
          <input type="checkbox" id="toggle_TASK_ONTOLOGY" className="checkBox" onClick={()=>defineTaskOptions()}></input>
          <label for="toggle_TASK_ONTOLOGY" className="checkBox"> TASK_ONTOLOGY_NAME </label> 
        </Typography> */}


          <div className="ontologyTaskOptionsDropdown">    
                <FormControl variant="outlined" className="dropdownComponent">

                  <Select
                    multiple
                    value={ontologyTask}
                    onChange={handleOntologyTaskChange}
                     renderValue={(selected) => selected.join(", ")}
                  >
                  {ontologyTaskOptions.map((element) => (
                    <MenuItem key={element} value={element}>
                      <Checkbox checked={ontologyTask.indexOf(element) > -1} />
                      <ListItemText primary={element} />
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>



      </div>
    )
  } else{
      return
    }
}


        //define dropdown option

        const defineTaskOptions = ()=>{
          setOntologyTask([])
      
        if (document.getElementById("toggleTimberMVWT").checked===true) {
          var OptionTimberMVWT = TimberMWV
        } else {
          OptionTimberMVWT = []
        }
        
        
        if (document.getElementById("toggleFungiMVWT").checked===true) {
          var OptionFungiMVWT = FungiMWV
        } else {
          OptionFungiMVWT = []
        }
        
        
        if (document.getElementById("toggleInsectMVWT").checked===true) {
          var OptionInsectMVWT = InsectMWV
        } else {
          OptionInsectMVWT = []
        }
        
        
        if (document.getElementById("togglePreventionMVWT").checked===true) {
          var OptionPreventionMVWT = PreventionMWV
        } else {
          OptionPreventionMVWT = []
        }
        
      
        // if (document.getElementById("Option_TASK_ONTOLOGY").checked===true) {
        //   var Option_TASK_ONTOLOGY = TASK_ONTOLOGY_IMPORT
        // } else {
        //   Option_TASK_ONTOLOGY =[]
        // }
      
        
        setOntologyTaskOptions(OptionTimberMVWT.concat(OptionFungiMVWT).concat(OptionInsectMVWT).concat(OptionPreventionMVWT))
        //Add '.concat(Option_TASK_ONTOLOGY)
       }


        //set selected dropdown as state
    const handleOntologyTaskChange = (event) => {
      setOntologyTask(event.target.value);
    };


//////////////////////////////////////////////////////display Comment Task
const optionCommentTask = ()=>{
  if(checkCommentTask === true){
    return(
      <div>
        <Typography className="ontologyTaskOptionsDropdown" gutterBottom>
          <form  noValidate autoComplete="off">
          <TextField
            className="descriptionForm"
            id="description"
            label="Task description"
            multiline
            rows={5}
            variant="outlined"
            value={commentTask}
            onChange={handleCommentTaskChange}/>
          </form>
        </Typography>
      </div>
    )
  } else{
      return
    }
}

//set input as state
const handleCommentTaskChange = (event) => {
  setCommentTask(event.target.value);
};

 //////////////////////////////////////////////////////////////////////////////////////DOCUMENTS
// //check Documents
// const toggleDocuments = () => {
//   if(document.getElementById("checkDocuments").checked===true){
//     setCheckDocuments(true)
//    }else{
//      setCheckDocuments(false)
//    }
// };

// //display Documents
// const optionDocuments = ()=>{
//   if(checkDocuments === true){
//     return(
      
//       <Typography className="domain" gutterBottom>
//         [under construction]
//       </Typography>

//     )
//   } else{
//       return(
//         <p></p>
//       )
//     }
// }

 //////////////////////////////////////////////////////////////////////////////////////COMMENT
 //check Comment
const toggleComment = () => {
  if(document.getElementById("checkComment").checked===true){
    setCheckComment(true)

   }else{
     setCheckComment(false)
     setComment('')
     setSparqlComment('')
   }
};

//display Comment
const optionComment = ()=>{
  if(checkComment === true){
    return(
      <div>
        <Typography gutterBottom>
          <form  noValidate autoComplete="off">
          <TextField
            className="descriptionForm"
            id="description"
            label="Damage description"
            multiline
            rows={5}
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}/>
          </form>
        </Typography>
      </div>

    )
  } else{
      return(
        <p></p>
      )
    }
}


//set input as state
const handleCommentChange = (event) => {
  
  setComment(event.target.value)

  setSparqlComment(`inst:${label}_${objectGuid} rdfs:label "${event.target.value}" .`)
  // setSparqlComment(`inst:${label}_${objectGuid} rdfs:label "${comment}" .`) => change is cycle to late since async

};




//////////////////////////////////////////////////////////////////////////////////////LABEL AND DATE

const toggleNewState = () => {
  if(document.getElementById("checkNewState").checked===true){
    setCheckNewState(true)
   }else{
     setCheckNewState(false)
     setDate('')
   }
};

const labelAndDate = ()=>{
  if (checkNewState===false) {
    return(
    <Typography gutterBottom>
    <TextField  className="nameForm" id="label" label="Unique name" variant="outlined"
                value={label}
                onChange={handleLabelChange}/>
  
    </Typography>)
    
  } else {
    return(
    <Typography gutterBottom>
      <TextField  className="nameForm" id="label" label="Unique name" variant="outlined" 
                value={label}
                onChange={handleLabelChange}/>
      <TextField className="dateForm" id="date" variant="outlined" 
         type="date"     
          value={date}
         onChange={handleDateChange}/>
    </Typography>)
  }

}


//set input as state
const handleLabelChange = (event) => {
  const givenName = event.target.value
  setLabel(givenName.replace(/\s/g, ''));
};

const handleDateChange = (event) => {
  setDate(event.target.value)
};



//////////////////////////////////////////////////////////////////////////////////////SUBMIT


const handleSubmit = () => {

  //execute query functions

  setOpen(false);
};



 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RETURN
  return (
    <div>

      <Button variant="contained" size="small" color="primary" 
                        style={{marginLeft: "30%", marginBottom: 10, marginTop: 40, width: 160}}
                        onClick={handleClickOpen}
                  >test</Button>



      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Assign new damage
        </DialogTitle>
        <DialogContent dividers style={{width: "600px"}}>
          

      <Button onClick={()=>testing()}>test</Button>


          <Typography style={{paddingBottom: "15px"}} gutterBottom>
            Object GUID: {objectGuid}
          </Typography>

          
          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' >Damage type</div>
          </Typography>
          
          <Typography className ="domain" gutterBottom>
            <form>
              <div className="radio">
                <input id="Damage" type="radio" name="optradio" onClick={()=> {setRadio("Damage")}}></input>
                  <label for="Damage"> Damage</label>
              </div>
              <div className="radio">
                <input id="DamageArea" type="radio" name="optradio" onClick={()=> {setRadio("DamageArea")}}></input>
                  <label for="DamageArea"> Damage area </label>
              </div>
              <div className="radio">
               <input id="DamageElement" type="radio" name="optradio" onClick={()=> {setRadio("DamageElement")}}></input> 
                <label for="DamageElement"> Damage element </label>
              </div>
             </form>
          </Typography>


          <div>
            <FormGroup className ="switch">
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  
                  <Grid item>Defect</Grid>
                  
                  <Grid item>
                    <Switch
                      checked={defectStructuralSwitch.checkedA}
                      onChange={handleSwitchChange}
                      name="checkedA"
                      color="default"
                      // color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      label="Uncontrolled"
                    />
                  </Grid>
                
                  <Grid item>Structural Damage</Grid>
                
                </Grid>
              </Typography>
            </FormGroup>
          </div>

 


          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Classification</div>
          </Typography>
          <Typography>
            <input type="checkbox" id="checkClassification" className="checkBox" onClick={()=>toggleClassification()}></input>
            <label for="checkClassification" className="checkBox" >Apply further classification</label> 
          </Typography>
          <Typography gutterBottom>
            {optionClassification()}
          </Typography>






          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Task</div>
          </Typography>
          <Typography>
            <input type="checkbox" id="checkTask" className="checkBox" onClick={()=>toggleTask()}></input>
            <label for="checkTask" className="checkBox" >Order repair task</label> 
          </Typography>
          <Typography gutterBottom>
            {optionTask()}
          </Typography>


{/* 
          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > External documents</div>
          </Typography>
          <Typography>
            <input type="checkbox" id="checkDocuments" className="checkBox" onClick={()=>toggleDocuments()}></input>
            <label for="checkDocuments" className="checkBox" >Add external documents</label> 
          </Typography>
          <Typography gutterBottom>
            {optionDocuments()}
          </Typography> */}



          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Comment</div>
          </Typography>
          <Typography>
            <input type="checkbox" id="checkComment" className="checkBox" onClick={()=>toggleComment()}></input>
            <label for="checkComment" className="checkBox" >Add an additional description</label> 
          </Typography>
          <Typography gutterBottom>
            {optionComment()}
          </Typography>

      

          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Additional information</div>
          </Typography>

          {labelAndDate()}

          <Typography>
            <input type="checkbox" id="checkNewState" className="checkBox" onClick={()=>toggleNewState()}></input>
            <label for="checkNewState" className="checkBox" >Assign new damage state to object</label> 
          </Typography>


        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClose} size="small" color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleSubmit} variant="contained" size="small" color="primary">
            Submit
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

