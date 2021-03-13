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

import {queryMultiple} from 'lbd-server'

//import ontology-classes for classification
import {classificationOntologies,classificationOntologyLabels} from './ClassesOntologies/List'

//import ontology-classes for tasks
import {taskOntologies, taskOntologyLabels} from './TasksOntologies/List'



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

  const [options, setOptions] = React.useState('');
  const [damageSelection, setDamageSelection] = React.useState('');
  const [type, setType] = React.useState('');
  const [defectStructuralSwitch, setDefectStructuralSwitch] = React.useState({checkedA: false});
  const [defectStructural, setDefectStructural] = React.useState('Defect');
  const [classification, setClassification] = React.useState('');
  const [classificationOptions, setClassificationOptions] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const [label, setLabel] = React.useState('');
  const [date, setDate] = React.useState('');
  const [objectGuid, setObjectGuid] = React.useState('');

  const [orderTask, setOrderTask] = React.useState(false);
  const [ontologyTask, setOntologyTask] = React.useState([]);
  const [ontologyTaskOptions, setOntologyTaskOptions] = React.useState([]);
  const [checkOntologyTask, setCheckOntologyTask] = React.useState(false);
  const [checkCommentTask, setCheckCommentTask] = React.useState(false);
  const [commentTask, setCommentTask] = React.useState('');

  const [checkClassification, setCheckClassification] = React.useState(false);
  const [checkNewState, setCheckNewState] = React.useState(false);
  const [checkDocuments, setCheckDocuments] = React.useState(false);
  const [checkComment, setCheckComment] = React.useState(false);
  

  ////////////////////////////////////////////////////////////////////////////////////////open and close functions for pop-up
  const handleClickOpen = () => {
    if (context.selection[0] !== undefined) {
      setOpen(true);
      setObjectGuid(context.selection[0].guid);
      
      setOptions('')
      setType('');
      setDefectStructuralSwitch({checkedA: false})
      setDefectStructural('Defect');
      setComment('');
      setLabel('');
      setDate('');
      setCheckClassification('')
      setOrderTask('');
      setCheckCommentTask(false)
      setCommentTask('')
      setCheckOntologyTask('')
      setOntologyTaskOptions([])
      setOntologyTask([])
      setCheckDocuments('');
      setCheckComment('');
      setDamageSelection('');
      setClassificationOptions([])
      

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

  //////////////////////////////////////////////////////////////////////////////////////DAMAGE SELECTION

//set selected dropdown as state
const handleDamageSelection = (event) => {
  setDamageSelection(event.target.value);
};

const deleteDamage = ()=>{
    handleClose()
}

//////////////////////////////////////////////////////////////////////////////////////QUERY OBJECT URI
const [objectURI, setObjectURI] = React.useState('');


const queryObjectURI = `PREFIX props: <https://w3id.org/props#>
PREFIX bot: <https://w3id.org/bot#>
PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
PREFIX schema: <http://schema.org/>
SELECT ?obj
WHERE {
    ?obj props:globalIdIfcRoot/schema:value "${objectGuid}" .
}`

async function executeQueryObjectURI (query) {
  try {
    let token
    if (context.user && context.user.token) {
      token = context.user.token
    }
      const results = await queryMultiple(context.currentProject.id, query, context.currentProject.activeGraphs, token)
      setObjectURI(results.results.bindings[0].obj.value)
      //object URI as objURI.results.bindings[0].obj.value
  } catch (error) {
      console.log('error', error)
  }
}

  //////////////////////////////////////////////////////////////////////////////////////TYPE


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
       {classificationOntologiesDisplay}


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


// define classification ontologies display

const classificationOntologiesDisplay = classificationOntologyLabels.map((element, i) => {
  return(
    <Typography className="domain">
      <input type="checkbox" id={element} className="checkBoxClose" onClick={()=>defineClassificationOptions()}></input>
      <label for={element} className="checkBoxClose"> {element}</label> 
   </Typography>
  ) 
 })


//make options array

 var i

 const defineClassificationOptions =()=>{

  var arraysPush = []

  for (i = 0; i < classificationOntologyLabels.length; i++) {
    if (document.getElementById(classificationOntologyLabels[i]).checked===true) {
      //mapfunctie voor classificationOntologies[i]?
      arraysPush.push(classificationOntologies[i])

    } else {}
  }

  var mergedArraysPush = [].concat.apply([], arraysPush);
  setClassificationOptions(mergedArraysPush)
 }


//convert to dropdown
let myClassificationOptions = classificationOptions.map((element, i) => {
 return <option value= {element} key={i}>{element}</option>
})



//set selected dropdown as state
const handleClassificationChange = (event) => {
 setClassification(event.target.value);
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
       {taskOntologiesDisplay}

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


// define classification ontologies display

const taskOntologiesDisplay = taskOntologyLabels.map((element, i) => {
  return(
    <Typography className="ontologyTaskOptions">
      <input type="checkbox" id={element} className="checkBoxClose" onClick={()=>defineTaskOptions()}></input>
      <label for={element} className="checkBoxClose"> {element}</label> 
   </Typography>
  ) 
 })


//make options array

 var i

 const defineTaskOptions =()=>{

  var arraysPush = []

  for (i = 0; i < taskOntologyLabels.length; i++) {
    if (document.getElementById(taskOntologyLabels[i]).checked===true) {

      arraysPush.push(taskOntologies[i])

    } else {}
  }

  var mergedArraysPush = [].concat.apply([], arraysPush);
  setOntologyTaskOptions(mergedArraysPush)
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
        <Typography className="taskOption" gutterBottom>
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
//check Documents
const toggleDocuments = () => {
  if(document.getElementById("checkDocuments").checked===true){
    setCheckDocuments(true)
   }else{
     setCheckDocuments(false)
   }
};

//display Documents
const optionDocuments = ()=>{
  if(checkDocuments === true){
    return(
      
      <Typography className="domain" gutterBottom>
        [under construction]
      </Typography>

    )
  } else{
      return(
        <p></p>
      )
    }
}

 //////////////////////////////////////////////////////////////////////////////////////COMMENT
 //check Comment
const toggleComment = () => {
  if(document.getElementById("checkComment").checked===true){
    setCheckComment(true)
   }else{
     setCheckComment(false)
     setComment('')
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
  setComment(event.target.value);
};


//////////////////////////////////////////////////////////////////////////////////////LABEL


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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DISPLAY IF DAMAGE SELECTED


const optionResolveUpdate = ()=>{
  if (damageSelection === '') {
    return    
  } else {
    return(
      <div>
          <Typography className ="domain" gutterBottom>
            <form>
              <div className="radio">
                <input id="optionResolve" type="radio" name="optradio" onClick={()=> {setRadioOptions("optionResolve")}}></input>
                  <label for="optionResolve"> Resolve damage</label>
              </div>
              <div className="radio">
                <input id="optionUpdate" type="radio" name="optradio" onClick={()=> {setRadioOptions("optionUpdate")}}></input>
                  <label for="optionUpdate"> Update Damage </label>
              </div>
             </form>
          </Typography>
        <Typography gutterBottom>
          {optionUpdate()}
        </Typography>
      </div>
    )

  }
}



const setRadioOptions = (element) => {
  document.getElementById(element).checked = true
    setOptions(element)

};




const optionUpdate = ()=>{
  if(options === 'optionResolve'){
    return(
      <div>
          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' >Resolve damage</div>
          </Typography>

          <Typography gutterBottom>
            <TextField className="dateForm" id="date" variant="outlined" 
              type="date"     
              value={date}
              onChange={handleDateChange}/>
          </Typography>

      </div>
    )
  } 


  if(options === "optionUpdate"){
      return(
        <div>


          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' >Damage type</div>
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
            <label for="checkTask" className="checkBox" >Assign task for damage repair</label> 
          </Typography>
          <Typography gutterBottom>
            {optionTask()}
          </Typography>



          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > External documents</div>
          </Typography>
          <Typography>
            <input type="checkbox" id="checkDocuments" className="checkBox" onClick={()=>toggleDocuments()}></input>
            <label for="checkDocuments" className="checkBox" >Add external documents</label> 
          </Typography>
          <Typography gutterBottom>
            {optionDocuments()}
          </Typography>



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
                  >Update</Button>



      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Update damage state
        </DialogTitle>
        <DialogContent dividers style={{width: "600px"}}>
          

          <Typography style={{paddingBottom: "15px"}} gutterBottom>
            Object GUID: {objectGuid}
          </Typography>




          <div className="dropdown">
          <FormControl variant="outlined" className="dropdownComponent">
            <Select
              native
              value={damageSelection}
              onChange={handleDamageSelection}
            >
              <option value="">No damage selected</option>
              <option value="Damage_Area_1">Damage_Area_1</option>
              <option value="Damage_Area_2">Damage_Area_2</option>
              <option value="Damage_Element1">Damage_Element1</option>
            </Select>
          </FormControl>
        </div>


        <Typography gutterBottom>
          {optionResolveUpdate()}
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

