<template>
  <div class="levels">
    <div class="wrapper">
      <BackButton link="/" :title="t('toMain')" />

      <h3>{{ t('games') }}</h3>
      <ul v-if="levels">
        <li v-for="level in levels" :key="level.id">
          <GameCard v-if="level" :level="level" />
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
import { t } from '@/translator'

export default defineComponent({
  setup() {
    const levels = ref<ILevel[]>([])

    async function getGame() {
      try {
        const levels = await customAxios.get('levels')
        // Это какая то дичь
        return levels.data.filter((_: IGame, i: number) => i !== 0)
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(async () => {
      levels.value = await getGame()
    })

    return { levels, t }
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
    padding: 4px;
    
  }

  &__back {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
}
</style>
