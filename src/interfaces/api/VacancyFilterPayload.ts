import type { DateRange } from "./DateRangeInterface";

export interface VacancyFilterPayload extends DateRange {
    free: Number;
}