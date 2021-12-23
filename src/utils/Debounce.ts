export default function debounce<T extends(...params: any[]) => void>(func:T, delay = 300) {
  let timeout:number;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args) 
    }, delay);
  };
}
