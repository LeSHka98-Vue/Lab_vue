<template>
    <Search />
    <Section caption="Categories">
      <Card image="computer" signature="PC" category="pc"/>
      <Card image="playstation" signature="PS5" category="ps5"/>
      <Card image="xbox" signature="XBox" category="xbox"/>
    </Section>
    <Section caption="Recently added">
      <ProductCard v-for="product of products"
        :key="product.id"
        :name="product.name" 
        :image="product.image" 
        :genre="product.genre" 
        :rating="product.rating" 
        :description="product.description"
      />
    </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import { Category, Product } from '@/types/interfaces'
import { Categories, Products } from '@/dataFile'
import ProductCard from '@/components/ProductCard.vue'
import Search from '@/components/Search.vue'

@Options({
  components: {
    Section,
    Card,
    ProductCard,
    Search
  }
})
export default class HelloWorldPage extends Vue {
  categories:Category[] = Categories;
  products:Product[] = Products;
}
</script>
