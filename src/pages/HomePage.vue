<template>
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
        :name="product.name" 
        :image="product.image" 
        :genre="product.genre" 
        :rating="product.rating" 
        :description="product.description"
      />
    </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import { Category, Product } from '@/store/types/interfaces'
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
