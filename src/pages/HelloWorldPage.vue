<template>
    <Section caption="Categories">
      <Card image="computer" signature="PC" category="pc"/>
      <Card image="playstation" signature="PS5" category="ps5"/>
      <Card image="xbox" signature="XBox" category="xbox"/>
    </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'

@Options({
  components: {
    Section,
    Card
  }
})
export default class HelloWorldPage extends Vue {}
</script>
