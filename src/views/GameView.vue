<template>
  <div class="game-view">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'

const game = {
  task: `Герой, сегодня твоя помощь нужна Кате. После школы она всегда подрабатывает выгуливая соседских собак.
    Но сегодня игривые Шиба-ину разбежались кто куда, и она не может их поймать.
    Помоги Кате вернуть их.`,
  images: [{ id: 1, link: '/level-1/shiba.jpg' }],
  items: [
    { id: 1, coords: [ -8.552736, 115.274835], model: '/shiba/scene.gltf', isCatched: false },
    { id: 2, coords: [-8.552712, 115.274941], model: '/shiba/scene.gltf', isCatched: false },
    // { id: 3, coords: [-8.552557, 115.274879], model: '/shiba/scene.gltf', isCatched: false }
  ]
}

export default defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { setCurrentGame } = gameStore

    function getGame() {
      setCurrentGame(game)
    }

    onMounted(() => {
      getGame()
    })
    
    return {}
  }
})
</script>

<style lang="scss">
.game-view {
  height: 100%;

  h3 {
    color: #fff;
    text-shadow: 2px 2px $bg-1;
  }
}
</style>
