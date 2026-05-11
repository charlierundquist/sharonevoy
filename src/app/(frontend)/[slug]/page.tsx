import React from 'react'
import type { Page } from '@/payload-types'

import { RenderBlocks } from '@/app/blocks'
import { getPageCache } from '@/app/utilities/getPage'
import { LargeHeroComponent } from '@/app/components/HeroSection/large'
import { SmallHeroComponent } from '@/app/components/HeroSection/small'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise

  const queryPage = await getPageCache(slug)()

  const page = queryPage.docs[0]

  if (!page) {
    return <div>page not found</div>
  }

  return (
    <>
      {page.heroSize === 'large' ? (
        <LargeHeroComponent text={page.heroText}></LargeHeroComponent>
      ) : (
        <SmallHeroComponent text={page.heroText}></SmallHeroComponent>
      )}
      <RenderBlocks blocks={page.pageContent}></RenderBlocks>
    </>
  )
}
