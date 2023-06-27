<template>
  <div class="home">
    <div class="wrapper" ref="wrapperRef">
      <p class="home__logo">WEB CHILL GAMES</p>

      <div class="home__content">
        <div>
          <h2>
            Играй,гуляй,общайся<br />
            Погружайся с AR*<br />
            И квестами
          </h2>

          <nav>
            <ul class="buttons-list">
              <li>
                <RouterLink to="/games">Игры</RouterLink>
              </li>
              <li>
                <RouterLink to="/">Личный кабинет</RouterLink>
              </li>
            </ul>
          </nav>
        </div>
        <RocketAnimation class="home__rocket" />
      </div>

      <p class="home__decoding">* AR - Augmented reality</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import RocketAnimation from '@/elements/RocketAnimation.vue'

export default defineComponent({
  components: { RocketAnimation },
  setup() {
    const wrapperRef = ref()

    function calcHeight(): void {
      wrapperRef.value.style.height = document.documentElement.scrollHeight + 'px'
    }

    onMounted(() => {
      calcHeight()
      // window.addEventListener('resize', ()=> calcHeight)
    })

    return {
      wrapperRef
    }
  }
})
</script>

<style lang="scss">
.home {
  background-color: $bg-3;

  h2 {
    color: $text-1;
    font-family: $font-title;
    line-height: 34px;
    font-size: 27px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__rocket {
    justify-self: center;
  }

  &__logo {
    color: $text-2;
    font-family: $font-logo;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
  }

  &__decoding {
    color: $text-2;
  }

  .wrapper {
    @include page;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 1024px) {
    &__content {
      grid-template-columns: 1fr;
      grid-gap: 60px;
    }

    &__rocket {
      // justify-self: flex-end;
    }
  }

  @media (max-width: 1024px) {
 
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 18px;
    }
  }
}
</style>
