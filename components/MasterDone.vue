<template>
  <div class="done">
    <div class="done__overlay" />
    <div class="done__box" @click="$emit('close')">
      <div class="done__text">
        {{ $t('Node is created!') }}
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
.done {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 300;

  &__overlay {
    position: absolute;
    background: rgba(49, 123, 146, 0.6);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__box {
    width: 432px;
    height: 432px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $colorFiller;
    z-index: 400;
    border-radius: 50%;
    padding: 0 50px;
    box-sizing: border-box;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  &__text {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    color: $colorFontBase;
  }
}
</style>
