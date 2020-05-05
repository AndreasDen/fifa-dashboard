<template>
    <div class="fifa-dashboard">
        <line-chart v-if="loaded" :chart-data="eloHistoryDataCollection" :options="optionsLineChart"></line-chart>
        <bar-chart v-if="loaded" :chart-data="eloDataCollection" :options="optionsBarChart"></bar-chart>
    </div>
</template>

<script>
import LineChart from './../components/graphs/line-chart'
import BarChart from './../components/graphs/bar-chart'

export default {
  name: 'TeamOverview',
  components: {
    LineChart,
    BarChart
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
          position: 'bottom',
          labels: {
            fontFamiliy: "Comfortaa-Bold",
            fontColor: '#4f4f4f',
            padding: 16,
            fontSize: 14
          },
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
      }
    }
  },
  computed: {
    allPlayersCurrentElo: function () {
      return this.allData ? this.allData.map(players => Math.round(players.stats.elo.current)) : {}
    },
    allPlayersName: function () {
      return this.allData ? this.allData.map(players => players.user.name) : {}
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
      let datasets = [];
      let labels = [...Array(26).keys()]
      this.allPlayersHistory.map((playerHistory, index) => {

        datasets.push(
            {
              label: this.allPlayersName[index],
              backgroundColor: 'transparent',
              fill: false,
              data: playerHistory.slice(playerHistory.length - 26),
              // borderColor: ['rgba(218,64,30,1)', 'rgba(251,187,127,1)'],
              borderColor: ['rgba(105,30,218,1)', 'rgba(216,127,251,1)'],
              pointHoverRadius: 5,
              borderWidth: 2,
              hidden: index !== 0,
              trendlineLinear: {
                style: 'rgba(255,105,180, .8)',
                lineStyle: 'dotted|solid',
                width: 2
              }
            }
        )
      })
      return {labels, datasets}
    }
  }
}
</script>

<style scoped lang="scss">
.fifa-dashboard {
    display: flex;

    > div {
        flex: 1 1 calc(33% - 175px);
        width: 100%;
        background-color: #fcfcfc;
        padding: 16px;
        border-radius: 8px;
        max-width: calc(50% - (175px/2));
        height: 350px;
        position: relative;
        box-shadow: 10px 10px 16px -8px rgba(0,0,0,0.4);

      &:nth-child(even) {
        margin-left: 24px;
      }
    }
}
</style>
