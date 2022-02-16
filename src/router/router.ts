import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import Products from '@/pages/Products.vue'
import About from '@/pages/About.vue'
import HelloWorldPage from '@/pages/HomePage.vue'
import PC from '@/pages/products/PC.vue'
import Xbox from '@/pages/products/Xbox.vue'
import PS5 from '@/pages/products/PS5.vue'
import ProductPage from '@/pages/products/ProductPage.vue'
import UserPage from '@/pages/UserPage.vue'
import Cart from '@/pages/Cart.vue'
import CheckOut from '@/pages/CheckOut.vue'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HelloWorldPage
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/products/pc',
    component: PC
  },
  {
    path: '/products/ps5',
    component: PS5
  },
  {
    path: '/products/xbox',
    component: Xbox
  },
  {
    path: '/products/:id',
    component: ProductPage
  },
  {
    path: '/user',
    component: UserPage
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/checkout',
    component: CheckOut
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
