<template>
  <form>
      <p class="caption">SignIn</p>
      <Alert type="success" :message="successMessage" v-if="success"/>
      <Alert type="error" :message="errorMessage" v-if="error"/>
      <Alert type="error" :message="emailErrorMessage" v-if="emailError"/>
    <Input type="email" placeholder="Email" v-model:search="login"/>
      <Alert type="error" :message="passwordErrorMessage" v-if="passwordError"/>
    <Input type="password" placeholder="Password" v-model:search="password"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Submit</Button>
  </form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'
import Input from '@/ui/Input.vue'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import request from '@/utils/serverRequest'
import UserState from '@/store/user/interface'

@Options({
  components: {
    Button,
    Input, 
    Alert
  }
})
export default class SignUpForm extends Vue {
  @Prop(Boolean) modalShown:boolean | undefined
  login = '';
  password = '';
  
  success = false;
  error = false;
  emailError = false;
  passwordError = false;
  emailErrorMessage = 'wrong Email !';
  passwordErrorMessage = 'password is too short !';
  successMessage = 'Success!';
  errorMessage = 'there is no such User !';

  users:Array<any> = [];

  async created() {
    this.users = await request('users');
  }

  get isDisabled() {
    if (!this.login || !this.password) return true;
    return this.emailError || this.passwordError;
  }

  @Watch('login')
  onEmailChange() {
    this.checkLogin();
  }

  @Watch('password')
  onPasswordChange() {
    this.checkPassword();
  }

  async submit() {
    const user:UserState = this.users.find((item) => item.login === this.login)
    if (user) { 
      this.success = true;
      this.$store.commit('setAuthorization', true);
      this.$store.commit('user/setUser', user);
      setTimeout(() => { 
        this.success = false;
        this.$store.commit('showModal', 0)
      }, 2000);
      return;
    }

    this.error = true;
    setTimeout(() => { this.error = false; }, 2000);
  }

  checkLogin():boolean {
    // Doesn't allow numbers in the domain name and doesn't allow for top level domains that are less than 2 or more than 3 letters 
    // (which is fine until they allow more). Doesn't handle multiple &quot;.&quot; in the domain (joe@abc.co.uk)
    const sample = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (this.login.search(sample) !== -1 || this.login.length === 0) {
      this.emailError = false;
      return true;
    }
    this.emailError = true;
    return false;
  }
  checkPassword():boolean {
    if (this.password.length > 4 || this.password.length === 0) {
      this.passwordError = false;
      return true;
    }
    this.passwordError = true;
    return false
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
