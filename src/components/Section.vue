<template>
  <section class="section">
    <h2 class="section__caption">{{ caption }}</h2>
    <div class="section__content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class Section extends Vue {
  @Prop(String) caption: string|undefined;
}
</script>

<style lang="scss" scoped>
  .section {
    padding: 1% 1% 3%;
    background-color: $section-background;
    width:50%;
    margin: 1% auto;
    border-radius: 10px;

    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4%;
    }

    .section__caption {
      color:$white;
    }
  }
</style>
