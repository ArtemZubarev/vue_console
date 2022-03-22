<template>
  <div class="contract">
    <div class="contract__info">
      <div class="contract__box">
        <h3 class="contract__name">
          Contract {{ contract.type }}
        </h3>
        <div class="contract__data">
          <div class="contract__duration">
            {{ contract.period }} {{ $t('months') }}
          </div>
          <div class="contract__explanation">
            <span>{{ contract.percent }}%</span> <sup>*</sup> <span>/ {{ $t('month') }}</span>
          </div>
        </div>
      </div>
      <div class="contract__box">
        <div class="contract__title">
          {{ $t('Sum') }}
        </div>
        <div class="contract__sum">
          {{ contract.amount }}
          <span class="contract__text">OTON</span>
        </div>
      </div>
    </div>
    <div class="contract__footnote">
      <sup>*</sup>{{ $t('Approximate calculation based on ') }}
      <a
        href=""
        target="_blank"
      >{{ $t('the table') }}</a>.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contract: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
* {
  color: $colorFontBase;
}
.contract {
  width: 100%;
  background: $colorBg;
  border-radius: 4px;
  padding: 8px 12px 12px 12px;
  margin-bottom: 12px;

  &__name {
    margin: 0;
    margin-bottom: 7px;
    font-size: 16px;
  }

  &__title {
    text-transform: uppercase;
    opacity: 0.4;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  &__info {
    display: flex;
  }

  &__box {
    width: 50%;
  }

  &__sum {
    font-size: 24px;
    font-weight: bold;
  }

  &__text {
    font-size: 20px;
    opacity: 0.4;
  }

  &__data {
    font-size: 14px;
    display: flex;
  }

  &__duration {

  }

  &__explanation {
    margin-left: 8px;

    span {
      opacity: 0.4;
    }
  }

  &__footnote {
    margin-top: 10px;
    font-size: 14px;
  }

  sup {
    color: $colorDanger;
    opacity: 1;
  }
}
</style>
