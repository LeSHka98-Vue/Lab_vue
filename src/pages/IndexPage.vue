<template>
  <div class="hello">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import { Vue } from 'vue-class-component';

export default class IndexPage extends Vue {
  @Prop(String)
  readonly title!: string;
}
</script>
