interface Category {
  id: number,
  image: string,
  signature: string,
  category: string,
  platform?: string
}

interface Product {
  id: number,
  image: string,
  name:string,
  genre: string,
  rating: number,
  description: string
}

export {
  Category,
  Product
}
