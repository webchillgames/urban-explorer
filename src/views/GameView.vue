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

const game = {
  task: `Герой, сегодня твоя помощь нужна Кате. После школы она всегда подрабатывает выгуливая соседских собак.
    Но сегодня игривые Шиба-ину разбежались кто куда, и она не может их поймать.
    Помоги Кате вернуть их.`,
  images: [{ id: 1, link: '/level-1/shiba.jpg' }],
  items: [
  
    { id: 1, coords: [-8.552032, 115.274946], model: '/models/burger.glb', isCatched: false },
    { id: 2, coords: [-8.551066, 115.274946], model: '/models/burger.glb', isCatched: false },
    { id: 3, coords: [-8.551097, 115.275425], model: '/models/burger.glb', isCatched: false },
    
    { id: 4, coords: [-8.553079, 115.275151], model: '/models/burger.glb', isCatched: false },
    { id: 5, coords: [-8.553184, 115.275161], model: '/models/burger.glb', isCatched: false },
    { id: 6, coords: [8.553321, 115.275183], model: '/models/burger.glb', isCatched: false },
    


    // { id: 1, coords: [53.393251, 50.168719], model: '/shiba/scene.gltf', isCatched: false },
    // { id: 2, coords: [53.392678, 50.16908], model: '/shiba/scene.gltf', isCatched: false },
    // { id: 3, coords: [53.393115, 50.169466], model: '/shiba/scene.gltf', isCatched: false }
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
}
</style>
