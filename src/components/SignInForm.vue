<template>
  <form>
    <p class="caption">SignIn</p>
    <Alert v-if="isAlert"/>
    <Input type="email" placeholder="Email" v-model:search="login"/>
    <Input type="password" placeholder="Password" v-model:search="password"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Submit</Button>
  </form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import Input from '@/ui/Input.vue'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import { AlertType } from '@/store/types/types'
import request from '@/utils/serverRequest'
import UserState from '@/store/user/interface'
import { emailErrorMessage, passwordErrorMessage, nouserError, successMessage, submitFailed } from '@/constants/textConstants'
import { closeModal } from '@/constants/numeralConsts'
import { checkLogin, checkPassword } from '@/utils/checks'

@Options({
  components: {
    Button,
    Input, 
    Alert
  },
  computed: {
    ...mapState(['isAlert'])
  },
  methods: {
    ...mapMutations(['Alert', 'showModal', 'setAuthorization']),
    ...mapMutations('user', ['setUser'])
  }
})
export default class SignUpForm extends Vue {
  isAlert?:boolean
  Alert!: (arg0: {show?:boolean, type:AlertType, message:string, delay?:number}) => void
  showModal!: (arg0: number) => void
  setAuthorization!: (arg0: boolean) => void
  setUser!: (arg0: null | UserState) => void

  login = '';
  password = '';

  users:Array<any> = [];

  async created() {
    this.users = await request('users');
  }

  get isDisabled() {
    return !this.checkFields;
  }

  @Watch('login')
  onEmailChange() {
    if (!checkLogin(this.login)) this.Alert({ type: 'error', message: emailErrorMessage, delay: 2000 })
  }

  @Watch('password')
  onPasswordChange() {
    if (!checkPassword(this.password)) this.Alert({ type: 'error', message: passwordErrorMessage, delay: 2000 })
  }

  get checkFields() {
    return checkLogin(this.login) && checkPassword(this.password)
  }

  async submit() {
    if (!this.checkFields) { this.Alert({ type: 'error', message: submitFailed, delay: 2000 }); return }
    const user:UserState = this.users.find((item) => item.login === this.login && item.password === this.password)
    if (user) { 
      this.setAuthorization(true)
      this.setUser(user)
      this.Alert({ type: 'success', message: successMessage, delay: 2000 })
      this.showModal(closeModal)
      return
    }
    this.Alert({ type: 'error', message: nouserError, delay: 2000 })
  }
}
</script>

<style lang="scss">
  .caption {
    margin: 0;
    text-align: left;
    font: {
      weight: bold;
      size: 20px;
    }
  }
</style>
