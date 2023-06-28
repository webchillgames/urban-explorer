<template>
  <div class="game-modal">
    <div class="game-modal__overlay" v-if="hasOverlay"></div>

    <div class="game-modal__content" :class="{stars: hasStars}">
      <slot @unpaused="$emit('unpaused')"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['unpaused'],
  props: {
    hasOverlay: {
      type: Boolean,
      required: false,
      default: true
    },
    hasStars: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.game-modal {
  @include full-bg;
  @include flex;

  position: fixed;
  z-index: 100;

  &__overlay {
    @include full-bg;

    background-image: url('/ui/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
  }

  &__content {
    background-color: rgba($bg-3, 0.5);
    position: relative;
    z-index: 3;
    border-radius: 16px;
    width: 80%;
    padding: 30px;
    box-sizing: border-box;

    * {
      position: relative;
      z-index: 1;
    }

    &.stars {
      &::after,
      &::before {
        content: '';
        position: absolute;
        top: 0;
        z-index: 0;
        background-size: contain;
        height: 100%;
        width: 30%;
        background-repeat: no-repeat;
      }

      &::after {
        left: 0;
        background-image: url('/ui/stars-left.png');
      }

      &::before {
        right: 0;
        background-image: url('/ui/stars-right.png');
      }
    }
  }

  @media (max-width: 480px) {
    &__content {
      padding: 30px 16px;
      width: 90%;
    }
  }
}
</style>
