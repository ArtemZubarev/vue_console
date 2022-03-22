<template>
  <div :class="['card', {inList: inList}]">
    <div v-if="inList" class="card__text">
      {{ $t('Create a new node and enjoy it.') }}
    </div>
    <div v-else class="card__text">
      {{ $t('Create your first node and enjoy it') }}
    </div>
    <div class="card__buttons">
      <button class="card__button" @click="handleClick">
        {{ $t('Create') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inList: {
      type: Boolean,
      required: false
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
  padding: 50px 0;
  border-radius: 8px;
  box-sizing: border-box;

  &.inList {
    max-width: 357px;
    max-height: 200px;
  }

  &__text {
    font-size: 18px;
  }

  &__buttons {
    margin-top: 20px;
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
}
</style>
