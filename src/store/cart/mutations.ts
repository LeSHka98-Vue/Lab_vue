import { MutationTree } from 'vuex';
import CartState from '@/store/cart/interface';
import { Product } from '@/store/types/interfaces'

const mutations: MutationTree<CartState> = {
  AddProduct(state, productId:number) {
    state.products.push(productId)
  },
  RemoveProduct(state, productId:number) {
    state.products = state.products.filter((id) => id !== productId)
  },
  CleanCart(state) {
    state.products = []
    console.log(state.products)
  }
}

export default mutations
