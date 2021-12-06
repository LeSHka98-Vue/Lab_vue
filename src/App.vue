<template>
  <Header/>
  <!-- <IndexPage :title="userFullName" />
  <ApiDemoPage /> -->
  <router-view></router-view>
  <Footer/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IndexPage from '@/pages/IndexPage.vue';
import ApiDemoPage from '@/pages/ApiDemoPage.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import '@/assets/main-styles.scss'
import '@/assets/colors.scss'
import 'normalize.css'

@Options({
  components: {
    IndexPage,
    ApiDemoPage,
    Header,
    Footer
  },
})
export default class App extends Vue {
  user: any = null;

  async mounted(): Promise<void> {
    const resp = await fetch('http://localhost:3000/users/1').then((response) => response.json());
    this.user = resp || null;
  }

  get userFullName() {
    return this.user
      ? `Default user: ${this.user.first_name} ${this.user.last_name}`
      : '';
  }
}
</script>
