<template>
  <div class="game-top-menu wrapper">
    <button type="button" class="game-top-menu__pause-opener" @click="$emit('paused')">
      <img src="/ui/settings.png" />
    </button>
    <WhiteCircle>
      <span>{{ calcLastItems }}</span>
    </WhiteCircle>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

import WhiteCircle from '@/elements/WhiteCircle.vue'

export default defineComponent({
  emits: ['paused'],
  setup() {
    const gameStore = useGameStore()
    const { calcLastItems } = storeToRefs(gameStore)

    return { calcLastItems }
  },
  components: { WhiteCircle }
})
</script>

<style lang="scss">
.game-top-menu {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  justify-content: space-between;
  padding-top: 8px;
  box-sizing: border-box;

  &__pause-opener {
    width: 80px;
    @include circle-button;
  }
}
</style>
