import React, { Dispatch, SetStateAction } from 'react'

export function CurrencyInput (
  { name, value, setValue }: {
    name: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
  }) {
  const handleValueChange = (value: string) => {
    setValue(value)
  }

  return <div>
    <h2>{name}</h2>
    <label>
    Amount:
    <input type='text' value={value} onChange={(e) => handleValueChange(e.target.value)} />
  </label>
  </div>
}
