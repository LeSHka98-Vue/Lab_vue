<template>
  <Button :type="type" @click="showModal('true')">
    <slot></slot>
  </Button>
  <teleport to="#modals">
    <Modal :modalShown="modalShown" @show-modal="showModal">
      <template v-slot:header>
        <h3 v-if="mode == 'signin'">SignIn</h3>
        <h3 v-if="mode == 'signup'">SignUp</h3>
      </template>
      <template v-slot:default>
        <SignUpForm v-if="mode == 'signup'" 
          @show-modal="showModal" 
          :isAuthorized="isAuthorized" 
          @authorize="this.$emit('authorize', true)"/>
        <SignInForm v-if="mode == 'signin'" 
          @show-modal="showModal" 
          :isAuthorized="isAuthorized" 
          @authorize="this.$emit('authorize', true)"/>
      </template>
      <template v-slot:footer>
        <!-- <Button :type="type" @click="this.$emit('showModal', false)">Cancel</Button> -->
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { ButtonType } from '@/types/types'
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
  }
})
export default class ModalButton extends Vue {
  @Prop(Boolean) isAuthorized: boolean | undefined;
  @Prop(String as () => ButtonType) type: string | undefined;
  @Prop(String) mode: string | undefined;

  modalShown = false;

  showModal(value:boolean) {
    this.modalShown = value;
  }
}
</script>

<style></style>
