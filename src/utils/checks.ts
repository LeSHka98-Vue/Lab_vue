import { loginSample, belarusPhoneNumber, dateRule } from '@/constants/regExpressions'
import { minPasswordLength } from '@/constants/numeralConsts'

function checkLogin(login:string):boolean {
  if (login.search(loginSample) !== -1) return true;
  return false;
}

function checkPassword(password:string):boolean {
  if (password.length >= minPasswordLength) return true;
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
  const today = new Date().toISOString().slice(0, 10)
  const deliveryDate = date.split('.').reverse().join('.')
  return new Date(today) <= new Date(deliveryDate)
}

function checkImagePath(image:string) {
  const imgends = ['jpg', 'png', 'svg', 'gif']
  const pathEnd = image.split('.')[1]
  if (!imgends.find((elem) => elem === pathEnd)) return false;
  return true
}

function checkRange(value:number, min:number, max:number) {
  if (value < min || value > max) return false
  return true
}

function checkCard(card):boolean {
  if (card?.toString()?.length !== 16) return false;
  return true;
}

export {
  checkLogin,
  checkPassword,
  checkConfirmPassword,
  checkPhoneNumber,
  checkDate,
  checkImagePath,
  checkRange,
  checkCard
}
