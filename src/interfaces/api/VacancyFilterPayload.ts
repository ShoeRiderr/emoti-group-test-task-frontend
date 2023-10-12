import type { DateRange } from './DateRangeInterface'

export interface VacancyFilterPayload extends DateRange {
  free?: Number
  excludeNotAvailable?: Boolean
  excludePast?: Boolean
  itemsPerPage?: Number
}
