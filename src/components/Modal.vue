<template>
  <div class="modal" v-if="modalShown === id">
    <div class="modal__content">
      <div class="modal__header">
        <span class="modal__close" @click="this.showModal(closeModal)">&times;</span>
      </div>
      <div>
        <slot name="aim"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { closeModal } from '@/constants/numeralConsts'

@Options({
  computed: {
    ...mapState({ modalShown: 'modalShown' })
  },
  methods: {
    ...mapMutations(['showModal'])
  }
})
export default class Modal extends Vue {
  @Prop(Number) id: number | undefined;
  modalShown?:boolean
  showModal!: (arg0: number) => void
  closemdal = closeModal
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
      justify-content: flex-end;
    }

    &__close {
      font-size: 30px;

      &:hover {
        cursor: pointer;
      }
    }
  }
  
</style>
