import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import Products from '@/pages/Products.vue'
import About from '@/pages/About.vue'
import HelloWorldPage from '@/pages/HelloWorldPage.vue'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HelloWorldPage
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]

const router = createRouter({ 
  history: createWebHashHistory(),
  linkActiveClass: 'header__router-link--active',
  routes
})

export default router
