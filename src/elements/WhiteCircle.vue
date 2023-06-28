<template>
  <div class="white-circle">
    <slot></slot>
    <img src="/ui/white-circle.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.white-circle {
  width: 80px;
  height: 80px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-family: $font-pixels;
    font-size: 40px;
    text-shadow: 3px 3px $bg-1;
  }
}
</style>
