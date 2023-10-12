import type { DateRange } from './DateRangeInterface'
import type { GetCollectionInterface } from './GetCollectionInterface'

export interface ReservationSavePayload extends DateRange, GetCollectionInterface {
  bookedPlaces: Number
}
