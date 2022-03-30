import allowedLangs from './langs/allowedLangs'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Oton Node Console',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#ffc40d' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'manifest', type: 'image/x-icon', href: '/favicon/site.webmanifest' },
      { rel: 'icon', type: 'image/png', size: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'apple-touch-icon', size: '180x180', href: '/favicon/apple-touch-icon.png' }

    ]
  },

  loading: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/normalize.css', '~/assets/styles/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-final-modal.js',
    '~/plugins/api.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    'nuxt-clipboard2',
    'cookie-universal-nuxt',
    '@nuxtjs/toast'
  ],

  toast: {
    position: 'top-center',
    duration: 3000
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  'cookie-universal-nuxt': { alias: 'cookies' },

  styleResources: {
    stylus: './assets/styles/vars.styl'
  },

  svgSprite: {
    input: '~/assets/svg/'
  },

  i18n: {
    locales: allowedLangs.map(lang => ({
      code: lang,
      file: `${lang}.js`
    })),
    defaultLocale: 'en',
    fallbackLocale: 'en',
    langDir: 'langs/dist',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true // recommended
    },
    vueI18n: '~/i18n.js'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-final-modal']
  },
  env: {
    baseUrl: process.env.API_URL,
    ssoUrl: process.env.SSO_URL,
    ssoHash: process.env.SSO_HASH
  }
}
