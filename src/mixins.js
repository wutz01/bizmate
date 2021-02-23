import moment from 'moment'
export default {
  methods: {
    _getIcon (type) {
      switch (type.toLowerCase()) {
        case 'clouds':
          return 'mdi-weather-cloudy'
        case 'clear':
          return 'mdi-weather-cloudy'
        case 'rain':
          return 'mdi-weather-pouring'
        case 'sunny':
          return 'mdi-weather-sunny'
        case 'snow':
          return 'mdi-weather-snowy'
        default:
          return 'mdi-weather-sunny'
      }
    },

    _getConversionType (type) {
      switch (type.toLowerCase()) {
        case 'metric':
          return { speed: 'm/s', temp: '°C' }
        case 'imperial':
          return { speed: 'Mph', temp: '°F' }
        default:
          return { speed: 'm/s', temp: '°K' }
      }
    },

    _formatDateTime (value, format = 'MMMM DD, YYYY hh:mm a') {
      return moment(value).format(format)
    }
  }
}
