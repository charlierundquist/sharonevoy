import { Field } from 'payload'
import { TextContent } from '../TextContent/config'
import { ImageContent } from '../ImageContent/config'

export function WavySectionFields(disableBackground?: boolean): Field[] {
  return [
    {
      name: 'depth',
      label: disableBackground
        ? 'Content Depth (showcase sections are always in the foreground)'
        : 'Content Depth',
      required: true,
      defaultValue: 'foreground',
      access: {
        update: ({ req: { user } }) => {
          return disableBackground === true ? false : true
        },
      },
      type: 'radio',
      options: [
        {
          label: 'Foreground',
          value: 'foreground',
        },
        {
          label: 'Background',
          value: 'background',
        },
      ],
    },
    {
      name: 'highlightImage',
      label: 'Add a highlight image?',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => {
          if (siblingData.depth === 'foreground') return true
          return false
        },
      },
    },
    {
      name: 'layout',
      label: 'Layout/Appearance',
      required: true,
      defaultValue: 'oneColumn',
      type: 'select',
      options: [
        {
          label: 'One Column',
          value: 'oneColumn',
        },
        {
          label: 'Two Columns',
          value: 'twoColumn',
        },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [TextContent, ImageContent],
      admin: {
        condition: (_, siblingData) => {
          if (siblingData.layout === 'oneColumn') return true
          return false
        },
      },
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => {
          if (siblingData.layout === 'twoColumn') return true
          return false
        },
      },
      fields: [
        {
          name: 'columnOneContent',
          label: 'Column One Content',
          type: 'blocks',
          blocks: [TextContent, ImageContent],
          admin: {
            style: {
              marginInlineEnd: '10%',
            },
          },
        },
        {
          name: 'columnTwoContent',
          label: 'Column Two Content',
          type: 'blocks',
          blocks: [TextContent, ImageContent],
          admin: {
            style: {
              marginInlineEnd: '10%',
            },
          },
        },
      ],
    },
  ]
}
