import React, { useState, useContext, useEffect } from 'react'
import AppContext from '@context'
import { setConfig, queryComunica } from '@util/functions'
import axios from 'axios'
import url from 'url'
import { v4 } from "uuid"
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function ClassificationPlugin() {
    const classes = useStyles()

    const { context, setContext } = useContext(AppContext)
    const [classifications, setClassifications] = useState([])
    const [parentElement, setParentElement] = useState()
    const [selectedClassification, setSelectedClassification] = useState('')
    const [loading, setLoading] = useState(false)
    const [classificationOptions, setClassificationOptions] = useState(["fetching"])

    // only when the component is mounted
    useEffect(async () => {
        await findClassifications()
    }, [])

    useEffect(async () => {
        await findParent()
    }, [context.selection])

    useEffect(async () => {
        await findExistingClassifications()
    }, [parentElement])

    async function findClassifications() {
        try {
            const query = `
            PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    
            SELECT ?element
            WHERE {
                ?element rdfs:subClassOf beo:BuildingElement.
            }`

            setLoading(true)
            const result = await context.comunica.query(query, {
                sources: ['https://pi.pauwel.be/voc/buildingelement/ontology.ttl'],
            });

            // Consume results as an array (easier)
            const bindings = await result.bindings();
            setLoading(false)
            const classOptions = []
            if (bindings.length > 0) {
                for (const result of bindings) {
                    const value = result._root.entries[0][1].id
                    classOptions.push(value)
                }
                setClassificationOptions(classOptions)
            } else {
                throw new Error('Nothing found')
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    async function findParent() {
        try {
            if (context.selection.length > 0) {
                const query = `PREFIX props: <https://w3id.org/props#>
                PREFIX bot: <https://w3id.org/bot#>
                PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
                PREFIX schema: <http://schema.org/>
                PREFIX omg: <https://w3id.org/omg#>
                PREFIX fog: <https://w3id.org/fog#>
        
                SELECT ?parent
                WHERE {
                    ?parent omg:hasGeometry ?geo .
                    ?geo fog:hasGltfId "${context.selection}" .
                }`
                setLoading(true)
                const results = await executeQuery(query, context)
                setLoading(false)
                if (results.length > 0) {

                    if (parentElement !== results[0].parent.value) {

                        setParentElement(results[0].parent.value)
                    }
                } else {
                    setParentElement(null)
                }
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    async function addClassification(e) {
        e.preventDefault()
        try {
            const updateQuery = `
            PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
    
            INSERT DATA { GRAPH <${context.activeGraphs[0]}> {
                <${parentElement}> a <${selectedClassification}> .
            } }        
            `
            await executeUpdate(updateQuery, context, context.activeGraphs[0])
            const newClassifications = [...classifications, selectedClassification]
            setClassifications(newClassifications)
        } catch (error) {
            console.log(error)
        }
    }

    async function findExistingClassifications() {
        try {
            if (parentElement) {
                const query = `
                SELECT ?class
                WHERE {
                    <${parentElement}> a ?class .
                }`
                setLoading(true)
                const results = await executeQuery(query, context)
                const resultingClasses = []
                if (results) {
                    results.forEach(result => {
                        resultingClasses.push(result.class.value)
                    })
                    setLoading(false)

                    setClassifications(resultingClasses)
                }
            } else {
                setClassifications([])
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.value.length > 0) {
            setSelectedClassification(e.target.value)
        }
    }

    async function establishParent(e) {
        e.preventDefault()
        try {
            const parentUri = `${context.activeGraphs[0]}#${v4()}`
            const geometryUri = `${context.activeGraphs[0]}#${v4()}`

            const updateQuery = `
            PREFIX bot: <https://w3id.org/bot#>
            PREFIX beo: <https://pi.pauwel.be/voc/buildingelement#>
            PREFIX schema: <http://schema.org/>
            PREFIX omg: <https://w3id.org/omg#>
            PREFIX fog: <https://w3id.org/fog#>
    
            INSERT DATA { GRAPH <${context.activeGraphs[0]}> {
                <${parentUri}> omg:hasGeometry <${geometryUri}> .
                <${geometryUri}> fog:hasGltfId "${context.selection}" .
            } }        
            `
            await executeUpdate(updateQuery, context, context.activeGraphs[0])
            setSelectedClassification("")
            setParentElement(parentUri)
        } catch (error) {
            console.log('error', error)
        }
    }
    // display the option for new classifications

    return (
        <div>
            {(context.selection.length > 0) ? (
                <div>
                    {(parentElement) ? (
                        <div>
                            {/* {parentElement} */}
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">New classification</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedClassification}
                                    onChange={handleChange}
                                >
                                    {classificationOptions.map((item) => <MenuItem value={item}>{item}</MenuItem>)}

                                </Select>
                            </FormControl>
                            <button
                                onClick={addClassification}
                                disabled={!selectedClassification.length}
                            >
                                Add
                                            </button>
                        </div>

                    ) : (
                            <div>
                                <p>No root element found for the selected object</p>
                                <button
                                    onClick={establishParent}
                                >Make one?
                </button>
                            </div>
                        )}
                    {(classifications.length > 0) ? (
                        <div>
                            {classifications.map((item) => <p key={item}>{item}</p>)}
                        </div>
                    ) : (
                            <div>
                                {(loading) ? (
                                    <p></p>
                                ) : (
                                        <p>No classifications yet for this element (in the selected graphs)</p>
                                    )}
                            </div>

                        )}
                </div>
            ) : (
                    <div>Please select an element in the viewer</div>
                )}
        </div>

    )
}

async function executeUpdate(query, context, graph) {
    return new Promise(async (resolve, reject) => {
        try {

            const fullUrl = url.parse(graph)
            const realGraphUrl = graph.replace(`${fullUrl.protocol}//${fullUrl.host}`, process.env.REACT_APP_BACKEND) + `?update=${encodeURIComponent(query)}`
    
            const config = {
                method: 'post',
                url: realGraphUrl
            };
    
            if (context.token && context.user) {
                config.headers = {
                    'Authorization': `Bearer ${context.token}`
                }
            }
    
            const results = await axios(config)
            resolve(results)
        } catch (error) {
            console.log('error', error)
            reject(error)
        }
    })
}

function executeQuery(query, context) {
    return new Promise(async (resolve, reject) => {
        try {
            const newQuery = await adaptQuery(query, context.activeGraphs)
            const url = `${process.env.REACT_APP_BACKEND}/lbd/${context.currentProject.projectId}?query=${newQuery}`
            const results = await axios(setConfig(context, url))
            const selection = []
            results.data.results.results.bindings.forEach((binding) => {
                selection.push(binding)
            })
    
            resolve(selection)
    
        } catch (error) {
            console.log('query', query)
            reject(error)
        }
    })

}

function adaptQuery(query, graphs) {
    return new Promise((resolve, reject) => {
        try {
            let splitQuery = query.split('where')
            if (splitQuery.length <= 1) {
                splitQuery = query.split('WHERE')
            }

            graphs.forEach(graph => {
                splitQuery[0] = splitQuery[0] + `FROM <${graph}> `
            })

            let newQuery = splitQuery[0] + "WHERE" + splitQuery[1]
            resolve(encodeURIComponent(newQuery))
        } catch (error) {
            reject(error)
        }
    })
}

export default ClassificationPlugin