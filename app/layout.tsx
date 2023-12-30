import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from './providers/ThemeProvider'
import axios from 'axios'


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
  
//<a href="/" id='logout'>Logout</a>
//

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body>
        <div className="topnav">
          <a href="/">Home</a>
          <div className="topnav-right">
            <button type='submit' id='logout'>Logout</button>
            
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
