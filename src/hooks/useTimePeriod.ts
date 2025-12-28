import { useState } from 'react'

export type TimePeriod = '7' | '30' | '90'

interface UseTimePeriodReturn {
  timePeriod: TimePeriod
  setTimePeriod: (period: TimePeriod) => void
}

export function useTimePeriod(initialPeriod: TimePeriod = '30'): UseTimePeriodReturn {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(initialPeriod)

  return {
    timePeriod,
    setTimePeriod,
  }
}
