<template>
  <GameModal>
    <div class="pause-menu">
      <div class="pause-menu__title">
        <img src="/ui/paused.png" />
      </div>

      <button type="button" class="pause-menu__button-text" @click="$emit('unpaused')">
        <img src="/ui/block-button.png" />
        <span>{{ t('play') }}</span>
      </button>

      <button type="button" class="pause-menu__button-text" @click="$emit('restart')">
        <img src="/ui/block-button.png" />
        <span>{{ t('restart') }}</span>
      </button>

      <button type="button" class="pause-menu__button-text" @click="$emit('exit')">
        <img src="/ui/block-button.png" />
        <span>{{ t('exit') }}</span>
      </button>
    </div>
  </GameModal>
</template>

<script lang="ts">
import { t } from '@/translator'
import GameModal from './GameModal.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['unpaused', 'exit', 'restart'],

  setup() {
    return { t }
  },
  components: { GameModal }
})
</script>

<style lang="scss">
.pause-menu {
  &__button-text {
    margin: 0 auto;
    @include button-text;

    & + .pause-menu__button-text {
      margin-top: 16px;
    }
  }

  &__title {
    @include title-image;
  }
}
</style>
