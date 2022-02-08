import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { RootState } from '@/store/types/interfaces'
import user from '@/store/user/state'

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage
})

const store = createStore<RootState>({
  state: {
    isAuthorized: false,
    isLoading: false,
    modalShown: 0,
    errorLogger: [],
    warningLogger: []
  },
  mutations: {
    setAuthorization(state, payload:boolean) {
      state.isAuthorized = payload
    },
    setLoading(state, payload:boolean) {
      state.isLoading = payload
    },
    showModal(state, id:number) {
      state.modalShown = id
    },
    setErrorLogger(state, payload:any[]) {
      state.errorLogger = payload
    },
    setWarnLogger(state, payload:any[]) {
      state.warningLogger = payload
    }
  },
  actions: {},
  getters: {},
  modules: { user },
  plugins: [vuexLocal.plugin]
})

export default store;
