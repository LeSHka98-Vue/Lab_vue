<template>
    <div class="wrapper">
      <div class="product-card">
        <div class="product-card__front">
          <div class="product-card__image">
            <img :src="require(`@/assets/images/games/${this.image}`)" :alt="image">
          </div>
          <div class="product-card__name">
            <div>
              <span>{{ name }}</span><br>
              <span class="product-card__genre">{{ genre }}</span>
            </div>
            <span>Rating: {{rating}}</span>
          </div>
        </div>
        <div class="product-card__back">
          <p class="product-card__description">
            {{ description }}<br>
            <a href="#">more</a>
          </p>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class ProductCard extends Vue {
  @Prop(String) image: string|undefined;
  @Prop(String) name: string|undefined;
  @Prop(String) genre: string|undefined;
  @Prop(String) description: string|undefined;
  @Prop(Number) rating: number|undefined;
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 260px;
    perspective: 1000px;

    &:hover .product-card{
      transform: rotateY(180deg);
    }
  }
  .product-card {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 2px 10px 16px 2px rgba(0,0,0,0.7);
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
      width: 200px;
      height: 213px;
    }
    &__name {
      display: flex;
      justify-content: space-between;
      padding: 8px;

      div {
        text-align: left;
      }
    }
    &__genre {
      color: $gray;
      font-size: 14px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
