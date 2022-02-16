// Doesn't allow numbers in the domain name and doesn't allow for top level domains that are less than 2 or more than 3 letters 
// (which is fine until they allow more). Doesn't handle multiple &quot;.&quot; in the domain (joe@abc.co.uk)
const loginSample = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
// Belarus
const belarusPhoneNumber = /^\+375(\s+)?\(?(17|29|33|44)\)?(\s+)?[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
//  dd.mm.yyyy
const dateRule = /^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/;
//  yyy-mm-dd
// /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

const phoneMask = '+###(##)###-##-##';
const dateMask = '##.##.####';

const successMessage = 'Success!';
const passwordErrorMessage = 'password is too short !';
const confirmPasswordErrorMessage = 'password is not appropriate to repeated password !';
const emailErrorMessage = 'wrong Email !';
const passwordChanged = 'Password has been changed!';
const nouserError = 'there is no such User !';
const userCreatedMessage = 'User has been created!';
const userExistsMessage = 'this User is already exists!';
const emptyFieldMessage = "field shouldn't be empty";

const minPasswordLength = 5;

enum FiltrationTypes {
  all = 'All',
  genre = 'genre',
  price = 'price'
}

export { 
  loginSample,
  passwordErrorMessage,
  successMessage,
  confirmPasswordErrorMessage,
  emailErrorMessage,
  passwordChanged,
  nouserError,
  userCreatedMessage,
  userExistsMessage,
  belarusPhoneNumber,
  dateRule,
  phoneMask,
  dateMask,
  emptyFieldMessage,
  FiltrationTypes,
  minPasswordLength 
};
