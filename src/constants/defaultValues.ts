import { Product } from '@/store/types/interfaces'

const productDefault:Product = {
  image: '',
  name: '',
  genre: 'shooter',
  rating: 0,
  description: '',
  price: 0,
  systemRequirements: {
    CPU: '',
    RAM: '',
    VIDEO_CARD: ''
  }
};
const platformsAll = ['pc', 'ps5', 'xbox']

enum FiltrationTypes {
  all = 'All',
  genre = 'genre',
  price = 'price'
}

export {
  FiltrationTypes,
  productDefault,
  platformsAll
}
