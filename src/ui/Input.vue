<template>
  <div class="myInput">
      <input :type="type" :value="search" @input="$emit('update:search', $event.target.value)">
      <img src="@/assets/close.png" @click="$emit('update:search', '')">
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { InputType } from '@/types/types'

export default class Input extends Vue {
@Prop(String as () => InputType) type:InputType| undefined;
@Prop(String) search:string| undefined;
}
</script>

<style lang="scss" scoped>
 .myInput {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 10px auto;
    width: 350px;
    border-radius: 10px;
    border: 2px solid $dark-gray;
    background: $white;

    input {
      border: none;
      outline: none;
      width: 100%;
    }
    img {
      margin-left: 5px;
    }
    img:hover {
      cursor:pointer;
    }
 }
</style>
