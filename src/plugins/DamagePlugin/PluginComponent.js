import React, { useContext, useState } from "react";
import { Drawer, Typography, Slider, Button } from "@material-ui/core";
// import useStyles from "@styles";
import { makeStyles } from '@material-ui/core/styles';
import AppContext from "@context";
import {miniDrawerWidth} from '@styles'

const drawerWidth = "26%"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    marginLeft: miniDrawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }
}));


export default function MyPlugin() {
  const classes = useStyles();
  const { context, setContext } = useContext(AppContext);

  function setState(state) {
    setContext({...context, states: {...context.states, [context.plugin]: state}})
  }

  const state = context.states[context.plugin]

  return (
    <div className={classes.root}>
      {context.currentProject ? (
        <div>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}></div>
            <div>

              <Typography>This is my plugin window!</Typography>

              <Typography>
                Current selection:
                {(context.selection.length > 0) ? (
                  context.selection.map(item => {
                    return <p> {item.guid}</p>
                  })
                ) : (
                  <> nothing selected</>
                )}

              </Typography>



              <div>
                <Button className={classes.button} variant="contained" size="small" color="primary" 
                        style={{marginLeft: "25%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={()=>assignDamage()}
                  >Assign</Button>
              </div>
              <div>
                <Button className={classes.button} variant="contained" size="small" color="primary" 
                        style={{marginLeft: "25%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={()=>searchDamage()}
                  >Search</Button>
              </div>

              <div>
                <Button className={classes.button} variant="contained" size="small" color="primary" 
                        style={{marginLeft: "25%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={()=>updateDamage()}
                  >Update</Button>
              </div>

              <div>
                <Button className={classes.button} variant="contained" size="small" color="primary" 
                        style={{marginLeft: "25%", marginBottom: 10, marginTop: 10, width: 160}}
                        onClick={()=>editDamage()}
                  >Edit</Button>
              </div>




            </div>
          </Drawer>{" "}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}



function assignDamage(){
  console.log('assign damage pop-up')
}


function searchDamage(){
  console.log('search damage pop-up')
}


function updateDamage(){
  console.log('update damage pop-up')
}


function editDamage(){
  console.log('edit damage pop-up')
}