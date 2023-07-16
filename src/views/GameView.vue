<template>
  <div class="game-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { customAxios } from '@/axios'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { setCurrentGame } = gameStore
    const route = useRoute()

    async function getGame() {
      try {
        const game = await customAxios.get(`levels/${route.params.id}`)
        setCurrentGame(game.data)
        
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(async() => {
      await getGame()      
    })

    return {}
  }
})
</script>

<style lang="scss">
.game-view {
  height: 100%;
}
</style>
