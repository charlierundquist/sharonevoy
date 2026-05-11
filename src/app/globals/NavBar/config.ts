import { linkField } from '@/app/fields/link'
import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

export const NavBar: GlobalConfig = {
  slug: 'navbar',
  label: 'NavBar',
  hooks: {
    afterChange: [() => revalidateTag('global_navbar')],
  },
  fields: [
    {
      name: 'Links',
      type: 'array',
      maxRows: 6,
      fields: [linkField()],
    },
  ],
}
