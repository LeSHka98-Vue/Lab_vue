export default function debounce<T extends(...params: any[]) => any>(func:T, delay = 300) {
  let timeout:number;
  return async function (...args: any) {
    let result
    // console.log(timeout)
    clearTimeout(timeout);
    console.log(timeout)
    await new Promise((resolve) => { 
      timeout = setTimeout(async () => { 
        result = await func(...args); return resolve(1) 
      }, delay)
    })
    // setTimeout(() => { func(...args) }, delay);
    return result
  };
}
