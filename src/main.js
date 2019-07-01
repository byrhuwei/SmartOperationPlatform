// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  echarts from 'echarts'
import  '../static/js/purple-passion.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(axios)

axios.defaults.baseURL = 'http://192.168.127.41:8089'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
