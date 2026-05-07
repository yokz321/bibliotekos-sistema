export interface IAuthor {
  id: string
  firstName: string
  lastName: string
  biography?: string
}

export interface IPublisher {
  id: string
  name: string
  location?: string
}

export interface IBook {
  id?: string
  inventoryNumber: string
  isbn: string
  title: string
  author: IAuthor
  publisher: IPublisher
  year: number
  price: number
  annotation?: string
}
