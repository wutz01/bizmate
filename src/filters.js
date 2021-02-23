import Vue from 'vue'
import moment from 'moment'

Vue.filter('convertToC', (value) => {
  return (value - 273.15).toFixed(2)
})

Vue.filter('formatDateTime', (value, param1 = 'MMMM DD, YYYY hh:mm a') => {
  return moment(value).format(param1)
})

Vue.filter('formatUnix', (value, param1 = 'MMMM DD, YYYY hh:mm a') => {
  return moment.unix(value).format(param1)
})
