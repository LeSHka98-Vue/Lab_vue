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
      <router-link to="/checkout" class="router-link">
        <Button type="info">CheckOut</Button>
      </router-link>
  </div>
  <h2 v-else>Cart is empty</h2>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState, mapMutations } from 'vuex'
import { Product } from '@/store/types/interfaces'
import Button from '@/ui/Button.vue'
import request from '@/utils/serverRequest'

@Options({
  components: {
    Button
  },
  computed: {
    ...mapState('cart', ['products'])
  },
  methods: {
    ...mapMutations('cart', ['RemoveProduct'])
  }
})
export default class Cart extends Vue {
  products?:number[]
  cartProducts:Product[] = []
  RemoveProduct!: (arg0: number) => void

  async mounted() {
    this.cartProducts = (await request('products')).filter((el) => this.products?.includes(el.id))
  }
  onImageLoadFailure(e) {
    e.target.src = '/images/default3.png';
  }

  get totalCost() {
    return this.cartProducts.reduce((current, item) => current + item.price, 0)
  }

  removeProduct(id:number) {
    this.cartProducts = this.cartProducts.filter((el) => el.id !== id)
    this.RemoveProduct(id)
  }
} 
</script>

<style lang="scss" scoped>
  @import '@/assets/_table.scss';
  .table {
    margin: auto;
    width: 70%;

    &__image-block {
      justify-content: space-around;
    }
    &__image {
      width: 60px;
      height:60px;
    }
  }
  .router-link  {
      text-decoration: none;
      color: $gray;
  }
</style>
