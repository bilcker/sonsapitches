<template>
  <div class="games">

    <div class="game" v-for="(game, index) of games" :key="index">
      <div class="game__date">
        <span class="game__date__month" v-text="game.date.month" />
        <span class="game__date__day" v-text="game.date.day" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  props: {
    games: Array
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '@scss/modules/colors' as *;
@use '@scss/modules/sizes' as *;
@use '@scss/mixins/fonts' as *;
@use '@scss/mixins/flex' as *;

.game {
  @include flexbox ($justify: space-between);

  background-color: var(--colour-white);
  padding: $size-lg;
  border: 1px solid darken($colour-blue, 25%);
  box-shadow: 2px 2px 4px rgba(var(--colour-black), 0.7);
}

.game__date {
  @include flexbox($dir: column);

  border-right: 1px solid lighten($colour-black,90%);
  padding-right: $size-lg;
  margin-right: $size-lg;

  &__month {
    @include font-size(1.4);
  }

  &__day {
    @include font-size(3);
  }
}
</style>