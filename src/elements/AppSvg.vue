<template>
  <svg class="app-svg">
    <use :href="`#${link}`" class="app-svg"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    link: {
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
.app-svg {
  width: 30px;
  height: 30px;
  display: block;
  stroke: #fff;
}
</style>
