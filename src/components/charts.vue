<template lang="pug">
  div(:id="id")
</template>

<script>
import ApexCharts from 'apexcharts'
// import moment from 'moment'
import { map } from 'lodash/collection'
export default {
  name: 'chart',
  data () {
    return {
      chart: null
    }
  },
  props: {
    id: {
      required: true,
      type: String
    },
    forecast: {
      required: true,
      type: Array
    },
    unitType: {
      required: false,
      type: String,
      default: 'Metric'
    },
    xAxis: {
      required: false,
      type: String,
      default: 'dt_txt'
    },
    yAxis: {
      required: false,
      type: String,
      default: 'main.temp'
    },
    xAxisFormat: {
      required: false,
      type: String,
      default: 'hh:mm a'
    }
  },
  watch: {
    forecast () {
      this.init()
    }
  },
  computed: {
    // getTodayData () {
    //   return filter(this.forecast, (val) => {
    //     return moment(val.dt_txt).format('MMMM DD, YYYY') === moment().format('MMMM DD, YYYY')
    //   })
    // }
  },
  methods: {
    init () {
      if (!this.chart) {
        var options = {
          chart: {
            stacked: true,
            type: 'area'
          },
          series: [{
            name: this.unitType,
            data: map(this.forecast, this.yAxis)
          }],
          yaxis: {
            labels: {
              formatter: (value) => {
                return `${value} ${this._getConversionType(this.unitType).temp}`
              }
            },
          },
          xaxis: {
            labels: {
              formatter: (value) => {
                return this._formatDateTime(value, this.xAxisFormat)
              }
            },
            categories: map(this.forecast, this.xAxis)
          }
        }

        this.chart = new ApexCharts(document.querySelector(`#${this.id}`), options)

        this.chart.render()
      } else {
        this.chart.updateSeries([
          {
            data: map(this.forecast, this.yAxis)
          }
        ])
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="css" scoped>
</style>
