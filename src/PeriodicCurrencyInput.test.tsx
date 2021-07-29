import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { PeriodicCurrencyInput, Periods } from './PeriodicCurrencyInput'

test('converts values to yearly state', () => {
  const setYearlyValue = jest.fn()

  render(<PeriodicCurrencyInput
    name={'test'}
    initialPeriod={Periods.monthly}
    yearlyValue={'$0.00'}
    setYearlyAmount={setYearlyValue}
  />)

  const budgetInput = screen.getByLabelText('Amount:')
  fireEvent.change(budgetInput, { target: { value: '5' } })

  expect(setYearlyValue).toBeCalledWith('$60.00')
})

test('converts values to yearly state from other periods', () => {
  const setYearlyValue = jest.fn()

  render(<PeriodicCurrencyInput
    name={'test'}
    initialPeriod={Periods.monthly}
    yearlyValue={'$0.00'}
    setYearlyAmount={setYearlyValue}
  />)

  const budgetInput = screen.getByLabelText('Amount:')
  fireEvent.change(budgetInput, { target: { value: '5' } })

  const budgetPeriodInput = screen.getByLabelText('Period:')
  fireEvent.change(budgetPeriodInput, { target: { value: 'weekly' } })

  expect(setYearlyValue).toBeCalledWith('$260.00')
})
