import { MutationTree } from 'vuex';
import UserState from './interface';
import { Sex } from '@/store/types/types'

const mutations: MutationTree<UserState> = {
  setUser(state, payload:UserState) {
    state = Object.assign(state, payload)
  },
  setLogin(state, payload: string) {
    state.login = payload
  },
  setPassword(state, payload: string) {
    state.password = payload
  },
  setId(state, payload: number) {
    state.id = payload
  },
  setFirstName(state, payload: string) {
    state.firstName = payload
    console.log(state.firstName)
  },
  setLastname(state, payload: string) {
    state.lastName = payload
  },
  setSex(state, payload: Sex) {
    state.sex = payload
  },
  setRole(state, payload: string) {
    state.role = payload
  },
  setAge(state, payload: number) {
    state.age = payload
  },
  setAddress(state, payload: string) {
    state.address = payload
  },
  setShipAddress(state, payload: string) {
    state.shippingAddress = payload
  },
  setPaymentCard(state, payload: number) {
    state.paymentCard = payload
  }
}

export default mutations
