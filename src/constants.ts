// Doesn't allow numbers in the domain name and doesn't allow for top level domains that are less than 2 or more than 3 letters 
// (which is fine until they allow more). Doesn't handle multiple &quot;.&quot; in the domain (joe@abc.co.uk)
const loginSample = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const successMessage = 'Success!';
const passwordErrorMessage = 'password is too short !';
const confirmPasswordErrorMessage = 'password is not appropriate to repeated password !';
const emailErrorMessage = 'wrong Email !';
const passwordChanged = 'Password has been changed!';
const nouserError = 'there is no such User !';
const userCreatedMessage = 'User has been created!';
const userExistsMessage = 'this User is already exists!';

export { 
  loginSample,
  passwordErrorMessage,
  successMessage,
  confirmPasswordErrorMessage,
  emailErrorMessage,
  passwordChanged,
  nouserError,
  userCreatedMessage,
  userExistsMessage 
};
