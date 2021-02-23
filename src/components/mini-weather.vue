<template lang="pug">
v-row.mb-8
  v-col(v-for="weather in list", :key="weather.dt", width="200px")
    v-card.text-center.pa-3.rounded-xl
      h6 {{ weather.dt_txt | formatDateTime('ddd') }}
      v-icon(large).yellow--text.text--darken-2.my-4 {{ _getIcon(weather.weather[0].main) }}
      p.caption.text-muted
        temperature(:current="weather.main", :unit="unit")
</template>

<script>
export default {
  name: 'mini-weather',
  props: {
    list: {
      required: true,
      type: Array
    },
    unit: {
      required: true,
      type: String
    }
  },
  components: {
    temperature: () => import('@/components/temp')
  },
  computed: {
    // currentWeather () {
    //   let ctr = 0
    //   let current = filter(this.list, (val) => {
    //     // console.log(`ctr`, ctr, this.list.length, val)
    //     if (ctr < this.list.length) {
    //       if ((this.list.length-1) > ctr) ctr++
    //       let myDate = moment(val.dt_txt).format('YYYY-MM-DD')
    //       let nextItem = this.list[ctr]
    //       let before = moment(val.dt_txt)
    //       let after = moment(nextItem.dt_txt)
    //       let today = moment(`${myDate} ${moment().format('HH:mm:ss')}`) // 12:19am
    //       if (today.isBetween(before, after)) {
    //         return val
    //       }
    //     }
    //   })
    //   return current
    // }
  }
}
</script>

<style lang="css" scoped>
</style>
