import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { RootState } from '@/store/types/interfaces'
import user from '@/store/user/state'
import cart from '@/store/cart/state'
import { AlertType } from '@/store/types/types'

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage
})

const store = createStore<RootState>({
  state: {
    isAuthorized: false,
    isLoading: false,
    modalShown: 0,
    errorLogger: [],
    warningLogger: [],
    isAlert: false,
    type: 'error',
    message: '',
    delay: 0
  },
  mutations: {
    Alert(state, payload:{show:boolean, type:AlertType, message:string, delay?:number}) {
      const { 
        show, type, message, delay
      } = payload
      state.type = type;
      state.message = message;
      if (delay) {
        state.isAlert = true;
        setTimeout(() => {
          state.isAlert = false;
        }, delay)
      } else state.isAlert = show;
    },
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
  modules: { user, cart },
  plugins: [vuexLocal.plugin]
})

export default store;
