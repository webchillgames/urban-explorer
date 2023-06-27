<template>
  <GameModal :hasStars="true">
    <div class="level-complete-menu">
      <div class="level-complete-menu__title">
        <img src="/ui/level_complete.png" />
      </div>

      <button type="button" class="level-complete-menu__button-text" @click="$emit('exit')">
        <img src="/ui/block-button.png" />
        <span>Exit</span>
      </button>
    </div>
  </GameModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameModal from './GameModal.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: { GameModal }
})
</script>

<style lang="scss">
.level-complete-menu {
  position: relative;

  &__title {
    @include title-image;
  }

  &__button-text {
    @include button-text;
    margin: 0 auto;
  }
}
</style>
