<template>
    <header class="header">
        <router-link class="header__name" to="/">
          <h1>Game Market</h1>
        </router-link> 
        <div>
            <router-link class="header__router-link" to="/"> Home</router-link>
            <router-link class="header__router-link" to="/products"> Products</router-link>
            <router-link class="header__router-link" to="/about">About</router-link>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class App extends Vue {}
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #212223;
        padding: 10px;
    }
    .header__name {
        text-decoration: none;
        margin-left: 3%;

        h1 {
          color: #FBFBFB;
        }
    }
    .header__router-link {
        text-decoration: none;
        color: #8c8d8e;
        margin: 0 20px;

        &:hover {
            border-bottom: 1px solid #fff;
            color: #fff;
        }
        &:active {
            color: #D3CAFF;
        }
    }
    .router-link-active {
        color: #fff;
        font-weight: 600;
    }
</style>
