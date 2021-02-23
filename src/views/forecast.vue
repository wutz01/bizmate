<template lang="pug">
div
  v-card.rounded-xl.ma-sm-8.overflow-hidden(v-if="forecast && forecast[selectedCity] && forecast[selectedCity].list")
    v-row
      v-col.col-lg-3.col-md-4.col-sm-12.col-12.pa-8
        div.sidebar
          div.search.d-flex
            //- v-text-field(label='Search location..', v-model="search", prepend-inner-icon='mdi-magnify')
            v-autocomplete(
              v-model="searchInput",
              :search-input.sync="search",
              :items="results",
              :loading="isLoading",
              placeholder="Search City",
              prepend-icon="mdi-magnify",
              item-text="label",
              return-object
            )
          img(:src="weatherIcon", width="100%", style="max-width:500px").pa-5.mx-auto.d-flex
          h1.celsius
            temperature(:current="currentWeather.main", :unit="selectedUnit.value")
          h4 {{ currentWeather.dt_txt | formatDateTime('dddd') }}
           span.font-weight-light.ml-1.text-muted {{ currentWeather.dt_txt | formatDateTime('hh:mm a') }}
          div.border-bottom.my-5
          h5.mb-3
            v-icon.mr-2 {{ _getIcon(currentWeather.weather[0].main) }}
            | {{ currentWeather.weather[0].description }}
          h5.mb-3
            v-icon.mr-2.blue--text.text--darken-2 mdi-weather-cloudy-alert
            | Clouds - {{ currentWeather.clouds.all }}%
          v-card.rounded-xl.mt-8
            v-img.white--text.align-center(src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" gradient='to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)' height='200px')
              v-card-title.text-center.d-block {{ selectedCity }}
      v-col.col-lg-9.col-md-8.col-sm-12.col-12.grey.lighten-5.pa-8
        div.weather-switch.d-flex.align-center
          v-btn-toggle(v-model="temperatureSwitch" rounded)
            v-btn
              v-icon mdi-temperature-kelvin
            v-btn
              v-icon mdi-temperature-celsius
            v-btn
              v-icon mdi-temperature-fahrenheit
        v-tabs(v-model='tab' background-color='transparent', left)
          v-tab Today
          v-tab Week
        v-tabs-items(v-model="tab")
          v-tab-item.pt-8
            h2.mb-5.font-weight-medium Today's Highlight
            v-row.mb-5
              //- v-col.col-md-3.col-sm-4.col-12
                v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                  p.text-muted UV Index
                  div.text-center
                    v-progress-circular.mx-auto(:rotate='180', :size=80, :width='15', :value='50', color='yellow darken-2')
                      | 50
              v-col.col-md-3.col-sm-4.col-12
                v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                  p.text-muted.mb-2 Wind Status
                  h1.mb-2 {{ currentWeather.wind.speed }}
                    span.ml-1.text-muted.subtitle-2(v-if="selectedUnit.value === 'imperial'") Mph
                    span.ml-1.text-muted.subtitle-2(v-else) m/s
                  p.text-muted
                    v-icon.mr-2.blue--text.text--darken-2 mdi-compass-outline
                    | {{ currentWeather.wind.deg }}°
              v-col.col-md-3.col-sm-4.col-12
                v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                  p.text-muted.mb-2 Sunrise & Sunset
                  h4.text-muted.mb-3
                    v-icon(large).mr-2.yellow--text.text--darken-2 mdi-weather-sunset-up
                    | {{ this.forecast[this.selectedCity].city.sunrise | formatUnix('hh:mm a') }}
                    //- p.text-muted.caption.ml-11.line-height-1 - 2m 45s
                  h4.text-muted
                    v-icon(large).mr-2.yellow--text.text--darken-2 mdi-weather-sunset-down
                    | {{ this.forecast[this.selectedCity].city.sunset | formatUnix('hh:mm a') }}
                    //- p.text-muted.caption.ml-11.line-height-1 - 2m 45s
              v-col.col-md-3.col-sm-4.col-12
                v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                  p.text-muted.mb-2 Humidity
                  h1.mb-2 {{ currentWeather.main.humidity }}
                    span.ml-1.text-muted.subtitle-2 %
                  //- p.text-muted
                    | Normal
                    v-icon.ml-2.yellow--text.text--darken-2 mdi-thumb-up-outline
              v-col.col-md-3.col-sm-4.col-12
                v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                  p.text-muted.mb-2 Visibility
                  h1.mb-2 {{ currentWeather.visibility / 1000 }}
                    span.ml-1.text-muted.subtitle-2 km
            chart(:forecast="getTodayData", :unitType="selectedUnit.value", :id="'today'")
          v-tab-item.pt-8
            miniForecast(:list="followingDays", :unit="selectedUnit.value", v-if="forecast && forecast[selectedCity]")
            chart(:forecast="followingDays", :unitType="selectedUnit.value", :x-axis-format="'dddd'", :id="'weekly'")
  v-card.rounded-xl.ma-sm-8.overflow-hidden(v-else)
    v-progress-linear(indeterminate)
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { filter } from 'lodash/collection'
import { debounce } from 'lodash/function'
const WEATHER_API_URL = process.env.VUE_APP_WEATHER_API_URL
const WEATHER_API_KEY = process.env.VUE_APP_WEATHER_API_KEY
const GEO_API_URL = process.env.VUE_APP_GEO_API_URL
const GEO_API_KEY = process.env.VUE_APP_GEO_API_KEY
export default {
  name: 'forecast',
  data () {
    return {
      tab: null,
      units: [{ name: 'Standard (Kelvin)', value: 'standard' }, { name: 'Metric (Celsius)', value: 'metric' }, { name: 'Imperial (Fahrenheit)', value: 'imperial' }],
      selectedUnit: null,
      temperatureSwitch: 1,
      weatherIcon: require(`@/assets/sun.png`),
      countryCode: 'JP',
      cities: ['Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'],
      selectedCity: 'Tokyo',
      forecast: {},
      searchInput: null,
      search: null,
      results: [],
      isLoading: false
    }
  },
  watch: {
    temperatureSwitch (newValue, oldValue) {
      console.log(`newValue - oldValue`, newValue, oldValue)
      if (newValue === undefined) {
        console.log(`no value`)
        this.temperatureSwitch = oldValue
        this.selectedUnit = this.units[oldValue]
      } else {
        this.temperatureSwitch = newValue
        this.selectedUnit = this.units[newValue]
        this.init()
      }
    },
    search (value) {
      console.log(`value`, value)
      if (this.search && this.search.length > 3) {
        // debounce(, 1000, false)
        this.searchLocations()
      }
    },
    searchInput (value) {
      if (value) {
        this.selectedCity = value.county
      } else {
        this.selectedCity = 'Tokyo'
      }
      this.init()
    }
  },
  computed: {
    followingDays () {
      let list = this.forecast[this.selectedCity].list
      let ctr = 0
      let current = filter(list, (val) => {
        if (ctr < list.length) {
          if ((list.length-1) > ctr) ctr++
          let myDate = moment(val.dt_txt).format('YYYY-MM-DD')
          let nextItem = list[ctr]
          let before = moment(val.dt_txt)
          let after = moment(nextItem.dt_txt)
          let today = moment(`${myDate} ${moment().format('HH:mm:ss')}`) // 12:19am
          if (today.isBetween(before, after)) {
            return val
          }
        }
      })
      return current
    },
    getTodayData () {
      return filter(this.forecast[this.selectedCity].list, (val) => {
        return moment(val.dt_txt).format('MMMM DD, YYYY') === moment().format('MMMM DD, YYYY')
      })
    },
    currentWeather () {
      let ctr = 0
      let myWeather = filter(this.getTodayData, (val) => {
        ctr += 1
        if (ctr < this.getTodayData.length) {
          let before = moment(val.dt_txt)
          let next = this.getTodayData[ctr]
          let after = moment(next.dt_txt)
          let today = moment() // 12:19am

          if (today.isBetween(before, after)) {
            return val
          }
        } else {
          return this.getTodayData[this.getTodayData.length - 1]
        }
      })
      return (myWeather && myWeather.length > 0 ? myWeather[0] : null)
    }
  },
  methods: {
    searchLocations: debounce (
      function (search) {
        this.processSearch(search)
      }, 250
    ),
    processSearch (search)  {
      // if (!this.search) return
      console.log(`search`, search)
      this.isLoading = true
      let instance = axios.create()
      let vm = this
      instance.defaults.headers.common = {}
      instance.get(`${GEO_API_URL}/forward?access_key=${GEO_API_KEY}&country=JP&query=${this.search}`).then((res) => {
        console.log(`result`, res, res.data)
        // vm.forecast = res.data
        vm.results = res.data.data
        vm.isLoading = false
      })
    },
    isDateToday (value) {
      const format = 'MMMM DD, YYYY'
      return moment(value.dt_txt).format(format) === moment().format(format)
    },
    init () {
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
    this.selectedUnit = this.units[1]
    this.init()
    // this.searchLocations()
  },
  components: {
    temperature: () => import('@/components/temp'),
    chart: () => import('@/components/charts'),
    miniForecast: () => import('@/components/mini-weather')
  }
}
</script>

<style lang="css" scoped>
.v-card {
  -webkit-box-shadow: 0px 14px 33px -16px rgba(0, 0, 0, 0.22) !important;
  -moz-box-shadow: 0px 14px 33px -16px rgba(0, 0, 0, 0.22) !important;
  box-shadow: 0px 14px 33px -16px rgba(0, 0, 0, 0.22) !important;
  border: 0px !important;
  overflow:auto;
}
.theme--light.v-tabs-items {
  background: transparent;
}
.weather-card .time {
  background:#fff;
  padding:5px 15px;
  color:#000;
  border-radius: 20px 0px 0px 20px;
  font-size:14px;
}
.weather-icon {
  font-size:15rem;
}
.weather-switch {
  position:absolute;
  right:30px;
  background:transparent;
  z-index:9999;
}
.weather-switch .v-input--selection-controls__input {
  margin: 0 !important;
}
.weather-switch .theme--light.v-sheet {
  background:transparent;
}
.celsius {
  font-size:4.5rem;
  font-weight:normal
}
</style>
