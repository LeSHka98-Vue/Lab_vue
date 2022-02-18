<template>
    <div class="alert" :class="type">
        <b>{{ type.toUpperCase() }}! </b>
        <span>{{ message }}</span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex'
import { AlertType } from '@/store/types/types';

@Options({
  // props: {
  //   type: {
  //     type: String as () => AlertType,
  //     required: true
  //   },
  //   message: {
  //     type: String
  //   }
  // },
  computed: {
    ...mapState(['message', 'type'])
  }
})

export default class Alert extends Vue {
  message?:string
  type?:AlertType
}

</script>

<style lang="scss" scoped>
    .alert {
        position: absolute;
        top: 90px;
        left: 0;
        right:0;
        z-index: 1000;
        box-sizing: border-box;
        margin: auto;
        max-width: 90%;
        padding: 20px;
        border: {
            width:1px;
            style: solid;
            radius: 4px;
        }
    }

    @mixin alertStyle($background, $color) {
        background:$background;
        color: $color;
    }

    .success {
        @include alertStyle($alert-success, $alert-success-border);
    }
    .error {
        @include alertStyle($alert-error, $alert-error-border);
    }
    .warning {
        @include alertStyle($alert-warning, $alert-warning-border);
    }
    .info {
        @include alertStyle($alert-info, $alert-info-border);
    }
</style>
