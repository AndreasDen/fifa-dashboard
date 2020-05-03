<template>
  <div>
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
        legend: {
          position: 'bottom',
          labels: {
            // fontColor: 'white',
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white',
              // stepSize: 1,
              fontSize: 12,
              beginAtZero: false
            },
            gridLines: {
              display: false,
              color: ['white']
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
              fontSize: 12,
              beginAtZero: true
            },
            gridLines: {
              color: ['white']
            }
          }]
        },
        animation: {
          // easing: 'easeInOutBack'
          // duration: 4000 // general animation time
        }
        // hover: {
        //   animationDuration: 0 // duration of animations when hovering an item
        // },
        // responsiveAnimationDuration: 0 // animation duration after a resize
      },
      optionsLineChart: {
        legend: {
          position: 'bottom',
          labels: {
            // fontColor: 'white',
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white',
              // stepSize: 1,
              fontSize: 12,
              beginAtZero: false
            },
            gridLines: {
              display: false,
              color: ['white']
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
              fontSize: 12,
              beginAtZero: true
            },
            gridLines: {
              color: ['white']
            }
          }]
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 1200,
            endValue: 1200,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 4,
            label: {
              enabled: true,
              content: 'Trendline',
              yAdjust: -16
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
    allPlayersColor: function () {
      return this.allData ? this.allData.map(players => '#' + players.hex_color) : {}
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
            backgroundColor: this.allPlayersColor,
            data: this.allPlayersCurrentElo,
            borderColor: this.allPlayersColor,
            borderWidth: 2
          }
        ]
      }
    },
    eloHistoryDataCollection: function () {
      let datasets = []
      let labels = [...Array(26).keys()]
      this.allPlayersHistory.map((playerHistory, index) => {
        datasets.push(
          {
            label: this.allPlayersName[index],
            backgroundColor: [this.allPlayersColor[index]],
            // fill: false,
            data: playerHistory.slice(playerHistory.length - 26),
            width: 1000,
            borderColor: this.allPlayersColor[index],
            borderWidth: 2,
            scaleOverride: true,
            scaleSteps: 10,
            scaleStepWidth: 50,
            scaleStartValue: 1000,
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

<style scoped>

</style>
