<template>
  <div class="dashboard">
    <section class="section section-elo">
      <description>
        <h2 slot="headline">Elo</h2>
        <p slot="text" class="=text">
          This section is an overview about current points each player has.
          It is based on the elo rating system, which is a method for calculating the relative skill levels.
          There is also shown a excerpt from the history plus a trendline of the last 25 played games.</p>
      </description>
      <div class="charts" v-if="loaded">
        <div class="chart">
          <line-chart :chart-data="this.getEloHistoryDataCollection()" :options="optionsLineChart"></line-chart>
          <p class="chart-information">shows elo history of last 25 games and the calculated trendline<sup>*</sup></p>
        </div>
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersCurrentElo()]" :user-names="this.getAllPlayersName()"></leader-badge>
          <bar-chart :chart-data="this.getEloDataCollection()" :options="optionsBarChart"></bar-chart>
          <p class="chart-information">shows total elo points based on all games. minimum owned, currently own and maximum owned.<sup>*</sup></p>
        </div>
      </div>
    </section>
    <section class="section section-games">
      <description>
        <h2 slot="headline">Games</h2>
        <p slot="text" class="text">
          This area visualize all relevant data about completed games. Additional to the total games there is also displayed how often the player won, lost or had a draw. But the most crucial value is the win/(lost+draw) rate which is shown in the radar-chart.</p>
      </description>
      <div class="charts charts-odd" v-if="loaded">
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersGamesAmountTotal()]" :user-names="this.getAllPlayersName()"></leader-badge>
          <pie-chart :chart-data="this.getGamesAmountTotalDataCollection()" :options="optionsDoughnutAndPieChart"></pie-chart>
          <p class="chart-information">shows total played games<sup>*</sup></p>
        </div>
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersGamesVictoryRate()]" :user-names="this.getAllPlayersName()" :decimal-point="true"></leader-badge>
          <radar-chart :chart-data="this.getGamesAmountWinRateDataCollection()" :options="optionsRadarChart"></radar-chart>
          <p class="chart-information">shows rate of won/(lost+draw) games<sup>*</sup></p>
        </div>
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersGamesAmountVictory(), this.getAllPlayersGamesAmountLost(), this.getAllPlayersGamesAmountDraw()]" :user-names="this.getAllPlayersName()"></leader-badge>
          <bar-chart :chart-data="this.getGamesAmountSplittedDataCollection()" :options="optionsBarChart"></bar-chart>
          <p class="chart-information">shows total value of played games divided in won, lost and draw.<sup>*</sup></p>
        </div>
      </div>
    </section>
    <section class="section section-goals">
      <description>
        <h2 slot="headline">Goals</h2>
        <p slot="text" class="text">
          In this field it is all about Goals. The sum of scored and conceded goals in all completed games, but also the average rate of scored and conceded goals per game</p>
      </description>
      <div class="charts" v-if="loaded">
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersGoalsScoredAmount()]" :user-names="this.getAllPlayersName()"></leader-badge>
          <doughnut-chart :chart-data="this.getGoalsAmountScoredDataCollection()" :options="optionsDoughnutAndPieChart"></doughnut-chart>
          <p class="chart-information">shows total value scored goals<sup>*</sup></p>
        </div>
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersGoalsConcededAmount()]" :user-names="this.getAllPlayersName()"></leader-badge>
          <doughnut-chart :chart-data="this.getGoalsAmountConcededDataCollection()" :options="optionsDoughnutAndPieChart"></doughnut-chart>
          <p class="chart-information">shows total value conceded goals<sup>*</sup></p>
        </div>
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersGoalsScoredRate()]" :user-names="this.getAllPlayersName()" :decimal-point="true"></leader-badge>
          <radar-chart :chart-data="this.getGoalsAmountScoredRateDataCollection()" :options="optionsRadarChart"></radar-chart>
          <p class="chart-information">shows rate of average scored goals per game<sup>*</sup></p>
        </div>
        <div class="chart">
          <leader-badge :leaderData="[this.getAllPlayersGoalsConcededRate()]" :user-names="this.getAllPlayersName()" :decimal-point="true"></leader-badge>
          <radar-chart :chart-data="this.getGoalsAmountConcededRateDataCollection()" :options="optionsRadarChart"></radar-chart>
          <p class="chart-information">shows rate of average conceded goals per game<sup>*</sup></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LineChart from './../components/graphs/line-chart'
