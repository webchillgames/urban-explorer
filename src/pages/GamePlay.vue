<template>
  <div class="game-play">
    <GameTopMenu @paused="isPaused = true" />

    <AframeScene
      v-if="game && game.items"
      :items="game.items"
      @finish="finish"
      @catchItem="catchItem"
    />

    <GameBottomsheet v-if="game.items.length" />

    <ResultAlert v-if="showMidResult" @close="showMidResult = false" />

    <LevelComleteMenu v-if="isFinished" @exit="exit" />

    <PauseMenu v-if="isPaused" @unpaused="isPaused = false" @exit="exit" @restart="restart" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

import GameTopMenu from '@/components/GameTopMenu.vue'
import PauseMenu from '@/components/PauseMenu.vue'
import GameBottomsheet from '@/components/GameBottomsheet.vue'

import ResultAlert from '@/components/ResultAlert.vue'
import AframeScene from '@/components/AframeScene.vue'
import LevelComleteMenu from '@/components/LevelComleteMenu.vue'
import { useRouter } from 'vue-router'

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
    const { clearResults } = gameStore
    const router = useRouter()

    const isPaused = ref(false)
    const isFinished = ref(false)
    const showMidResult = ref(false)

    function finish() {
      isFinished.value = true
    }

    function catchItem() {
      showMidResult.value = true
    }

    function exit() {
      router.push({ path: '/' })
      clearResults()
    }

    function restart() {
      isPaused.value = false
      clearResults()
      showMidResult.value = true
    }

    onMounted(() => {
      showMidResult.value = true
    })

    return {
      restart,
      exit,
      catchItem,
      finish,
      isFinished,
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
