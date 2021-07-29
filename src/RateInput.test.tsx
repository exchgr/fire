import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RateInput } from './RateInput'

test('sets and formats the rate', () => {
  const setValue = jest.fn()

  render(<RateInput
    name="test"
    value={0.04}
    setValue={setValue}
  />)

  const currencyValueInput = screen.getByLabelText('Rate:')

  fireEvent.change(currencyValueInput, { target: { value: '5%' } })

  expect(setValue).toBeCalledWith(0.05)
})
