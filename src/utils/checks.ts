import { 
  loginSample, belarusPhoneNumber, dateRule, minPasswordLength
} from '@/constants'

function checkLogin(login:string):boolean {
  if (login.search(loginSample) !== -1 || login.length === 0) return true;
  return false;
}

function checkPassword(password:string):boolean {
  if (password.length >= minPasswordLength || password.length === 0) return true;
  return false
}

function checkConfirmPassword(password:string, confirmPassword:string):boolean {
  if (password === confirmPassword) return true;
  return false;
}

function checkPhoneNumber(phone:string) {
  return phone.search(belarusPhoneNumber) !== -1
}

function checkDate(date:string) {
  if (date.search(dateRule) === -1) return false;
  const today = new Date().toLocaleDateString()
  const deliveryDate = date.split('.').reverse().join('.')
  return new Date(today) <= new Date(deliveryDate)
}

export {
  checkLogin,
  checkPassword,
  checkConfirmPassword,
  checkPhoneNumber,
  checkDate
}
