import '@/class-component-hooks';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router';

const app = createApp(App);

const errorLogger:any[] = [];
app.config.errorHandler = (err, vm, info) => {
  errorLogger.push(err);
  console.error('APP ERROR: ', errorLogger);
}

const warningLogger:any[] = [];
app.config.warnHandler = (msg, vm, info) => {
  warningLogger.push(msg);
  console.warn('APP WARN: ', warningLogger);
}

app.use(router).mount('#app');
