<template>
    <Section caption="Categories">
      <Card v-for="category of categories"
        :key="category.id" 
        :image="category.image" 
        :signature="category.signature" 
        :category="category.category"
      />
    </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import { CategoryArray } from '@/types/interfaces'
import Categories from '@/categories'

@Options({
  components: {
    Section,
    Card
  }
})
export default class HelloWorldPage extends Vue {
  categories:CategoryArray = Categories ;
}
</script>
