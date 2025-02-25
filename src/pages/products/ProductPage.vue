<template>
  <Alert v-if="isAlert"/>
  <div class="main-block" v-if="this.product.id">
    <img :src="SRC" :alt="product.name" class="img" @error="onImageLoadFailure">
    <div class="table-block">
      <table class="table">
        <colgroup>
          <col class="table__first-column">
        </colgroup>
        <tr>
          <th class="table__th">Name</th>
          <th class="table__th">Characteristics</th>
        </tr>
        <tr v-for="(value, name) in product.systemRequirements" :key="name">
          <td class="table__cell">{{ name }}</td>
          <td class="table__cell">{{ value }}</td>
        </tr>
      </table>
      <div class="table-block__buttons-block">
        <Button type="info" @click="addToCart">{{ buttonName }}</Button>
        <router-link v-if="+$route.params.id > 1"
          class="table-block__page-link" 
          :to="`/products/${+$route.params.id - 1}`"
          >
            <Button type="info">Previous</Button>
        </router-link>
        <router-link v-if="+$route.params.id < pagesAmount"
          class="table-block__page-link" 
          :to="`/products/${+$route.params.id + 1}`"
          >
            <Button type="info">Next</Button>
        </router-link>
      </div>
    </div>
    <p class="main-block__description">{{ product.description }}</p>
  </div>
  <h2 v-else>Content has not been loaded</h2>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState, mapMutations } from 'vuex'
import { Product } from '@/store/types/interfaces'
import Button from '@/ui/Button.vue'
import Alert from '@/alerts/Alert.vue'
import { AlertType } from '@/store/types/types'
import request from '@/utils/serverRequest'
import { successMessage, loginFirst } from '@/constants/textConstants'
import { productDefault } from '@/constants/defaultValues'

@Options({
  components: {
    Button,
    Alert
  },
  computed: {
    ...mapState('cart', ['products']),
    ...mapState(['isAuthorized', 'isAlert'])
  },
  methods: {
    ...mapMutations(['Alert']),
    ...mapMutations('cart', ['AddProduct', 'RemoveProduct'])
  }
})
export default class ProductPage extends Vue {
  isAuthorized?:boolean
  isAlert?:boolean
  products?: number[]
  Alert!: (arg0: {show?:boolean, type:AlertType, message:string, delay?:number}) => void
  AddProduct!: (arg0: number) => void
  RemoveProduct!: (arg0: number) => void

  product:Product = productDefault 
  pagesAmount = 0

  onImageLoadFailure(e) {
    e.target.src = '/images/default_320x400.png';
  }
  get SRC() {
    return `/images/games/${this.product?.image}`
  }
  get buttonName() {
    if (this.products?.includes(+this.$route.params.id)) return 'Remove from cart'
    return 'Add to cart'
  }
  addToCart() {
    if (this.isAuthorized) {
      if (this.products?.includes(+this.$route.params.id)) this.RemoveProduct(+this.$route.params.id)
      else this.AddProduct(+this.$route.params.id)
      this.Alert({ type: 'success', message: successMessage, delay: 2000 })
    } else this.Alert({ show: true, type: 'error', message: loginFirst, delay: 2000 })
  }

  async created() {
    this.product = await request(`products/${+this.$route.params.id}`)
    this.pagesAmount = (await request('products')).length;
  }

  async beforeRouteUpdate(to) {
    this.product = await request(`products/${to.params.id}`)
  }
}
</script>

<style lang="scss" scoped>
  .main-block {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    width: 70%;
    flex-wrap: wrap;
    padding: 10px;
    gap: 1.5%;

    &__description {
      max-width: 70%;
      text-shadow: 2px 4px 3px $descryption-text;
    }
  }
  .table-block {
    max-width: 70%;

    &__buttons-block {
      margin: 10px auto;
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    &__page-link {
      text-decoration: none;
    }
  }
  .img {
    min-height: 400px;
    max-height: 400px;
  }
  @import '@/assets/_table.scss'
</style>
