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
    hexToRgb: function (hex) {
      // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    },
    createGradient (color) {
      // create gradient with more datasets
      let gradient = this.$refs.canvas.getContext('2d')
      let gradientFIll = gradient.createLinearGradient(0, 0, 0, 450)
      gradientFIll.addColorStop(0, 'rgba(' + this.hexToRgb(color).r + ',' + this.hexToRgb(color).g + ',' + this.hexToRgb(color).b + ',' + 0.5 + ')')
      gradientFIll.addColorStop(0.5, 'rgba(' + this.hexToRgb(color).r + ',' + this.hexToRgb(color).g + ',' + this.hexToRgb(color).b + ',' + 0.25 + ')')
      gradientFIll.addColorStop(1, 'rgba(' + this.hexToRgb(color).r + ',' + this.hexToRgb(color).g + ',' + this.hexToRgb(color).b + ',' + 0 + ')')
      return gradientFIll
    },
    addGradient: function () {
      this.chartData.datasets.map(dataset => {
        // dataset.backgroundColor = this.createGradient(dataset.backgroundColor)

        let gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 450, 0)
        gradient.addColorStop(0, 'rgba(30,218,171,1)')
        gradient.addColorStop(1, 'rgba(127,251,159,1)')

        // dataset.backgroundColor = gradient;
        dataset.borderColor = gradient;

      })
    }
  },
  mounted () {
    this.addGradient()
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped lang="scss">
canvas {
}
</style>
