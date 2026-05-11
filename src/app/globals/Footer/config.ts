import { linkField } from '@/app/fields/link'
import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  hooks: {
    afterChange: [() => revalidateTag('global_footer')],
  },
  fields: [
    {
      name: 'Quick Links',
      type: 'array',
      maxRows: 6,
      fields: [linkField()],
    },
    {
      name: 'Contact Info',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'New Line',
          type: 'richText',
        },
      ],
    },
  ],
}
