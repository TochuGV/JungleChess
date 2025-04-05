import Footer from '@/components/layout/Footer';
import Script from 'next/script'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-background-900 text-white">
        {children}
        <Footer />
      </body>
      <Script src="https://kit.fontawesome.com/16e46131e7.js" crossOrigin="anonymous"></Script>
    </html>
  )
}
