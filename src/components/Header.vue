<template>
    <header class="header">
      <div class="header__nav-left">
        <router-link class="header__name" to="/">
          <h1>Game Market</h1>
        </router-link>
        <router-link class="header__router-link" to="/user" v-if="isAuthorized">{{ getLogin }}</router-link>
        <router-link class="header__router-link" to="/admin" v-if="isAuthorized && getRole === 'admin'">admin</router-link>
      </div>
      <div class="header__nav-block">
        <router-link class="header__router-link" to="/"> Home</router-link>
        <div class="header__dropdown">
          <router-link class="header__router-link" to="/products" >Products</router-link>
          <div class="header__dropdown-menu" >
            <router-link class="header__router-link" to="/products/pc">PC</router-link>
            <router-link class="header__router-link" to="/products/ps5">PS 5</router-link>
            <router-link class="header__router-link" to="/products/xbox">XBox</router-link>
          </div>
        </div>
        <router-link class="header__router-link" to="/about">About</router-link>
        <router-link class="header__router-link" to="/cart" v-if="isAuthorized">
          <span class="header__cart-amount">{{ products.length }}</span>
          <img src="/images/shopping.png" alt="cart" @error="onImageLoadFailure">
        </router-link>
        <ModalButton 
          type="info-outline"  
          v-if="!isAuthorized" 
          buttonName="SignUp"
          :id="1">
            <template #aim>
              <SignUpForm/>
            </template>
        </ModalButton>
        <ModalButton 
          type="info-outline" 
          v-if="!isAuthorized" 
          buttonName="SignIn"
          :id="2">
            <template #aim>
                <SignInForm />
            </template>  
        </ModalButton>
        <Button v-else type="info-outline" @click="this.logout">Log out</Button>
      </div>
    </header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState, mapGetters, mapMutations } from 'vuex'
import ModalButton from '@/components/ModalButton.vue'
import Button from '@/ui/Button.vue'
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import { Role } from '@/store/types/types'

@Options({
  components: {
    ModalButton,
    Button,
    SignInForm,
    SignUpForm
  },
  computed: {
    ...mapState(['isAuthorized']),
    ...mapGetters('user', ['getLogin', 'getRole']),
    ...mapState('cart', ['products'])
  },
  methods: {
    ...mapMutations(['setAuthorization']),
    ...mapMutations('user', ['setUser']),
    ...mapMutations('cart', ['CleanCart'])
  }
})
export default class App extends Vue {
  isAuthorized?:boolean
  getLogin?:string
  getRole?:Role
  products?: number[]

  setAuthorization!: (arg0: boolean) => void
  setUser!: (arg0: null) => void
  CleanCart!: () => void

  onImageLoadFailure(e) {
    e.target.src = '/images/default.png';
  }

  logout() {
    this.setAuthorization(false)
    this.setUser(null)
    this.CleanCart()
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: $dark-gray;
    
      &__nav-left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 28%;
        margin-left: 3%;
      }
      &__name {
        text-decoration: none;
        h1 {
          color: $white;
        }
      }
      &__nav-block {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 35%;
      }
      &__dropdown {
        padding: 8px 0;
        position: relative;

          &:hover {
          .header__dropdown-menu {
              display: flex;
          }
        }
      }
      &__dropdown-menu {
        display: none;
        position: absolute;
        right:-15px;
        left:-15px;
        top: 30px;
        z-index: 1;
        flex-direction: column;
        background: $dark-gray;
        box-shadow: $box-shadow-menu;

        .header__router-link {
          padding: 10px 0;

          &:hover {
            background: $super-gray;
            border: none;
          }
        }
      }

      &__router-link {
        text-decoration: none;
        color: $gray;
        // padding: 8px 30px;

        &:hover {
          border-bottom: 1px solid $white;
          color: $white;
        }
        &:active {
          color: $light-purple;
        }
        &--active {
          color: $white;
          font-weight: 600;
        }
      }
      &__cart-amount {
        font-size: 13px;
      }
  }  
</style>
