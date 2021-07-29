import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { CurrencyInput } from './CurrencyInput'

test('sets and formats currency', () => {
  const setValue = jest.fn()

  render(<CurrencyInput
    name="test"
    value={'$0.00'}
    setValue={setValue}
  />)

  const currencyValueInput = screen.getByLabelText('Amount:')

  fireEvent.change(currencyValueInput, { target: { value: '4' } })

  expect(setValue).toBeCalledWith('$4.00')
})
