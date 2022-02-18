<template>
  <section section class="main">
    <Input type="text" placeholder="Search" v-model:search="search"/>
    <div class="break"></div>
    <Section caption="Search results">
      <div class="search-result" v-if="products.length">
        <ProductCard v-for="product of products"
          :key="product.id"
          :id="product.id"
          :name="product.name" 
          :image="product.image" 
          :genre="product.genre" 
          :rating="product.rating" 
          :description="product.description"
          :price="product.price"
        />
      </div>
      <h2 class="alt-search-result" v-else>No results</h2>
    </Section>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Input from '@/ui/Input.vue'
import ProductCard from '@/components/ProductCard.vue'
import Section from '@/components/Section.vue'
import { Product } from '@/store/types/interfaces'
import debounce from '@/utils/Debounce'
import request from '@/utils/serverRequest'

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
  debouncedWatch!: (...args: any) => any

  async created() {
    this.products = await request(`products/?name_like=${this.search}`);
    this.debouncedWatch = debounce(request);
    // console.log(this.debouncedWatch(`products/?name_like=${this.search}`))
  }

  @Watch('search')
  async onSearchChanged(value:string) {
    // console.log(this.debouncedWatch(`products/?name_like=${value}`))
    this.products = await this.debouncedWatch(`products/?name_like=${value}`)
  }

  // async request(param:string, value:string) {
  //   this.$store.commit('setLoading', true)
  //   await fetch(`${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${param}?name_like=${value}`)
  //     .then((response) => response.json())
  //     .then((data) => { this.products = data })
  //     .catch((error) => {
  //       console.error(error.message);
  //     })
  //   this.$store.commit('setLoading', false)
  // }
}
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }
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
    .break {
      width: 100%;
    }
</style>
