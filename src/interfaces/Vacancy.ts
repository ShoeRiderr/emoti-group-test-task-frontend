export interface VacancyCollection {
  '@context': string
  '@id': string
  '@type': string
  "hydra:totalItems": Number
  "hydra:member"?: Vacancy[]
  "totalPrice": Number
  "totalPriceFormatted": Number
  "hydra:view": {
      "@id": String
      "@type": String
  }

}

export interface Vacancy {
    '@context'?: string
    '@id': string
    '@type': string
    id: Number
    date: string
    free: Number
    price: Number
    createdAt: string
    updatedAt: string
    formatedDate: string
    floatPrice: Number
    formatedCreatedAt: string
    formatedUpdatedAt: string
  }