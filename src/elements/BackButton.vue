<template>
  <RouterLink :to="link" class="back-button">
    <AppSvg link="arrow" />
    <span>{{ title }}</span>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSvg from '@/elements/AppSvg.vue'

export default defineComponent({
  components: { AppSvg },
  props: {
    link: {
      type: String,
      required: true
    },
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
.back-button {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transform: scale(1);
  transition: all 0.2s;

  svg {
    margin-right: 4px;
  }

  &:active {
    transform: scale(1.01);
  }
}
</style>
