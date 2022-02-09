<template>
  <h2>Cart</h2>
  <table class="table">
    <colgroup>
      <col class="table__first-column">
    </colgroup>
    <tr>
      <th class="table__th">Name</th>
      <th class="table__th">Release date</th>
      <th class="table__th">Price, $</th>
    </tr>
    <tr v-for="product in cartProducts" :key="product.id">
      <td class="table__cell">{{ product.name }}</td>
      <td class="table__cell">{{ product.releaseDate }}</td>
      <td class="table__cell">{{ product.price }}</td>
    </tr>
  </table>
  <h3>Total cost : {{ totalCost }} $</h3>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Product } from '@/store/types/interfaces'
import request from '@/utils/serverRequest'

export default class Cart extends Vue {
  cartProducts:Product[] = []

  async mounted() {
    const products = await request('products')
    this.cartProducts = products.filter((el) => this.$store.state.cart.products.includes(el.id))
  }

  get totalCost() {
    let total = 0
    this.cartProducts.forEach((item) => {
      total += item.price
    })
    return total
  }
} 
</script>

<style lang="scss">
  .table {
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    border-collapse:collapse;
    width: 70%;

    &__first-column {
      background: $table-first-column;
    }

    &__th:first-child,
    &__cell:first-child {
      color: $table-first-column-text;
      border-left: none;
    }
    &__th {
      font-weight: normal;
      border-bottom: 2px solid $table-yellow-line;
      padding: 8px 10px;
      text-align: left;
    }
    &__cell {
      padding: 12px 10px;
      color: $table-color;
      text-align: left;
    }
  }
</style>
