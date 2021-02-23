<template lang="pug">
v-container
  v-row
    v-col.col-12(v-for="(city, cityName) in forecast", :key="cityName")
      h1 {{ cityName }}
      v-row
        v-col.col-3(v-for="(weather, idx) in city.list", :key="idx")
          v-card(v-if="dateNow")
            v-card-text
              h3 {{ weather.dt_txt | formatDateTime }}
              p.my-0 Humidity: {{ weather.main.humidity }}
              p.my-0 Pressure: {{ weather.main.pressure }}
              p.my-0 Temperature: {{ weather.main.temp | convertToC }}
</template>

<script>
import axios from 'axios'
import { each } from 'lodash/collection'
import moment from 'moment'
const WEATHER_API_URL = process.env.VUE_APP_WEATHER_API_URL
const WEATHER_API_KEY = process.env.VUE_APP_WEATHER_API_KEY
export default {
  name: 'forecast',
  data () {
    return {
      countryCode: 'JP',
      cities: ['Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'],
      selectedCity: null,
      forecast: {}
    }
  },
  computed: {
    dateNow () {
      return moment().format('MMMM DD, YYYY')
    }
  },
  methods: {
    init () {
      let instance = axios.create()
      let vm = this
      instance.defaults.headers.common = {}
      each(this.cities, (city) => {
        instance.get(`${WEATHER_API_URL}?q=${city},${this.countryCode}&appid=${WEATHER_API_KEY}`).then((res) => {
          // console.log(`result`, res, res.data)
          // vm.forecast = res.data
          vm.$set(vm.forecast, city, res.data)
        })
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="css" scoped>
</style>
