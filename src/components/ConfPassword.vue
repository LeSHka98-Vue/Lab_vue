<template>
  <form>
    <p class="caption">Password change</p>
    <Alert v-if="isAlert"/>
    <Input type="password" placeholder="Old Password" v-model:search="password"/>
    <Input type="password" placeholder="New Password" v-model:search="confirmPassword"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Save</Button>
  </form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import Input from '@/ui/Input.vue'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import { AlertType } from '@/store/types/types'
import request from '@/utils/serverRequest'
import { passwordErrorMessage, confirmPasswordErrorMessage, passwordChanged } from '@/constants'
import { checkPassword, checkConfirmPassword } from '@/utils/checks'
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
    }),
    ...mapState(['isAuthorized', 'isAlert'])
  },
  methods: {
    ...mapMutations(['Alert'])
  }
})
export default class ConfirmPassword extends Vue {
  @Prop(Object) userlocal:any
  id?:number
  storePassword!:string

  isAlert?:boolean
  Alert!: (arg0: {show:boolean, type:AlertType, message:string, delay?:number}) => void

  password = '';
  confirmPassword = '';
  
  passwordError = false;
  confirmPasswordError = false;

  get isDisabled() {
    if (!this.password || !this.confirmPassword) return true;
    return !checkConfirmPassword(this.password, this.storePassword) || !checkPassword(this.confirmPassword)
  }

  @Watch('password')
  onPasswordChange() {
    if (checkConfirmPassword(this.password, this.storePassword)) this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 })
    else this.Alert({ show: true, type: 'error', message: confirmPasswordErrorMessage, delay: 2000 })
  }

  @Watch('confirmPassword')
  onConfirmPasswordChange() {
    if (checkPassword(this.confirmPassword)) this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 })
    else this.Alert({ show: true, type: 'error', message: passwordErrorMessage, delay: 2000 })
  }
  async submit() {
    await request(`users/${this.id}`, { password: this.confirmPassword }, 'PATCH');
    this.$store.commit('user/setPassword', this.confirmPassword);
    this.Alert({ show: true, type: 'success', message: passwordChanged, delay: 2000 })
    this.userlocal.password = this.confirmPassword;
    setTimeout(() => { 
      this.$store.commit('showModal', 0)
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
