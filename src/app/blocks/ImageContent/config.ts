import { Block } from 'payload'

export const ImageContent: Block = {
  slug: 'image-content',
  interfaceName: 'ImageContent',
  labels: {
    singular: 'Image Block',
    plural: 'Image Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
