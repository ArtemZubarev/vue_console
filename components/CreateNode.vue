<template>
  <div :class="['card', {inList: inList}]">
    <div v-if="limits.current <= limits.limit" class="card__text">
      {{ $t('Creation of new nodes is temporary limited') }}
    </div>
    <div v-else-if="inList" class="card__text">
      {{ $t('Create a new node and enjoy it.') }}
    </div>
    <div v-else class="card__text">
      {{ $t('Create your first node and enjoy it') }}
    </div>
    <div class="card__buttons">
      <button v-if="limits.current < limits.limit" class="card__button" @click="handleClick">
        {{ $t('Create') }}
      </button>
      <div v-else class="card__alpha">
        {{ $t('The limit is needed for debugging the system during alpha testing.') }}
      </div>
    </div>
    <div class="card__limits">
      <div class="card__current">
        {{ limits.current }} / {{ limits.limit }}
      </div>
      <div class="progressbar">
        <div
          :class="['progressbar__line', {'danger': limits.current >= limits.limit}]"
          :style="{width: `${(100 / limits.limit ) * limits.current}%`}"
        />
      </div>
      <div v-if="limits.current >= limits.limit" class="card__text card__bottomText">
        {{ $t('The limit will be increased in a few days.') }}
      </div>
      <div v-else class="card__text card__bottomText">
        {{ $t('Temporary limit on number of nodes.') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inList: {
      type: Boolean,
      required: false
    },
    limits: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleClick () {
      this.$emit('create')
    }
  }
}
</script>
<style lang="stylus" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  border: 2px dashed #ffffff;
  padding: 25px 15px 20px 15px;
  border-radius: 8px;
  box-sizing: border-box;

  &.inList {
    max-width: 357px;
    max-height: 200px;
  }

  &__text {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  &__buttons {
    margin-top: 20px;
  }

  &__current {
    text-align: center;
    font-weight: bold;
    margin-bottom: 3px;
  }

  &__limits {
    width: 100%;
    margin-top: 40px;
  }

  &__alpha {
    text-align: center;
    font-size: 14px;
  }

  &__button {
    display: inline-block;
    background: #317B92;
    color: #fff;
    border-radius: 4px;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: bold;
    border: none;
  }

  &__bottomText {
    font-size: 12px;
    margin-top: 5px;
    font-weight: normal;
  }
}
.progressbar {
  position: relative;
  overflow: hidden;
  background: #fff 0% 0% no-repeat padding-box;
  height: 8px;
  border-radius: 4px;

  &__line {
    position: absolute;
    background: transparent linear-gradient(180deg, #7DC475 0%, #4E9A45 100%) 0% 0% no-repeat padding-box;
    transition: 3s;
    height: 100%;

    &.danger {
      background: transparent linear-gradient(180deg, #EC5D6B 0%, #A73B45 100%) 0% 0% no-repeat padding-box;
    }
  }
}
</style>
