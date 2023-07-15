<template>
  <div class="game-menu" v-if="game">
    <h3>Задание</h3>
    <div class="game-menu__task">
      <p>{{ game.task }}</p>
    </div>

    <!-- <h3>Кого ищем</h3>
    <div class="game-menu__gallery">
      <img v-for="image in game.images" :key="image.id" :src="image.link" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)

    return { game }
  }
})
</script>

<style lang="scss">
.game-menu {
  h3 {
    margin-top: 40px;
    margin-bottom: 16px;
  }

  &__task {
    background-color: #fff;
    color: $text-3;
    padding: 16px;
    border-radius: 8px;
    font-size: 18px;
    line-height: 30px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    p {
      margin: 0;
    }
  }

  &__gallery {
    display: flex;
    flex-wrap: wrap;

    img {
      width: 150px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;    }
  }
}
</style>
