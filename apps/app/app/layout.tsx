import LayoutHeader from '@app/components/layout/Header'
import { QueryClientProvider } from '@app/components/providers/QueryClientProvider'
import { Toaster } from '@app/components/ui/toaster'
import { cn } from '@app/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'B2B Sales',
  description: 'Silver.Dev Challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider>
      <html lang="en">
        <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
          <LayoutHeader />
          <div className="p-5">{children}</div>
          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  )
}
