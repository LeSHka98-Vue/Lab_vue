<template>
  <Alert type="error" :message="error.message" v-if="error"/>
  <slot v-else></slot>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Alert from '@/alerts/Alert.vue'

@Options({
  components: {
    Alert
  }
})

export default class ErrorBoundary extends Vue {
    @Prop(Boolean) stopPropagation = false;

    error:any = null;
    info:any = null;
    vm:any = null;

    errorCaptured(error:Error, vm, info:string):boolean {
      this.error = error;
      this.info = info;
      this.vm = vm;
      return !this.stopPropagation;
    } 
}
</script>
