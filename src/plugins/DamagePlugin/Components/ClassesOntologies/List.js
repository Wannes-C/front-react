//import ontology-classes for classification
import CDOclasses from './ConcreteCDO'
import MWVDTimberclasses from './TimberMWVD'
import MWVDNaturalStoneclasses from './NaturalStoneMWVD'
import MWVDPaperclasses from './PaperMWVD'
import MWVDTextileclasses from './TextileMWVD'

const classificationOntologies = [
    CDOclasses,
    MWVDTimberclasses,
    MWVDNaturalStoneclasses,
    MWVDPaperclasses,
    MWVDTextileclasses
]

const classificationOntologyLabels = [
    'Concrete Damage (CDO)',
    'Timber damage (MVW-D)',
    'Natural stone damage (MVW-D)',
    'Paper damage (MVW-D)',
    'Textile damage (MVW-D)'
]

    

export {classificationOntologies, classificationOntologyLabels}
