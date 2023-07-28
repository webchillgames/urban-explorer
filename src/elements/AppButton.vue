<template>
  <button type="button" class="app-button">
    <img src="/ui/block-button.png" />
    <span>{{ title }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.app-button {
  @include button-image;
  @include flex;

  text-transform: uppercase;
  position: relative;
  width: 290px;
  height: 81px;
  color: #fff;

  span {
    font-size: 30px;
    line-height: 32px;
    position: relative;
    z-index: 1;
    color: #fff;
    font-family: $font-pixels;
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  @media (max-width: 480px) {
    width: 230px;
    height: 51px;

    span {
      font-size: 18px;
      line-height: 22px;
    }
  }
}
</style>
