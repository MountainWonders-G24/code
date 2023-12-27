import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import ThemeProvider from './providers/ThemeProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MountainWonders',
  description: 'MountainWonders - Il sito per gli amanti della montagna',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body>
        <div className="topnav">
          <a href="/">Home</a>
          <div className="topnav-right">
            <a href="/">Supporto</a>
            <a href="/auth/login/">Profile</a>
          </div>
        </div>


        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>

    </html>
  )
}
