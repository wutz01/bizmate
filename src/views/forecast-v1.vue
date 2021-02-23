<template lang="pug">
div
  h2.mb-5.font-weight-medium Weather Forecast
  v-row.mb-5
    v-col.col-md-3.col-sm-4.col-12(v-for="(city, cityName) in forecast", :key="cityName")
      v-card.mx-auto.my-3(max-width="400")
        v-img.white--text.align-end(height='200px' src='https://cdn.vuetifyjs.com/images/cards/docks.jpg')
        v-list-item(two-line)
          v-list-item-content
            v-list-item-title.headline
              | {{ currentWeather.dt_txt | formatDateTime('MMMM DD, YYYY hh:mm a') }}
            v-list-item-subtitle {{ currentWeather.weather[0].main.toUpperCase() }} | {{ currentWeather.weather[0].description.toUpperCase() }}
        v-card-text
          v-row(align='center')
            v-col.display-1(cols='6')
              temperature(:current="currentWeather.main", :unit="selectedUnit.value")
            v-col(cols='6')
              v-icon.display-4 {{ _getIcon(currentWeather.weather[0].main) }}
              //- v-img(src='https://cdn.vuetifyjs.com/images/cards/sun.png' alt='Sunny image' width='92')
        v-list-item
          v-list-item-icon
            v-icon mdi-weather-windy
          v-list-item-subtitle {{ currentWeather.wind.speed }} m/s
        v-list-item
          v-list-item-icon
            v-icon mdi-weather-cloudy
          v-list-item-subtitle {{ currentWeather.clouds.all }}%
        //- v-slider.mx-4(v-model="time" :max='6' :tick-labels='labels' ticks)
        //- v-list.transparent
          v-list-item(v-for='item in forecast' :key='item.day')
            v-list-item-title {{ item.day }}
            v-list-item-icon
              v-icon {{ item.icon }}
            v-list-item-subtitle.text-right
              | {{ item.temp }}
        v-divider
        v-card-actions
          v-btn(text)
            | Full Report
      //- h4.text-center.mt-3.font-weight-regular {{ cityName }}

  h2.mb-5.font-weight-medium {{ selectedCity }}
  miniForecast(:list="forecast[selectedCity].list", :date="'test'", :unit="selectedUnit.value", v-if="forecast && forecast[selectedCity]")
//- v-container
  v-row
    v-col.col-12(v-for="", :key="cityName")
      h1 {{ cityName }}
      v-card.elevation-1.mb-5(v-if="currentWeather")
        v-card-text
          h3 {{ currentWeather.dt_txt | formatDateTime }}
          p.my-0 Humidity: {{ currentWeather.main.humidity }}
          p.my-0 Pressure: {{ currentWeather.main.pressure }}
          temperature(:current="currentWeather.main", :unit="selectedUnit.value", v-if="selectedUnit && selectedUnit.value")
      //- v-row
        v-col.col-3(v-for="(weather, idx) in city.list", :key="idx", v-if="weather && !isDateToday(weather)")
          v-card
            v-card-text
              h3 {{ weather.dt_txt | formatDateTime }}
              p.my-0 Humidity: {{ weather.main.humidity }}
              p.my-0 Pressure: {{ weather.main.pressure }}
              temperature(:current="weather.main", :unit="selectedUnit.value", v-if="selectedUnit && selectedUnit.value")
      v-row
        v-col.col-lg-12
          weatherForecast(:list="city.list", :date="'test'", :unit="selectedUnit.value")
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { filter } from 'lodash/collection'
const WEATHER_API_URL = process.env.VUE_APP_WEATHER_API_URL
const WEATHER_API_KEY = process.env.VUE_APP_WEATHER_API_KEY
export default {
  name: 'forecast',
  data () {
    return {
      countryCode: 'JP',
      cities: ['Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'],
      units: [{ name: 'Standard (Kelvin)', value: 'standard' }, { name: 'Metric (Celsius)', value: 'metric' }, { name: 'Imperial (Fahrenheit)', value: 'imperial' }],
      selectedUnit: null,
      selectedCity: 'Tokyo',
      forecast: {}
    }
  },
  computed: {
    currentWeather () {
      let current = filter(this.forecast[this.selectedCity].list, (val) => {
        return moment(val.dt_txt).format('MMMM DD, YYYY') === moment().format('MMMM DD, YYYY')
      })
      let ctr = 0
      let myWeather = filter(current, (val) => {
        ctr += 1
        if (ctr < current.length) {
          let before = moment(val.dt_txt)
          let next = current[ctr]
          let after = moment(next.dt_txt)
          let today = moment() // 12:19am

          if (today.isBetween(before, after)) {
            return val
          }
        } else {
          return current[current.length - 1]
        }
      })
      return (myWeather && myWeather.length > 0 ? myWeather[0] : null)
    }
  },
  methods: {
    isDateToday (value) {
      const format = 'MMMM DD, YYYY'
      return moment(value.dt_txt).format(format) === moment().format(format)
    },
    init () {
      this.selectedUnit = this.units[1]
      let instance = axios.create()
      let vm = this
      instance.defaults.headers.common = {}
      instance.get(`${WEATHER_API_URL}?q=${vm.selectedCity},${this.countryCode}&units=${vm.selectedUnit.value}&appid=${WEATHER_API_KEY}`).then((res) => {
        console.log(`result`, res, res.data)
        // vm.forecast = res.data
        vm.$set(vm.forecast, vm.selectedCity, res.data)
      })
    }
  },
  mounted () {
    this.init()
  },
  components: {
    temperature: () => import('@/components/temp'),
    weatherForecast: () => import('@/components/current-weather'),
    miniForecast: () => import('@/components/mini-weather'),
  }
}
</script>

<style lang="css" scoped>
</style>
