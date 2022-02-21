<template>
  <h1>CheckOut</h1>
  <div class="checkout">
    <Alert v-if="isAlert"/>
    <Input placeholder="name" v-model:search="name"/>
    <Input placeholder="surname" v-model:search="surname"/>
    <Input placeholder="phone number" :mask="phoneMask" v-model:search="phoneNumber"/>
    <Input placeholder="delivery date" :mask="dateMask" v-model:search="deliveryDate"/>
    <Input placeholder="delivery address"  v-model:search="deliveryAdress"/>
    <Button type="success" @click="submit" :disabled="isDisabled">Submit</Button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Watch } from 'vue-property-decorator'
import { uuid } from 'vue-uuid' 
import Alert from '@/alerts/Alert.vue'
import Button from '@/ui/Button.vue'
import Input from '@/ui/Input.vue'
import Section from '@/components/Section.vue'
import request from '@/utils/serverRequest'
import { checkPhoneNumber, checkDate } from '@/utils/checks'
import { phoneMask, dateMask, phoneError, dateError, successMessage, submitFailed } from '@/constants/textConstants'
import { AlertType } from '@/store/types/types'

@Options({
  components: {
    Button,
    Section,
    Input,
    Alert
  },
  computed: {
    ...mapState('user', ['firstName', 'lastName']),
    ...mapState(['isAlert']),
    ...mapGetters('user', ['getUserId', 'getUserName']),
    ...mapGetters('cart', ['getCartProducts'])
  },
  methods: {
    ...mapMutations(['Alert'])
  }
})
export default class CheckOut extends Vue {
  phoneMask = phoneMask
  dateMask = dateMask

  getUserId!:number
  firstName?:string
  lastName?:string
  getCartProducts!:number[]
  isAlert?:boolean
  Alert!: (arg0: {show?:boolean, type:AlertType, message:string, delay?:number}) => void

  name = ''
  surname = ''
  phoneNumber = ''
  deliveryDate = ''
  deliveryAdress = ''
  
  mounted() {
    if (this.firstName) this.name = this.firstName
    if (this.lastName) this.surname = this.lastName
  }
  get isDisabled() {
    return !this.checkFields
  }

  get checkFields() {
    return checkPhoneNumber(this.phoneNumber) && checkDate(this.deliveryDate)
    && this.checkLength([this.name, this.surname, this.phoneNumber, this.deliveryDate, this.deliveryAdress])
  }

  @Watch('phoneNumber')
  onphoneNumberChange() {
    if (!checkPhoneNumber(this.phoneNumber)) this.Alert({ type: 'error', message: phoneError, delay: 2000 })
  }

  @Watch('deliveryDate')
  ondeliveryDateChange() {
    if (!checkDate(this.deliveryDate)) this.Alert({ type: 'error', message: dateError, delay: 2000 })
  }

  checkLength(word) {
    if (Array.isArray(word)) {
      if (word.findIndex((elem) => !elem) !== -1) return false
      return true
    } 
    if (!word) return false
    return true;
  }
  get orderData() {
    return {
      id: uuid.v1(),
      userId: this.getUserId,
      productList: this.getCartProducts,
      name: this.name,
      surName: this.surname,
      phoneNumber: this.phoneNumber,
      deliveryDate: this.deliveryDate,
      status: 'pending'
    }
  }
  async submit() {
    if (this.checkFields) {
      await request('orders', this.orderData, 'POST')
      this.Alert({ type: 'success', message: successMessage, delay: 2000 })
      this.$router.push(`/order/thanks/${this.orderData.id}`)
    } else this.Alert({ type: 'error', message: submitFailed, delay: 2000 })
  }
}
</script>

<style lang="scss">
  .checkout {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1% 1% 3%;
    margin: auto;
    background-color: $section-background;
    width:50%;
    border-radius: 10px;
  }
</style>
