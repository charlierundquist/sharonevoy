import React from 'react'
import './styles.css'
import NavBarComponent from '../components/NavBar'
import { FooterComponent } from '../components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Hi, I\'m Sharon. I play with words.',
  title: 'Sharon Evoy',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
      </head>
      <body suppressHydrationWarning className="bg-background max-w-screen overflow-x-clip">
        <header>
          <NavBarComponent></NavBarComponent>
        </header>
        <main>{children}</main>
        <footer>
          <FooterComponent></FooterComponent>
        </footer>
      </body>
    </html>
  )
}
