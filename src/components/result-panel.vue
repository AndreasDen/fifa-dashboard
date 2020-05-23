<template>
  <div class="result-panel">
    <div class="tooltip">
      <p v-if="playerHomeWonElo"
         v-html="game[player_1_location+'_player'].user.name + ' won ' +  homeWanderedElo+ ' points from '+ game[player_2_location+'_player'].user.name"></p>
      <p v-else
         v-html="game[player_1_location+'_player'].user.name + ' lost ' +  awayWanderedElo + ' points to '+ game[player_2_location+'_player'].user.name"></p>
    </div>
    <p class="index" v-if="index">{{index +1}}</p>
    <div class="player-home">
      <div class="player-home-linup">
        <p class="player-home-name">{{game[player_1_location+'_player'].user.name}}</p>
        <p class="player-home-team">{{game[player_1_location+'_team'].name}}</p>
      </div>
      <div class="player-home-goals">
        {{game[player_1_location+'_goals_end']}}
      </div>
    </div>
    <div class="player-away">
      <div class="player-away-linup">
        <p class="player-away-name">{{game[player_2_location+'_player'].user.name}}</p>
        <p class="player-away-team">{{game[player_2_location+'_team'].name}}</p>
      </div>
      <div class="player-away-goals">
        {{game[player_2_location+'_goals_end']}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "result-panel",
  props: {
    game: Object,
    index: Number,
    playerOrderReverse: Boolean
  },
  data: function () {
    return {
      player_1_location: 'home',
      player_2_location: 'away'
    }
  },
  computed: {
    homeWanderedElo: function () {
      return parseInt(this.game[this.player_1_location + '_wandered_elo'].toFixed())
    },
    awayWanderedElo: function () {
      return parseInt(this.game[this.player_2_location + '_wandered_elo'].toFixed())
    },
    playerHomeWonElo: function () {
      return this.homeWanderedElo > this.awayWanderedElo
    },
  },
  watch: {
    playerOrderReverse: {
      handler: function(val) {
          this.player_1_location = val ? 'away' : 'home'
          this.player_2_location = val ? 'home' : 'away'
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">
@import "src/scss/variables";

.result-panel {
  display: flex;
  padding: 16px 0 32px 0;
  position: relative;

  &:not(:first-child) {
    margin-top: 16px;
    border-top: 1px dashed $color-blue;
  }

  p {
    margin: 0;
  }

  .tooltip {
    position: absolute;
    width: 100%;
    max-width: 200px;
    bottom: 0;
    border-radius: 4px;
    padding: 4px;
    left: 50%;
    transform: translateX(-50%);
    background: $color-blue;
    text-align: center;

    p {
      color: $color-dark-blue;
    }
  }


  .index {
    position: absolute;
    line-height: 30px;
    top: 0;
    left: 8px;

    @media (min-width: 768px) {
      top: auto;
      left: 16px
    }
  }


  .player-home, .player-away {
    flex: 1;
    display: flex;
    position: relative;
  }

  .player-away {
    flex-direction: row-reverse;
    text-align: left;
  }

  .player-home {
    &:after {
      position: absolute;
      content: ":";
      font-size: 32px;
      color: #fff;
      font-family: Sedgwick;
      top: 0;
      right: -4px;
      line-height: 1;
    }
  }

  .player-home-linup {
    text-align: right;

    @media (min-width: 768px) {
      flex-direction: row-reverse;
    }
  }

  .player-away-linup {
    text-align: left
  }

  .player-home-linup, .player-away-linup {
    flex: 1;

    @media (min-width: 768px) {
      display: flex;
      align-items: center;
    }
  }

  .player-home-goals, .player-away-goals {
    font-size: 30px;
    font-family: Sedgwick;
    margin: 0 16px;
    color: #fff;
    transform: rotate(-7deg);
    line-height: 1;
  }

  .player-away-name, .player-home-name {
    font-family: Montserrat-Black;
  }

  .player-home-name {
    @media (min-width: 768px) {
      margin-left: 16px;
      padding-left: 16px;
      border-left: 1px solid;
    }
  }

  .player-away-name {
    @media (min-width: 768px) {
      margin-right: 16px;
      padding-right: 16px;
      border-right: 1px solid;
    }
  }
}

</style>
