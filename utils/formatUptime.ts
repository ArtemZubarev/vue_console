import duration from 'dayjs/plugin/duration'
import { ILocaleReductions } from './uptimeLocales'

export const formatUptime = (duration: duration.Duration, locale: ILocaleReductions) => duration.format('Y[y] M[m] D[d] H[h] m[min] s[s]')
  .replace(/\b0y\b/, '')
  .replace(/\b0m\b/, '')
  .replace(/\b0d\b/, '')
  .replace(/\b0h\b/, '')
  .replace(/\b0min\b/, '')
  .replace(/y\b/, locale.y)
  .replace(/m\b/, locale.m)
  .replace(/d\b/, locale.d)
  .replace(/h\b/, locale.h)
  .replace(/min\b/, locale.min)
  .replace(/s\b/, locale.s)

export default formatUptime
