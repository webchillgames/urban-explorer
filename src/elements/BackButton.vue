<template>
  <div class="back-button">
    <AppSvg link="arrow" />
    <RouterLink to="/" class="levels__back">На главную</RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSvg from '@/elements/AppSvg.vue'

export default defineComponent({
  components: { AppSvg },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.back-button {
  display: flex;
  align-items: center;
}
</style>
