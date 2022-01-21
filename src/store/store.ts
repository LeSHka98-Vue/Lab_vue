import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

interface RootState {
  isAuthorized:boolean | undefined,
  errorLogger:any[],
  warningLogger:any[]
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage
})

const store = createStore<RootState>({
  state: {
    isAuthorized: false,
    errorLogger: [],
    warningLogger: []
  },
  mutations: {
    setAuthorization(state, payload) {
      state.isAuthorized = payload
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
  modules: {},
  plugins: [vuexLocal.plugin]
})

export default store;
