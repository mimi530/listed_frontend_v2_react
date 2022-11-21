import React from 'react'
import { FaPlus } from 'react-icons/fa'
import i18n from '../i18n'

export const AddForm = ({handleSubmit, placeholder, setValue, value}) => {
  return (
    <form className="mt-10" onSubmit={handleSubmit}>
        <div className="relative mt-1 rounded-md shadow-md">
        <input type="text" name="item_name" id="item_name" className="block px-4 py-4 w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-secondary dark:text-white dark:placeholder:text-white" placeholder={i18n.t(placeholder)} value={value} onChange={setValue}/>
        <div className="absolute inset-y-0 right-0 flex items-center">
            <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mr-2">
            <FaPlus/>
        </button>
        </div>
        </div>
    </form>
  )
}
