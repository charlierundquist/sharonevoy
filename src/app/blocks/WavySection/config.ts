import { Block } from 'payload'
import { WavySectionFields } from './field'

export const WavySection: Block = {
  slug: 'wavy-section',
  interfaceName: 'WavySection',
  labels: {
    singular: 'Full-Width Section',
    plural: 'Full-Width Sections',
  },
  fields: WavySectionFields(),
}
