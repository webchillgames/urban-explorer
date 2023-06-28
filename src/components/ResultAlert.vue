<template>
  <GameModal :hasOverlay="false" :hasStars="true">
    <div class="result-alert">
      <h3>Осталось найти</h3>

      <WhiteCircle class="result-alert__reminder">
        <span>{{ calcLastItems }}</span>
      </WhiteCircle>

      <button type="button" @click="$emit('close')">
        <img src="/ui/block-button.png" />
        <span>Понятно</span>
      </button>
    </div>
  </GameModal>
</template>

<script lang="ts">
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'

import GameModal from './GameModal.vue'
import WhiteCircle from '@/elements/WhiteCircle.vue'

export default defineComponent({
  emits: ['close'],
  setup() {
    const gameStore = useGameStore()
    const { calcLastItems } = storeToRefs(gameStore)

    return { calcLastItems }
  },
  components: { GameModal, WhiteCircle }
})
</script>

<style lang="scss">
.result-alert {
  text-align: center;

  button {
    @include button-text;
    margin: 0 auto;
    margin-top: 40px;
  }

  h3 {
    font-size: 30px;
    line-height: 45px;
  }

  &__reminder {
    margin: 0 auto;
  }
}
</style>
