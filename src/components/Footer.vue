<template>
    <footer class="footer">
        <h2 class="footer__slogan">Incredible convenient</h2>
        <div>
            <a class="footer__link" href="https://www.ubisoft.com/ru-ru/">
                <img src="@/assets/images/ubisoft.png" alt="ubisoft">
            </a>
            <a class="footer__link" href="https://www.ea.com/ru-ru">
                 <img src="@/assets/images/ea-sports.png" alt="ea-arts">
            </a>
            <a class="footer__link" href="https://www.sega.com/">
                 <img src="@/assets/images/sega.png" alt="sega">
            </a>
            <a class="footer__link" href="https://www.crytek.com/">
                 <img src="@/assets/images/crytek.png" alt="crytek">
            </a>
        </div>
    </footer>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class App extends Vue {}
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: $dark-gray;
        padding: 10px;
        position: fixed;
        bottom:0;
        right: 0;
        left:0;

        &__slogan {
            color: $white;
        }

        &__link {
            text-decoration: none;
            color: $gray;
            margin: 0 20px;
            opacity: 1;

            &:hover {
                img {
                    opacity: 0.6;
                    transform: scale(0.9, 0.9);
                }
            }
            &:active {
                img {
                    opacity: 1;
                    transform: scale(0.7, 0.7);
                }
            }
        }
    }
</style>
