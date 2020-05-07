<template>
  <div class="fifa-dashboard">
    <section class="section section-elo">
      <article class="article">
        <h2>ELO STATISTIC</h2>
        <p class="text">This is a overview about the calculated ELO points per player</p>
      </article>
      <div class="stats">
        <line-chart v-if="loaded" :chart-data="eloHistoryDataCollection" :options="optionsLineChart"></line-chart>
        <user-podium :elo-stats="allPlayersCurrentElo" :user-names="allPlayersName" ></user-podium>
        <bar-chart v-if="loaded" :chart-data="eloDataCollection" :options="optionsBarChart"></bar-chart>
      </div>
    </section>
    <section class="section section-games">
      <article class="article">
        <h2>GAME STATISTIC</h2>
        <p class="text">This is a overview about the played games</p>
      </article>
      <div class="stats">
        <div class="graph-game-amount-total">
          <pie-chart v-if="loaded" :chart-data="gamesAmountTotalDataCollection" :options="optionsDoughnutChart"></pie-chart>
        </div>
        <div class="graph-game-amount-splitted small-chart">
          <horizontal-bar-chart v-if="loaded" :chart-data="gamesAmountVictoryDataCollection" :options="optionsBarChartGames"></horizontal-bar-chart>
          <horizontal-bar-chart v-if="loaded" :chart-data="gamesAmountLostDataCollection" :options="optionsBarChartGames"></horizontal-bar-chart>
          <horizontal-bar-chart v-if="loaded" :chart-data="gamesAmountDrawDataCollection" :options="optionsBarChartGames"></horizontal-bar-chart>
        </div>
      </div>
    </section>
    <section class="section section-goals"></section>
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
    /* eslint-disable-next-line */
    DoughnutChart,
    /* eslint-disable-next-line */
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
        legend: false,
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
        tooltips: {
          // enabled: false
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
          // labels: {
          //   fontFamiliy: "Comfortaa-Bold",
          //   fontColor: '#4f4f4f',
          //   padding: 16,
          //   fontSize: 14
          // },
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
    }
  },
  computed: {
    allPlayersCurrentElo: function () {
      return this.allData ? this.allData.map(players => Math.round(players.stats.elo.current)) : []
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
    allPlayersHistory: function () {
      return this.allData.map(players => players.stats.elo.history)
    },
    eloDataCollection: function () {
      return {
        labels: this.allPlayersName,
        datasets: [
          {
            backgroundColor: ['rgba(30,47,218,1)', 'rgba(127,236,251,1)'],
            data: this.allPlayersCurrentElo,
            borderWidth: 2
          }
        ]
      }
    },
    eloHistoryDataCollection: function () {
      let datasets = this.allPlayersHistory.map((playerHistory, index) => {
        return {
          label: this.allPlayersName[index],
          // fill: false,
          backgroundColor: ['rgba(248, 54, 0, 0.2)', 'rgba(249, 212, 35, 0.2)'],
          data: playerHistory.slice(playerHistory.length - 26),
          borderColor: ['rgba(248, 54, 0, 1)', 'rgba(249, 212, 35, 1)'],
          pointHoverRadius: 5,
          pointRadius: 4,
          pointBackgroundColor: ['rgba(248, 54, 0, 1)', 'rgba(249, 212, 35, 1)'],
          pointBorderColor: 'rgba(255,255,255)',
          borderWidth: 2,
          pointBorderWidth: 1,
          hidden: index !== 0,
          lineTension: 0,
          trendlineLinear: {
            style: 'rgba(248, 54, 0, 1)',
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
            backgroundColor: ['rgba(89,30,218,1)', 'rgba(127,251,197,1)'],
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
            backgroundColor: ['rgba(89,30,218,1)', 'rgba(127,251,197,1)'],
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
            backgroundColor: ['rgba(89,30,218,1)', 'rgba(127,251,197,1)'],
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
            backgroundColor: ['rgba(89,30,218,1)', 'rgba(127,251,197,1)'],
            data: this.allPlayersGamesAmountDraw,
            borderWidth: 2,
            barPercentage: 0.4
          }
        ]
      }
    },
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


    h2 {
      font-size: 30px;
      position: relative;
      display: inline-block;

      &:after {
        transition: all .35s ease;
        content: "";
        height: 15px;
        width: 100%;
        position: absolute;
        z-index: -1;
      }
    }

    &.section-elo {
      h2 {
        &:after {
          background-image: linear-gradient(to right, rgba(248, 54, 0, 1) 0%, rgba(249, 212, 35, 1) 100%);
          /*background: linear-gradient(90deg, rgba(218,64,30,1) 0%, rgba(251,187,127,1) 100%);*/
          bottom: 0px;
          left: 35px;
        }
      }

      > div {
        flex: 1 1 calc(50% - 175px);
        width: 100%;
        padding: 16px;
        max-width: calc(50% - (175px / 2));
        /*height: 350px;*/
        position: relative;

        &:nth-child(even) {
          margin-left: 24px;
        }

        &:nth-child(2n +3) {
          margin-top: 24px;
        }
      }
    }


    &.section-games {
      .graph-game-amount-total {
        /*max-width: 50%;*/
        align-self: center;
      }

      h2 {
        &:after {
          background: linear-gradient(90deg, rgba(89, 30, 218, 1) 0%, rgba(127, 251, 197, 1) 100%);
          bottom: 0px;
          left: 35px;
        }
      }

      .graph-game-amount-splitted {
        display: flex;

        > div {
          height: 150px;
          width: 50%;
        }
      }
    }
  }


}
</style>
