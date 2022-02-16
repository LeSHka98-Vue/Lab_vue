type AlertType = 'success'| 'warning' | 'info' | 'error';
type ButtonType = 'success'| 'warning' | 'info' | 'error'|'success-outline'| 'warning-outline' | 'info-outline' | 'error-outline';
type InputType = 'text'| 'number' | 'email' | 'password' | 'date';
type Edition = 'regular'| 'gold';
type Sex = 'male'|'female'

type PriceOption = { label:string, value:string|number }

export {
  AlertType,
  ButtonType,
  InputType,
  Edition,
  Sex,
  PriceOption
}
