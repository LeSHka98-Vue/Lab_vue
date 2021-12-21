<template>
    <header class="header">
        <router-link class="header__name" to="/">
          <h1>Game Market</h1>
        </router-link> 
        <div class="header__navBlock">
            <router-link class="header__router-link" to="/"> Home</router-link>
            <div class="header__dropdown">
                <router-link class="header__router-link" to="/products" >Products</router-link>
                <div class="header__dropdownMenu" >
                    <router-link class="header__router-link" to="/products/pc">PC</router-link>
                    <router-link class="header__router-link" to="/products/xbox">PS 5</router-link>
                    <router-link class="header__router-link" to="/products/ps5">XBox</router-link>
                </div>
            </div>
            <router-link class="header__router-link" to="/about">About</router-link>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class App extends Vue {}
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: $dark-gray;
    }
    .header__name {
        text-decoration: none;
        margin-left: 3%;

        h1 {
          color: $white;
        }
    }
    .header__navBlock {
        display: flex;
        
    }
    .header__dropdown {
        padding: 8px 0;
        position: relative;

            &:hover {
            .header__dropdownMenu {
                display: flex;
            }
        }
    }
    .header__dropdownMenu {
        display: none;
        position:absolute;
        right:-15px;
        left:-15px;
        top: 30px;
        z-index: 1;
        flex-direction: column;
        background: $dark-gray;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

        .header__router-link {
            padding: 10px 0;

            &:hover {
                background: #151616;
                border: none;
            }
        }
    }

    .header__router-link {
        text-decoration: none;
        color: $gray;
        padding: 8px 30px;

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
</style>
