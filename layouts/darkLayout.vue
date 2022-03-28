<template>
  <div class="base-wrapper dark-mode base-map">
    <div class="base-container">
      <oton-header>
        <template #logo>
          <!-- <svg-icon name="common/logo-nodes" /> -->
          <nuxt-link :to="localePath('index')">
            <oton-logo :defaultColors="true" />
          </nuxt-link>
        </template>
        <template #mainMenu>
          <header-menu>
            <template #list>
              <!-- <nuxt-link
                v-for="link in menuLinks"
                :key="link.text"
                :to="localePath(link.href)"
                class="layoutHeaderMenu__link"
              >
                {{ link.text }}
              </nuxt-link> -->
            </template>
          </header-menu>
        </template>
        <template #secondaryMenu>
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
        </template>
      </oton-header>
      <!-- <HeaderSearch /> -->
      <Nuxt />
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
  </div>
</template>
<script>
import { OtonHeader, HeaderLocalePicker, HeaderMenu, OtonFooter } from 'oton-vue-components'
import OtonLogo from '@/components/OtonLogo.vue'

export default {
  name: 'DarkLayout',
  components: {
    OtonHeader,
    HeaderLocalePicker,
    OtonLogo,
    HeaderMenu,
    OtonFooter
  },
  data () {
    return {
      menuLinks: [
        {
          text: 'Home',
          href: 'index'
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
      return [
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

<style lang="stylus" scoped>
.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  // background-color: $colorBg;
  background: transparent linear-gradient(180deg, $colorBg 0%, #0A4A5E 100%) 0% 0% no-repeat padding-box;
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
</style>
