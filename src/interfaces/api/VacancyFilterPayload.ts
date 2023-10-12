import type { DateRange } from './DateRangeInterface'
import type { GetCollectionInterface } from './GetCollectionInterface'

export interface VacancyFilterPayload extends DateRange, GetCollectionInterface {
  free?: Number
}
