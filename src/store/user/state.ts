import { Module } from 'vuex';
import { RootState } from '@/store/types/interfaces'
import UserState from '@/store/user/interface';
import mutations from '@/store/user/mutations';
import getters from '@/store/user/getters';

const state: UserState = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  sex: 'male',
  age: undefined,
  address: '',
  shippingAddress: '',
  paymentCard: undefined
}

const user: Module<UserState, RootState> = {
  state,
  mutations,
  getters,
  namespaced: true
}

export default user
