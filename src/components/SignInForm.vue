<template>
  <form>
      <Alert type="success" :message="successMessage" v-if="success"/>
      <Alert type="error" :message="errorMessage" v-if="error"/>
      <Alert type="error" :message="emailErrorMessage" v-if="emailError"/>
    <Input type="email" placeholder="Email" v-model:search="email"/>
      <Alert type="error" :message="passwordErrorMessage" v-if="passwordError"/>
    <Input type="password" placeholder="Password" v-model:search="password"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Submit</Button>
  </form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Input from '@/ui/Input.vue'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'

@Options({
  components: {
    Button,
    Input, 
    Alert
  }
})
export default class SignUpForm extends Vue {
  email = '';
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
    this.users = await this.request('users');
  }

  get isDisabled() {
    if (!this.email || !this.password) return true;
    return this.emailError || this.passwordError;
  }

  @Watch('email')
  onEmailChange() {
    this.checkLogin();
  }

  @Watch('password')
  onPasswordChange() {
    this.checkPassword();
  }

  async submit() {
    if (this.users.find((item) => item.email === this.email)) { 
      this.success = true;
      this.$store.commit('setAuthorization', true);
      setTimeout(() => { 
        this.success = false;
        this.$emit('showModal', false);
      }, 2000);
      return;
    }
    console.log('kjbj');
    this.error = true;
    setTimeout(() => { this.error = false; }, 2000);
  }

  checkLogin():boolean {
    // Doesn't allow numbers in the domain name and doesn't allow for top level domains that are less than 2 or more than 3 letters 
    // (which is fine until they allow more). Doesn't handle multiple &quot;.&quot; in the domain (joe@abc.co.uk)
    const sample = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (this.email.search(sample) !== -1 || this.email.length === 0) {
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

  request(list, body?, method = 'GET'): Promise<any> {
    const requestInit: any = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (body) {
      requestInit.body = JSON.stringify(body);
    }

    return fetch(`${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${list}`, requestInit)
      .then((response) => response.json())
      .catch((error) => {
        console.log('REQUEST FAILED', error.message);
      });
  }
}
</script>

<style lang="scss"></style>
