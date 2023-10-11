import type { ReservationCollection } from "./Reservation"

export interface User {
  '@context'?: string
  '@id'?: string
  '@type'?: string
  id: Number
  name: string
  email: string
  token?: string
  roles: Array<string>
  reservations?: ReservationCollection
}
