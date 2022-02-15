import { GetterTree } from 'vuex';
import CartState from '@/store/cart/interface';
import { RootState } from '@/store/types/interfaces'

const getters: GetterTree<CartState, RootState> = {
  getCartProducts(state):number[] {
    return state.products
  }
}

export default getters
