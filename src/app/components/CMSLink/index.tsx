import { sanitizeLink } from '@/app/utilities/sanitizeLink'
import { Media, Page } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { useWindowSize } from '@/app/utilities/useWindowSize'
import { InsetBlob } from '../Blobs/InsetBlob'
import { generatePolyBlob } from '@/app/utilities/blobFunctions'

export type LinkType = {
  type?: 'internal' | 'external' | 'media' | null | undefined
  newTab?: boolean | null
  internalLink?: (number | null) | Page
  externalLink?: string | null
  mediaLink?: Media | number | null | undefined
  linkText?: string | null | undefined
  className?: string
  isButton?: boolean
  inForeground?: boolean
}

export function CMSLink(props: LinkType) {
  const { type, className } = props
  const internalPage = props?.internalLink || { slug: 'home' }
  const externalPage = props?.externalLink || '/'
  const mediaLink = props?.mediaLink
  const linkText = props?.linkText
  const newTab = props.newTab || false

  let href = ''

  if (type === 'external') {
    href = sanitizeLink(externalPage)
  } else if (type === 'internal' && typeof internalPage === 'object') {
    const { slug } = internalPage
    href = '/' + slug
  } else if (
    type === 'media' &&
    typeof mediaLink === 'object' &&
    typeof mediaLink?.url === 'string'
  ) {
    href = mediaLink.url
  } else {
    href = '/'
  }

  if (props.isButton === false) {
    return (
      <Link
        href={href}
        target={newTab ? '_blank' : ''}
        rel="noopener noreferrer"
        className={`cmslink hover:underline ${className}`}
      >
        {typeof linkText === 'string' && linkText}
      </Link>
    )
  }

  const blob = generatePolyBlob(7, 35, 50, { x: 50, y: 50, position: 'fixed' })

  return (
    <div className={`relative ${className}`}>
      <div className="absolute size-full">
        <InsetBlob polyBlob={blob} inForeground={props.inForeground}></InsetBlob>
      </div>
      <Link
        href={href}
        target={newTab ? '_blank' : ''}
        rel="noopener noreferrer"
        className={`cmslink text-lg text-white font-bold text-center z-20 relative inline-block my-4 mx-10`}
      >
        {typeof linkText === 'string' && linkText}
      </Link>
    </div>
  )
}
