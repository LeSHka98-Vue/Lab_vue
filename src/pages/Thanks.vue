<template>
<div v-if="isAuthorized">
  <h1 class="header">Thank you for order! :)</h1>
  <img src="/images/success.png" alt="success" @error="onImageLoadFailure">
  <Section class="section">
    <table class="table">
      <tr>
        <td class="table__cell">Order №</td>
        <td class="table__cell"><span>{{ this.$route.params.orderId }}</span></td>
      </tr>
      <tr>
        <td class="table__cell">Products</td>
        <td class="table__cell">
          <span class="table__game" v-for="product in cartProducts" :key="product.id">{{ product.name }}</span>
        </td>
      </tr>
      <tr>
        <td class="table__cell">Total cost</td>
        <td class="table__cell"><span>{{ totalCost }}$</span></td>
      </tr>
    </table>
  </Section>
</div>
  <Alert v-else type="error" message="the order was not found"/>
  <router-link to="/">
    <Button class="button" type="success">Go to main page</Button>
  </router-link>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mapState } from 'vuex'
import Button from '@/ui/Button.vue'
import Section from '@/components/Section.vue'
import Alert from '@/alerts/Alert.vue'
import { Order, Product } from '@/store/types/interfaces'
import request from '@/utils/serverRequest'

@Options({
  components: {
    Button,
    Section,
    Alert
  },
  computed: {
    ...mapState(['isAuthorized']),
    ...mapState('cart', ['products'])
  }
})
export default class Thanks extends Vue {
  isAuthorized?:boolean
  orderData:Order| null = null 
  products!:number[]
  cartProducts:Product[] = []

  async mounted() {
    this.orderData = await request(`orders?orderId=${this.$route.params.orderId}`)
      .then((array) => array.find((el) => el.orderId === this.$route.params.orderId))
    this.cartProducts = await request('products').then((array) => array.filter((el) => this.products.includes(el.id)))
  }

  get totalCost() {
    let total = 0
    this.cartProducts.forEach((item) => {
      total += item.price
    })
    return total
  }

  onImageLoadFailure(e) {
    e.target.src = '/images/default3.png';
  }
}
</script>

<style lang="scss" scoped>
  .header {
    font-weight: 300;
  }
  .section {
    margin:auto;
    margin-top: 15px;
  }
  .table {
    color: $white;
    font-size: 20px;

    &__cell {
      padding: 12px 10px;
      color: $table-color;
      text-align: left;

      &:first-child {
        color: $table-first-column-text;
      }
    }

    &__game {
      margin-right: 10px;
    }
  }
  .button {
    margin-top: 20px;
  }
</style>
