import { MutationTree } from 'vuex';
import UserState from '@/store/user/interface';
import { Sex, Role } from '@/store/types/types'

const mutations: MutationTree<UserState> = {
  setUser(state, payload:UserState | null) {
    if (payload === null) { 
      state = Object.assign(state, {
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        sex: 'male',
        age: undefined,
        address: '',
        shippingAddress: '',
        paymentCard: undefined,
        role: undefined
      })
    } else state = Object.assign(state, payload)
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
  },
  setLastname(state, payload: string) {
    state.lastName = payload
  },
  setSex(state, payload: Sex) {
    state.sex = payload
  },
  setRole(state, payload: Role) {
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
