interface RootState {
  isAuthorized:boolean | undefined,
  modalShown:number | undefined,
  errorLogger:any[],
  warningLogger:any[]
}

interface Category {
  id: number,
  image: string,
  signature: string,
  category: string,
  platform?: string
}

interface systemRequirements {
  CPU: string,
  RAM: string,
  VIDEO_CARD: string
}

interface Product {
  id: number,
  image: string,
  name:string,
  genre: string,
  rating: number,
  description: string,
  price: number,
  publisher?: string,
  country?: string,
  edition?:string,
  releaseDate?: Date,
  announcementDate?: Date,
  tages?: string,
  systemRequirements?: systemRequirements
}

export {
  Category,
  Product,
  RootState
}
