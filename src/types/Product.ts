export interface Rating {
  rate: string
  count: number
}

export interface Product {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}
