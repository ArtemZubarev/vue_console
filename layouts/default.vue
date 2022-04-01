<template>
  <div class="base-wrapper">
    <div class="base-container">
      <oton-header>
        <template #logo>
          <!-- <svg-icon name="common/logo-nodes" /> -->
          <nuxt-link :to="localePath('index')">
            <oton-logo />
          </nuxt-link>
        </template>
        <template #mainMenu>
          <header-menu>
            <template #list>
              <nuxt-link
                v-for="link in menuLinks"
                :key="link.text"
                :to="localePath(link.href)"
                class="layoutHeaderMenu__link"
              >
                {{ link.text }}
                <svg-icon v-if="link.text === 'Manual'" class="manual" name="common/link" />
              </nuxt-link>
            </template>
          </header-menu>
        </template>
        <template #secondaryMenu>
          <div class="media-box">
            <header-locale-picker :locale="$i18n.locale" :availableLangs="availableLangs">
              <template #icon>
                <svg-icon name="common/lang-picker" class="langPickerIcon" />
              </template>
              <template #menu>
                <nuxt-link
                  v-for="lang in availableLangs"
                  :key="lang.code"
                  class="popupListItem"
                  :to="switchLocalePath(lang.code)"
                  @click.prevent="menu = false"
                >
                  {{ lang.code }}
                </nuxt-link>
              </template>
            </header-locale-picker>
          </div>
          <button
            type="button"
            class="menuButton"
            :class="{ menuButton_active: mobileMenu }"
            @click="mobileMenu = !mobileMenu"
          >
            <span class="menuButton__inner" />
            <span class="menuButton__inner" />
            <span class="menuButton__inner" />
          </button>
        </template>
        <template #userMenu>
          <div class="user-menu">
            <logged-menu />
          </div>
        </template>
      </oton-header>
      <!-- <HeaderSearch /> -->
      <div class="content">
        <Nuxt />
      </div>
      <oton-footer>
        <template #links>
          <a
            v-for="link in footerLinks"
            :key="link.text"
            class="footer__link"
            :href="link.docName"
            target="_blank"
          >
            {{ $t(link.text) }}
          </a>
        </template>
      </oton-footer>
    </div>
    <aside-menu :active="mobileMenu" @close="mobileMenu = !mobileMenu" />
  </div>
</template>
<script>
import { OtonHeader, HeaderLocalePicker, HeaderMenu, OtonFooter } from 'oton-vue-components'
import OtonLogo from '@/components/OtonLogo.vue'
import LoggedMenu from '~/components/LoggedMenu.vue'
import AsideMenu from '~/components/AsideMenu.vue'

export default {
  name: 'DefaultLayout',
  components: {
    OtonHeader,
    HeaderLocalePicker,
    OtonLogo,
    HeaderMenu,
    OtonFooter,
    LoggedMenu,
    AsideMenu
  },
  data () {
    return {
      mobileMenu: false,
      menuLinks: [
        {
          text: 'Home',
          href: 'index'
        },
        {
          text: 'Manual',
          href: '#'
        }
      ],
      footerLinks: [
        {
          text: 'Terms of use',
          docName: 'https://oton.technology/OtonTechnology_TermsAndConditions.pdf'
        },
        {
          text: 'Cookies policy',
          docName: 'https://oton.technology/OtonTechnology_CookiesPolicy.pdf'
        },
        {
          text: 'Privacy notice',
          docName: 'https://oton.technology/OtonTechnology_PrivacyPolicy.pdf'
        }
      ]
    }
  },
  computed: {
    availableLangs () {
      const langs = [
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

      return langs.filter(lang => lang.code !== this.$i18n.locale)
    }
  },
  mounted () {
    const token = this.$cookies.get('auth')
    this.$store.dispatch('userStore/fetchUser', token)
  }
}
</script>

<style lang="stylus" scoped>
.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: $colorBg;
}

.base-container {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  margin: auto;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;

  .footer {

  }

  +mediaTablet() {
    max-width: 750px;
    padding: 0 15px;
  }

  +mediaDesktop() {
    max-width: 1150px;
  }
}
.content {
  margin-top: 12px;
}
.menuButton {
  position: absolute;
  top: 8px;
  right: 4px;
  z-index: 5;
  display: block;
  padding: 10px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  box-sizing: content-box;

  &__inner {
    position: absolute;
    left: 12px;
    height: 2px;
    background-color: $colorFontBase;
    transition: 0.3s;

    &:first-of-type {
      top: 12px;
    }

    &:first-of-type, &:last-of-type {
      width: 16px;
    }

    &:nth-of-type(2) {
      top: 19px;
      width: 12px;
    }

    &:last-of-type {
      bottom: 12px;
    }
  }

  &_active {
    position: fixed;
    right: 12px;

    & .menuButton__inner {
      &:first-of-type {
        transform: rotate(45deg);
      }

      &:first-of-type, &:last-of-type {
        top: 19px;
        left: 10px;
        width: 20px;
      }

      &:nth-of-type(2) {
        width: 0%;
      }

      &:last-of-type {
        transform: rotate(-45deg);
      }
    }
  }

  +mediaTablet() {
    display: none;
  }
}
.media-box {
  display: none;

  +mediaTablet()  {
    display: block;
  }
}
.user-menu {
  margin-top: -19px;
}

.manual {
  width: 17px;
  height: 17px;
  position: absolute;
  right: -19px;
  top: -2.5px;
}
.layoutHeaderMenu__link {
  position: relative;
}
</style>
