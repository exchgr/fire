import React, { Dispatch, SetStateAction, useState } from 'react'
import { numberToUSD, USDToNumber } from './Formatter'

export const CurrencyInput = (
  { name, value, setValue }: {
    name: string,
    value: number,
    setValue: Dispatch<SetStateAction<number>>
  }) => {
  const [amount, setAmount] = useState(numberToUSD(value))

  const handleAmountChange = (amount: string) => {
    setAmount(amount)
    setValue(USDToNumber(amount))
  }

  return <div>
      <h2>{name}</h2>
      <label>
        Amount:
        <input type='text' value={amount}
               onChange={(e) => handleAmountChange(e.target.value)}/>
      </label>
    </div>
}
