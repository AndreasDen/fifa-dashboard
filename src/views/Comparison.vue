<template>
  <div class="comparison">
    <section class="section section-comparison">
      <description>
        <h2 slot="headline">Comparison</h2>
        <p slot="text" class="text">
          Chose your players to see data in direct comparison! <br>
          <br>
          Who stole more elo pints?<br>
          Who won more games?<br>
          Who scored more goals against the other player?<br>
        </p>
      </description>
      <div class="comparison-showOff">
        <div class="dropdowns">
          <div class="dropdown-player-one">
            <dropdown :dropdownIndex="1" :options="optionsPlayerOne" @selected-item-changed="onItemChange"></dropdown>
          </div>
          <div class="dropdown-player-two">
            <dropdown :dropdownIndex="2" :options="optionsPlayerTwo" @selected-item-changed="onItemChange"></dropdown>
          </div>
        </div>
        <transition name="fade">
          <div class="result" v-if="loaded">
            <div class="charts">
              <div class="chart">
                <description>
                  <p slot="text" class="text">Elo Points</p>
                </description>
                <horizontal-bar-chart :chart-data="this.getPlayersEloDataCollection()" :options="optionsBarChartGames"></horizontal-bar-chart>
              </div>
              <div class="chart">
                <description>
                  <p slot="text" class="text">Won Games</p>
                </description>
                <horizontal-bar-chart :chart-data="this.getPlayersGamesDataCollection()" :options="optionsBarChartGames"></horizontal-bar-chart>
              </div>
              <div class="chart">
                <description>
                  <p slot="text" class="text">Scored Goals</p>
                </description>
                <horizontal-bar-chart :chart-data="this.getPlayersGoalsDataCollection()" :options="optionsBarChartGames"></horizontal-bar-chart>
              </div>
            </div>
            <div class="result-last-game">
              <description>
                <p slot="text" class="text">Last Game</p>
              </description>
              <result-panel :playerOrderReverse="playerOrderReverse" :game="dataComparison.last_game.game"></result-panel>
            </div>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import Description from './../components/description-block'
import Dropdown from './../components/dropdown'
import ResultPanel from './../components/result-panel'
import HorizontalBarChart from './../components/graphs/horizontal-bar-chart'


