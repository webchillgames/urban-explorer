<template>
  <GameModal>
    <div class="pause-menu">
      <div class="pause-menu__title">
        <img src="/ui/paused.png" />
      </div>

      <AppButtonVue :title="t('play')" @click="$emit('unpaused')" />
      <AppButtonVue :title="t('restart')" @click="$emit('restart')" />
      <AppButtonVue :title="t('exit')" @click="$emit('exit')" />
    </div>
  </GameModal>
</template>

<script lang="ts">
import { t } from '@/translator'
import GameModal from './GameModal.vue'
import { defineComponent } from 'vue'
import AppButtonVue from '@/elements/AppButton.vue'

export default defineComponent({
  emits: ['unpaused', 'exit', 'restart'],

  setup() {
    return { t }
  },
  components: { GameModal, AppButtonVue }
})
</script>

<style lang="scss">
.pause-menu {
  button {
    margin: 0 auto;
  }

  button + button {
    margin-top: 16px;
  }

  &__title {
    @include title-image;
  }
}
</style>
