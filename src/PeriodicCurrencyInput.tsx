import React, { Dispatch, SetStateAction, useState } from 'react'
import { numberToUSD, USDToNumber } from './Formatter'

export enum Periods {
  // eslint-disable-next-line no-unused-vars
  weekly = 'weekly',
  // eslint-disable-next-line no-unused-vars
  biweekly = 'biweekly',
  // eslint-disable-next-line no-unused-vars
  bimonthly = 'bimonthly',
  // eslint-disable-next-line no-unused-vars
  monthly = 'monthly',
  // eslint-disable-next-line no-unused-vars
  quarterly = 'quarterly',
  // eslint-disable-next-line no-unused-vars
  yearly = 'yearly',
}

interface IPeriodYearlyConversionFactor {
  weekly: number;
  biweekly: number;
  bimonthly: number;
  monthly: number;
  quarterly: number;
  yearly: number;
}

const periodYearlyConversionFactor: IPeriodYearlyConversionFactor = {
  weekly: 52,
  biweekly: 26,
  bimonthly: 24,
  monthly: 12,
  quarterly: 4,
  yearly: 1
}

const periodLabel = (period: Periods) =>
  period.charAt(0).toUpperCase() + period.slice(1)

export const PeriodicCurrencyInput = (
  { name, initialPeriod, yearlyValue, setYearlyAmount }: {
    name: string,
    initialPeriod: Periods,
    yearlyValue: string,
    setYearlyAmount: Dispatch<SetStateAction<string>>
  }
) => {
  const [amount, setAmount] = useState('$0.00')
  const [period, setPeriod] = useState(initialPeriod)

  const handleAmountChange = (amount: string) => {
    setAmount(amount)
    setYearlyAmount(
      numberToUSD(USDToNumber(amount) * periodYearlyConversionFactor[period])
    )
  }

  const handlePeriodChange = (period: Periods) => {
    setPeriod(period)
    setYearlyAmount(
      numberToUSD(USDToNumber(amount) * periodYearlyConversionFactor[period])
    )
  }

  return <>
    <h2>{name}</h2>
    <div>
      <label>
        Amount:
        <input
          type="text"
          name="budget"
          value={amount}
          onChange={(e) =>
            handleAmountChange(e.target.value)
          }
        />
      </label>
    </div>
    <div>
      <label>
        Period:
        <select
          value={period}
          onChange={(e) =>
            handlePeriodChange(Periods[e.target.value as keyof typeof Periods])
          }
        >
          {Object
            .keys(Periods)
            .map((budgetPeriod) =>
              <option key={budgetPeriod} value={budgetPeriod}>
                {periodLabel(Periods[budgetPeriod as keyof typeof Periods])}
              </option>
            )
          }
        </select>
      </label>
    </div>
    Yearly {name}: {yearlyValue}
  </>
}
