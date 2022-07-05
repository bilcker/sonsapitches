<template>
  <div class="sp-schedule">
    <div class="sp-record">
      
    </div>
    <div class="sp-game" v-for="(game, i) in games" :key="i">

      <div class="sp-game-wrap" :class="gameResult(game)">

        <div v-if="game.played" class="sp-outcome">
            <span class="sp-outcome-score" v-html="game.score" />
        </div>

        <div class="sp-date">
          <span class="sp-date-month" v-html="game.month" />
          <span class="sp-date-day" v-html="game.day" />
        </div>

        <div class="sp-team">
          <span class="sp-team-name" v-html="homeOrAway(game)" />
        </div>

        <div class="sp-location">
          <span class="sp-location-time" v-html="game.time" />
          <span class="sp-location-place" v-html="game.location" />
        </div>
      </div>
      <!-- End game-wrap -->
    </div>
    <!-- End game -->
  </div>
  <!--end sp-schedule-->
</template>
<script>

import schedule from '@data/schedule'

export default {
  data: function () {
    return {
      games: schedule.schedule
    }
  },
  methods: {
    scoreOne (obj) {
      return obj.score.split('-')[0]
    },
    scoreTwo (obj) {
      return obj.score.split('-')[1]
    },
    homeOrAway (obj) {
      if (obj.road) return `@  ${obj.opponent}`
      return obj.opponent
    },
    gameResult (obj) {
      if (this.scoreOne(obj) === this.scoreTwo(obj)) return 'game-tie'
      else if (obj.played && obj.outcome) return 'game-won'
      else if (obj.played && !obj.outcome) return 'game-lost'
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../scss/main';

.sp-schedule {
  padding: 0 $size-sm 0 $size-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  align-content: center;

  .sp-game {
    width: 50%;
    min-width: 120px;
    box-sizing: border-box;
    text-align: center;

    .sp-game-wrap {
      @include position(relative);

      margin: $size-sm;
      border: $border-base solid $colour-white;

      &.game-won {
        background: darken($colour-green, 15%);

        .sp-team {
          .sp-team-name { background: darken($colour-green, 30%); }
        }
      }

      &.game-lost {
        background: darken($colour-red, 15%);

        .sp-team {
          .sp-team-name { background: darken($colour-red, 30%); }
        }
      }

      &.game-tie {
        background: $colour-yellow;

        .sp-team {
          .sp-team-name { background: darken($colour-yellow, 30%); }
        }
      }

      .sp-outcome {
        @include position(absolute, $top:$size-xs, $right:-2px);
        @include breakpoint(sm) {
          @include position(absolute, $top:$size-sm, $right:0);
        }

        .sp-outcome-score {
          @include breakpoint(sm) {
            padding: $size-sm;
            font-size: 18px;
          }

          padding: $size-xs;
          font-size: 15px;
          background: $colour-white;
          color: $colour-blue;
        }
      }

      .sp-date {
        padding: $size-base;

        > span {
          display: block;

          &.sp-date-month {
            @include breakpoint(sm) { font-size: 20px; }

            font-size: 16px;
            margin-bottom: $size-sm;
          }

          &.sp-date-day {
            @include breakpoint(sm) { font-size: 55px; }

            font-size: 42px;
            color: $colour-white;
            font-weight: bold;
          }
        }
      }

      .sp-team {
        margin-bottom: $size-base;

        .sp-team-name {
          @include breakpoint(sm) { font-size: 18px; }

          padding: $size-sm;
          font-size: 14px;
          background: $colour-black;
          color: $colour-white;
        }
      }

      .sp-location {
        display: flex;
        align-items: flex-end;

        > span {
          @include breakpoint(sm) { font-size: 20px; }

          width: 50%;
          padding: $size-sm;
          display: block;
          font-size: 14px;
          color: $colour-blue;
          background: $colour-white;
        }
      }
    }
  }
}
</style>