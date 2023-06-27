<template>
  <div class="game-bottomsheet">
    <button type="button" @touchstart="$emit('start', $event)" @touchmove="$emit('move', $event)">
      <AppSvg link="arrow-top" />
    </button>
    <div class="wrapper" ref="wrapperRef">
      <h3>Карта</h3>
      <LeafletMap v-if="game" :items="game.items" class="game-bottomsheet__map" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

import LeafletMap from '@/components/LeafletMap.vue'
import AppSvg from '@/elements/AppSvg.vue'

export default defineComponent({
  emits: ['move', 'start'],
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)

    return {
      game
    }
  },
  components: { LeafletMap, AppSvg }
})
</script>

<style lang="scss">
.game-bottomsheet {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-image: url('/ui/bg.png');
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: rgba($bg-3, 0.4) 0px -5px, rgba($bg-3, 0.3) 0px -10px, rgba($bg-3, 0.2) 0px -15px,
    rgba($bg-3, 0.1) 0px -20px, rgba($bg-3, 0.05) 0px -25px;

  .wrapper {
    @include page;
    height: 100%;
  }

  button {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: -45px;
    left: 0;

    svg {
      width: 40px;
      height: 40px;
      transition: all 0.2s;
    }
  }

  &.open {
    .wrapper {
      padding-top: 60px;
    }

    button {
      top: 10px;
    }

    svg {
      transform: rotate(180deg);
    }
  }

  &__map {
    width: 100%;
    height: 500px;
  }
}
</style>
