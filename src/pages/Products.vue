<template>
    <h1>Products</h1>
    <Section caption='Categories'>
      <Card v-for="category of categories"
        :key="category.id" 
        :image="category.image" 
        :signature="category.signature" 
        :category="category.category"
      />
    </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Card from '@/components/Card.vue'
import Section from '@/components/Section.vue'
import { CategoryArray } from '@/types/interfaces'
import Categories from '@/categories'

@Options({
  components: {
    Card,
    Section
  }
})
export default class Products extends Vue {
  categories:CategoryArray = Categories ;
}
</script>
