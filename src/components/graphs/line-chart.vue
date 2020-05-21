<script>

import {Line, mixins} from 'vue-chartjs'
import trendline from 'chartjs-plugin-trendline'

const {reactiveProp} = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  components: {
    trendline
  },
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
    setTimeout( function () {
      this.renderChart(this.chartData, this.options)
    }.bind(this),500)

  }
}
</script>

<style scoped lang="scss">

</style>
