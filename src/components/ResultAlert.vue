<template>
  <GameModal :hasOverlay="false" :hasStars="true">
    <div class="result-alert">
      <h3>Осталось найти</h3>
      <div class="result-alert__reminder">
        <span>3</span>
        <img src="/ui/white-circle.png" />
      </div>
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
.result-alert {
  text-align: center;

  h3 {
    font-size: 30px;
    line-height: 45px;
  }

  &__reminder {
    margin: 0 auto;
    @include circle-text;
  }
}
</style>
