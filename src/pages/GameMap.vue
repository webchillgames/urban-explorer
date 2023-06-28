<template>
  <div>
    <LeafletMap v-if="game" :items="game.items" class="user-leaflet" />
    <div v-else>Точек нет</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

import LeafletMap from '@/components/LeafletMap.vue'

export default defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)

    return {
      game
    }
  },
  components: { LeafletMap }
})
</script>

<style lang="scss"></style>
