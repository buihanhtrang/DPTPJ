import './globals.css'
import type { Metadata } from 'next'
import { Raleway, Lato, Montserrat, Open_Sans } from 'next/font/google'
import Providers from './providers'

const inter = Open_Sans({ subsets: ['latin'], })

export const metadata: Metadata = {
  title: 'Ashleys Furniture',
  description: 'Ashleys Furniture App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
