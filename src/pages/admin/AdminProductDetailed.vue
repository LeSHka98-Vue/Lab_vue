<template>
  <div class="main-block">
    <div class="left-block">
      <img :src="SRC" :alt="product.name" class="left-block__img" @error="onImageLoadFailure">
      <Button type="success" @click="save()" :disabled="isDisabled">Save changes</Button>
    </div>
    <table class="table">
      <colgroup>
        <col class="table__first-column">
      </colgroup>
      <tr>
        <th class="table__th">Name</th>
        <th class="table__th">Characteristics</th>
      </tr>
      <tr v-for="name of Object.keys(productData)" :key="name">
        <td class="table__cell">{{ name }}</td>
        <td class="table__cell">
          <Input v-if="name !=='description'" type="text" v-model:search="product[name]"/>
          <textarea v-else cols="43" rows="6" v-model="product.description"></textarea>
        </td>
      </tr>
      <tr>
        <td class="table__cell">System Requirements :</td>
      </tr>
      <tr v-for="name of Object.keys(product.systemRequirements)" :key="name">
        <td class="table__cell">{{ name }}</td>
        <td class="table__cell">
          <textarea  cols="43" rows="3" v-model="product.systemRequirements[name]"></textarea>
        </td>
      </tr>
      <tr>
        <td class="table__cell">Platform :</td>
      </tr>
      <tr v-for="name of platformsAll" :key="name">
        <td class="table__cell">{{ name }}</td>
        <td class="table__cell">
          <input type="checkbox" :value="name" v-model="product.platform"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapMutations } from 'vuex'
import { Watch, Prop } from 'vue-property-decorator'
import request from '@/utils/serverRequest'
import { Product } from '@/store/types/interfaces'
import Button from '@/ui/Button.vue'
import Input from '@/ui/Input.vue'
import { successMessage, priceError, ratingError, imageError, invalidfields, genreError } from '@/constants/textConstants'
import { checkImagePath, checkRange, checkGenre } from '@/utils/checks'
import { platformsAll, productDefault } from '@/constants/defaultValues'
import { minRating, maxRating, minPrice, maxPrice } from '@/constants/numeralConsts'
import { AlertType } from '@/store/types/types'

@Options({
  components: {
    Button,
    Input
  },
  methods: {
    ...mapMutations(['Alert'])
  }
}) 
export default class AdminProductDetailedPage extends Vue {
  @Prop(Boolean) newproduct:boolean | undefined
  Alert!: (arg0: {show?:boolean, type:AlertType, message:string, delay?:number}) => void

  product:Product = productDefault
  platformsAll = platformsAll 

  async mounted() {
    if (!this.newproduct) this.product = await request(`products/${this.$route.params.id}`)
  }
  onImageLoadFailure(e) {
    e.target.src = '/images/default_320x400.png';
  }
  get SRC() {
    return `/images/games/${this.product?.image}`
  }
  get isDisabled() {
    return !this.checkfields
  }
  get productData() {
    const product = {}
    for (const [key, value] of Object.entries(this.product)) {
      if (key !== 'id' && key !== 'systemRequirements' && key !== 'platform') {
        product[key] = value
      }
    }
    return product
  }

  get checkfields() {
    return checkImagePath(this.product.image) && checkRange(+this.product.rating, minRating, maxRating) 
    && checkRange(+this.product.price, minPrice, maxPrice) && checkGenre(this.product.genre) && this.checkLength(this.product)
  }

  @Watch('product.image')
  omImageChange() {
    if (!checkImagePath(this.product.image)) this.Alert({ type: 'error', message: imageError, delay: 2000 });
  }

  @Watch('product.rating')
  onRatingChange() {
    if (!checkRange(+this.product.rating, minRating, maxRating)) this.Alert({ type: 'error', message: ratingError, delay: 2000 });
  }

  @Watch('product.price')
  onPriceChange() {
    if (!checkRange(+this.product.price, minPrice, maxPrice)) this.Alert({ type: 'error', message: priceError, delay: 2000 });
  }

  @Watch('product.genre')
  onGenreChange() {
    if (!checkGenre(this.product.genre)) this.Alert({ type: 'error', message: genreError, delay: 2000 });
  }

  checkLength(product) {
    for (const value of Object.values(product)) {
      if (typeof (value) === 'object') return this.checkLength(value)
      if (!value) return false
    }
    return true;
  }

  async save() {
    if (!this.checkfields) { this.Alert({ type: 'error', message: invalidfields, delay: 2000 }); return }
    if (this.newproduct) await request('products', this.product, 'POST')
    else await request(`products/${this.$route.params.id}`, this.product, 'PATCH')
    this.Alert({ type: 'success', message: successMessage, delay: 2000 })
  }
}
</script>

<style lang="scss" scoped>
 .main-block {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    width: 70%;
    padding: 10px;
    gap: 1.5%;
  }
  .left-block {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &__img {
      min-height: 400px;
      max-height: 400px;
    }
  }
  @import '@/assets/_table.scss';
  .table {
    &__cell {
      padding: 5px 10px;
    }
  }
</style>
