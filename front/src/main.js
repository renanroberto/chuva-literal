import Vue from 'vue'
import App from './App'
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry'

Vue.use(VueMasonryPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
