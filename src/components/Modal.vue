<template>
  <div class="modal" v-if="modalShown">
    <div class="modal__content">
      <div class="modal__header">
        <slot name="header"></slot>
        <span class="close" @click="this.$emit('showModal', false)">&times;</span>
      </div>
      <div>
        <slot></slot>
      </div>
      <div>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class Modal extends Vue {
  @Prop(Boolean)modalShown:boolean | undefined;
}
</script>

<style lang="scss" scoped>
  .modal {
    top:0;
    left:0;
    right:0;
    bottom:0;
    position: fixed;
    background: $section-background;
    display: flex;

    &__content {
      margin: auto;
      padding: 15px;
      border-radius: 10px;
      background: $white;
      min-height: 50px;
      min-width: 300px;
      max-width: 50%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
    }
  }
  .close {
    font-size: 30px;

    &:hover {
      cursor: pointer;
    }
  }
</style>
