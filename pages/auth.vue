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
          this.$router.push(`${this.$i18n.locale ? `/${this.$i18n.locale}` : ''}/`)
        }
      })
    }
  },
  methods: {
    auth () {
      authSso()
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
