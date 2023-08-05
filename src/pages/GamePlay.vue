<template>
  <div class="game-play">
    <GameTopMenu @paused="isPaused = true" />

    <AframeScene
      v-if="game && game.items.length"
      @finish="finish"
      @catchItem="catchItem"
      @intersectionCleared="intersectionCleared"
    />

    <!-- <AppButtonVue
      v-if="isCatchBtnShowed"
      :title="`${t('catch')}!`"
      class="game-play__catch"
      @click="removeItem"
    /> -->

    <GameBottomsheet v-if="game.items.length" />

    <ResultAlert v-if="showMidResult" @close="showMidResult = false" />

    <LevelComleteMenu v-if="isFinished" @exit="exit" />

    <PauseMenu v-if="isPaused" @unpaused="isPaused = false" @exit="exit" @restart="restart" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/game'
// import { storeToRefs } from 'pinia'

import GameTopMenu from '@/components/GameTopMenu.vue'
import PauseMenu from '@/components/PauseMenu.vue'
import GameBottomsheet from '@/components/GameBottomsheet.vue'

import ResultAlert from '@/components/ResultAlert.vue'
import AframeScene from '@/components/AframeScene.vue'
import LevelComleteMenu from '@/components/LevelComleteMenu.vue'
import { useRouter } from 'vue-router'
import { t } from '@/translator'
import { storeToRefs } from 'pinia'
// import AppButtonVue from '@/elements/AppButton.vue'

export default defineComponent({
  components: {
    GameTopMenu,
    AframeScene,
    GameBottomsheet,
    PauseMenu,
    LevelComleteMenu,
    ResultAlert
    // AppButtonVue
  },
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)
    const { clearResults, setCatchStatus } = gameStore
    const router = useRouter()

    const isPaused = ref(false)
    const isFinished = ref(false)
    const showMidResult = ref(false)

    const isCatchBtnShowed = ref(false)
    const showingItemId = ref<string | null>(null)

    function finish() {
      isFinished.value = true
    }

    function intersectionCleared() {
      showingItemId.value = null
      isCatchBtnShowed.value = false
    }

    function catchItem(id: string) {
      const el = document.getElementById(`${id}`)
      el?.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 3000')

      isCatchBtnShowed.value = true
      showingItemId.value = id
    }

    function removeItem() {
      if (showingItemId.value) {
        const el = document.getElementById(`${showingItemId.value}`)
        showMidResult.value = true
        el?.setAttribute('visible', 'false')
        setCatchStatus(showingItemId.value)
        intersectionCleared()
      }
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
      t,
      restart,
      exit,
      catchItem,
      finish,
      isFinished,
      isPaused,
      game,
      showMidResult,
      isCatchBtnShowed,
      removeItem,
      intersectionCleared
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

  &__catch {
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
