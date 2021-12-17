interface Category {
  id: number,
  image: string,
  signature: string,
  category: string,
  platform?: string
}

export type CategoryArray = Array<Category>

interface Product {
  genre: string,
  rating: number
}
