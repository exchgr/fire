import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const USDToNumber = (USD: string) =>
  parseFloat(USD.replaceAll(/[$,]/g, ''))

export const numberToUSD = (number: number) =>
  number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })

export const percentToNumber = (value: string) =>
  parseFloat(value.replace(/%/, '')) / 100

export const numberToPercent = (number: number) =>
  (number / 100.0).toLocaleString('en-US', {
    style: 'percent'
  })
export const numberToDuration = (number: number) => dayjs.duration({ years: number }).humanize()
