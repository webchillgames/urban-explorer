<template>
  <div class="game-menu">
    <div class="wrapper">
      <div class="game-menu__tabs">
        <RouterLink
          :to="`/game/${$router.currentRoute.value.params.id}/menu/task`"
          :class="{ active: $router.currentRoute.value.fullPath.includes('task') }"
        >
          <AppSvg link="rocket" />
          <span>Задание</span>
        </RouterLink>

        <RouterLink
          :to="`/game/${$router.currentRoute.value.params.id}/menu/map`"
          :class="{ active: $router.currentRoute.value.fullPath.includes('map') }"
        >
          <AppSvg link="map-pin" />
          <span>Карта</span>
        </RouterLink>
      </div>

      <RouterView />

      <div class="game-menu__footer">
        <RouterLink
          :to="`/game/${$router.currentRoute.value.params.id}/play`"
          class="game-menu__go"
        >
          Играть
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSvg from '@/elements/AppSvg.vue'

export default defineComponent({
  components: { AppSvg },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.game-menu {
  background-color: $bg-3;
  min-height: 100%;

  .wrapper {
    @include page;
  }

  &__footer {
    padding-top: 40px;

    a {
      margin: 0 auto;
      width: 200px;
      display: block;
      text-align: center;
      font-family: $font-pixels;
      background-color: $text-1;
      text-decoration: none;
      padding: 8px;
      border-radius: 8px;
      color: $text-3;
      text-transform: uppercase;
      transition: all 0.2s;
      box-shadow: rgba($text-1, 0.4) 5px 5px, rgba($text-1, 0.3) 10px 10px,
        rgba($text-1, 0.2) 15px 15px, rgba($text-1, 0.1) 20px 20px, rgba($text-1, 0.05) 25px 25px;

      &:hover {
        box-shadow: none;
      }

      &:active {
        transform: scale(1.1);
      }
    }
  }

  &__tabs {
    display: flex;
    margin-bottom: 40px;

    a {
      padding: 8px 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      color: #fff;
      text-decoration: none;
      justify-content: center;
      font-size: 20px;
      line-height: 22px;

      svg {
        margin-right: 4px;
      }

      &.active {
        text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa,
          0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;

        svg {
          filter: drop-shadow(0px 0px 3px #fff);
        }
      }

      &:first-child {
        border-right: 1px solid #fff;
      }
    }
  }
}
</style>
