<template>
  <h1>User info</h1>
  <table class="table">
    <tr>
      <td colspan="3">
        <Alert v-if="isOpen" :type="type" :message="message"/>
      </td>
    </tr>
    <colgroup>
      <col class="table__first-column">
    </colgroup>
    <tr>
      <th class="table__th">field</th>
      <th class="table__th">Current data</th>
      <th class="table__th">New data</th>
    </tr>
    <tr v-for="(value, name) in this.$store.state.user" :key="name">
        <td v-if="name !== 'id'" class="table__cell">{{ name }}</td>
        <td v-if="name !== 'id'" class="table__cell">{{ value }}</td>
        <v-select 
          v-if="name == 'sex'"  
          v-model="userlocal[name]"
          :options="['male','female']">
        </v-select>
        <Input 
          v-if="name !== 'id' && name !== 'password' && name !== 'sex'" 
          :type="(name=='age' || name =='payment_card')? 'number':'text'" 
          v-model:search="userlocal[name]"/>
        <ModalButton 
          v-else-if="name === 'password'"
          type="info-outline"
          buttonName="Change password"
          :id="3">
          <template #aim>
            <ConfirmPassword :userlocal="userlocal"/>
          </template>
        </ModalButton>
    </tr>
  </table>
  <Button type="success" @click="submit">Save changes</Button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import vSelect from 'vue-select'
import Input from '@/ui/Input.vue'
import Alert from '@/alerts/Alert.vue'
import Button from '@/ui/Button.vue'
import ModalButton from '@/components/ModalButton.vue'
import user from '@/store/user/state'
import UserState from '@/store/user/interface'
import ConfirmPassword from '@/components/ConfPassword.vue'
import request from '@/utils/serverRequest'
import { loginSample } from '@/constants'

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
    ...mapState('user', ['state'])
  }
})
export default class UserPage extends Vue {
  state?:UserState
  userlocal:UserState = JSON.parse(JSON.stringify(user.state)) 
  isOpen = false
  message = ''
  type = ''

  @Watch('userlocal.login')
  onlogin() {
    if (!this.checkLogin()) this.alert('wrong login', 'error')
  }
  @Watch('userlocal.age')
  onAgeChange() {
    if (!this.checkAge()) this.alert('wrong age', 'error')
  }
  @Watch('userlocal.payment_card')
  onCardChange() {
    if (!this.checkCard()) this.alert('wrong payment card data', 'error')
  }

  checkCard():boolean {
    const card = this.userlocal.paymentCard?.toString()
    if (card?.length !== 16) return false;
    return true;
  }

  checkAge():boolean {
    if (this.userlocal.age! < 0 || this.userlocal.age! > 1000) return false;
    return true;
  }

  checkLogin():boolean {
    if (this.userlocal.login.search(loginSample) !== -1 || this.userlocal.login.length === 0) return true;
    return false;
  }

  alert(message:string, type:string) {
    this.isOpen = true
    this.message = message
    this.type = type
    setTimeout(() => { this.isOpen = false }, 3000)
  }

  submit() {
    if (this.userlocal.login !== this.$store.state.user.login) {
      if (!this.checkLogin()) { this.alert('wrong login', 'error'); return; }
    }
    if (this.userlocal.age !== this.$store.state.user.age) {
      if (!this.checkAge()) { this.alert('wrong age', 'error'); return; }
    }
    if (this.userlocal.paymentCard !== this.$store.state.user.paymentCard) {
      if (!this.checkCard()) { this.alert('wrong payment card data', 'error'); return; }
    }
    this.$store.commit('user/setUser', this.userlocal)
    request(`users/${this.state?.id}`, this.userlocal, 'PATCH')
    this.alert('Success !', 'success')
  }
}
</script>

<style lang="scss">
  .line {
    display: flex;
    justify-content: center;
    align-items: center;
  }
    .table {
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    border-collapse:collapse;
    margin: 0 auto;

    &__first-column {
      background: $table-first-column;
    }
    &__th {
      font-weight: normal;
      border-bottom: 2px solid $table-yellow-line;
      padding: 8px 10px;
      text-align: left;
    }
    &__th:first-child,
    &__cell:first-child {
      color: $table-first-column-text;
      border-left: none;
    }
    &__cell {
      padding: 12px 10px;
      color: $table-color;
      text-align: left;
    }
  }
</style>
