<template>
  <main class="main-page">
    <Search />
    <Section caption="Categories" v-if="categories.length">
      <Card v-for="category of categories"
        :key="category.id"
        :image="category.image" 
        :signature="category.signature" 
        :category="category.category"/>
    </Section>
    <Section caption="Recently added" v-if="recentlyAddedProducts.length">
      <ProductCard v-for="product of recentlyAddedProducts"
        :key="product.id"
        :id="product.id"
        :name="product.name" 
        :image="product.image" 
        :genre="product.genre" 
        :rating="product.rating" 
        :description="product.description"
        :price="product.price"
      />
    </Section>
  </main> 
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import { Category, Product } from '@/store/types/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import Search from '@/components/Search.vue'
import request from '@/utils/serverRequest'
import { recentlyaddedAmount } from '@/constants/numeralConsts'

@Options({
  components: {
    Section,
    Card,
    ProductCard,
    Search
  },
  computed: {
    ...mapGetters('cart', ['getCartProducts'])
  }
})
export default class HelloWorldPage extends Vue {
  getCartProducts?:number[]
  categories: Category[] = []
  recentlyAddedProducts: Product[] = [] 

  async mounted() {
    this.categories = await request('categories');
    const cartProducts = (await request('products')).filter((el) => this.getCartProducts?.includes(el.id))
    this.recentlyAddedProducts = cartProducts.length >= recentlyaddedAmount 
      ? cartProducts.slice(cartProducts.length - recentlyaddedAmount) 
      : cartProducts
  }
}
</script>

<style lang="scss" scoped>
  .main-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>
