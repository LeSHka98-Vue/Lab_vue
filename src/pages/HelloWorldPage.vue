<template>
    <Section caption="Search">
      <Input type="email"></Input>
    </Section>
    <Section caption="Categories">
      <Card v-for="category of categories"
        :key="category.id" 
        :image="category.image" 
        :signature="category.signature" 
        :category="category.category"
      />
    </Section>
    <Section caption="Recently added">
      <ProductCard name="Crysis" image="crysis" genre="shooter" rating="8" description="Crysis"/>
      <ProductCard name="NFS" image="nfs" genre="racing" rating="9" description="NFS"/>
      <ProductCard 
        name="Assasin's Creed" 
        image="assasin" 
        genre="RPG" 
        rating="9" 
        description="Assasin's Creed"
      />
    </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import { CategoryArray } from '@/types/interfaces'
import Categories from '@/categories'
import ProductCard from '@/components/ProductCard.vue'
import Input from '@/ui/Input.vue'

@Options({
  components: {
    Section,
    Card,
    ProductCard,
    Input
  }
})
export default class HelloWorldPage extends Vue {
  categories:CategoryArray = Categories ;
}
</script>
