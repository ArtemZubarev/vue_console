<template>
  <div>
    <div class="authPage">
      <oton-auth @handle-auth="auth" />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import OtonAuth from '@/components/OtonAuth.vue'
import authSso from '@/utils/authSso'
import techWorks from '@/utils/techWorks'

export default {
  components: {
    OtonAuth
  },
  layout: 'darkLayout',
  data () {
    return {

    }
  },
  mounted () {
    if (techWorks && this.$cookies.get('forTests') !== 'tester') {
      this.$router.push(this.localePath('/tech-works'))
    }
    const { query } = this.$route
    const hasCookie = this.$cookies.get('auth')
    if (hasCookie) {
      this.$router.push(this.localePath('index'))
      return
    }

    if (query.token) {
      this.$store.dispatch('userStore/auth', query.token).then((res) => {
        if (res) {
          Cookies.set('auth', res.auth, { expires: 30 })
          const { query } = this.$route
          const lang = query && query.lang ? query.lang : ''
          this.$router.push(`${lang && lang !== 'en' ? `/${lang}/` : '/'}`)
        }
      })
    }
  },
  methods: {
    auth () {
      const lang = Cookies.get('i18n_redirected')
      authSso(lang && lang !== 'en' ? lang : undefined)
    }
  }
}
</script>

<style lang="stylus" scoped>
.authPage {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
