/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "vue-select" {
  import Vue from "vue";
  export default class VSelect extends Vue {}
}