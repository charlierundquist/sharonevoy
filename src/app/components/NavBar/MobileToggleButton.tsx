'use client'

import { cssVariables } from '@/app/utilities/cssVariables'
import { useWindowSize } from '@/app/utilities/useWindowSize'
import { useEffect, useState } from 'react'

export function MobileToggleButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const windowSize = useWindowSize()

  useEffect(() => {
    setIsExpanded(false)
  }, [windowSize])

  if (windowSize.width >= cssVariables.breakpoints.md) return

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={`mobile-menu-expanded-${isExpanded} absolute h-6 w-12 left-1/2 top-4 -translate-x-1/2 md:hidden`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="fill-background size-full"
        preserveAspectRatio="none"
      >
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
      </svg>
    </button>
  )
}
