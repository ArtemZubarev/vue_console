<template>
  <div class="spec">
    <div class="spec__expertise">
      <svg-icon name="common/info" class="spec__icon" />
      {{ $t('This option requires expertise.') }}
    </div>
    <div class="spec__title">
      {{ $t('Minimum specifications') }}
    </div>
    <div class="spec__table">
      <div class="spec__box">
        <div class="spec__name">
          {{ $t('CPU') }}
        </div>
        <div class="spec__name">
          {{ $t('RAM') }}
        </div>
        <div class="spec__name">
          {{ $t('Drive') }}
        </div>
        <!-- <div class="spec__name">
          {{ $t('Bandwith') }}
        </div>
        <div class="spec__name">
          {{ $t('Traffic') }}
        </div> -->
        <div class="spec__name">
          {{ $t('OS') }}
        </div>
      </div>
      <div class="spec__box">
        <div class="spec__value">
          1 core
        </div>
        <div class="spec__value">
          1 GB
        </div>
        <div class="spec__value">
          10 GB NVME
        </div>
        <!-- <div class="spec__value">
          50 Mbit/s
        </div>
        <div class="spec__value">
          {{ $t('Unlimited') }}
        </div> -->
        <div class="spec__value">
          Ubuntu 20.04
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProviderInfo',
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.spec {
  &__title {
    color: $colorFontBase;
    opacity: 0.4;
    margin-top: 12px;
    font-size: 14px;

  }
  &__table {
    display: flex;
    margin-top: 4px;
  }
  &__box {
    &:first-of-type {
      margin-right: 8px;
    }
  }
  &__expertise {
    background: #ECE75D;
    border-radius: 4px;
    padding: 4px;
    color: $colorFontBase;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  &__name {
    color: $colorFontBase;
    font-size: 14px;
  }
  &__value {
    font-weight: 700;
    color: $colorFontBase;
    font-size: 14px;
  }
  &__icon {
    width: 13.3px;
    height: 13.3px;
    margin-right: 5px;
  }
}
</style>
