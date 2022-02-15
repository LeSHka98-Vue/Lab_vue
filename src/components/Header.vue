<template>
    <header class="header">
      <div class="header__nav-left">
        <router-link class="header__name" to="/">
          <h1>Game Market</h1>
        </router-link>
        <router-link class="header__router-link" to="/user" v-if="isAuthorized">{{ login }}</router-link>
      </div>
        <div class="header__nav-block">
            <router-link class="header__router-link" to="/"> Home</router-link>
            <div class="header__dropdown">
                <router-link class="header__router-link" to="/products" >Products</router-link>
                <div class="header__dropdown-menu" >
                    <router-link class="header__router-link" to="/products/pc">PC</router-link>
                    <router-link class="header__router-link" to="/products/xbox">PS 5</router-link>
                    <router-link class="header__router-link" to="/products/ps5">XBox</router-link>
                </div>
            </div>
            <router-link class="header__router-link" to="/about">About</router-link>
            <router-link class="header__router-link" to="/cart">
              <span class="header__cart-amount">{{ products.length }}</span>
              <img src="/images/shopping.png" alt="cart">
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
            <Button v-else type="info-outline" @click="logout">Log out</Button>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { mapState } from 'vuex'
import ModalButton from '@/components/ModalButton.vue'
import Button from '@/ui/Button.vue'
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

@Options({
  components: {
    ModalButton,
    Button,
    SignInForm,
    SignUpForm
  },
  computed: {
    ...mapState({ isAuthorized: 'isAuthorized' }),
    ...mapState('user', ['login']),
    ...mapState('cart', ['products'])
  }
})
export default class App extends Vue {
  isAuthorized?:boolean;
  login?:string;
  products?: number[]

  logout() {
    this.$store.commit('setAuthorization', false)
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
    }
    .header__nav-left {
      display: flex;
      align-items: center;
      margin-left: 3%;
    }
    .header__name {
        text-decoration: none;
        margin-right: 15px;
        h1 {
          color: $white;
        }
    }
    .header__nav-block {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 35%;
        
    }
    .header__dropdown {
        padding: 8px 0;
        position: relative;

            &:hover {
            .header__dropdown-menu {
                display: flex;
            }
        }
    }
    .header__dropdown-menu {
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

    .header__router-link {
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
    .header__cart-amount {
      font-size: 13px;
    }
</style>
