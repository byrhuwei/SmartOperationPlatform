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
import Vuex from 'vuex'
import {DatePicker} from 'element-ui'

Vue.component(DatePicker.name, DatePicker)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(axios)
Vue.use(Vuex)

//axios.defaults.baseURL = 'http://192.168.127.41:8089'
axios.defaults.baseURL = 'http://localhost:8080'

const store = new Vuex.Store({
  state: {
    count: 0,
    color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: {
    App
  },
	data: {
	  eventHub: new Vue(),
	  charts: []
	},
  template: '<App/>'
})
