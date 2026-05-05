export interface Author {
  _id: string
  name: string
}

export interface Publisher {
  _id: string
  name: string
}

export interface Book {
  _id: string
  title: string
  author: Author
  publisher: Publisher
  year: number
  isbn?: string
}
