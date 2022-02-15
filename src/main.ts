import '@/class-component-hooks';
import { createApp } from 'vue';
import Maska from 'maska'
import UUID from 'vue-uuid'
import App from './App.vue';
import router from '@/router/router';
import store from './store/store';

const app = createApp(App);

const errorLogger:any[] = [];
app.config.errorHandler = (err, vm, info) => {
  errorLogger.push(err);
  console.error('APP ERROR: ', errorLogger);
  if (errorLogger.length < 5) store.commit('setErrorLogger', errorLogger) 
  else store.commit('setErrorLogger', errorLogger.slice(errorLogger.length - 5))
}

const warningLogger:any[] = [];
app.config.warnHandler = (msg, vm, info) => {
  warningLogger.push(msg);
  console.warn('APP WARN: ', warningLogger);
  if (warningLogger.length < 5) store.commit('setErrorLogger', warningLogger)
  else store.commit('setErrorLogger', warningLogger.slice(warningLogger.length - 5))
}

app.use(router)
  .use(store)
  .use(Maska)
  .use(UUID)
  .mount('#app');
