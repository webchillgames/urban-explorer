<template>
  <GameModal :hasStars="true">
    <div class="level-complete-menu">
      <div class="level-complete-menu__title">
        <img src="/ui/level_complete.png" />
      </div>

      <AppButton :title="t('exit')" @click="$emit('exit')" />
    </div>
  </GameModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameModal from './GameModal.vue'
import { t } from '@/translator'
import AppButton from '@/elements/AppButton.vue'

export default defineComponent({
  setup() {
    return { t }
  },
  components: { GameModal, AppButton }
})
</script>

<style lang="scss">
.level-complete-menu {
  position: relative;

  &__title {
    @include title-image;
  }

  button {
    margin: 0 auto;
  }
}
</style>
