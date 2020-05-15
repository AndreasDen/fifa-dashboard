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
  watch: {
    chartData: function () {
      // this.addGradient()
      this.renderChart(this.chartData, this.options)
    }
  },
  methods: {
    createGradient (color) {
      // create gradient with more datasets
      let gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 450, 0)
      gradient.addColorStop(0, color[0]);
      gradient.addColorStop(1,  color[1]);
      return gradient
    },
    addGradient: function () {
      this.chartData.datasets.map(dataset => {
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
canvas {
}
</style>
