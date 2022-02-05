<template>
  <main class="mainpage">
    <Search />
    <Section caption="Categories">
      <Card v-for="category of categories"
        :key="category.id"
        :image="category.image" 
        :signature="category.signature" 
        :category="category.category"/>
    </Section>
    <Section caption="Recently added">
      <ProductCard v-for="product of products"
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
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import { Category, Product } from '@/store/types/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import Search from '@/components/Search.vue'
// import Loader from '@/components/Loader.vue'
import request from '@/utils/serverRequest'

@Options({
  components: {
    Section,
    Card,
    ProductCard,
    Search
  }
})
export default class HelloWorldPage extends Vue {
  categories: Category[] = []
  products: Product[] = [] 

  async mounted() {
    // this.$store.commit('setLoading', true)
    this.categories = await request('categories');
    this.products = await request('products');
    // this.$store.commit('setLoading', false)
  }
}
</script>

<style lang="scss" scoped>
  .mainpage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>
