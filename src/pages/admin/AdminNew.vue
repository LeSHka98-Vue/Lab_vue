<template>
  <h1>New</h1>
  <Alert v-if="isAlert"/>
  <AdminProductDetailedPage newproduct="true"/>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState } from 'vuex'
import AdminProductDetailedPage from '@/pages/admin/AdminProductDetailed.vue'
import Alert from '@/alerts/Alert.vue'

@Options({
  components: {
    AdminProductDetailedPage,
    Alert
  },
  computed: {
    ...mapState(['isAlert'])
  }
})
export default class AdminNew extends Vue {
  isAlert?:boolean
}
</script>

<style lang="scss"></style>
