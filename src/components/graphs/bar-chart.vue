<script>

import {Bar, mixins} from 'vue-chartjs'

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
      this.addGradient()
      this.renderChart(this.chartData, this.options)
    }
  },
  methods: {
    hexToRgb: function (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    },
    createGradient (colors) {
      let gradientArr = []
      colors.map(color => {
        let gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        gradient.addColorStop(0, 'rgba(' + this.hexToRgb(color).r + ',' + this.hexToRgb(color).g + ',' + this.hexToRgb(color).b + ',' + 1 + ')')
        gradient.addColorStop(0.5, 'rgba(' + this.hexToRgb(color).r + ',' + this.hexToRgb(color).g + ',' + this.hexToRgb(color).b + ',' + 0.5 + ')')
        gradient.addColorStop(1, 'rgba(' + this.hexToRgb(color).r + ',' + this.hexToRgb(color).g + ',' + this.hexToRgb(color).b + ',' + 0 + ')')
        gradientArr.push(gradient)
      })
      return gradientArr
    },
    addGradient: function () {
      this.chartData.datasets.map(dataset => {
        // dataset.backgroundColor = this.createGradient(dataset.backgroundColor)
        let gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        gradient.addColorStop(0, 'rgba(30,218,171,1)')
        gradient.addColorStop(1, 'rgba(127,251,159,1)')

        dataset.backgroundColor = gradient;
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
