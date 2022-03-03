<template>
  <div class="master">
    <div class="master__head">
      <slot name="header" />
    </div>
    <div class="master__title">
      <slot name="title" />
    </div>
    <div class="master__main">
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.master {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__head {
    width: 100%;
  }
  &__title {
    position: relative;
    display: block;
    width: 100%;
    max-width: 384px;
    font-size: 20px;
    font-weight: bold;
    color: #033354;
    text-align: center;
    padding-top: 8px;
    padding-bottom: 2px;
    margin-top: -33px;
    z-index: 3;
    background: #fff;
  }

  &__main {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 10px 30px 10px;
  }
}
</style>
