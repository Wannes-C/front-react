import React, { useContext, useState } from "react";
import { Drawer, Typography, Slider, Button } from "@material-ui/core";
// import useStyles from "@styles";
import { makeStyles } from '@material-ui/core/styles';
import AppContext from "@context";
import {miniDrawerWidth} from '@styles'

// import components
import CompAssign from './Components/CompAssign'
import CompSearch from './Components/CompSearch'
import CompUpdate from './Components/CompUpdate'
import CompEdit from './Components/CompEdit'
//import test
import Comptest from "./test";



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

              <Typography>This is the damage plugin window!</Typography>

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

  {/* buttons */}         

              <CompAssign></CompAssign>
              <CompSearch></CompSearch>
              <CompUpdate></CompUpdate>
              <CompEdit></CompEdit>

          {/* test */}
              <Comptest/>
            


            </div>
          </Drawer>{" "}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}







function editDamage(){
  console.log('open edit damage pop-up')
}