<template>
  <h1>Admin</h1>
  <router-link to="/admin/products">
    <Button type="success">Products</Button>
  </router-link>
</template>

<script>
import { Vue, Options } from 'vue-class-component'
import Button from '@/ui/Button.vue'

@Options({
  components: {
    Button
  }
})
export default class Admin extends Vue {

}
</script>

<style></style>
