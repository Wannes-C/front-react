//import ontology-classes for tasks
import TimberMWV from './TimberMWV'
import FungiMWV from './FungiMWV'
import InsectMWV from './InsectMWV'
import PreventionMWV from './PreventionMWV'

//add array of ontology-classes
const taskOntologies = [
    TimberMWV,
    FungiMWV,
    InsectMWV,
    PreventionMWV,
]

//assign label visible in user interface
const taskOntologyLabels = [
    'Degraded timber repair (MVW-T)',
    'Fungi control (MVW-T)',
    'Insect control (MVW-T)',
    'Insects-and-fungi-prevention (MVW-T)',
]

//assign prefix to be used with ontology's classes
const taskOntologyPrefixes = [
    'mvw-t:',
    'mvw-t:',
    'mvw-t:',
    'mvw-t:',
]

    

export {taskOntologies, taskOntologyLabels, taskOntologyPrefixes}
