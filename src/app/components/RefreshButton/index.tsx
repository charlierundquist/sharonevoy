'use client'

import { useEffect } from 'react'
import { RefreshButtonFunction } from './function'

export function RefreshButton() {
  useEffect(() => {
    setInterval(() => {
      RefreshButtonFunction()
    }, 5000)
  }, [])

  return <div></div>
}
