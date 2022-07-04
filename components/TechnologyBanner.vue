<template>
  <a class="banner" target="_blank" :href="technologyLink">
    <!-- <img src="@/assets/img/banner.jpeg" class="banner__img"> -->
    <div class="banner__box">
      <span class="banner__link">
        {{ $t('Buy node and top up your contracts') }}
      </span>
    </div>
    </div>
  </a>
</template>

<script>
export default {
  computed: {
    technologyLink () {
      const link = process.env.contractsUrl
      const lang = this.$i18n.locale === 'ru' ? '/ru' : ''

      return link + lang
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner {
  display: block;
  position: relative;
  margin: 20px 0;

  background: url('@/assets/img/banner.jpeg');
  background-size: cover;

  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }

  &__img {
    width: 100%;

    height: 100%;
  }

  &__box {
    width: 100%;
    height: 100%;
    // position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 10px;
    text-align: center;
    box-sizing: border-box;
  }
  &__link {
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    top: -4px;
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
}
</style>
