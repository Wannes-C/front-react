import React, { useContext, useState } from 'react';
import AppContext from "@context";

import Button from '@material-ui/core/Button';

import {queryMultiple} from 'lbd-server'
import '../styles.css'


export default function SelectComponent() {

  ///////////////////////////////////////////////////////////////////////////////////////////STATES
  ////const[state-element, function to change state] = React.useState(defailt value)

  const { context, setContext } = useContext(AppContext);
  ///////////////////////////////////////////////////////////////////////////////////////////QUERY


  const initialQuery = `PREFIX props: <https://w3id.org/props#>
  PREFIX bot: <https://w3id.org/bot#>
  PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
  PREFIX schema: <http://schema.org/>
  PREFIX omg: <https://w3id.org/omg#>
  PREFIX fog: <https://w3id.org/fog#>
  SELECT ?s ?guid
  WHERE {
      ?s a beo:Door; 
          # omg:hasGeometry/fog:hasGltfId ?guid .
          props:globalIdIfcRoot/schema:value ?guid .
  }`;



  const selectDamagedQuery = `PREFIX odm: <https://github.com/Wannes-C/Thesis/blob/main/ontologyForDamageManagment.ttl/>
  PREFIX dot: <https://w3id.org/dot#>
  PREFIX props: <https://w3id.org/props#>
  PREFIX schema: <http://schema.org/>
  PREFIX omg: <https://w3id.org/omg#>
  PREFIX fog: <https://w3id.org/fog#>
  
  SELECT DISTINCT ?s ?guid
  WHERE {
    ?s 	odm:hasDamageState ?damagedState ;
        # omg:hasGeometry/fog:hasGltfId ?guid .
        props:globalIdIfcRoot/schema:value ?guid .
      
     ?damagedState a odm:CurrentDamageState .
    
    {?damagedStates a odm:DamagedState .}
    UNION
    {?damagedStates dot:hasDamage ?damage .}
    UNION
    {?damagedStates dot:hasDamageElement ?damageElement .}
    UNION
    {?damagedStates dot:hasDamageArea ?damageArea .}
  }`;







 
      async function executeQuery () {
          try {
            let token
            if (context.user && context.user.token) {
              token = context.user.token
            }
              const results = await queryMultiple(context.currentProject.id, initialQuery, context.currentProject.activeGraphs, token)
  
              const selection = []
              results.results.bindings.forEach((binding) => {
                  selection.push({guid: binding.guid.value})
              })
              setContext({...context, selection})
          } catch (error) {
              console.log('error', error)
          }
      }




 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RETURN
  return (
    <div>

      <Button variant="contained" size="small" color="primary" 
        style={{marginLeft: "15%", marginBottom: 10, marginTop: 60, width: 290}}
        onClick={e => executeQuery()}
      >Select all damaged components</Button>

    </div>
  );
}
