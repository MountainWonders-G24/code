import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import ThemeProvider from './providers/ThemeProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MountainWonders',
  description: 'Next App generation: shop online',
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



        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>

    </html>
  )
}
