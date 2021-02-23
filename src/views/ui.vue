<template lang="pug">
v-card.rounded-xl.ma-sm-8.overflow-hidden
  v-row
    v-col.col-lg-3.col-md-4.col-sm-12.col-12.pa-8
      div.sidebar
        div.search.d-flex
          v-text-field(label='Search location..' prepend-inner-icon='mdi-magnify')
        img(:src="weatherIcon", width="100%", style="max-width:500px").pa-5.mx-auto.d-flex
        h1.celsius 12°C
        h4 Monday,
         span.font-weight-light.ml-1.text-muted 16:00
        div.border-bottom.my-5
        h5.mb-3
          v-icon.mr-2 mdi-weather-cloudy
          | Mostly Cloudy
        h5.mb-3
          v-icon.mr-2.blue--text.text--darken-2 mdi-weather-pouring
          | Rain - 30%
        v-card.rounded-xl.mt-8
          v-img.white--text.align-center(src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" gradient='to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)' height='200px')
            v-card-title.text-center.d-block New York, NY, USA
    v-col.col-lg-9.col-md-8.col-sm-12.col-12.grey.lighten-5.pa-8
      div.weather-switch.d-flex.align-center
        v-btn-toggle(v-model='switch1' rounded)
          v-btn
            v-icon mdi-temperature-celsius
          v-btn
            v-icon mdi-temperature-fahrenheit
      v-tabs(v-model='tab' background-color='transparent'  left)
        v-tab Today
        v-tab Week
      v-tabs-items(v-model='tab')
        v-tab-item.pt-8
          v-row.mb-8
            v-col(v-for="n in 7", :key="n", width="200px")
              v-card.text-center.pa-3.rounded-xl
                h6 Day
                v-icon(large).yellow--text.text--darken-2.my-4 mdi-weather-sunny
                p.caption.text-muted temp
          h2.mb-5.font-weight-medium Today's Highlight
          v-row.mb-5
            v-col.col-md-3.col-sm-4.col-12
              v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                P.text-muted UV Index
                div.text-center
                  v-progress-circular.mx-auto(:rotate='180', :size=80, :width='15', :value='50', color='yellow darken-2')
                    | 50
            v-col.col-md-3.col-sm-4.col-12
              v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                P.text-muted.mb-2 Wind Status
                h1.mb-2 7.70
                  span.ml-1.text-muted.subtitle-2 km/h
                P.text-muted
                  v-icon.mr-2.blue--text.text--darken-2 mdi-compass-outline
                  | SWS
            v-col.col-md-3.col-sm-4.col-12
              v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                P.text-muted.mb-2 Sunrise & Sunset
                h4.text-muted.mb-3
                  v-icon(large).mr-2.yellow--text.text--darken-2 mdi-weather-sunset-up
                  | 6:30 AM
                  p.text-muted.caption.ml-11.line-height-1 - 2m 45s
                h4.text-muted
                  v-icon(large).mr-2.yellow--text.text--darken-2 mdi-weather-sunset-down
                  | 6:30 PM
                  p.text-muted.caption.ml-11.line-height-1 - 2m 45s
            v-col.col-md-3.col-sm-4.col-12
              v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                P.text-muted.mb-2 Humidity
                h1.mb-2 12
                  span.ml-1.text-muted.subtitle-2 %
                P.text-muted
                  | Normal
                  v-icon.ml-2.yellow--text.text--darken-2 mdi-thumb-up-outline
            v-col.col-md-3.col-sm-4.col-12
              v-card.mx-auto.rounded-xl.pa-6.justify-center(max-width='400', max-height='200', min-height='200')
                P.text-muted.mb-2 Visibility
                h1.mb-2 5.2
                  span.ml-1.text-muted.subtitle-2 km
                P.text-muted
                  | Average
                  v-icon.ml-2.yellow--text.text--darken-2 mdi-hand-okay
            v-col.col-md-3.col-sm-4.col-12()
              v-card.mx-auto.weather-card.rounded-xl.justify-center(max-width='400', max-height='200', min-height='200')
                v-img.white--text.align-end(height='200px' src='https://cdn.vuetifyjs.com/images/cards/docks.jpg')
                  v-card-title.pa-0
                    div.time.ml-auto 20:00
                      v-icon.ml-2.yellow--text mdi-weather-sunny
                      //- v-icon.ml-2.yellow--grey  mdi-moon-waning-crescent
        v-tab-item()
          img.w-100(src="http://mrwgifs.com/wp-content/uploads/2013/12/Dog-Humps-His-Bed-Into-a-Seizure-Before-Waking-Up-Sad-It-Was-But-a-Dream.gif")
</template>

<script>
export default {
  name: 'ui',
  data () {
    return {
      tab: null,
      switch1: undefined,
      weatherIcon:  require(`@/assets/sun.png`)
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  },
  components: {
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
