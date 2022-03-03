<template>
  <div class="auth">
    <h1 class="auth__title">
      {{ $t('Login') }}
    </h1>
    <p class="auth__text">
      {{ $t('Only for oton.org users.') }}
    </p>
    <button class="auth__button">
      <slot name="logo" />
      {{ $t('Log in via OTON') }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'OtonAuth',
  methods: {
    handleClick () {
      this.$emit('handle-auth')
    }
  }
}
</script>
<style lang="stylus" scoped>
.auth {
  width: 100%;
  max-width: 600px;
  padding: 15px 20px;
  background: #fff;
  box-shadow: 0px 16px 64px #00000033;
  border-radius: 8px;
  margin-top: 10%;

  +mediaTablet() {
    padding: 40px 60px;
  }

  &__title {
    font-size: 24px;
    color: $colorFiller;
    margin-top: 0;
  }

  &__text {
    padding: 16px 0 31px 0;
    font-size: 14px;
  }

  &__button {
    background: $colorBg;
    color: $colorFontBase;
    width: 100%;
    padding: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
