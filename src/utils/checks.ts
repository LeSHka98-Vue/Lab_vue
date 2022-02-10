import { loginSample } from '@/constants'

function checkLogin(login:string):boolean {
  if (login.search(loginSample) !== -1 || login.length === 0) return true;
  return false;
}

function checkPassword(password:string):boolean {
  if (password.length > 4 || password.length === 0) return true;
  return false
}

function checkConfirmPassword(password:string, confirmPassword:string):boolean {
  if (password === confirmPassword) return true;
  return false;
}

export {
  checkLogin,
  checkPassword,
  checkConfirmPassword
}
