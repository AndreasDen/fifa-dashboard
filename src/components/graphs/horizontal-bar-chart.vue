<script>

import {HorizontalBar, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
  extends: HorizontalBar,
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
