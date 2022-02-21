<template>
  <h1>Products</h1>
  <main class="main">
    <SideBar @sort-products="sortProducts" @filtration="filtration"/>
      <Section v-if="productsCopy.length">
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
      <Section v-else>
        <h2> No products</h2>
      </Section>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mapMutations } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'
import Section from '@/components/Section.vue'
import SideBar from '@/components/SideBar.vue'
import { Product } from '@/store/types/interfaces'
import request from '@/utils/serverRequest'
import { FiltrationTypes } from '@/constants/defaultValues'

@Options({
  components: {
    Section,
    ProductCard,
    SideBar
  },
  methods: {
    ...mapMutations(['setLoading'])
  }
})
export default class Products extends Vue {
  setLoading!: (arg0: boolean) => void
  products:Product[] = []
  productsCopy:Product[] = []
  copy1:Product[] = []
  copy2:Product[] = [] 

  async mounted() {
    this.products = await request('products');
    this.productsCopy = this.products
    this.copy1 = this.products
    this.copy2 = this.products
  }

  sortProducts(criteria:string, type:string) {
    this.setLoading(true)
    function byField(a, b):number {
      if (type === 'direct') return a[criteria] > b[criteria] ? 1 : -1
      return a[criteria] < b[criteria] ? 1 : -1
    }
    this.productsCopy.sort(byField)
    this.setLoading(false)
  }

  filtration(criteria:string, field:number|string) {
    this.setLoading(true)

    if (criteria === FiltrationTypes.genre) {
      if (field === null || field === FiltrationTypes.all) this.copy1 = this.products
      else this.copy1 = this.products.filter((product) => product[criteria] === field)
    }
    if (criteria === FiltrationTypes.price) {
      if (field === null || field === FiltrationTypes.all) this.copy2 = this.products
      else this.copy2 = this.products.filter((product) => product[criteria] > field) 
    } 
    this.productsCopy = this.copy1.filter((elem) => this.copy2.includes(elem))  

    this.setLoading(false)
  }
}
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    gap: 15%;
  }
</style>
