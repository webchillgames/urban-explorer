<template>
  <div class="game-play">
    <GameTopMenu @paused="isPaused = true" />

    <AframeScene v-if="game" :items="game.items" />

    <GameBottomsheet
      :class="{ open: top === 0 }"
      ref="bottomsheetRef"
      @start="start"
      @move="move"
      :style="{ top: top + 'px' }"
    />

    <ResultAlert v-if="showMidResult" />

    <LevelComleteMenu v-if="isFinished" />

    <PauseMenu v-if="isPaused" @unpaused="isPaused = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

import GameTopMenu from '@/components/GameTopMenu.vue'
import PauseMenu from '@/components/PauseMenu.vue'
import GameBottomsheet from '@/components/GameBottomsheet.vue'

import ResultAlert from '@/components/ResultAlert.vue'
import AframeScene from '@/components/AframeScene.vue'
import LevelComleteMenu from '@/components/LevelComleteMenu.vue'

export default defineComponent({
  components: {
    GameTopMenu,
    AframeScene,
    GameBottomsheet,
    PauseMenu,
    LevelComleteMenu,
    ResultAlert
  },
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)
    const isPaused = ref(false)
    const bottomsheetRef = ref()
    const isFinished = ref(false)
    const showMidResult = ref(false)

    const top = ref(window.innerHeight)
    const coordY = ref()

    function start(evt) {
      coordY.value = evt.touches[0].clientY
    }

    function move(evt) {
      if (coordY.value) {
        const newCoordY = evt.touches[0].clientY

        if (coordY.value > newCoordY) {
          const length = coordY.value - newCoordY
          top.value = top.value - length

          if (top.value < window.innerHeight && top.value !== 0) {
            top.value = 0
            coordY.value = 0
          }
        } else {
          top.value = coordY.value + newCoordY

          if (top.value > 0) {
            top.value = window.innerHeight
          }
        }
      }
    }

    return {
      isFinished,
      start,
      top,
      move,
      bottomsheetRef,
      isPaused,
      game,
      showMidResult
    }
  }
})
</script>

<style lang="scss">
.game-play {
  min-height: 100%;
  position: relative;

  &__pause-opener {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 80px;
    @include circle-button;
    z-index: 2;
  }

  &__bottomsheet-opener {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
    border: none;
    width: 100%;
    display: flex;
    justify-content: center;

    svg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
