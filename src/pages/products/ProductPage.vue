<template>
  <div class="main-block">
    <img :src="SRC" :alt="product.name" class="img">
    <div class="table-block">
      <table class="table">
        <colgroup>
          <col class="table__first-column">
        </colgroup>
        <tr>
          <th class="table__th">Name</th>
          <th class="table__th">Characteristics</th>
        </tr>
        <tr v-for="(value, name) in product.systemRequirements" :key="name">
          <td class="table__cell">{{ name }}</td>
          <td class="table__cell">{{ value }}</td>
        </tr>
      </table>
      <div class="table-block__buttons-block">
        <Button type="info">Add to cart</Button>
        <router-link v-if="+$route.params.id > 1"
          class="page-link" 
          :to="`/products/${+$route.params.id - 1}`"
          >
            <Button type="info">Previous</Button>
        </router-link>
        <router-link v-if="+$route.params.id < pagesAmount"
          class="page-link" 
          :to="`/products/${+$route.params.id + 1}`"
          >
            <Button type="info">Next</Button>
        </router-link>
      </div>
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
    systemRequirements: {
      CPU: "",
      RAM: "",
      VIDEO_CARD: ""
    }
  }; 
  
  pagesAmount = 0

  get SRC() {
    return `/images/games/${this.product.image}`
  }

  async created() {
    await this.request('products', +this.$route.params.id);
    this.pagesAmount = await this.request('products');
  }

  async beforeRouteUpdate(to) {
    await this.request('products', to.params.id);
  }

  request(param:string, page?:number|string[]):Promise<any> {
    const query:string = page
      ? `${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${param}/${page}`
      : `${process.env.VUE_APP_DEV_PATH}:${process.env.VUE_APP_PORT}/api/${param}`;
    return fetch(query)
      .then((response) => response.json())
      .then((data) => { 
        if (page) {
          this.product = data;
          return this.product;
        }
        this.pagesAmount = data.length;
        return this.pagesAmount;
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
</script>

<style lang="scss" scoped>
  .main-block {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    width: 70%;
    flex-wrap: wrap;
    padding: 10px;
    gap: 1.5%;
  }
  .table-block {
    &__buttons-block {
      margin: 10px auto;
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  }
  .img {
    min-height: 400px;
    max-height: 400px;
  }
  .table {
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    border-collapse:collapse;

    &__first-column {
      background: $table-first-column;
    }

    &__th:first-child,
    &__cell:first-child {
      color: $table-first-column-text;
      border-left: none;
    }
    &__th {
      font-weight: normal;
      border-bottom: 2px solid $table-yellow-line;
      padding: 8px 10px;
      text-align: left;
    }
    &__cell {
      padding: 12px 10px;
      color: $table-color;
      text-align: left;
    }
  }
  .description {
    max-width: 70%;
    text-shadow: 2px 4px 3px $descryption-text;
  }
  .page-link {
    text-decoration: none;
  }
</style>
