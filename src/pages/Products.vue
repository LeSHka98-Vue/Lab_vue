<template>
    <h1>Products</h1>
    <Section caption="Categories">
      <Card image="computer" signature="PC" category="pc"/>
      <Card image="playstation" signature="PS5" category="ps5"/>
      <Card image="xbox" signature="XBox" category="xbox"/>
    </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Card from '@/components/Card.vue'
import Section from '@/components/Section.vue'

@Options({
  components: {
    Card,
    Section
  }
})
export default class Products extends Vue {}
</script>
