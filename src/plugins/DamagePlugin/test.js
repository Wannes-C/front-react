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
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import './styles.css'


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

  const [type, setType] = React.useState('');
  const [classification, setClassification] = React.useState('');
  // const [properties, setProperties] = React.useState('');
  // const [Task, setTask] = React.useState('');
  // const [Documents, setDocuments] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [label, setLabel] = React.useState('');



  const [checkTopology, setCheckTopology] = React.useState(false);
  const [checkClassification, setCheckClassification] = React.useState(false);
  const [checkProperties, setCheckProperties] = React.useState(false);
  const [checkTask, setCheckTask] = React.useState(false);
  const [checkDocuments, setCheckDocuments] = React.useState(false);
  const [checkComment, setCheckComment] = React.useState(false);
  

  ////////////////////////////////////////////////////////////////////////////////////////open and close functions for pop-up
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setType('damageType');
    setComment('');
    setLabel('');
    setCheckTopology('');
    setCheckClassification('')
    setCheckProperties('');
    setCheckTask('');
    setCheckDocuments('');
    setCheckComment('');
  };

  //////////////////////////////////////////////////////////////////////////////////////TYPE
  //set Radio and state after type selection
  const setRadio = (damageType) => {
    document.getElementById(damageType).checked = true
      setType(damageType)
  };



  //////////////////////////////////////////////////////////////////////////////////////TOPOLOGY
    //enable ontology (based on damage option)
    const enableTopology = ()=>{
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
  

      if(type === 'damageElement'){
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
    }else{
      setCheckClassification(false)
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
          <input type="checkbox" id="toggleCDO" className="checkBoxClose"></input>
          <label for="toggleCDO" className="checkBoxClose" >Concrete Damage Ontology (OCD)</label> 
        </Typography>
        <Typography className="domain">
          <input type="checkbox" id="toggleMWVD" className="checkBoxClose"></input>
          <label for="toggleMWVD" className="checkBoxClose" >MWV Damage Ontology (MVW-D)</label> 
        </Typography>
        <Typography className="domain">
          <input type="checkbox" id="toggleMDCSO" className="checkBox"></input>
          <label for="toggleMDCSO" className="checkBox" >MDCS Atlas Damage Ontology (MDCS-O)</label> 
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
              <option value="crack">crack</option>
              <option value="biological growth">biological growth</option>
              <option value="carbonation">carbonation</option>
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
  
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RETURN
  return (
    <div>

      <Button variant="contained" size="small" color="primary" 
                        style={{marginLeft: "30%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={handleClickOpen}
                  >test</Button>



      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Assign new damage
        </DialogTitle>
        <DialogContent dividers style={{width: "600px"}}>
          
          
          <Typography className='interTitleBox' gutterBottom>
            <div className='interTitle' >Damage type</div>
          </Typography>
          
          <Typography className ="domain" gutterBottom>
            <form>
              <div className="radio">
                <input id="damageGeneral" type="radio" name="optradio" onClick={()=> {setRadio("damageGeneral")}}></input>
                  <label for="damageGeneral"> Damage</label>
              </div>
              <div className="radio">
                <input id="damageArea" type="radio" name="optradio" onClick={()=> {setRadio("damageArea")}}></input>
                  <label for="damageArea"> Damage area </label>
              </div>
              <div className="radio">
               <input id="damageElement" type="radio" name="optradio" onClick={()=> {setRadio("damageElement")}}></input> 
                <label for="damageElement"> Damage element </label>
              </div>
             </form>
          </Typography>




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
            <div className='interTitle' > Damage label</div>
          </Typography>
          <Typography gutterBottom>
            <TextField className="descriptionForm" id="label" label="Unique name" variant="outlined" 
                        value={label}
                        onChange={handleLabelChange}/>
          </Typography>

{/* + datum!! */}


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

