<template>
  <div class="fifa-dashboard">
    <section class="section section-elo">
      <div class="overview">
        <div class="copy">
          <h2>ELO STATISTIC</h2>
          <p class="text">This is a overview about the calculated ELO points per player</p>
        </div>
        <user-podium :elo-stats="allPlayersCurrentElo" :user-names="allPlayersName"></user-podium>
      </div>
      <div class="charts">
        <div class="chart">
          <line-chart v-if="loaded" :chart-data="eloHistoryDataCollection" :options="optionsLineChart"></line-chart>
          <h4>This chart is shows .....</h4>
        </div>
        <div class="chart">
          <bar-chart v-if="loaded" :chart-data="eloDataCollection" :options="optionsBarChart"></bar-chart>
          <h4>This chart is shows .....</h4>
        </div>

      </div>
    </section>
    <section class="section section-games">
      <div class="overview">
        <div class="copy">
          <h2>GAME STATISTIC</h2>
          <p class="text">This is a overview about the played games</p>
        </div>
        <user-podium
            :elo-stats="allPlayersGamesVictoryRate"
            :user-names="allPlayersName"
            :decimalPoint="true">
        </user-podium>
      </div>
      <div class="charts">
        <div class="chart">
          <pie-chart v-if="loaded" :chart-data="gamesAmountTotalDataCollection" :options="optionsDoughnutChart"></pie-chart>
          <h4>This chart is shows .....</h4>
        </div>
        <div class="chart">
          <div class="small-charts">
            <horizontal-bar-chart v-if="loaded" :chart-data="gamesAmountVictoryDataCollection" :options="optionsBarChartGames"></horizontal-bar-chart>
            <horizontal-bar-chart v-if="loaded" :chart-data="gamesAmountLostDataCollection" :options="optionsBarChartGames"></horizontal-bar-chart>
            <horizontal-bar-chart v-if="loaded" :chart-data="gamesAmountDrawDataCollection" :options="optionsBarChartGames"></horizontal-bar-chart>
          </div>
          <h4>This chart is shows .....</h4>
        </div>
      </div>
    </section>
    <section class="section section-goals">
      <div class="overview">
        <div class="copy">
          <h2>GOAL STATISTIC</h2>
          <p class="text">This is a overview about the calculated ELO points per player</p>
        </div>
        <user-podium
            :elo-stats="allPlayersGoalsScoredRate"
            :user-names="allPlayersName"
            :decimal-point="true">
        </user-podium>
      </div>
      <div class="charts">
        <div class="chart">
          <doughnut-chart v-if="loaded" :chart-data="goalsAmountScoredDataCollection" :options="optionsBarChartGames"></doughnut-chart>

          <h4>This chart is shows .....</h4>
        </div>
        <div class="chart">
          <doughnut-chart v-if="loaded" :chart-data="goalsAmountConcededDataCollection" :options="optionsBarChartGames"></doughnut-chart>
          <h4>This chart is shows .....</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LineChart from './../components/graphs/line-chart'
import BarChart from './../components/graphs/bar-chart'
import HorizontalBarChart from './../components/graphs/horizontal-bar-chart'
import DoughnutChart from './../components/graphs/doughnut-chart'
import PieChart from './../components/graphs/pie-chart'
import UserPodium from './../components/user-poduim'

