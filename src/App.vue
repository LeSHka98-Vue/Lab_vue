<template>
  <Loader>
    <Header/>
    <!-- <ErrorBoundary> -->
      <router-view></router-view>
    <!-- </ErrorBoundary> -->
    <Footer/>
  </Loader>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import IndexPage from '@/pages/IndexPage.vue'
import ApiDemoPage from '@/pages/ApiDemoPage.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Alert from '@/alerts/Alert.vue'
import Loader from '@/components/Loader.vue'
import ErrorBoundary from '@/errorBoundaries/ErrorBoundary.vue'
import 'normalize.css'
import "../node_modules/vue-select/dist/vue-select.css";
import '@/assets/main-styles.scss'
import '@/assets/colors.scss'

@Options({
  components: {
    IndexPage,
    ApiDemoPage,
    Header,
    Footer,
    Alert,
    ErrorBoundary,
    Loader
  },
})
export default class App extends Vue {}
</script>
