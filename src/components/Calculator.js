import React, { useState } from 'react'
import i18n from '../i18n'

export const Calculator = () => {
  const [sum, setSum] = useState(0)
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.value === '-') {
      if(price) {
        setSum( prevSum => {
          return prevSum - price
        })
      }
    } else if(e.target.value === '+') {
      if(price) {
        setSum( prevSum => {
          return parseFloat(prevSum) + parseFloat(price)
        })
      }
    }
  }

  return (
    <div className="w-100 p-5 mt-8 text-accent rounded-lg shadow-lg bg-white">
      <p className="mb-2 text-center text-md font-medium">
          {i18n.t('Shopping calculator')}
      </p>
        <input type="text" disabled value={i18n.t('Sum: ') + sum.toFixed(2) + ' zł'} className="input is-static is-disabled p-4 has-text-right bg-gray-100 rounded-lg disabled text-right w-full"/>
        <div className="flex mt-3 gap-3 justify-center items-center">
          <input type="number" className="bg-gray-100 rounded-lg p-3 w-1/2" onClick={(e) => {e.target.value=''}} value={price} onChange={(e) => setPrice(e.target.value)} placeholder={i18n.t('Item price')}/>   
          <input type="button" value="-" className="bg-yellow-400 w-1/4 rounded-lg p-3 cursor-pointer hover:bg-yellow-500" onClick={(e) => handleSubmit(e)}/>
          <input type="submit" value="+" className="bg-green-400 w-1/4 rounded-lg p-3 cursor-pointer hover:bg-green-500" onClick={(e) => handleSubmit(e)}/>
        </div>
    </div>
  )
}
