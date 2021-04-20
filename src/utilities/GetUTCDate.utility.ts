import { startOfMonth, add } from 'date-fns'

export const getUTCDate = (date: Date) => {
  return {
    startOfMonth: startOfMonth(date).toISOString(),
    endOfMonth: startOfMonth(add((date), {
      months: 1
    })).toISOString()
  }
}