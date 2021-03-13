//import ontology-classes for classification
import CDOclasses from './ConcreteCDO'
import MWVDTimberclasses from './TimberMWVD'
import MWVDNaturalStoneclasses from './NaturalStoneMWVD'
import MWVDPaperclasses from './PaperMWVD'
import MWVDTextileclasses from './TextileMWVD'

//add array of ontology-classes
const classificationOntologies = [
    CDOclasses,
    MWVDTimberclasses,
    MWVDNaturalStoneclasses,
    MWVDPaperclasses,
    MWVDTextileclasses
]

//assign label visible in user interface
const classificationOntologyLabels = [
    'Concrete Damage (CDO)',
    'Timber damage (MVW-D)',
    'Natural stone damage (MVW-D)',
    'Paper damage (MVW-D)',
    'Textile damage (MVW-D)'
]

//assign prefix to be used with ontology's classes
const classificationOntologyPrefixes = [
    'cdo:',
    'mvw-d:',
    'mvw-d:',
    'mvw-d:',
    'mvw-d:',
]

    

export {classificationOntologies, classificationOntologyLabels, classificationOntologyPrefixes}
