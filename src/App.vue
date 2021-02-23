<template lang="pug">
v-app
  v-main.grey.lighten-3
    v-container(fluid)
      v-row(no-gutters)
        v-col.col-12.col-sm-6.col-md-8.col-lg-10(offset="1")
          //- v-app-bar.mb-5(color="white" flat)
            //- v-img.mr-5(src='https://cdn.vuetifyjs.com/images/parallax/material2.jpg' gradient='to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)', height="60", width="250")
            //- v-text-field.w-100(v-model="search", full-width, single-line, hide-details, placeholder="search location")
            //- v-btn(icon)
            //-   v-icon.search(color="primary") mdi-magnify
            //- v-tabs(right color="grey darken-1")
            //-   v-tab(v-for="link in links", :key="link")
            //-     | {{ link }}
          router-view
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      search: null,
      links: [
        'Login'
      ]
    }
  }
}
</script>

<style>
.v-main__wrap {
  background: white;
}
.w-100 {
  width: 100%;
}
.search {
  font-size: 35px !important;
}
</style>
