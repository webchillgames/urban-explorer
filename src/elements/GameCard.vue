<template>
  <RouterLink :to="`/game/${level.id}/menu/task`" class="level-card">
    <div class="level-card__title">
      <h4>{{ level.title }}</h4>
      <div></div>
    </div>
    <div class="level-card__img">
      <img v-if="level.img" :src="level.img"  />
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    level: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.level-card {
  display: block;
  width: 300px;
  position: relative;
  margin: 8px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 16px;

  &__title {
    border-radius: 16px;
    background-color: #fff;
    padding: 4px 16px;
    font-family: $font-pixels;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    transition: all 1s;
  }

  h4 {
    position: relative;
    z-index: 1;
    color: #000;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #fff;
    transition: all 1s;
  }

  &__img {
    height: 300px;
    background-color: #fff;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &:hover {
    &::after {
      height: 100%;
      background-color: $bg-2;
    }

    .level-card__title {
      background-color: $bg-2;
    }
  }

  @media (max-width: 768) {
    
  }
}
</style>
