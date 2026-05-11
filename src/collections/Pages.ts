import { ShowcaseWavySection } from '@/app/blocks/ShowcaseWavySection/config'
import { WavySection } from '@/app/blocks/WavySection/config'
import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionConfig } from 'payload'

export const revalidateFunction: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  try {
    const docSlug = doc.slug
    const previousDocSlug = previousDoc.slug
    revalidateTag(`page_${docSlug}`)
    revalidateTag(`page_${previousDocSlug}`)
    console.log(`Revalidated services cache for: ${doc.title}`)
  } catch (error) {
    console.error('Error revalidating services cache:', error)
  }
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateFunction],
  },
  folders: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroSize',
              type: 'radio',
              defaultValue: 'small',
              options: [
                {
                  label: 'Large',
                  value: 'large',
                },
                {
                  label: 'Small',
                  value: 'small',
                },
              ],
            },
            {
              name: 'heroText',
              type: 'text',
              required: true,
              defaultValue: 'Page Title',
            },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              name: 'pageContent',
              type: 'blocks',
              blocks: [WavySection, ShowcaseWavySection],
            },
          ],
        },
      ],
    },
  ],
}
