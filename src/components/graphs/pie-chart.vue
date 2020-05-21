<script>

import {Pie, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    chartData: function () {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    setTimeout(function () {
      this.renderChart(this.chartData, this.options)
    }.bind(this), 500)
  }
}
</script>

<style scoped lang="scss">
    canvas {
    }
</style>
