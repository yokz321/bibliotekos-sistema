export interface IAuthor {
  id: string
  name: string
  biography?: string
}

export interface IPublisher {
  id: string
  name: string
  location?: string
}

export interface IBook {
  id: string
  title: string
  author: IAuthor
  publisher: IPublisher
  year: number
  isbn?: string
}
