import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'
import '@/filters'
import vuetify from '@/plugins/vuetify'
import GlobalMixins from '@/mixins'
Vue.config.productionTip = false

let http = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  timeout: 1000 * 60 * 3
})

http.interceptors.request.use(config => {
  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  return config
})
Vue.mixin(GlobalMixins)
Vue.http = http
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
