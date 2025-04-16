import type { Metadata } from 'next'
import './globals.css'
import { AuthContextProvider } from '../context/AuthProvider'
import { Roboto } from 'next/font/google';

const mainFontFamily = Roboto({
  weight : ['400'],
  subsets: ['latin'],

});

export const metadata: Metadata = {
  title: 'ID Cristã',
  description: 'Descrição do seu app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={mainFontFamily.className} cz-shortcut-listen="true">
      <AuthContextProvider>
        {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}