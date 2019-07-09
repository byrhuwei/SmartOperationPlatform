<!-- 省级情况图 -->
<style lang="stylus" scoped>
.point
  background url('../../../../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  .main
    height calc(100% - 70px)
    width 100%
    transition all 0.5s linear
</style>

<template lang="html">
<div class="point">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <div class="main"></div>
</div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import header from './header.vue'
import filter from './filter.vue'

const USER_NAME = 'elastic'
const PSW = 'elasticl@ethical.cn'
const AUTH_TOKEN = "Basic " + btoa(USER_NAME + ":" + PSW)


export default {
  created() {
    this.getMyChart()
  },
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '统一视图'
    }
  },
  methods: {
    init(options) {
      this.myChart = echarts.init(document.querySelector('.point .main'))
      this.myChart.setOption(options)
      this.legendArr = options.series
      this.legendArr.forEach((data) => {
        data.selected = true;
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    },
    getMyChart() {
      axios.get('static/data/point/testData.json').then((res) => {
        let options = {
          title: {
            show: false
          },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              return params.name + ' : ' + params.value +  's';
            }
          },
          legend: {
            show: false
          },
          visualMap: {
            min: 0,
            max: 1050,
            type: 'piecewise',
            pieces: [
              {min: 500, max: 1500},
              {min: 360, max: 500},
              {min: 0, max: 360},
            ],
            color: ['#E0022B', '#E09107', '#CDD8FD']
          },
          series: [{
            name: '时延',
            type: 'map',
            mapType: 'china',
            roam:true,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            showLegendSymbol: false,
            data: res.data
          }]
        }
        this.init(options)
      });
    }
  },
  components: {
    'v-header': header,
    'v-filter': filter
  }
}

</script>
