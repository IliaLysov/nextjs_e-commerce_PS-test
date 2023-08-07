import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppProvider from './AppProvider'

import { Header } from '@/components'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plant-Store',
  description: 'Маркетплейс растений',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header/>
          <main>
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  )
}
