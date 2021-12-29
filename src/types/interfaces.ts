interface Category {
  id: number,
  image: string,
  signature: string,
  category: string,
  platform?: string
}

// export type CategoryArray = Array<Category>

interface Product {
  id: number,
  image: string,
  name:string,
  genre: string,
  rating: number,
  description: string,
  publisher?: string,
  country?: string,
  edition?:string,
  releaseDate?: Date,
  announcementDate?: Date,
  tages?: string,
  systemRequirements?: string
}

export {
  Category,
  Product
}
