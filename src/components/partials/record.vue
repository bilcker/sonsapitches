<template>
  <section class="record">
    <span>{{ wins }} - {{ losses }} - {{ ties }}</span>
    <!-- <span>Runs For: {{ this.runsAverage('for') }} - Against: {{ this.runsAverage('against') }}</span> -->
  </section>
</template>

<script>
export default {
  name: 'record',
  props: {
    games: Array
  },
  methods: {
    runsAverage (key) {
      return this.games.reduce((acc, obj) =>  {
        return acc + obj[`${key}`] / this.games.length
      }, 0)
    }
  },
  computed: {
    wins () {
      let count = 0

      for (let game of this.games) {
        if (game.outcome) count++
      }

      return count
    },
    losses () {
      let count = 0

      for (let game of this.games) {
        if (!game.outcome && game.score.split("-")[0] !== game.score.split("-")[1])  {
          count++
        }
      }

      return count
    },
    ties () {
      let count = 0

      for (let game of this.games) {
        if (!game.outcome && game.score.split("-")[0] === game.score.split("-")[1])  {
          count++
        }
      }

      return count
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '@scss/modules/colors' as *;
@use '@scss/modules/sizes' as *;
@use '@scss/mixins/fonts' as *;

.record {
  @include font-size (2.5);

  color: var(--colour-white);
  text-align: center;
  padding: $size-sm 0 $size-sm 0;
  border-top: 2px solid color.adjust($colour-blue, $lightness: -5%);
  border-bottom: 2px solid color.adjust($colour-blue, $lightness: -5%);
}
</style>