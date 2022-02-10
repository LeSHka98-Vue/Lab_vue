<template>
  <teleport to="#loader" v-if="isLoading">
    <div class="lds-ring"><div class="lds-ring__circle"></div><div></div><div></div><div></div></div> 
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState } from 'vuex'

@Options({
  computed: {
    ...mapState({ isLoading: 'isLoading' })
  }
})
export default class Loader extends Vue {
  isLoading?:boolean
}
</script>

<style lang="scss">
.lds-ring {
  top:0;
  bottom:0;
  left:0;
  right:0;
  display: inline-block;
  position: fixed;
  width: 100%;
  background: $section-background;
  z-index: 1;

  &__circle {
    left: 47%;
    top: 45%;
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid $loader-blue;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $loader-blue transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
