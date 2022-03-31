<template>
  <div :class="['aside', {active: active}]">
    <div class="aside__layout" @click="$emit('close')" />
    <div class="aside__container">
      <div class="aside__content">
        <logged-menu />
        <div class="aside__langs">
          <nuxt-link
            v-for="lang in langs"
            :key="lang.code"
            :class="['aside__lang', {active: lang.code === $i18n.locale}]"
            :to="switchLocalePath(lang.code)"
            @click.native="$emit('close')"
          >
            {{ lang.code }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoggedMenu from './LoggedMenu.vue'
export default {
  components: { LoggedMenu },
  props: {
    active: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      langs: [
        {
          code: 'ru'
        },
        {
          code: 'en'
        },
        {
          code: 'tr'
        }
      ]
    }
  }
}
</script>
<style lang="stylus">
.aside {
  position: fixed;
  width: 100vw;
  height: 100vh;
  right: -2000px;

  +mediaTablet() {
    display: none;
  }

  &__layout {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $colorFontBase;
    opacity: 0.5;
    z-index: 3;
    right: 0;
    top: 0;
  }

  &__container {
    position: absolute;
    width: 90%;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 4;
    background: #fff;
    display: flex;
    // justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    padding-right: 22px;
    box-sizing: border-box;
  }

  &__content {
    margin-top: 30%;
    position: relative;

    .popup__item {
      text-align: right;
    }

    .popup {
      top: 35px;
      background: transparent;
      // position: relative;
    }

  }

  &__langs {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }

  &__lang {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      color: $colorFiller;
      background: $colorFontBase
    }
  }

  &.active {
    right: 0px;
  }
}
</style>
