<template>
  <div class="main-block">
    <div class="left-block">
      <img :src="SRC" :alt="product.name" class="img" @error="onImageLoadFailure">
      <Button type="success" @click="save()">Save changes</Button>
    </div>
    <table class="table">
        <colgroup>
          <col class="table__first-column">
        </colgroup>
        <tr>
          <th class="table__th">Name</th>
          <th class="table__th">Characteristics</th>
        </tr>
        <tr>
          <td class="table__cell">Name</td>
          <td class="table__cell">
            <Input type="text" v-model:search="product.name"/>
          </td>
        </tr>
        <tr>
          <td class="table__cell">Image</td>
          <td class="table__cell">
            <Input type="text" v-model:search="product.image"/>
          </td>
        </tr>
        <tr>
          <td class="table__cell">Genre</td>
          <td class="table__cell">
            <Input type="text" v-model:search="product.genre"/>
          </td>
        </tr>
        <tr>
          <td class="table__cell">Rating</td>
          <td class="table__cell">
            <Input type="number" v-model:search="product.rating"/>
          </td>
        </tr>
        <tr>
          <td class="table__cell">Description</td>
          <td class="table__cell">
            <textarea  cols="43" rows="6" v-model="product.description"></textarea>
          </td>
        </tr>
        <tr>
          <td class="table__cell">Price $</td>
          <td class="table__cell">
            <Input type="number" v-model:search="product.price"/>
          </td>
        </tr>
        <tr>
          <td class="table__cell">System Requirements :</td>
        </tr>
        <tr>
          <td class="table__cell">CPU</td>
          <td class="table__cell">
            <textarea  cols="43" rows="3" v-model="product.systemRequirements.CPU"></textarea>
          </td>
        </tr>
        <tr>
          <td class="table__cell">RAM</td>
          <td class="table__cell">
            <textarea  cols="43" rows="3" v-model="product.systemRequirements.RAM"></textarea>
          </td>
        </tr>
        <tr>
          <td class="table__cell">Video Card</td>
          <td class="table__cell">
            <textarea  cols="43" rows="3" v-model="product.systemRequirements.VIDEO_CARD"></textarea>
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
import { emptyFieldMessage } from '@/constants'
import { checkImagePath, checkRange } from '@/utils/checks'
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
Alert!: (arg0: {show:boolean, type:AlertType, message:string, delay?:number}) => void
  product:Product = {
    image: '',
    name: '',
    genre: '',
    rating: 0,
    description: '',
    price: 0,
    systemRequirements: {
      CPU: '',
      RAM: '',
      VIDEO_CARD: ''
    }
  }; 

  async mounted() {
    if (!this.newproduct) this.product = await request(`products/${this.$route.params.id}`)
  }
  onImageLoadFailure(e) {
    e.target.src = '/images/default_320x400.png';
  }
  get SRC() {
    return `/images/games/${this.product?.image}`
  }

  @Watch('product.image')
  omImageChange() {
    if (checkImagePath(this.product.image)) this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 });
    else this.Alert({ show: true, type: 'error', message: 'wrong image path', delay: 2000 });
  }

  @Watch('product.rating')
  onRatingChange() {
    if (checkRange(this.product.rating, 0, 10)) this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 });
    else this.Alert({ show: true, type: 'error', message: 'wrong rating', delay: 2000 });
  }

  @Watch('product.price')
  onPriceChange() {
    if (checkRange(this.product.price, 0, 15)) this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 });
    else this.Alert({ show: true, type: 'error', message: 'wrong price', delay: 2000 });
  }

  checkLength(product) {
    /* eslint-disable-next-line */
    for (const value of Object.values(product)) {
      if (typeof (value) === 'object') return this.checkLength(value)
      if (!value) return false
    }
    return true;
  }

  async save() {
    if (!this.checkLength(this.product)) { this.Alert({ show: true, type: 'error', message: emptyFieldMessage, delay: 2000 }); return }
    if (!checkImagePath(this.product.image) || !checkRange(this.product.rating, 0, 10) || !checkRange(this.product.rating, 0, 15)) {
      this.Alert({ show: true, type: 'error', message: 'fields are not valid', delay: 2000 });
    } else {
      if (this.newproduct) await request('products', this.product, 'POST')
      else await request(`products/${this.$route.params.id}`, this.product, 'PATCH')
      this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 });
    }
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
  }
  .img {
    min-height: 400px;
    max-height: 400px;
  }
  .table {
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    border-collapse: collapse;

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
</style>
