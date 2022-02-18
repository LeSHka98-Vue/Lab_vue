type AlertType = 'success'| 'warning' | 'info' | 'error';
type ButtonType = 'success'| 'warning' | 'info' | 'error'|'success-outline'| 'warning-outline' | 'info-outline' | 'error-outline';
type InputType = 'text'| 'number' | 'email' | 'password' | 'date' | 'file';
type Role = 'admin'| 'user';
type Sex = 'male'|'female'
type Status = 'pending' | 'processing' | 'ready'

type PriceOption = { label:string, value:string|number }

export {
  AlertType,
  ButtonType,
  InputType,
  Role,
  Sex,
  PriceOption,
  Status
}
