<template>
      <h1>Products</h1>
      <main class="main">
        <SideBar @sort-products="sortProducts" @filtration="filtration"/>
          <Section>
            <ProductCard v-for="product of productsCopy"
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
import ProductCard from '@/components/ProductCard.vue'
import Section from '@/components/Section.vue'
import SideBar from '@/components/SideBar.vue'
import { Product } from '@/store/types/interfaces'
import request from '@/utils/serverRequest'

@Options({
  components: {
    Section,
    ProductCard,
    SideBar
  }
})
export default class Products extends Vue {
  products:Product[] = []
  productsCopy:Product[] = []
  copy1:Product[] = []
  copy2:Product[] = [] 

  async mounted() {
    // this.$store.commit('setLoading', true)
    this.products = await request('products');
    this.productsCopy = this.products
    this.copy1 = this.products
    this.copy2 = this.products
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    // this.$store.dispatch('LoaderAction', false)
    this.$store.commit('setLoading', false)
  }

  sortProducts(criteria:string, type:string) {
    this.$store.commit('setLoading', true)
    function byField(a, b):number {
      if (type === 'direct') return a[criteria] > b[criteria] ? 1 : -1
      return a[criteria] < b[criteria] ? 1 : -1
    }
    this.productsCopy.sort(byField)
    this.$store.commit('setLoading', false)
  }

  filtration(criteria:string, field:number|string) {
    this.$store.commit('setLoading', true)

    this.productsCopy = this.products

    if (criteria === 'genre') {
      if (field === 'all') this.copy1 = this.products 
      else this.copy1 = this.products.filter((product) => product[criteria] === field)
    }
    if (criteria === 'price') {
      if (field === 'all') this.copy2 = this.products 
      else this.copy2 = this.products.filter((product) => product[criteria] > field)
    } 
    this.productsCopy = this.copy1.filter((elem) => this.copy2.includes(elem))  

    this.$store.commit('setLoading', false)
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  gap: 15%;
}
</style>
