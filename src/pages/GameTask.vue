<template>
  <div class="game-menu" v-if="game">
    <h3>{{ t('task') }}</h3>
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
import { t } from '@/translator'

export default defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)

    return { game, t }
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
    @include card;
  }

  &__gallery {
    display: flex;
    flex-wrap: wrap;

    img {
      width: 150px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }
  }
}
</style>
