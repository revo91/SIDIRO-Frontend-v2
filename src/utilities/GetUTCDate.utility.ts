import { startOfMonth, startOfDay, add } from 'date-fns'

export const getUTCDate = (date: Date) => {
  return {
    startOfMonth: startOfMonth(date).toISOString(),
    endOfMonth: startOfMonth(add((date), {
      months: 1
    })).toISOString(),
    startOfDay: startOfDay(date).toISOString(),
    endOfDay: startOfDay(add((date), {
      days: 1
    })).toISOString(),
  }
}