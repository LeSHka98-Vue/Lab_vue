import { Sex } from '@/store/types/types'

interface UserState {
  id?: number,
  login: string,
  password: string,
  role?: string, // !!!!!!!!!!!!!!!!!
  firstName?: string,
  lastName?: string,
  sex?: Sex,  
  age?: number | undefined,
  address?: string,
  shippingAddress?: string,
  paymentCard?: number | undefined
}

export default UserState
