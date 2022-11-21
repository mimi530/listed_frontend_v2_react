import React from 'react'
import { Footer } from './Footer'

export const GuestBackground = ({children}) => {
  return (
    <body className="h-screen w-full flex flex-col bg-gray-100 dark:bg-accent">
      <main className="w-full bg-gray-100 dark:bg-accent overflow-y-auto">
        {children}
      </main>
      <Footer/>
    </body>
  )
}
