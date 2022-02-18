<template>
  <div class="block">
      <input 
        class="block__input"
        :type="type"
        v-maska="mask"
        :placeholder="placeholder" 
        :value="search" 
        @input="$emit('update:search', $event.target.value)"
      >
      <img 
        class="block__img"
        src="/images/cancel.png" 
        @click="$emit('update:search', '')"
        @error="onImageLoadFailure"
      >
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { InputType } from '@/store/types/types'

export default class Input extends Vue {
  @Prop(String as () => InputType) type:InputType | undefined;
  @Prop(String) search:string | undefined;
  @Prop(String) placeholder:string | undefined;
  @Prop(String) mask:string | undefined;

  onImageLoadFailure(e) {
    e.target.src = '/images/default_cross.png';
  }
}
</script>

<style lang="scss" scoped>
 .block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 5px 0;
    width: 350px;
    border-radius: 10px;
    border: 2px solid $dark-gray;
    background: $white;

    &__input {
      border: none;
      outline: none;
      width: 100%;
    }
    &__img {
      margin-left: 5px;
      height: 16px;
    }
    &__img:hover {
      cursor:pointer;
    }
 }
</style>
