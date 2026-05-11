import { linkField } from '@/app/fields/link'
import { Block } from 'payload'

export const TextContent: Block = {
  slug: 'text-content',
  interfaceName: 'TextContent',
  labels: {
    singular: 'Text Content Block',
    plural: 'Text Content Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
    },
    {
      name: 'links',
      type: 'array',
      fields: [linkField()],
      maxRows: 2,
    },
  ],
}
