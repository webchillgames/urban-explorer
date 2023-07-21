<template>
  <div class="home">
    <div class="wrapper" ref="wrapperRef">
      <div class="home__language">
        <AppSvgVue link="world" />
        <select @change="changeLang">
          <option :selected="currentLang === 'ru'" value="ru">русский</option>
          <option :selected="currentLang === 'en'" value="en">english</option>
        </select>
      </div>
      <p class="home__logo">WEB CHILL GAMES</p>

      <div class="home__content">
        <div>
          <h2 v-html="t('promo')"></h2>

          <nav>
            <ul class="buttons-list">
              <li>
                <RouterLink to="/games">{{ t('games') }}</RouterLink>
              </li>
              <!-- <li>
                <RouterLink to="/">{{ t('account') }}</RouterLink>
              </li> -->
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
import { t } from '@/translator'

import RocketAnimation from '@/elements/RocketAnimation.vue'
import AppSvgVue from '@/elements/AppSvg.vue'

export default defineComponent({
  components: { RocketAnimation, AppSvgVue },
  setup() {
    const wrapperRef = ref()
    const currentLang = ref(localStorage.getItem('urban-explorer-lang'))

    function calcHeight(): void {
      wrapperRef.value.style.height = document.documentElement.scrollHeight + 'px'
    }

    function changeLang(e: Event) {
      const el = e.target as HTMLInputElement
      console.log(el.value)

      localStorage.setItem('urban-explorer-lang', el.value)
      window.location.reload()
    }

    onMounted(() => {
      calcHeight()
    })

    return {
      t,
      wrapperRef,
      changeLang,
      currentLang
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

  &__language {
    display: flex;
    justify-content: flex-end;

    select {
      font-size: 14px;
      color: #000;
    }

    svg {
      margin-right: 4px;
    }
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
