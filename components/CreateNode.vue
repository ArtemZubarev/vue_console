<template>
  <div class="card">
    <div class="card__text">
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
  border: 4px dashed #ffffff;
  padding: 50px 0;
  border-radius: 8px;

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
