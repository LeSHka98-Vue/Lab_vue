<template>
  <router-link class="card__router-link" :to="path">
      <img :src="require(`@/assets/images/categories/${this.image}.png`)" :alt="category">
      <h3>{{ signature }}</h3>
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
}
</script>

<style lang="scss" scoped>
  .card__router-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: 2px 10px 16px 2px rgba(0,0,0,0.7);
    text-decoration: none;

    width: 200px;
    height: 170px;
    background: $white;

    &:hover {
        transform: scale(0.95, 0.95);
    }
    &:active {
        background: $light-purple;
    }
    h3 {
      color: $dark-gray;
      font-weight: 100;
    }
  }
</style>
