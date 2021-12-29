<template>
  <h1>{{ product.name }}</h1>
  <img :src="SRC" :alt="product.name">
  <h2>{{ product.description }}</h2>
  <button >Add to cart</button>
  <table>
    <tr v-for="(item, index) of final" :key="index">
      <td>{{ item[0] }}</td>
      <td>{{ item[1] }}</td>
    </tr>
  </table>
  <router-link :to="`/products/${+$route.params.id + 1}`">Next</router-link>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Product } from '@/types/interfaces'

export default class ProductPage extends Vue {
  product:Product = {
    id: 0,
    image: '',
    name: '',
    genre: '',
    rating: 0,
    description: '',
    systemRequirements: ''
  }; 
  systemReqs:string[]|undefined = [];
  final:string[][] = [];

  getSystemRequirements() {
    this.systemReqs = this.product.systemRequirements?.split('; ');
    for (let i = 0; i < this.systemReqs!.length; i += 1) {
      const stringArr:string[] = this.systemReqs![i].split(': ');
      this.final[i] = stringArr
    }
    console.log(this.product);
  }

  get SRC() {
    return `/images/games/${this.product.image}`
  }

  created() {
    this.request('products', +this.$route.params.id);
    console.log(this.product);
    this.getSystemRequirements();
  }

  beforeRouteUpdate(to, from) {
    this.request('products', to.params.id);
  }

  request(param:string, page:number|string[] = +this.$route.params.id) {
    fetch(`${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${param}/${page}`)
      .then((response) => response.json())
      .then((data) => { this.product = data })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
</script>

<style>

</style>
