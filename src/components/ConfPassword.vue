<template>
  <form>
    <p class="caption">Password change</p>
      <Alert type="success" :message="successMessage" v-if="success"/>
      <Alert type="error" :message="errorMessage" v-if="error"/>
      <Alert type="error" :message="passwordErrorMessage" v-if="passwordError"/>
    <Input type="password" placeholder="Old Password" v-model:search="password"/>
      <Alert type="error" :message="confirmPasswordErrorMessage" v-if="confirmPasswordError"/>
    <Input type="password" placeholder="New Password" v-model:search="confirmPassword"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Save</Button>
  </form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch, Prop, Component } from 'vue-property-decorator'
import Input from '@/ui/Input.vue'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import request from '@/utils/serverRequest'

@Options({
  components: {
    Button,
    Input, 
    Alert
  }
})
export default class ConfirmPassword extends Vue {
  @Prop(Object) userlocal:any
  password = '';
  confirmPassword = '';
  
  success = false;
  error = false;
  passwordError = false;
  confirmPasswordError = false;
  passwordErrorMessage = 'password is not appropriate to current password !';
  confirmPasswordErrorMessage = 'password is too short !';
  successMessage = 'Pssword has been changed!';

  get isDisabled() {
    if (!this.password || !this.confirmPassword) return true;
    return this.passwordError || this.confirmPasswordError
  }

  @Watch('password')
  onPasswordChange() {
    this.checkPassword();
  }

  @Watch('confirmPassword')
  onConfirmPasswordChange() {
    this.checkConfirmPassword();
  }
  async submit() {
    await request(`users/${this.$store.state.user.id}`, { password: this.confirmPassword }, 'PATCH');
    this.success = true;
    this.$store.commit('user/setPassword', this.confirmPassword);
    this.userlocal.password = this.confirmPassword;
    setTimeout(() => { 
      this.success = false;
      this.$store.commit('showModal', 0)
    }, 2000);
  }

  checkPassword():boolean {
    if (this.password === this.$store.state.user.password) {
      this.passwordError = false;
      return true;
    }
    this.passwordError = true;
    return false
  }

  checkConfirmPassword():boolean {
    if (this.confirmPassword.length < 5) {
      this.confirmPasswordError = true;
      return false;
    }
    this.confirmPasswordError = false;
    return true;
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
