import type { DateRange } from "./DateRangeInterface";

export interface ReservationSavePayload extends DateRange {
    bookedPlaces: Number;
}