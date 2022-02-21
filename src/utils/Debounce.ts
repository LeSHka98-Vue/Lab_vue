export default function debounce<T extends(...params: any[]) => any>(func:T, delay = 300) {
  let timeout:number;
  return async function (...args: any) {
    clearTimeout(timeout);
    return new Promise((resolve) => { 
      timeout = setTimeout(() => resolve(func(...args)), delay)
    })
  };
}
// result = func(...args); return resolve(result)
// setTimeout(() => { func(...args) }, delay);
