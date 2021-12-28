<template>
  <router-link class="card" :to="path">
      <img :src="`/images/categories/${this.image}`" :alt="category" @error="onImageLoadFailure">
      <h3 class="card__signature">{{ signature }}</h3>
  </router-link>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class Card extends Vue {
  @Prop(String) image: string|undefined;
  @Prop(String) signature: string|undefined;
  @Prop(String) category: string|undefined;

  get path() {
    return `/products/${this.category?.toLowerCase()}`  
  }

  onImageLoadFailure(e) {
    e.target.src = '/images/default2.png';
  }
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: $box-shadow-card;
    text-decoration: none;
    overflow: hidden;

    width: 200px;
    height: 170px;
    background: $white;

    &:hover {
        transform: scale(0.95, 0.95);
    }
    &:active {
        background: $light-purple;
    }
    &__signature {
      color: $dark-gray;
      font-weight: 100;
    }
  }
</style>
