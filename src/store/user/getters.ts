import { GetterTree } from 'vuex';
import UserState from '@/store/user/interface';
import { RootState } from '@/store/types/interfaces'

const getters: GetterTree<UserState, RootState> = {
  getState(state) {
    return state
  },
  getUserId(state) {
    return state.id
  },
  getUserName(state) {
    return state.firstName
  }
}

export default getters
