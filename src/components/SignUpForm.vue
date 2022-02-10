<template>
  <form>
    <p class="caption">SignUp</p>
      <Alert type="success" :message="userCreatedMessage" v-if="success"/>
      <Alert type="error" :message="errorMessage" v-if="error"/>
      <Alert type="error" :message="emailErrorMessage" v-if="emailError"/>
    <Input type="email" placeholder="Email" v-model:search="login"/>
      <Alert type="error" :message="passwordErrorMessage" v-if="passwordError"/>
    <Input type="password" placeholder="Password" v-model:search="password"/>
      <Alert type="error" :message="confirmPasswordErrorMessage" v-if="confirmPasswordError"/>
    <Input type="password" placeholder="Confirm Password" v-model:search="confirmPassword"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Submit</Button>
  </form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Input from '@/ui/Input.vue'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import request from '@/utils/serverRequest'
import { 
  loginSample, emailErrorMessage, passwordErrorMessage, confirmPasswordErrorMessage,
  userCreatedMessage, userExistsMessage 
} from '@/constants'
import { checkLogin, checkPassword, checkConfirmPassword } from '@/utils/checks'

@Options({
  components: {
    Button,
    Input, 
    Alert
  }
})
export default class SignUpForm extends Vue {
  login = '';
  password = '';
  confirmPassword = '';
  
  success = false;
  error = false;
  emailError = false;
  passwordError = false;
  confirmPasswordError = false;
  emailErrorMessage = emailErrorMessage;
  passwordErrorMessage = passwordErrorMessage;
  confirmPasswordErrorMessage = confirmPasswordErrorMessage;
  userCreatedMessage = userCreatedMessage;
  errorMessage = userExistsMessage;

  users:Array<any> = [];

  async created() {
    this.users = await request('users');
  }

  get isDisabled() {
    if (!this.login || !this.password || !this.confirmPassword) return true;
    return this.emailError || this.passwordError || this.confirmPasswordError
  }

  @Watch('login')
  onEmailChange() {
    if (checkLogin(this.login)) this.emailError = false;
    else this.emailError = true;
  }

  @Watch('password')
  onPasswordChange() {
    if (checkPassword(this.password)) this.passwordError = false;
    else this.passwordError = true;
    if (checkConfirmPassword(this.password, this.confirmPassword)) this.confirmPasswordError = false;
    else this.confirmPasswordError = true;
  }

  @Watch('confirmPassword')
  onConfirmPasswordChange() {
    if (checkConfirmPassword(this.password, this.confirmPassword)) this.confirmPasswordError = false;
    else this.confirmPasswordError = true;
  }

  async submit() {
    if (this.users.find((item) => item.login === this.login)) { 
      this.error = true;
      setTimeout(() => { this.error = false; }, 2000);
      return;
    }
    const newUser = { login: this.login, password: this.password }
    await request('users', newUser, 'POST');
    this.success = true;
    this.$store.commit('setAuthorization', true);
    this.$store.commit('user/setUser', { ...newUser, id: this.users.length });
    setTimeout(() => { 
      this.success = false;
      this.$store.commit('showModal', 0);
    }, 2000);
  }
}
</script>

<style lang="scss">
.caption {
  margin: 0;
  text-align: left;
  font: {
    weight:bold;
    size:20px;
  }
}
</style>
