<template>
  <Button :type="type" @click="this.showModal(id)">
    {{ buttonName }}
  </Button>
  <teleport to="#modals">
    <Modal :id="id">
      <template #aim>
        <slot name="aim"></slot>
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import { ButtonType } from '@/store/types/types'
import Button from '@/ui/Button.vue'
import Modal from '@/components/Modal.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import SignInForm from '@/components/SignInForm.vue'

@Options({
  components: {
    Button,
    Modal,
    SignUpForm,
    SignInForm
  },
  methods: {
    ...mapMutations(['showModal'])
  }
})
export default class ModalButton extends Vue {
  @Prop(String as () => ButtonType) type: string | undefined;
  @Prop(Number) id: number | undefined;
  @Prop(String) buttonName: string|undefined;

  showModal!: (arg0: number) => void
}
</script>

<style></style>
