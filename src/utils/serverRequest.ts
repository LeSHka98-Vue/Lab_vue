import store from '@/store/store';

export default async function request(path:string, body?, method = 'GET'): Promise<any> {
  store.commit('setLoading', true)
  const requestInit: any = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }

  const response = await fetch(`${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${path}`, requestInit)
    .then((r) => r.json())
    .catch((error) => console.log('REQUEST FAILED', error.message))
    .finally(() => store.commit('setLoading', false));
  // console.log(response);
  return response;
}
