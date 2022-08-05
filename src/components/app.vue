<template>
  <div class="container">
    <record :games="games" />
    <schedule :games="games" />
  </div>
</template>
<script>
import data from '@data/schedule'
import schedule from '@parts/schedule'
import record from '@parts/record'

export default {
  components: { record, schedule},
  data () {
    return {
        games: data.schedule
    }
  },
  methods: {
    scoreOne(obj) {
        return obj.score.split("-")[0];
    },
    scoreTwo(obj) {
        return obj.score.split("-")[1];
    },
    homeOrAway(obj) {
        if (obj.road)
            return `@  ${obj.opponent}`;
        return obj.opponent;
    },
    gameResult(obj) {
        if (this.scoreOne(obj) === this.scoreTwo(obj))
            return "game-tie";
        else if (obj.played && obj.outcome)
            return "game-won";
        else if (obj.played && !obj.outcome)
            return "game-lost";
    }
  }
};
</script>
<style lang="scss" scoped>

</style>