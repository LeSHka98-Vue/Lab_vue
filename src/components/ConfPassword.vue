<template>
  <form>
    <p class="caption">Password change</p>
      <Alert type="success" :message="successMessage" v-if="success"/>
      <!-- <Alert type="error" :message="errorMessage" v-if="error"/> -->
      <Alert type="error" :message="passwordErrorMessage" v-if="passwordError"/>
    <Input type="password" placeholder="Old Password" v-model:search="password"/>
      <Alert type="error" :message="confirmPasswordErrorMessage" v-if="confirmPasswordError"/>
    <Input type="password" placeholder="New Password" v-model:search="confirmPassword"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Save</Button>
  </form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Input from '@/ui/Input.vue'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import request from '@/utils/serverRequest'
import { passwordErrorMessage, confirmPasswordErrorMessage, passwordChanged } from '@/constants'
import UserState from '@/store/user/interface'

@Options({
  components: {
    Button,
    Input, 
    Alert
  },
  computed: {
    ...mapState('user', {
      id: (state) => (state as UserState).id,
      storePassword: (state) => (state as UserState).password
    })
  }
})
export default class ConfirmPassword extends Vue {
  @Prop(Object) userlocal:any
  id?:number
  storePassword?:string
  password = '';
  confirmPassword = '';
  
  success = false;
  passwordError = false;
  confirmPasswordError = false;
  passwordErrorMessage = confirmPasswordErrorMessage;
  confirmPasswordErrorMessage = passwordErrorMessage;
  successMessage = passwordChanged;

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
    await request(`users/${this.id}`, { password: this.confirmPassword }, 'PATCH');
    this.success = true;
    this.$store.commit('user/setPassword', this.confirmPassword);
    this.userlocal.password = this.confirmPassword;
    setTimeout(() => { 
      this.success = false;
      this.$store.commit('showModal', 0)
    }, 2000);
  }

  checkPassword():boolean {
    if (this.password === this.storePassword) {
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
