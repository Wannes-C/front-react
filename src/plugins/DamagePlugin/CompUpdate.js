import React, { Component } from 'react';
import { Drawer, Typography, Slider, Button } from "@material-ui/core";



class CompUpdate extends Component {

  render(){


    return(
        <div>
        <Button  variant="contained" size="small" color="primary" 
                style={{marginLeft: "30%", marginBottom: 10, marginTop: 10, width: 160}}
                // onClick={()=>openPopUp()}
          >Update</Button>
      </div>
    )
  }
}

export default CompUpdate;