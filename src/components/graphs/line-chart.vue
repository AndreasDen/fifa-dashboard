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
  methods: {
    createGradient (color) {
      // create gradient with more datasets
      let gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      gradient.addColorStop(0, color[0]);
      gradient.addColorStop(1,  color[1]);
      return gradient
    },
    addGradient: function () {
      this.chartData.datasets.map(dataset => {
        dataset.borderColor = this.createGradient(dataset.borderColor);
        dataset.pointBackgroundColor = this.createGradient(dataset.pointBackgroundColor);
        dataset.backgroundColor = this.createGradient(dataset.backgroundColor);
      })
    }
  },
  mounted () {
    // this.addGradient();
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped lang="scss">

</style>