import BarChart from './../components/graphs/bar-chart'
import DoughnutChart from './../components/graphs/doughnut-chart'
import PieChart from './../components/graphs/pie-chart'
import RadarChart from './../components/graphs/radar-chart'
import Description from './../components/description-block'
import LeaderBadge from './../components/leader-badge'
import pattern from 'patternomaly'


export default {
  name: 'TeamOverview',
  components: {
    LineChart,
    BarChart,
    DoughnutChart,
    PieChart,
    RadarChart,
    Description,
    LeaderBadge
  },
  props: {
    dataDashboard: Array,
    dataScore: Object,
    dataComparison: Object,
    dataTeam: Object,
    loaded: Boolean
  },
  data () {
    return {
      optionsBarChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          onClick: (e) => e.stopPropagation(),
          position: 'bottom',
          labels: {
            fontColor: '#fff'
          },
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: false,
            },
            gridLines: {
              display: false,
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#fff',
              beginAtZero: true
            },
            gridLines: {
              display: false,
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
            ctx.fillStyle = "#fff";
            ctx.textBaseline = 'bottom';
            ctx.font = '12px Montserrat-Medium';

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
        layout: {
          padding: {
            top: 16,
            bottom: 16,
            left: 16,
            right: 16
          }
        }
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
      optionsLineChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: '#fff',
            boxWidth: 20,
            // generateLabels: function (chart) {
            //   const datasets = chart.data.datasets;
            //   const options = chart.options.legend || {};
            //   const usePointStyle = options.labels && options.labels.usePointStyle;
            //
            //   return chart._getSortedDatasetMetas().map((meta) => {
            //     // eslint-disable-next-line no-unused-vars
            //     const style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
            //
            //     return {
            //       text: datasets[meta.index].label,
            //       fillStyle: this.getPatternToSingleUser(meta.index, this.gradientOptions.blueToTurquise[0]),
            //       hidden: meta.hidden !== null,
            //       lineWidth: 0,
            //       datasetIndex: meta.index
            //     };
            //   });
            // }.bind(this)
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#fff',
              stepSize: 20,
              beginAtZero: false
            },
            gridLines: {
              display: false,
            }
          }],
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false,
            }
          }]
        },
        tooltips: {
          // Disable the on-canvas tooltip
          enabled: false,
          mode: 'x',

          custom: function (tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<div class="custom-legend"></div>';
              document.body.querySelector('#app').appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            function getBody (bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var bodyLines = tooltipModel.body.map(getBody);
              var innerHtml = '<div>';

              bodyLines.forEach(function (body) {
                var reg = RegExp('([^\\d]+)(\\d+)')
                var name = reg.exec(body)[1];
                var elo = reg.exec(body)[2];
                innerHtml += '<p><span>' + name + '</span><span>' + elo + '</span></p>';
              });
              innerHtml += '</div>';

              var tableRoot = tooltipEl.querySelector('.custom-legend');
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + 10 + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + 10 + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        },
        layout: {
          padding: {
            top: 16,
            bottom: 16,
            left: 16,
            right: 16
          }
        }
      },
      optionsDoughnutAndPieChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        },
        tooltips: {
          enabled: false
        },
        animation: {
          onProgress: function () {
            let chartInstance = this.chart;
            let ctx = chartInstance.ctx;

            ctx.fillStyle = "#fff";
            ctx.font = "12px Montserrat-Medium";
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              var midX = meta.controller.chart.width / 2;
              var midY = meta.controller.chart.height / 2;
              var radius = meta.controller.outerRadius;
              var legend_height = meta.controller.chart.legend.height / 2

              meta.data.forEach(function (arc, index) {
                var data = dataset.data[index];
                var startAngle = arc._model.startAngle;
                var endAngle = arc._model.endAngle;
                var middleAngle = startAngle + ((endAngle - startAngle) / 2);

                if (!arc.hidden) {
                  ctx.fillText(data, (radius / 0.9) * Math.cos(middleAngle) + midX, (radius / 0.9) * Math.sin(middleAngle) + midY - legend_height);
                }
              });
            });
          }
        },
        layout: {
          padding: {
            top: 16,
            bottom: 16,
            left: 16,
            right: 16
          }
        }
      },
      optionsRadarChart: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scale: {
          ticks: {
            beginAtZero: true,
            fontColor: 'white', // labels such as 10, 20, etc
            showLabelBackdrop: false // hide square behind text
          },
          pointLabels: {
            fontColor: 'white' // labels around the edge like 'Running'
          },
          gridLines: {
            color: 'rgba(255, 255, 255, .25)'
          },
          angleLines: {
            color: 'rgba(255, 255, 255, .25)'// lines radiating from the center
          }
        },
        tooltips: {
          // Disable the on-canvas tooltip
          enabled: false,
          mode: 'point',

          custom: function (tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');

            if (tooltipEl) {
              tooltipEl.remove()
            }

            // Create element
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<div class="custom-legend custom-legend-radar"></div>';
            document.body.querySelector('#app').appendChild(tooltipEl);

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            function getBody (bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var bodyLines = tooltipModel.body.map(getBody);
              var innerHtml = '<div>';

              bodyLines.forEach(function (body) {
                innerHtml += '<p><span>' + body + '</span></p>';
              });
              innerHtml += '</div>';

              var tableRoot = tooltipEl.querySelector('.custom-legend-radar');
              console.log(tableRoot)
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + 10 + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + 10 + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        },
        layout: {
          padding: {
            top: 16,
            bottom: 16,
            left: 16,
            right: 16
          }
        }
      },
      gradientOptions: {
        redToYellow: ['rgba(0, 219, 222, 1)', 'rgba(252, 0, 255, 1)'],
        redToYellowTransparent: ['rgba(0, 219, 222, .2)', 'rgba(252, 0, 255, .2)'],
        purpleToTurquise: ['rgba(255, 0, 128, 1)', 'rgba(255, 140, 0, 1)'],
        greenToYellow: ['rgba(51, 51, 153, 1)', 'rgba(255, 0, 204, 1)'],
        blueToTurquise: ['rgba(30, 218, 171, 1)', 'rgba(127, 251, 159, 1)'],
        blueToTurquiseTransparent: ['rgba(30, 218, 171, .1)', 'rgba(127, 251, 159, .1)'],
      },
      SVGpattern: [
        'plus',
        'ring',
        'dot',
        'zigzag',
        'dash',
        'weave',
        'box',
        'diagonal',
        'cross-dash',
        'cross',
        'disc',
        'line',
        'line-vertical',
        'dot-dash',
        'zigzag-vertical',
        'diagonal-right-left',
        'square',
        'triangle',
        'triangle-inverted',
        'diamond',
        'diamond-box'
      ]
    }
  },
  watch: {
    dataDashboard: function () {
      this.getAllPlayersName()
      this.getAllPlayersCurrentElo()
      this.getAllPlayersLowestElo()
      this.getAllPlayersHighestElo()
      this.getAllPlayersEloHistory()
      this.getAllPlayersGamesAmountTotal()
      this.getAllPlayersGamesAmountVictory()
      this.getAllPlayersGamesAmountLost()
      this.getAllPlayersGamesAmountDraw()
      this.getAllPlayersGamesVictoryRate()
      this.getAllPlayersGoalsScoredRate()
      this.getAllPlayersGoalsConcededRate()
      this.getAllPlayersGoalsConcededAmount()
      this.getAllPlayersGoalsScoredAmount()
    }
  },
  methods: {
    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
    //get data from API splitted in smaller parts
    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\

    //---- generall data ----
    getAllPlayersName: function () {
      return this.dataDashboard.map(players => players.user.name)
    },
    //---- Elo data ----
    getAllPlayersCurrentElo: function () {
      return this.dataDashboard.map(players => Math.round(players.stats.elo.current))
    },
    getAllPlayersLowestElo: function () {
      return this.dataDashboard.map(players => Math.round(players.stats.elo.min))
    },
    getAllPlayersHighestElo: function () {
      return this.dataDashboard.map(players => Math.round(players.stats.elo.max))
    },
    getAllPlayersEloHistory: function () {
      return this.dataDashboard.map(players => players.stats.elo.history)
    },
    //---- Game data ----
    getAllPlayersGamesAmountTotal: function () {
      return this.dataDashboard.map(players => players.stats.games.amount)
    },
    getAllPlayersGamesAmountVictory: function () {
      return this.dataDashboard.map(players => players.stats.games.amount_won)
    },
    getAllPlayersGamesAmountLost: function () {
      return this.dataDashboard.map(players => players.stats.games.amount_lost)
    },
    getAllPlayersGamesAmountDraw: function () {
      return this.dataDashboard.map(players => players.stats.games.amount_draw)
    },
    getAllPlayersGamesVictoryRate: function () {
      return this.dataDashboard.map(players => Math.round(players.stats.games.amount_won / (players.stats.games.amount - players.stats.games.amount_won) * 1000))
    },
    //---- Goal data ----
    getAllPlayersGoalsScoredRate: function () {
      return this.dataDashboard.map(players => Math.round(players.stats.goals.scored_average * 1000))
    },
    getAllPlayersGoalsConcededRate: function () {
      return this.dataDashboard.map(players => Math.round(players.stats.goals.conceded_average * 1000))
    },
    getAllPlayersGoalsConcededAmount: function () {
      return this.dataDashboard.map(players => players.stats.goals.conceded_amount)
    },
    getAllPlayersGoalsScoredAmount: function () {
      return this.dataDashboard.map(players => players.stats.goals.scored_amount)
    },

    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
    //get svg pattern for all users chart segment
    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\

    getPatternToAllUser: function () {
      return this.getAllPlayersName().map((player, index) => pattern.draw(this.SVGpattern[index], this.gradientOptions.blueToTurquise[0], '#0F0E1E'))
    },
    //get svg pattern for one users chart segment, needed because of some chart structure
    getPatternToSingleUser: function (index, color) {
      return pattern.draw(this.SVGpattern[index], color, '#0F0E1E')
    },

    // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
    //all data collections for charts
    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\

    //---- Elo Data Collections ----
    getEloDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquiseTransparent[0],
            data: this.getAllPlayersLowestElo(),
            borderWidth: 2,
            label: 'MIN',
            barPercentage: 0.1
          },
          {
            backgroundColor: this.getPatternToAllUser(),
            data: this.getAllPlayersCurrentElo(),
            borderWidth: 2,
            label: 'CURRENT',
            barPercentage: 0.5
          },
          {
            backgroundColor: this.gradientOptions.blueToTurquiseTransparent[0],
            data: this.getAllPlayersHighestElo(),
            borderWidth: 2,
            label: 'MAX',
            barPercentage: 0.1
          }
        ]
      }
    },
    getEloHistoryDataCollection: function () {
      let datasets = this.getAllPlayersEloHistory().map((playerHistory, index) => {
        return {
          label: this.getAllPlayersName()[index],
          backgroundColor: this.gradientOptions.blueToTurquiseTransparent[0],
          data: playerHistory.slice(playerHistory.length - 26).map(x => Math.round(x)),
          borderColor: this.gradientOptions.blueToTurquise,
          pointHoverRadius: 4,
          pointRadius: 2,
          pointBackgroundColor: this.gradientOptions.blueToTurquise[0],
          pointBorderColor: this.gradientOptions.blueToTurquise[0],
          borderWidth: 2,
          pointBorderWidth: 2,
          // hidden: index !== 0,
          lineTension: 0,
          trendlineLinear: {
            style: '#fff',
            lineStyle: 'line',
            width: 2
          },
        }
      });
      let labels = [...Array(26).keys()];

      return {labels, datasets}
    },

    //---- Games Data Collections ----
    getGamesAmountTotalDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            backgroundColor: this.getPatternToAllUser(),
            data: this.getAllPlayersGamesAmountTotal(),
            hoverBorderWidth: 8,
            borderWidth: 4,
            borderColor: '#141428', //TODO:make it global
            hoverBorderColor: '#141428'//TODO:make it global
          }
        ]
      }
    },
    getGamesAmountSplittedDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            label: 'Victory',
            backgroundColor: this.getPatternToAllUser(),
            data: this.getAllPlayersGamesAmountVictory(),
            borderWidth: 2,
            barPercentage: 0.4,
          },
          {
            label: 'Lost',
            backgroundColor: this.getPatternToAllUser(),
            data: this.getAllPlayersGamesAmountLost(),
            borderWidth: 2,
            barPercentage: 0.4,
          },
          {
            label: 'Draw',
            backgroundColor: this.getPatternToAllUser(),
            data: this.getAllPlayersGamesAmountDraw(),
            borderWidth: 2,
            barPercentage: 0.4,
          }
        ]
      }
    },
    getGamesAmountWinRateDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquiseTransparent[0],
            data: this.getAllPlayersGamesVictoryRate().map(rate => rate / 1000),
            borderColor: this.gradientOptions.blueToTurquise[0],
            pointBackgroundColor: this.gradientOptions.blueToTurquise[0]
          }
        ]
      }
    },

    //---- Goals Data Collections ----
    getGoalsAmountScoredDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            backgroundColor: this.getPatternToAllUser(),
            data: this.getAllPlayersGoalsScoredAmount(),
            hoverBorderWidth: 8,
            borderWidth: 4,
            borderColor: '#141428', //TODO:make it global
            hoverBorderColor: '#141428'//TODO:make it global
          }
        ]
      }
    },
    getGoalsAmountConcededDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            backgroundColor: this.getPatternToAllUser(),
            data: this.getAllPlayersGoalsConcededAmount(),
            hoverBorderWidth: 8,
            borderWidth: 4,
            borderColor: '#141428', //TODO:make it global
            hoverBorderColor: '#141428'//TODO:make it global
          }
        ]
      }
    },
    getGoalsAmountScoredRateDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquiseTransparent[0],
            borderColor: this.gradientOptions.blueToTurquise[0],
            pointBackgroundColor: this.gradientOptions.blueToTurquise[0],
            data: this.getAllPlayersGoalsScoredRate().map(rate => rate / 1000),
          }
        ]
      }
    },
    getGoalsAmountConcededRateDataCollection: function () {
      return {
        labels: this.getAllPlayersName(),
        datasets: [
          {
            backgroundColor: this.gradientOptions.blueToTurquiseTransparent[0],
            borderColor: this.gradientOptions.blueToTurquise[0],
            pointBackgroundColor: this.gradientOptions.blueToTurquise[0],
            data: this.getAllPlayersGoalsConcededRate().map(rate => rate / 1000),
          }
        ]
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/variables";

$padding-chart: 16px;

.dashboard {
  display: flex;
  flex-direction: column;

  section {
    padding: 16px;

    ~ section {
      margin-top: 32px;
    }

    @media (min-width: 992px) {
      display: flex;
    }


    .overview {
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 1px dashed $color-blue;
      text-align: center;

      @media (min-width: 992px) {
        flex: 1 1 25%;
        margin-right: 16px;
        padding-right: 16px;
        border-right: 1px dashed $color-blue;
        border-bottom: 0;
        display: flex;
        align-items: center;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      @media (min-width: 1300px) {
        flex: 1 1 15%;
      }

      h2 {
        text-align: center;
        font-size: 28px;
        font-family: Sedgwick;
        color: $color-blue;
        margin: 0 0 16px 0;
        transform: rotate(-7deg);
      }

      .text {
        margin: 0;
      }
    }

    .charts {
      @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
      }

      @media (min-width: 992px) {
        flex: 1 1 75%;
      }

      @media (min-width: 1300px) {
        flex: 1 1 85%;
      }

      .chart {
        position: relative;

        ~ .chart {
          margin-top: 16px;

          @media (min-width: 768px) {
            margin-top: 0;
          }
        }

        @media (min-width: 768px) {
          flex: 1 1 50%;
          max-width: calc(50% - #{$padding-chart});


          &:nth-child(even) {
            margin-left: $padding-chart;
          }

          &:nth-child(n+3) {
            margin-top: $padding-chart;
          }
        }

        > div:not(.leader-badge) {
          background: $color-medium-blue;
          border-radius: 4px;
          height: 250px;

          @media (min-width: 768px) {
            padding: 16px;
          }
        }

        .chart-information {
          text-align: right;
          font-size: 10px;

          @media (min-width: 768px) {
            position: absolute;
            right: 16px;
            bottom: 0;
          }

        }
      }

      &.charts-odd {
        .chart {
          &:last-child {
            max-width: calc(100% - #{$padding-chart});
          }
        }
      }
    }

    &.section-elo {
      //specific styling for section elo goes here
    }

    &.section-games {
      //specific styling for section elo goes here
    }

    &.section-goals {
      //specific styling for section elo goes here
    }
  }
}
</style>
