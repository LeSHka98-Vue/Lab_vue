<template>
  <div class="main-block">
    <img :src="SRC" :alt="product.name">
    <div>
      <table class="table">
        <colgroup>
          <col style="background:#C7DAF0;">
        </colgroup>
        <tr>
          <th class="table__th">Name</th>
          <th class="table__th">Characteristic</th>
        </tr>
        <tr v-for="(item, index) of tableSystemReqs" :key="index">
          <td class="table__cell">{{ item[0] }}</td>
          <td class="table__cell">{{ item[1] }}</td>
        </tr>
      </table>
      <Button type="info">Add to cart</Button>
      <Button type="info">
        <router-link class="next-page" :to="`/products/${+$route.params.id + 1}`">Next</router-link>
      </Button>
    </div>
    <p class="description">{{ product.description }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Product } from '@/types/interfaces'
import Button from '@/ui/Button.vue'

@Options({
  components: {
    Button
  }
})
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
  
  tableSystemReqs:string[][] = [];

  getSystemRequirements() {
    let systemReqsByType:string[]|undefined = [];
    systemReqsByType = this.product.systemRequirements?.split('; ') ?? [];

    for (let i = 0; i < systemReqsByType.length; i += 1) {
      const index = systemReqsByType[i].indexOf(':');
      const stringArr:string[] = [systemReqsByType[i].slice(0, index), systemReqsByType[i].slice(index + 1)];
      this.tableSystemReqs[i] = stringArr;
    }
  }

  get SRC() {
    return `/images/games/${this.product.image}`
  }

  async created() {
    await this.request('products', +this.$route.params.id);
    this.getSystemRequirements();
  }

  async beforeRouteUpdate(to, from) {
    await this.request('products', to.params.id);
    this.getSystemRequirements();
  }

  request(param:string, page:number|string[] = +this.$route.params.id) {
    return fetch(`${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${param}/${page}`)
      .then((response) => response.json())
      .then((data) => { this.product = data })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
</script>

<style lang="scss" scoped>
  .main-block {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    gap: 10px;
  }
  .table {
     font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
     border-collapse:collapse;
     color: #3E4347;

     &__th:first-child,
     &__cell:first-child {
       color: #F5F6F6;
       border-left: none;
     }
    &__th {
      font-weight: normal;
      border-bottom: 2px solid #F5E1A6;
      // border-right: 20px solid white;
      // border-left: 20px solid white;
      padding: 8px 10px;
      text-align: left;
    }
    &__cell {
      // border-right: 20px solid white;
      // border-left: 20px solid white;
      padding: 12px 10px;
      color: #8b8e91;
      text-align: left;
    }
  }
  .description {
    max-width: 60%;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
  }
  .next-page {
    text-decoration: none;
  }
</style>
