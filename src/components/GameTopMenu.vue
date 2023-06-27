<template>
  <div>
    <button type="button" class="game-play__pause-opener" @click="$emit('paused')">
      <img src="/ui/settings.png" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['paused'],
  setup() {
    return {}
  }
})
</script>

<style lang="scss"></style>
