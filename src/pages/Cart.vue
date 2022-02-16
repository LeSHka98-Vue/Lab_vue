<template>
  <h2>Cart</h2>
  <table class="table" v-if="cartProducts.length">
    <colgroup>
      <col class="table__first-column">
    </colgroup>
    <tr>
      <th class="table__th">Name</th>
      <th class="table__th">Release date</th>
      <th class="table__th">Price, $</th>
    </tr>
    <tr v-for="product in cartProducts" :key="product.id">
      <td class="table__cell">
        <div class="table__image-block">
          <div class="table__image">
            <img 
              class="table__picture"
              :src="`/images/games/${product.image}`"
              :alt="product.image" 
              @error="onImageLoadFailure"
            >
          </div>
        <router-link :to="`/products/${product.id}`" class="table__router-link">{{ product.name }}</router-link>
        </div>
      </td>
      <td class="table__cell">{{ product.releaseDate }}</td>
      <td class="table__cell">{{ product.price }}</td>
      <td>
        <Button type="error" @click="removeProduct(product.id)">Remove</Button>
      </td>
    </tr>
  </table>
  <div v-if="cartProducts.length">
      <h3 >Total cost : {{ totalCost }} $</h3>
      <router-link to="/checkout" class="table__router-link">
        <Button type="info">CheckOut</Button>
      </router-link>
  </div>
  
  <h2 v-else>Cart is empty</h2>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Product } from '@/store/types/interfaces'
import Button from '@/ui/Button.vue'
import request from '@/utils/serverRequest'

@Options({
  components: {
    Button
  }
})
export default class Cart extends Vue {
  cartProducts:Product[] = []

  async mounted() {
    const products = await request('products')
    this.cartProducts = products.filter((el) => this.$store.state.cart.products.includes(el.id))
  }
  onImageLoadFailure(e) {
    e.target.src = '/images/default.png';
  }

  get totalCost() {
    let total = 0
    this.cartProducts.forEach((item) => {
      total += item.price
    })
    return total
  }

  removeProduct(id:number) {
    this.cartProducts = this.cartProducts.filter((el) => el.id !== id)
    this.$store.commit('cart/RemoveProduct', id)
  }
} 
</script>

<style lang="scss" scoped>
  .table {
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    border-collapse:collapse;
    margin: auto;
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
      // color: $table-color;
      text-align: left;
    }
    &__image-block {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    &__picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &__image {
      width: 60px;
      height:60px;
    }
    &__router-link {
      text-decoration: none;
      color: $gray;
    }
  }
</style>
