<template>
  <div class="game-bottomsheet" :class="{ open: top === 0 }" :style="{ top: top + 'px' }">
    <button type="button" @touchstart="start" @touchmove="move">
      <AppSvg link="arrow-top" />
    </button>
    <div class="wrapper" ref="wrapperRef">
      <h3>Карта</h3>
      <LeafletMap :items="game.items" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

import LeafletMap from '@/components/LeafletMap.vue'
import AppSvg from '@/elements/AppSvg.vue'

export default defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)

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
      start,
      move,
      game,
      top
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
}
</style>
