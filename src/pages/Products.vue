<template>
    <h1>Products</h1>
    <router-link class="header__router-link" to="/products/pc">PC</router-link>
    <router-link class="header__router-link" to="/products/xbox">PS 5</router-link>
    <router-link class="header__router-link" to="/products/ps5">XBox</router-link>
</template>

<style lang="scss" scoped>
    .header__router-link {
        text-decoration: none;
        color: $gray;
        padding: 8px 30px;

        &:hover {
            border-bottom: 1px solid $white;
            color: #000;
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
