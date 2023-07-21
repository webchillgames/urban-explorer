<template>
  <div class="game-map">
    <div class="game-map__tip">
      {{ t('map.tip') }}
      <div class="game-map__pin">
        <img src="pin.png" />
        <span>{{ t('you') }}</span>
      </div>
      <div class="game-map__pin">
        <img src="pin-item.png" />
        <span>{{ t('model') }}</span>
      </div>
    </div>

    <LeafletMap v-if="game.items.length" :items="game.items" class="user-leaflet" />
    <div v-else>Точек нет</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

import LeafletMap from '@/components/LeafletMap.vue'
import { t } from '@/translator'

export default defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)

    return {
      game,
      t
    }
  },
  components: { LeafletMap }
})
</script>

<style lang="scss">
.game-map {
  &__tip {
    @include card;
    margin-bottom: 20px;
  }

  img {
    height: 30px;
    width: auto;
    margin-right: 8px;
  }

  &__pin {
    margin: 8px;
    display: flex;
    align-items: center;
  }
}
</style>
