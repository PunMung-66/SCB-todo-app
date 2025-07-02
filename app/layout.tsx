import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'SCB Checklist',
    description: 'Created with v0',
    generator: 'v0.dev',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
      <html lang="en">
          <link rel="icon" href="./logo-icon.png" sizes="any" />
            <body>{children}</body>
        </html>
    )
}
