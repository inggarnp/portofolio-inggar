import type { Metadata } from 'next'
// @ts-ignore
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Inggar | Web Developer Portfolio',
  description: 'Portfolio website dari Inggar - Fresh Graduate Web Developer',
  keywords: ['Web Developer', 'React', 'Next.js', 'Portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-dark-400 text-dark-50">
        <Navbar />
        {children}
        
        {/* Footer */}
        <footer className="bg-dark-200 text-center py-8 px-6 border-t border-dark-300">
          <p className="text-dark-100">
            © 2026 Inggar. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  )
}