export default {
  name: 'Comparison',
  components: {
    Description,
    Dropdown,
    ResultPanel,
    HorizontalBarChart
  },
  props: {
    dataDashboard: Array,
    dataScore: Object,
    dataComparison: Object,
    dataTeams: Array
  },
  data () {
    return {
      optionsPlayerOne: null,
      optionsPlayerTwo: null,
      selectedPlayerOne: null,
      selectedPlayerTwo: null
    }
  },
  watch: {
    //disable option in second dropdown options when first dropdown selected player change
    selectedPlayerOne: function (selectedPlayerID) {
      this.optionsPlayerTwo.map(player => {
        player.disabled = player.playerID === selectedPlayerID;
        return player
      })
    },
    //disable option in first dropdown options when second dropdown selected player change
    selectedPlayerTwo: function (selectedPlayerID) {
      this.optionsPlayerOne.map(player => {
        player.disabled = player.playerID === selectedPlayerID;
        return player
      })
    }
  },
  computed: {
    loaded: function () {
      return this.selectedPlayerOne !== null && this.selectedPlayerTwo !== null && this.dataComparison !== null
    },
    optionsBarChartGames: function () {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              fontColor: '#fff',
              beginAtZero: false,
              // min: 0
            },
            gridLines: {
              display: false,
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              //had to find a way to size the chart dynamically to the biggest number
              min: -900,
              max: 900,
            }
          }]
        },
        tooltips: {
          enabled: false
        },
        animation: {
          easing: 'easeInOutCubic',
          duration: 1000,// general animation time,
          onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;

            ctx.textAlign = 'center';
            ctx.fillStyle = "#fff";
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                if (data < 0) {
                  ctx.fillText(-data, bar._model.x - 15, bar._model.y + 6);
                } else {
                  ctx.fillText(data, bar._model.x + 15, bar._model.y + 6);
                }
              });
            });
          }
        },
        legend: {
          display: false
        },
        hover: {
          animationDuration: 0,
        },
        layout: {
          padding: {
            top: 16,
            bottom: 16,
            left: 16,
            right: 16
          }
        }
      }
    },
    selectedPlayers: function () {
      return {playerOneID: this.selectedPlayerOne, playerTwoID: this.selectedPlayerTwo}
    },

    //set player order to check if player_home is also player_1. To make sure the result_panel is shown in right order
    playerOrderReverse: function () {
      return this.dataComparison.last_game.game.home_player.id !== this.selectedPlayerOne
    }
  },
  methods: {
    getAllPlayersIDandNames: function () {
      return this.dataDashboard.map(player => {
        return {
          ...player.user,
          disabled: false,
          playerID: player.id
        };
      })
    },
    getPlayersEloDataCollection: function () {
      return {
        datasets: [
          {
            backgroundColor: "rgba(30, 218, 171, .4)",
            borderColor: "rgba(30, 218, 171, 1)",
            borderWidth: 2,
            data: [-this.dataComparison.elo.player_1.toFixed()],
          },
          {
            backgroundColor: "rgba(30, 218, 171, 1)",
            borderColor: "rgba(30, 218, 171, 1)",
            borderWidth: 2,
            data: [this.dataComparison.elo.player_2.toFixed()],
          },
        ]
      }
    },
    getPlayersGamesDataCollection: function () {
      return {
        datasets: [
          {
            backgroundColor: "rgba(30, 218, 171, .4)",
            borderColor: "rgba(30, 218, 171, 1)",
            borderWidth: 2,
            data: [-this.dataComparison.games.player_1.toFixed()],
          },
          {
            backgroundColor: "rgba(30, 218, 171, 1)",
            borderColor: "rgba(30, 218, 171, 1)",
            borderWidth: 2,
            data: [this.dataComparison.games.player_2.toFixed()],
          },
        ]
      }
    },
    getPlayersGoalsDataCollection: function () {
      return {
        datasets: [
          {
            backgroundColor: "rgba(30, 218, 171, .4)",
            borderColor: "rgba(30, 218, 171, 1)",
            borderWidth: 2,
            data: [-this.dataComparison.goals.player_1.toFixed()],
          },
          {
            backgroundColor: "rgba(30, 218, 171, 1)",
            borderColor: "rgba(30, 218, 171, 1)",
            borderWidth: 2,
            data: [this.dataComparison.goals.player_2.toFixed()],
          },
        ]
      }
    },
    onItemChange: function (val) {
      //set selected player ID to data
      val.dropdownIndex === 1 ? this.selectedPlayerOne = val.playerID : this.selectedPlayerTwo = val.playerID

      //emit selected player object ti event
      this.$emit('player-selection-changed', this.selectedPlayers);
    },
  },
  mounted () {
    this.optionsPlayerOne = this.getAllPlayersIDandNames()
    this.optionsPlayerTwo = this.getAllPlayersIDandNames()
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/variables";

section {
  padding: 16px;
}

.comparison {
  height: 100%;

  .dropdowns {
    margin: 16px 0 40px 0;
    display: flex;
    align-items: center;
    justify-items: center;


    > div {
      flex: 1;
      margin: 8px;

      @media (min-width: 768px) {
        margin: 8px 32px;
      }

      &:nth-child(1) {
        .dropdown-custom {
          margin-left: auto;
        }
      }
    }


  }

  .comparison-showOff {
    .result-last-game {
      margin-bottom: 32px;
    }

    .charts {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chart {
      width: 100%;

      > div:not(.description-block) {
        height: 50px;
      }
    }

    .result-panel {
      margin-top: 0;
      border: 0
    }

    .description-block {
      border: 0;
      padding: 0;

      .text {
        margin: 0;
      }
    }
  }
}

.description-block {
  /*<!--border-bottom: 1px dashed $color-blue;-->*/
  border-right: 0;
  border-bottom: 0;
  padding: 0 0 16px 0;
  margin: 0;
}
</style>
