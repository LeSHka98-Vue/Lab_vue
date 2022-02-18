<template>
<Alert v-if="isAlert"/>
    <div class="wrapper">
      <div class="product-card">
        <div class="product-card__front">
          <div class="product-card__image">
            <img 
              class="product-card__picture"
              :src="`/images/games/${this.image}`"
              :alt="image" 
              @error="onImageLoadFailure"
            >
          </div>
          <div class="product-card__name">
            <div class="product-card__left-block">
              <span>{{ name }}</span><br>
              <span class="product-card__genre">{{ genre }}</span>
            </div>
            <div class="product-card__right-block">
              <span>Rating: {{rating}}</span><br>
              <span>{{ price }}$</span>
            </div>
            
          </div>
        </div>
        <div class="product-card__back">
          <p class="product-card__description">
            {{ description }}<br>
            <router-link :to="`/products/${id}`">more</router-link>
          </p>
          <Button type="info-outline" @click="addToCart">{{ buttonName }}</Button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import Alert from '@/alerts/Alert.vue'
import { AlertType } from '@/store/types/types'
import Button from '@/ui/Button.vue'

@Options({
  components: {
    Alert,
    Button
  },
  computed: {
    ...mapState('cart', ['products']),
    ...mapState(['isAuthorized', 'isAlert'])
  },
  methods: {
    ...mapMutations(['Alert'])
  }
})
export default class ProductCard extends Vue {
  @Prop(Number) id!: number
  @Prop(String) image: string|undefined
  @Prop(String) name: string|undefined
  @Prop(String) genre: string|undefined
  @Prop(String) description: string|undefined
  @Prop(Number) rating: number|undefined
  @Prop(Number) price: number|undefined

  isAuthorized?:boolean
  isAlert?:boolean
  products?: number[]
  Alert!: (arg0: {show:boolean, type:AlertType, message:string, delay?:number}) => void

  onImageLoadFailure(e) {
    e.target.src = '/images/default.png';
  }

  get buttonName() {
    if (this.products?.includes(this.id)) return 'Remove from cart'
    return 'Add to cart'
  }

  addToCart() {
    if (this.isAuthorized) {
      if (this.products?.includes(this.id)) this.$store.commit('cart/RemoveProduct', this.id)
      else this.$store.commit('cart/AddProduct', this.id)
      this.Alert({ show: true, type: 'success', message: 'success', delay: 2000 })
    } else this.Alert({ show: true, type: 'error', message: 'Log in/ Register first !', delay: 2000 })
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 285px;
    perspective: 1000px;

    &:hover .product-card{
      transform: rotateY(180deg);
    }
  }
  .product-card {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: $box-shadow-card;
    transition: transform 1s;
    transform-style: preserve-3d;

    %both-sides {
      position: absolute;
      backface-visibility: hidden;
      overflow: hidden;
      border-radius: 7px;
    }

    &__front {
      @extend %both-sides;
      background: $dark-gray;
      color:$white;
    }

    &__back {
      @extend %both-sides;
      transform: rotateY(180deg);
      width: 100%;
      height: 100%;
      background: $white;
    }
    &__description {
        padding: 7px;
        text-align: justify;
    }

    &__image {
      width: 220px;
      height: 235px;
    }
    &__name {
      display: flex;
      justify-content: space-between;
      padding: 8px;
    }
    &__left-block {
        text-align: left;
    }
    &__right-block {
        text-align: right;
    }
    &__genre {
      color: $gray;
      font-size: 14px;
    }
    &__picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
