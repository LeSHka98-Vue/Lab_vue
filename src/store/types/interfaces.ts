import { AlertType, Genre } from '@/store/types/types'

interface RootState {
  isAuthorized:boolean | undefined,
  isLoading:boolean | undefined,
  modalShown:number | undefined,
  errorLogger:any[],
  warningLogger:any[],
  isAlert: boolean,
  type: AlertType,
  message: string,
  delay: number
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
  id?: number,
  image: string,
  name:string,
  genre: Genre,
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

interface Order {
  orderId: string,
  userId: number,
  productList: Array<number>,
  name: string,
  surName: string,
  phoneNumber: string,
  deliveryDate: string,
  status?: string,
  id?: number
}

export {
  Category,
  Product,
  RootState, 
  Order
}
