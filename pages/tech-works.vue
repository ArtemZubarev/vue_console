<template>
  <div class="box">
    <div
      v-for="(phrase, index) in phrases"
      :key="phrase"
      class="box__item"
      :style="{ opacity: 1 - index * 0.2 }"
    >
      <span>{{ phrase }}</span>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'maintainer',
  middleware: ['isTechWorks'],
  data () {
    return {
      phrases: [
        'Technical works. Come back later',
        'Технические работы. Зайдите попозже',
        'Technische Arbeiten. Später wiederkommen',
        'Teknik işler. Daha sonra gel'
      ]
    }
  }
}
</script>

<style>
.box {
  margin-top: 60px;
}
.box__item {
  font-weight: bold;
}
</style>
