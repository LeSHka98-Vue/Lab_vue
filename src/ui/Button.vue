<template>
  <button class="button" :class="type">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { AlertType } from '@/types/types';

@Options({
  props: {
    type: {
      type: String as () => AlertType,
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
    }

    @mixin buttonStyle($background, $color) {
        background:$background;
        color: $color;
        border-color: $color;
    }

    .success {
        @include buttonStyle($alert-success, $alert-success-border);
    }
    .error {
        @include buttonStyle($alert-error, $alert-error-border);
    }
    .warning {
        @include buttonStyle($alert-warning, $alert-warning-border);
    }
    .info {
        @include buttonStyle($alert-info, $alert-info-border);
    }
</style>
