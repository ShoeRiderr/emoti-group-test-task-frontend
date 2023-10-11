export interface ReservationCollection {
  '@context': string
  '@id': string
  '@type': string
  'hydra:totalItems': Number
  'hydra:member': Reservation[]
  'hydra:view': {
    '@id': String
    '@type': String
  }
}

export interface Reservation {
  '@context'?: string
  '@id': string
  '@type': string
  id: Number
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  price: Number
  bookedPlaces: Number
}
