import { Module } from 'vuex';
import { RootState } from '@/store/types/interfaces'
import CartState from '@/store/cart/interface';
import mutations from '@/store/cart/mutations';
import getters from '@/store/cart/getters'

const state:CartState = {
  products: []
}

const cart: Module<CartState, RootState> = {
  state,
  mutations,
  getters,
  namespaced: true
}

export default cart
