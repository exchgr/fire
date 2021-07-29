import React, { Dispatch, SetStateAction, useState } from 'react'
import { numberToPercent, percentToNumber } from './Formatter'

export const RateInput = (
  { name, value, setValue }:
  {
    name: string,
    value: number,
    setValue: Dispatch<SetStateAction<number>>
  }) => {
  const [amount, setAmount] = useState(numberToPercent(value))

  const handleAmountChange = (amount: string) => {
    setAmount(amount)
    setValue(percentToNumber(amount))
  }

  return <>
    <h2>{name}</h2>
    <label>
      Rate:
      <input
          type='text'
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
      />
    </label>
  </>
}
