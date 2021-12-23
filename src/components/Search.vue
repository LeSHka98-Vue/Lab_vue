<template>
  <Input type="text" v-model:search="search"/>
  <Section caption="Search results">
    <div class="search-result" v-if="products.length">
      <ProductCard v-for="product of products"
        :key="product.id"
        :name="product.name" 
        :image="product.image" 
        :genre="product.genre" 
        :rating="product.rating" 
        :description="product.description"
      />
    </div>
    <h2 class="alt-search-result" v-else>No results</h2>
  </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Input from '@/ui/Input.vue'
import ProductCard from '@/components/ProductCard.vue'
import Section from '@/components/Section.vue'
import { Product } from '@/types/interfaces'
import debounce from '@/utils/Debounce'

@Options({
  components: {
    Input,
    ProductCard,
    Section
  }
})
export default class Search extends Vue {
  search = '';
  products:Product[] = [];
  debouncedWatch!: (...args: any) => void

  created() {
    this.request('products', this.search);
    this.debouncedWatch = debounce(this.request);
  }

  @Watch('search')
  onSearchChanged(value:string) {
    this.debouncedWatch('products', value)
  }

  request(param:string, value:string) {
    fetch(`${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${param}?name_like=${value}`)
      .then((response) => response.json())
      .then((data) => { this.products = data })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
</script>

<style lang="scss" scoped>
    .search-result {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4%;
      width: 100%;
    }
    .alt-search-result {
      color: $white;
    }
</style>
