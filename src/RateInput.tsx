import React, { Dispatch, SetStateAction } from 'react'

export const RateInput = (
  { name, value, setValue }:
  {
    name: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
  }) => {
  const handleValueChange = (value: string) => {
    setValue(value)
  }

  return <>
    <h2>{name}</h2>
    <label>
      Rate:
      <input
        type='text'
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </label>
  </>
}
