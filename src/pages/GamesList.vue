<template>
  <div class="levels">
    <div class="wrapper">
      <BackButton link="/" title="На главную" />

      <h3>Список игр</h3>
      <ul>
        <li v-for="level in levels" :key="level.id">
          <GameCard :level="level" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameCard from '@/elements/GameCard.vue'
import BackButton from '@/elements/BackButton.vue'

const levels = [
  { id: 1, title: 'level 1', img: 'level-1.jpg', data: {} },
  { id: 2, title: 'level 2', img: 'level-2.jpg', data: {} },
  { id: 3, title: 'level 3', img: 'level-3.jpg', data: {} },
  { id: 4, title: 'level 4', img: 'level-4.jpg', data: {} }
]

export default defineComponent({
  setup() {
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
