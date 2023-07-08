<template>
  <div class="levels">
    <div class="wrapper">
      <BackButton link="/" title="На главную" />

      <h3>Список игр</h3>
      <ul v-if="levels">
        <li v-for="level in levels" :key="level.id">
          <GameCard :level="level" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { customAxios } from '@/axios'
import type { ILevel, IGame } from '@/interfaces'

import GameCard from '@/elements/GameCard.vue'
import BackButton from '@/elements/BackButton.vue'

export default defineComponent({
  setup() {
    const levels = ref<ILevel[]>([])

    async function getGame() {
      try {
        const levels = await customAxios.get('levels')

        return levels.data
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(async () => {
      levels.value = await getGame()
    })

    return { levels }
  },
  components: { GameCard, BackButton }
})
</script>

<style lang="scss">
.levels {
  background-color: $bg-3;
  min-height: 100%;

  .wrapper {
    @include page;
  }

  h3 {
    text-align: center;
  }

  ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
  }

  &__back {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
}
</style>
