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
    { id: 1, coords: [53.393251, 50.168719], model: '/shiba/scene.gltf', isCatched: false },
    { id: 2, coords: [53.392678, 50.169080], model: '/shiba/scene.gltf', isCatched: false },
    { id: 3, coords: [53.393115, 50.169466], model: '/shiba/scene.gltf', isCatched: false },
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
