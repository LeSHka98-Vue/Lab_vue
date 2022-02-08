export default function request(path:string, body?, method = 'GET'): Promise<any> {
  const requestInit: any = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }

  return fetch(`${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${path}`, requestInit)
    .then((response) => response.json())
    .catch((error) => {
      console.log('REQUEST FAILED', error.message);
    });
}
