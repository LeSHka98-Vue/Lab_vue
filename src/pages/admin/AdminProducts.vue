<template>
  <h1>Products</h1>
  <Alert v-if="isAlert"/>
  <router-link :to="`/admin/products/newProduct`" class="table__router-link">
    <Button type="success">Create new product</Button>
  </router-link>
  <table class="table" v-if="this.products.length">
    <tr v-for="product in products" :key="product.id">
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
          <router-link :to="`/admin/products/edit-${product.id}`" class="table__router-link">
            <Button type="warning">Edit</Button>
          </router-link>
        </div>
      </td>
      <td class="table__cell">
        <Button type="error" @click="removeProduct(product.id)">Remove</Button>
      </td>
    </tr>
  </table>
  <h2 v-else>no products</h2>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState, mapMutations } from 'vuex'
import request from '@/utils/serverRequest'
import { Product } from '@/store/types/interfaces'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import { AlertType } from '@/store/types/types'
import { successMessage } from '@/constants/textConstants'

@Options({
  components: {
    Button,
    Alert
  },
  computed: {
    ...mapState(['isAlert'])
  },
  methods: {
    ...mapMutations(['Alert'])
  }
})
export default class AdminProducts extends Vue {
  isAlert?:boolean
  Alert!: (arg0: {show?:boolean, type:AlertType, message:string, delay?:number}) => void
  products:Product[] = []

  async mounted() {
    this.products = await request('products')
  }

  async removeProduct(id:number) {
    await request(`products/${id}`, null, 'DELETE')
    this.products = await request('products')
    this.Alert({ type: 'success', message: successMessage, delay: 2000 });
  }
  onImageLoadFailure(e) {
    e.target.src = '/images/default3.png';
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/_table.scss';
  .table {
    margin: auto;
    width: 55%;

    &__first-column {
      background: none;
    }
    &__image {
      width: 80px;
      height: 80px;
    }
  }
</style>
