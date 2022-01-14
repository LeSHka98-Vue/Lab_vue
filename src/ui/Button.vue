<template>
  <button class="button" :class="type">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ButtonType } from '@/types/types';

@Options({
  props: {
    type: {
      type: String as () => ButtonType,
      required: true
    }
  }
})
export default class Button extends Vue {}
</script>

<style lang="scss">
    .button {
      padding: 7px;
      border: {
            width:2px;
            style: solid;
            radius: 4px;
        }
      &:hover {
        cursor: pointer;
      }
      &:disabled {
        text-decoration:line-through;
      }  
    }

    @mixin buttonRegular($background, $color) {
        background:$background;
        color: $color;
        border-color: $color;
    }
    @mixin buttonOutline($color) {
        background:none;
        color: $color;
        border-color: $color;
    }
    .success {
        @include buttonRegular($alert-success, $alert-success-border);
    }
    .success-outline {
        @include buttonOutline($alert-success);
    }
    .error {
        @include buttonRegular($alert-error, $alert-error-border);
    }
    .error-outline {
        @include buttonOutline($alert-error);
    }
    .warning {
        @include buttonRegular($alert-warning, $alert-warning-border);
    }
    .warning-outline {
        @include buttonOutline($alert-warning);
    }
    .info {
        @include buttonRegular($alert-info, $alert-info-border);
    }
    .info-outline {
        @include buttonOutline($gray);
    }
</style>
