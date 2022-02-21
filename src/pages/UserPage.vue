<template>
  <h1>User info</h1>
  <Alert v-if="isAlert"/>
  <table class="table">
    <colgroup>
      <col class="table__first-column">
    </colgroup>
    <tr>
      <th class="table__th">field</th>
      <th class="table__th">Current data</th>
      <th class="table__th">New data</th>
    </tr>
    <tr v-for="(value, name) in changableUser" :key="name">
      <td class="table__cell">{{ name }}</td>
      <td class="table__cell">{{ value }}</td>
      <v-select 
        v-if="name == 'sex'"  
        v-model="userlocal[name]"
        :options="['male','female']"
        class="style-chooser">
      </v-select>
      <Input 
        v-else-if="name !== 'password' && name !=='paymentCard' " 
        :type="name=='age'? 'number':'text'" 
        v-model:search="userlocal[name]"/>
      <Input 
        v-else 
        type="text"
        :mask="cardMask" 
        v-model:search="userlocal[name]"/>
    </tr>
  </table>
  <ModalButton 
    type="info"
    buttonName="Change password"
    :id="3">
    <template #aim>
      <ConfirmPassword :userlocal="userlocal"/>
    </template>
  </ModalButton>
  <Button type="success" @click="submit" :disabled="isDisabled" class="passwordButton">Save changes</Button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { mapState, mapGetters, mapMutations } from 'vuex'
import vSelect from 'vue-select'
import Input from '@/ui/Input.vue'
import Alert from '@/alerts/Alert.vue'
import { AlertType } from '@/store/types/types'
import Button from '@/ui/Button.vue'
import ModalButton from '@/components/ModalButton.vue'
import user from '@/store/user/state'
import UserState from '@/store/user/interface'
import ConfirmPassword from '@/components/ConfPassword.vue'
import request from '@/utils/serverRequest'
import { checkLogin, checkRange, checkCard } from '@/utils/checks'
import { successMessage, emailErrorMessage, cardError, ageError, invalidfields, cardMask } from '@/constants/textConstants'

@Options({
  components: {
    Input,
    ModalButton,
    ConfirmPassword,
    Alert,
    Button,
    vSelect
  },
  computed: {
    ...mapState('user', ['state', 'login', 'age', 'paymentCard']),
    ...mapState(['isAlert']),
    ...mapGetters('user', ['getState', 'getUserId'])
  },
  methods: {
    ...mapMutations(['Alert']),
    ...mapMutations('user', ['setUser'])
  }
})
export default class UserPage extends Vue {
  isAlert?:boolean
  Alert!: (arg0: {show?:boolean, type:AlertType, message:string, delay?:number}) => void
  setUser!: (arg0: null | UserState) => void
  getState!:UserState
  getUserId!:number
  state?:UserState
  login?:string
  age?:number
  paymentCard?:string
  userlocal:UserState = JSON.parse(JSON.stringify(user.state))
  cardMask = cardMask 

  mounted() {
    this.userlocal = this.getState
  }

  get changableUser() {
    const userdata = {}
    for (const [key, value] of Object.entries(this.getState)) {
      if (key !== 'id' && key !== 'role' && key !== 'password') {
        userdata[key] = value
      }
    }
    return userdata
  }
  get isDisabled() {
    return !this.checkFields
  }

  get checkFields() {
    return checkLogin(this.userlocal.login) && checkRange(this.userlocal!.age!, 0, 200) && checkCard(this.userlocal?.paymentCard);
  }

  @Watch('userlocal.login')
  onlogin() {
    if (!checkLogin(this.userlocal.login)) this.Alert({ type: 'error', message: emailErrorMessage, delay: 2000 })
  }
  @Watch('userlocal.age')
  onAgeChange() {
    if (!checkRange(this.userlocal!.age!, 0, 200)) this.Alert({ type: 'error', message: ageError, delay: 2000 })
  }
  @Watch('userlocal.paymentCard')
  onCardChange() {
    if (!checkCard(this.userlocal?.paymentCard)) this.Alert({ type: 'error', message: cardError, delay: 2000 })
  }

  async submit() {
    if (!this.checkFields) { this.Alert({ type: 'error', message: invalidfields, delay: 2000 }); return; }
    this.setUser(this.userlocal)
    await request(`users/${this.getUserId}`, this.userlocal, 'PATCH')
    this.Alert({ type: 'success', message: successMessage, delay: 2000 })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/_table.scss';
  .table {
    margin: 0 auto;

    &__cell {
      color: $table-color;
    }
  }
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: $select-background;
    border: none;
    color: $select-color;
    text-transform: lowercase;
    font-variant: small-caps;
    margin: 5px 0;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: $select-color;
 }

 .passwordButton {
   margin-left: 100px ;
 }
</style>
