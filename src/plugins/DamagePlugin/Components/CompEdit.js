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
import '../styles.css'

import {queryMultiple} from 'lbd-server'

//import ontology-classes for classification
import MWVDTimberclasses from './ClassesOntologies/TimberMWVD'
import MWVDNaturalStoneclasses from './ClassesOntologies/NaturalStoneMWVD'
import MWVDPaperclasses from './ClassesOntologies/PaperMWVD'
import MWVDTextileclasses from './ClassesOntologies/TextileMWVD'
import CDOclasses from './ClassesOntologies/ConcreteCDO'


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

  const [damageSelection, setDamageSelection] = React.useState('');
  const [type, setType] = React.useState('');
  const [defectStructuralSwitch, setDefectStructuralSwitch] = React.useState({checkedA: false});
  const [defectStructural, setDefectStructural] = React.useState('Defect');
  const [classificationOptions, setClassificationOptions] = React.useState([]);
  const [classification, setClassification] = React.useState('');
  // const [properties, setProperties] = React.useState('');
  // const [Task, setTask] = React.useState('');
  // const [Documents, setDocuments] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [label, setLabel] = React.useState('');
  const [date, setDate] = React.useState('');
  const [objectGuid, setObjectGuid] = React.useState('');




  const [checkTopology, setCheckTopology] = React.useState(false);
  const [checkClassification, setCheckClassification] = React.useState(false);
  const [checkProperties, setCheckProperties] = React.useState(false);
  const [checkTask, setCheckTask] = React.useState(false);
  const [checkDocuments, setCheckDocuments] = React.useState(false);
  const [checkComment, setCheckComment] = React.useState(false);
  

  ////////////////////////////////////////////////////////////////////////////////////////open and close functions for pop-up
  const handleClickOpen = () => {
    if (context.selection[0] !== undefined) {
      setOpen(true);
      setObjectGuid(context.selection[0].guid);

      setType('');
      setDefectStructuralSwitch({checkedA: false})
      setDefectStructural('Defect');
      setComment('');
      setLabel('');
      setDate('');
      setCheckTopology('');
      setCheckClassification('')
      setCheckProperties('');
      setCheckTask('');
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
  //set Radio and state after type selection
  const setRadio = (damageType) => {
    document.getElementById(damageType).checked = true
      setType(damageType)

            // starts defining object URI
            executeQueryObjectURI (queryObjectURI);

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



  //////////////////////////////////////////////////////////////////////////////////////TOPOLOGY
    //enable ontology (based on damage option)
    const enableTopology = ()=>{
      if(type === 'Damage'){
        return
      }
  

      if(type === 'DamageArea'){
        return(
          <div>
            <Typography className='interTitleBox' gutterBottom>
              <div className='interTitle' >Damage topology</div>
            </Typography>
            <Typography>
              <input type="checkbox" id="checkTopology" className="checkBox" onClick={()=>toggleTopology()}></input>
              <label for="checkTopology" className="checkBox" >Further specify damage topology</label> 
            </Typography>
            <Typography gutterBottom>
              {optionTopologyArea()}
            </Typography>
          </div>
        )
      }
  

      if(type === 'DamageElement'){
        return(
          <div>
            <Typography className='interTitleBox' gutterBottom>
              <div className='interTitle' >Damage topology</div>
            </Typography>
            <Typography>
              <input type="checkbox" id="checkTopology" className="checkBox" onClick={()=>toggleTopology()}></input>
              <label for="checkTopology" className="checkBox" >Specify damage topology</label> 
            </Typography>
            <Typography gutterBottom>
              {optionTopologyElement()}
            </Typography>
          </div>
        )
      }
   }
  
  
  
  
  
  
  //check Topology (based on check)
 const toggleTopology = () => {
  if(document.getElementById("checkTopology").checked===true){
    setCheckTopology(true)
   }else{
     setCheckTopology(false)
   }
};



//display Topology (based on check) for damage AREA
const optionTopologyArea = ()=>{
  if(checkTopology === true){
    return(
      
      <Typography gutterBottom>
      <p>assign damage elements</p>
      <p>assign damage pattern</p>
    </Typography>
    )
  } else{
      return(
        <p></p>
      )
    }
}


//display Topology (based on check) for damage ELEMENT
const optionTopologyElement = ()=>{
  if(checkTopology === true){
    return(
      
      <Typography gutterBottom> 
         <p>assign adjacent element</p>
         <p>assign to damage pattern</p>
    </Typography>
    )
  } else{
      return(
        <p></p>
      )
    }
}
  
  
  



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
   var OptionCDO = []
 }
 
 
 if (document.getElementById("toggleMWVDTimber").checked===true) {
   var OptionMWVDTimber = MWVDTimberclasses
 } else {
   var OptionMWVDTimber = []
 }
 
 
 if (document.getElementById("toggleMWVDNaturalStone").checked===true) {
   var OptionMWVDNaturalSTone = MWVDNaturalStoneclasses
 } else {
   var OptionMWVDNaturalSTone = []
 }
 
 
 if (document.getElementById("toggleMWVDPaper").checked===true) {
   var OptionMWVDPaper = MWVDPaperclasses
 } else {
   var OptionMWVDPaper = []
 }
 
 
 if (document.getElementById("toggleMWVDTextile").checked===true) {
   var OptionMWVDTextile = MWVDTextileclasses
 } else {
   var OptionMWVDTextile =[]
 }
 
 setClassificationOptions(OptionCDO.concat(OptionMWVDTimber).concat(OptionMWVDNaturalSTone).concat(OptionMWVDPaper).concat(OptionMWVDTextile))
}


//convert to dropdown
let myClassificationOptions = classificationOptions.map((element, i) => {
 return <option value= {element} key={i}>{element}</option>
})



//set selected dropdown as state
const handleClassificationChange = (event) => {
 setClassification(event.target.value);
};


 //////////////////////////////////////////////////////////////////////////////////////PROPERTIES
//check Properties
 const toggleProperties = () => {
  if(document.getElementById("checkProperties").checked===true){
    setCheckProperties(true)
   }else{
     setCheckProperties(false)
   }
};

//display Properties
const optionProperties = ()=>{
  if(checkProperties === true){
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

 //////////////////////////////////////////////////////////////////////////////////////TASK
//check Task
const toggleTask = () => {
  if(document.getElementById("checkTask").checked===true){
    setCheckTask(true)
   }else{
     setCheckTask(false)
   }
};

//display Task
const optionTask = ()=>{
  if(checkTask === true){
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

//set input as state
const handleLabelChange = (event) => {
  setLabel(event.target.value);
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

const optionUpdate = ()=>{
  if(damageSelection === ''){
    return(
      <p></p>
    )
  } else{
      return(
        <div>

          <div className="delete">
            <Button autoFocus variant="contained" size="small" color="primary" onClick={()=>deleteDamage()}>
              Delete Permanently
            </Button>
          </div>


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




          <Typography gutterBottom>
            {enableTopology()}
          </Typography>

 


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
            <div className='interTitle' > Properties</div>
          </Typography>
          <Typography>
            <input type="checkbox" id="checkProperties" className="checkBox" onClick={()=>toggleProperties()}></input>
            <label for="checkProperties" className="checkBox" >Assign properties</label> 
          </Typography>
          <Typography gutterBottom>
            {optionProperties()}
          </Typography>




          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' > Task</div>
          </Typography>
          <Typography>
            <input type="checkbox" id="checkTask" className="checkBox" onClick={()=>toggleTask()}></input>
            <label for="checkTask" className="checkBox" >Assign task for damage removal</label> 
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

          <Typography gutterBottom>
            <TextField  className="nameForm" id="label" label="Unique name" variant="outlined" 
                        value={label}
                        onChange={handleLabelChange}/>
           
            <TextField className="dateForm" id="date" variant="outlined" 
                        type="date"     
                        value={date}
                        onChange={handleDateChange}
                        />
          </Typography>

          <Typography>
            <input type="checkbox" id="checkNewState" className="checkBox"></input>
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
                  >Edit</Button>



      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit incorrect or incomplete damage
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
          {optionUpdate()}
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
