import React from 'react'
import './styles.css'
import NavBarComponent from '../components/NavBar'
import { FooterComponent } from '../components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js"></script>
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
