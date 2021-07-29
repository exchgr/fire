import React, { useState } from 'react'
import './FireCalculator.css'
import { PeriodicCurrencyInput, Periods } from './PeriodicCurrencyInput'
import { CurrencyInput } from './CurrencyInput'
import { RateInput } from './RateInput'
import { numberToDuration, numberToUSD } from './Formatter'

const monthlyContribution = (netIncomeYearlyValue: number, budgetYearlyValue: number) =>
  (netIncomeYearlyValue - budgetYearlyValue) / 12

function FireCalculator () {
  const [expensesBeforeYearlyValue, setExpensesBeforeYearlyValue] = useState(0)
  const [expensesAfterYearlyValue, setExpensesAfterYearlyValue] = useState(0)
  const [netIncomeYearlyValue, setNetIncomeYearlyValue] = useState(0)
  const [currentSavings, setCurrentSavings] = useState(0)
  const [withdrawalRate, setWithdrawalRate] = useState(0.04)
  const [annualPercentageYield, setAnnualPercentageYield] = useState(0.07)

  return (
    <>
      <h1>🔥FIRE🔥</h1>
      <form>
        <PeriodicCurrencyInput
          name='Expenses Before Retirement'
          initialPeriod={Periods.monthly}
          yearlyValue={expensesBeforeYearlyValue}
          setYearlyAmount={setExpensesBeforeYearlyValue}
        />

        <PeriodicCurrencyInput
          name='Expenses After Retirement'
          initialPeriod={Periods.monthly}
          yearlyValue={expensesAfterYearlyValue}
          setYearlyAmount={setExpensesAfterYearlyValue}
        />

        <PeriodicCurrencyInput
          name='Net Income'
          initialPeriod={Periods.bimonthly}
          yearlyValue={netIncomeYearlyValue}
          setYearlyAmount={setNetIncomeYearlyValue}
        />

        <CurrencyInput
          name="Current Savings"
          value={currentSavings}
          setValue={setCurrentSavings}
        />

        <RateInput
          name="Withdrawal Rate"
          value={withdrawalRate}
          setValue={setWithdrawalRate}
        />

        <RateInput
          name="Annual Percentage Yield"
          value={annualPercentageYield}
          setValue={setAnnualPercentageYield}
        />

        <h2>Total savings needed</h2>
        {numberToUSD(totalSavingsNeeded(
          expensesAfterYearlyValue,
          withdrawalRate
        ))}

        <h2>Remaining savings needed</h2>
        {numberToUSD(remainingSavingsNeeded(
          expensesAfterYearlyValue,
          withdrawalRate,
          currentSavings
        ))}

        <h2>Monthly contribution</h2>
        {numberToUSD(monthlyContribution(
          netIncomeYearlyValue,
          expensesBeforeYearlyValue
        ))}

        <h2>Time to retire</h2>
        {numberToDuration(timeToRetire(
          totalSavingsNeeded(
            expensesAfterYearlyValue,
            withdrawalRate
          ),
          currentSavings,
          annualPercentageYield,
          monthlyContribution(
            netIncomeYearlyValue,
            expensesAfterYearlyValue
          ),
          12 // TODO: make a form field for this
        ))}
      </form>
    </>
  )
}

const totalSavingsNeeded = (budgetYearlyValue: number, withdrawalRate: number) =>
  budgetYearlyValue / withdrawalRate

const remainingSavingsNeeded = (budgetYearlyValue: number, withdrawalRate: number, currentSavings: number) =>
  totalSavingsNeeded(
    budgetYearlyValue,
    withdrawalRate
  ) - currentSavings

const timeToRetire = (
  totalSavingsNeeded: number,
  currentSavings: number,
  annualPercentageYield: number,
  monthlyContribution: number,
  compoundFrequency: number
) => {
  return Math.log(
    (totalSavingsNeeded * annualPercentageYield + monthlyContribution * compoundFrequency) /
    (currentSavings * annualPercentageYield + monthlyContribution * compoundFrequency)
  ) / (compoundFrequency * Math.log(1 + annualPercentageYield / compoundFrequency))
}

export default FireCalculator