export default {
  name: 'TeamOverview',
  components: {
    LineChart,
    BarChart,
    HorizontalBarChart,
    DoughnutChart,
    PieChart,
    UserPodium
  },
  props: {
    allData: Array,
    loaded: Boolean
  },
  data () {
    return {
      optionsBarChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          onClick: (e) => e.stopPropagation()
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: false,
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
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
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = "#4f4f4f";
            ctx.textBaseline = 'bottom';
            ctx.font = '16px Comfortaa-Bold';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        hover: {
          animationDuration: 0,
        },
        // annotation: {
        //   drawTime: "afterDraw",
        //   annotations: [
        //     {
        //       type: "line",
        //       mode: "horizontal",
        //       scaleID: "y-axis-0",
        //       borderColor: "#4ecca3",
        //       value: 1200,
        //       borderDash: [4, 4],
        //       label: {
        //         content: 'TEST',
        //         enabled: true,
        //         position: "top",
        //         xAdjust: 15,
        //         backgroundColor: '#4ecca3',
        //         fontSize: 10,
        //       }
        //     }
        //   ]
        // }
      },
      optionsBarChartGames: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: false,
            }
          }],
          xAxes: [{
            stacked: true,

            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: false,
        animation: {
          easing: 'easeInOutCubic',
          duration: 1000,// general animation time,
          onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = "#4f4f4f";
            ctx.textBaseline = 'bottom';
            // ctx.fontFace = '16px';
            ctx.font = '20px';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        hover: {
          animationDuration: 0,
        }
      },
      optionsLineChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 12,
              beginAtZero: false
            },
          }],
          xAxes: [{
            ticks: {
              fontSize: 12,
              beginAtZero: true
            },
            gridLines: {
              display: false,
            }
          }]
        }
      },
      optionsDoughnutChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
        tooltips: {
          enabled: false
        },
        animation: {
          onProgress: function () {
            let chartInstance = this.chart;
            let ctx = chartInstance.ctx;

            ctx.fillStyle = "#fff";
            ctx.font = "14px Comfortaa-Bold";
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              var midX = meta.controller.chart.width / 2;
              var midY = meta.controller.chart.height / 2;
              var radius = meta.controller.outerRadius;

              meta.data.forEach(function (arc, index) {
                var data = dataset.data[index];
                var labels = arc._model.label.toUpperCase();
                var startAngle = arc._model.startAngle;
                var endAngle = arc._model.endAngle;
                var middleAngle = startAngle + ((endAngle - startAngle) / 2);

                if (!arc.hidden) {
                  ctx.fillText(data + ' | ' + labels, (radius / 1.45) * Math.cos(middleAngle) + midX, (radius / 1.45) * Math.sin(middleAngle) + midY);
                }
              });
            });
          }
        }
      },
      optionsPieChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'left'
        }
      },
      gradientOptions: {
        redToYellow: ['rgba(0, 219, 222, 1)', 'rgba(252, 0, 255, 1)'],
        redToYellowTransparent: ['rgba(0, 219, 222, .2)', 'rgba(252, 0, 255, .2)'],
        purpleToTurquise: ['rgba(255, 0, 128, 1)', 'rgba(255, 140, 0, 1)'],
        greenToYellow: ['rgba(51, 51, 153, 1)', 'rgba(255, 0, 204, 1)'],
        blueToTurquise: ['rgba(30, 218, 171, 1)', 'rgba(127, 251, 159, 1)'],
        blueToTurquiseTransparent: ['rgba(30, 218, 171, .1)', 'rgba(127, 251, 159, .1)'],
      }
    }
  },
  computed: {
    allPlayersCurrentElo: function () {
      return this.allData ? this.allData.map(players => Math.round(players.stats.elo.current)) : []
    },
    allPlayersLowestElo: function () {
      return this.allData ? this.allData.map(players => Math.round(players.stats.elo.min)) : []
    },
    allPlayersHighestElo: function () {
      return this.allData ? this.allData.map(players => Math.round(players.stats.elo.max)) : []
    },
    allPlayersName: function () {
      return this.allData ? this.allData.map(players => players.user.name) : []
    },
    allPlayersGamesAmountTotal: function () {
      return this.allData ? this.allData.map(players => players.stats.games.amount) : []
    },
    allPlayersGamesAmountVictory: function () {
      return this.allData ? this.allData.map(players => players.stats.games.amount_won) : []
    },
    allPlayersGamesAmountLost: function () {
      return this.allData ? this.allData.map(players => players.stats.games.amount_lost) : []
    },
    allPlayersGamesAmountDraw: function () {
      return this.allData ? this.allData.map(players => players.stats.games.amount_draw) : []
    },
    allPlayersGamesVictoryRate: function () {
      return this.allData ? this.allData.map(players => Math.round(players.stats.games.amount_won / (players.stats.games.amount - players.stats.games.amount_won) * 1000)) : []
    },
    allPlayersGoalsScoredRate: function () {
      return this.allData ? this.allData.map(players => Math.round(players.stats.goals.scored_average * 1000)) : []
    },
    allPlayersGoalsConcededRate: function () {
      return this.allData ? this.allData.map(players => players.stats.goals.conceded_average) : []
    },
    allPlayersGoalsConcededAmount: function () {
      return this.allData ? this.allData.map(players => players.stats.goals.conceded_amount) : []
    },
    allPlayersGoalsScoredAmount: function () {
      return this.allData ? this.allData.map(players => players.stats.goals.scored_amount) : []
    },
    allPlayersHistory: function () {
      return this.allData.map(players => players.stats.elo.history)
    },
    eloDataCollection: function () {
      return {
        labels: this.allPlayersName,
        datasets: [
          {
            backgroundColor: ['rgba(0,0,0,.1)', 'rgba(0,0,0,.1)'],
            data: this.allPlayersLowestElo,
            borderWidth: 2,
            label: 'MIN'
          },
          {
            backgroundColor: this.gradientOptions.blueToTurquise,
            data: this.allPlayersCurrentElo,
            borderWidth: 2,
            label: 'CURRENT'
          },
          {
            backgroundColor: ['rgba(0,0,0,.1)', 'rgba(0,0,0,.1)'],
            data: this.allPlayersHighestElo,
            borderWidth: 2,
            label: 'MAX'
          }
        ]
      }
    },
    eloHistoryDataCollection: function () {
      let datasets = this.allPlayersHistory.map((playerHistory, index) => {
        return {
          label: this.allPlayersName[index],
          // fill: false,
          backgroundColor: this.gradientOptions.blueToTurquiseTransparent,
          data: playerHistory.slice(playerHistory.length - 26),
          borderColor: this.gradientOptions.blueToTurquise,
          pointHoverRadius: 5,
          pointRadius: 4,
          pointBackgroundColor: this.gradientOptions.blueToTurquise,
          pointBorderColor: 'rgba(255,255,255)',
          borderWidth: 2,
          pointBorderWidth: 1,
          hidden: index !== 0,
          lineTension: 0,
          trendlineLinear: {
            style: this.gradientOptions.blueToTurquise[0],
            lineStyle: 'dotted|solid',
            width: 2
          }
        }
      });
      let labels = [...Array(26).keys()];

      return {labels, datasets}
    },
    gamesAmountTotalDataCollection: function () {
      return {
        labels: this.allPlayersName,
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquise,
            data: this.allPlayersGamesAmountTotal,
            hoverBorderWidth: 12,
            // borderColor: 'transparent',
            borderWidth: 4,
            borderColor: '#f4f4f4',
            hoverBorderColor: '#f4f4f4'
          }
        ]
      }
    },
    gamesAmountVictoryDataCollection: function () {
      let labels = this.allPlayersName.map((user, index) => {
        return user + ': ' + this.allPlayersGamesAmountVictory[index]
      });

      return {
        labels: labels,
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquise,
            data: this.allPlayersGamesAmountVictory,
            borderWidth: 2,
            barPercentage: 0.4
          }
        ]
      }
    },
    gamesAmountLostDataCollection: function () {
      let labels = this.allPlayersName.map((user, index) => {
        return user + ': ' + this.allPlayersGamesAmountLost[index]
      })

      return {
        labels: labels,
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquise,
            data: this.allPlayersGamesAmountLost,
            borderWidth: 2,
            barPercentage: 0.4
          }
        ]
      }
    },
    gamesAmountDrawDataCollection: function () {
      let labels = this.allPlayersName.map((user, index) => {
        return user + ': ' + this.allPlayersGamesAmountDraw[index]
      })

      return {
        labels: labels,
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquise,
            data: this.allPlayersGamesAmountDraw,
            borderWidth: 2,
            barPercentage: 0.4
          }
        ]
      }
    },
    goalsAmountScoredDataCollection: function () {
      return {
        labels: this.allPlayersName,
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquise,
            data: this.allPlayersGoalsScoredAmount,
            borderWidth: 2,
            barPercentage: 0.4
          }
        ]
      }
    },
    goalsAmountConcededDataCollection: function () {
      return {
        labels: this.allPlayersName,
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquise,
            data: this.allPlayersGoalsConcededAmount,
            borderWidth: 2,
            barPercentage: 0.4
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">

.fifa-dashboard {
  display: flex;
  flex-wrap: wrap;

  section {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;

    .overview {
      display: flex;
      margin-bottom: 16px;

      .copy {
        flex: 1 1 auto;
        text-align: left;
      }
    }

    .charts {
      display: flex;

      .chart {
        display: flex;
        flex-direction: column;
        flex: 1 1 50%;

        &:not(:first-child) {
          margin-left: 16px
        }

        > div {
          background: rgba(72, 72, 123, 0.1);
          border-radius: 8px;
          padding: 16px;
          height: 250px;
        }
      }
    }

    h2 {
      font-family: Montserrat-Black;
      font-size: 30px;
      position: relative;
      display: inline-block;
      margin: 0;

      &:after {
        transition: all .35s ease;
        content: "";
        height: 15px;
        width: 100%;
        position: absolute;
        z-index: -1;
      }
    }

    .small-charts {
      display: flex;

      > div {
        width: 50%;
      }
    }

    &.section-elo {

    }

    &.section-games {
      .charts {
        flex-direction: column;
      }

    }

    &.section-goals {
    }
  }
}
</style>
