import { Block } from 'payload'
import { WavySectionFields } from '../WavySection/field'

export const ShowcaseWavySection: Block = {
  slug: 'showcase-wavy-section',
  interfaceName: 'ShowcaseWavySection',
  labels: {
    singular: 'Showcase Wavy Section',
    plural: 'Showcase Wavy Sections',
  },
  fields: [
    {
      name: 'upperContent',
      label: 'Upper Content',
      type: 'group',
      fields: WavySectionFields(true),
    },
    {
      name: 'showcaseImage',
      label: 'Showcase Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'lowerContent',
      label: 'Lower Content',
      type: 'group',
      fields: WavySectionFields(true),
    },
  ],
}
