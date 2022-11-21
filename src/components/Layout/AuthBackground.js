import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const AuthBackground = ({children}) => {
  return (
    <body className="h-screen w-full flex flex-col bg-gray-100 dark:bg-accent">
      <Navbar/>
      <main className="w-full bg-gray-100 dark:bg-accent overflow-y-auto">
        {children}
      </main>
    </body>
  )
}
