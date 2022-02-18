<template>
  <h1>Products</h1>
  <Alert v-if="isAlert"/>
  <router-link :to="`/admin/products/newProduct`" class="table__router-link">
    <Button type="success">Create new product</Button>
  </router-link>
  <table class="table">
    <colgroup>
      <col class="table__first-column">
    </colgroup>
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
        </div>
      </td>
      <td class="table__cell">
        <div class="table__button-block">
          <router-link :to="`/admin/products/edit-${product.id}`" class="table__router-link">
            <Button type="warning">Edit</Button>
          </router-link>
          <Button type="error" @click="removeProduct(product.id)">Remove</Button>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState, mapMutations } from 'vuex'
import request from '@/utils/serverRequest'
import { Product } from '@/store/types/interfaces'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import { AlertType } from '@/store/types/types'

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
  Alert!: (arg0: {show:boolean, type:AlertType, message:string, delay?:number}) => void
  products:Product[] = []

  async mounted() {
    this.products = await request('products')
  }

  async removeProduct(id:number) {
    await request(`products/${id}`, null, 'DELETE')
    this.products = await request('products')
    this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 });
  }
}
</script>

<style lang="scss" scoped>
  .table {
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    border-collapse: collapse;
    margin: auto;
    width: 55%;

    // &__first-column {
    //   background: $table-first-column;
    // }
    &__cell {
      padding: 12px 10px;
      text-align: left;
    }
    &__cell:first-child {
      color: $table-first-column-text;
      border-left: none;
    }
    &__image-block,
    &__button-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__image {
      width: 100px;
      height: 100px;
    }
    &__picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &__router-link {
      text-decoration: none;
      color: $black;
    }
  }

</style>
