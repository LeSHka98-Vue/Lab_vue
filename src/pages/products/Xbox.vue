<template>
  <h1>Xbox</h1>
  <Section class="xboxSection" v-if="PCproducts.length">
    <ProductCard v-for="product of PCproducts"
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
  <h2 v-else>XBox products have not been loaded</h2>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import request from '@/utils/serverRequest'
import Section from '@/components/Section.vue'
import ProductCard from '@/components/ProductCard.vue'
import { Product } from '@/store/types/interfaces'

@Options({
  components: {
    Section,
    ProductCard
  }
})
export default class PC extends Vue {
  PCproducts:Product[] = []

  async mounted() {
    this.PCproducts = await request('products').then((products) => products.filter((elem) => elem.platform.includes('xbox')))
  }
}
</script>

<style lang="scss" scoped>
  .xboxSection {
    margin: auto;
  }
</style>
