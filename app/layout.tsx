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
    <html lang="it">
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
