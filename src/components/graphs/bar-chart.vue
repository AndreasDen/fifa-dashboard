<script>

import {Bar, mixins} from 'vue-chartjs'
import chartjsPluginAnnotation from "chartjs-plugin-annotation";

const {reactiveProp} = mixins

export default {
  extends: Bar,
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
    this.addPlugin(chartjsPluginAnnotation);
    setTimeout(function () {
      this.renderChart(this.chartData, this.options)
    }.bind(this), 500)
  }
}
</script>

<style scoped lang="scss">

</style>
