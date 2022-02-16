<template>
  <h1>CheckOut</h1>
  <div class="checkout">
    <Alert v-if="isalert" :type="type" :message="alertmessage"/>
    <Input placeholder="name" v-model:search="name"/>
    <Input placeholder="surname" v-model:search="surname"/>
    <Input placeholder="phone number" :mask="phoneMask" v-model:search="phoneNumber"/>
    <Input placeholder="delivery date" :mask="dateMask" v-model:search="deliveryDate"/>
    <Button type="success" @click="submit">Submit</Button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState, mapGetters } from 'vuex'
import { Watch } from 'vue-property-decorator'
import { uuid } from 'vue-uuid' 
import Alert from '@/alerts/Alert.vue'
import Button from '@/ui/Button.vue'
import Input from '@/ui/Input.vue'
import Section from '@/components/Section.vue'
import request from '@/utils/serverRequest'
import { checkPhoneNumber, checkDate } from '@/utils/checks'
import { phoneMask, dateMask, emptyFieldMessage } from '@/constants'
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
    ...mapGetters('user', ['getUserId', 'getUserName']),
    ...mapGetters('cart', ['getCartProducts'])
  }
})
export default class CheckOut extends Vue {
  phoneMask = phoneMask
  dateMask = dateMask

  isalert = false
  type:AlertType = 'error'
  alertmessage= ''
  getUserId!:number
  firstName?:string
  lastName?:string
  getCartProducts!:number[]

  name = ''
  surname = ''
  phoneNumber = ''
  deliveryDate = ''
  
  mounted() {
    if (this.firstName) this.name = this.firstName
    if (this.lastName) this.surname = this.lastName
  }

  @Watch('phoneNumber')
  onphoneNumberChange() {
    if (checkPhoneNumber(this.phoneNumber)) this.alert(true, 'success', 'success', 2000)
    else this.alert(true, 'error', 'wrong phone number')
  }

  @Watch('deliveryDate')
  ondeliveryDateChange() {
    if (checkDate(this.deliveryDate)) this.alert(true, 'success', 'success', 2000)
    else this.alert(true, 'error', 'wrong date')
  }

  checkLength(word:string) {
    if (word.length === 0) { 
      this.alert(true, 'error', emptyFieldMessage);
      return false
    }
    return true;
  }
  get orderData() {
    return {
      orderId: uuid.v1(),
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
    if (this.checkLength(this.name) 
     && this.checkLength(this.surname)
     && this.checkLength(this.phoneNumber)
     && this.checkLength(this.deliveryDate)) {
      await request('orders', this.orderData, 'POST')
      this.alert(true, 'success', 'success', 2000)
      this.$router.push(`/order/thanks/${this.orderData.orderId}`)
    } else this.alert(true, 'error', 'sumbit failed', 2000)
  }

  alert(show:boolean, type:AlertType, message:string, delay?:number) {
    this.type = type;
    this.alertmessage = message;
    if (delay) {
      this.isalert = true;
      setTimeout(() => {
        this.isalert = false;
      }, delay)
    } else this.isalert = show;
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
