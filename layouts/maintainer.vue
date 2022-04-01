<template>
  <div class="base-wrapper">
    <div class="base-container">
      <div class="content">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: $colorBg;
}

.base-container {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  margin: auto;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;

  .footer {

  }

  +mediaTablet() {
    max-width: 750px;
    padding: 0 15px;
  }

  +mediaDesktop() {
    max-width: 1150px;
  }
}
.content {
  margin-top: 12px;
}

</style>
