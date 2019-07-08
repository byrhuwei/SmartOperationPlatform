<!--端到端时延月指标图 -->
<style lang="stylus" scoped>
.line
  height 1000px
  background url('../../../../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  .main
    width 100%
    height calc(100% - 50px)
    margin-top -5px
</style>

<template>
<div class="line">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'
import header from './header.vue'
import filter from './filter.vue'

export default {
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '时延日指标',
			durationList: [
				["2019-07-01", 283],
				["2019-07-02", 285],
				["2019-07-03", 390],
				["2019-07-04", 280],
				["2019-07-05", 284],
				["2019-07-06", 272],
				["2019-07-07", 286],
				["2019-07-08", 287],
				["2019-07-09", 286],
				["2019-07-10", 291],
				["2019-07-11", 292],
				["2019-07-12", 283],
				["2019-07-13", 287],
				["2019-07-14", 281],
				["2019-07-15", 281],
				["2019-07-16", 284],
				["2019-07-17", 279],
				["2019-07-18", 288],
				["2019-07-19", 277],
				["2019-07-20", 283],
				["2019-07-21", 281],
				["2019-07-22", 287],
				["2019-07-23", 285],
				["2019-07-24", 280],
				["2019-07-25", 284],
				["2019-07-26", 287],
				["2019-07-27", 284],
				["2019-07-28", 286],
				["2019-07-29", 273],
				["2019-07-30", 282],
				["2019-07-31", 269]
			]
    }
  },
  methods: {
    init() {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true;
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  },
  components: {
    'v-header': header,
    //'v-filter': filter
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.line .main'));
    this.myChart.setOption({
					title: {
						show:false
					},
					tooltip: {
						trigger: 'axis'
					},
					color: this.color,
					xAxis: {
						type: 'category',
						axisLine: {
						  show: false
						},
						axisTick: {
						  show: false
						},
						nameTextStyle: {
						  color: 'rgba(255, 255, 255, 0.69)'
						},
						axisLabel: {
						  textStyle: {
						    color: 'white'
						  }
						},
						data: this.durationList.map(function(item) {
							return item[0];
						})
					},
					yAxis: {
						axisLine: {
						  show: false
						},
						nameLocation: 'end',
						nameGap: 20,
						nameRotate: 0,
						axisTick: {
						  show: false
						},
						splitLine: {
						  lineStyle: {
						    color: ['rgba(230, 230, 230, 0.2)']
						  }
						},
						axisLabel: {
						  textStyle: {
						    color: 'white',
						    fontSize: 14
						  }
						},
						name: '秒',
						type: 'value',
						nameTextStyle: {
						  color: 'rgba(255, 255, 255, 0.69)'
						}
					},
					toolbox: {
						left: 'right',
						orient: 'vertical',
						x: 'right',
						y: 'center',
						feature: {
							'mark': {
								'show': true
							},
							'dataView': {
								'show': true,
								'readOnly': false
							},
							'magicType': {
								'show': true,
								'type': ['line', 'bar']
							},
							'restore': {
								'show': true
							},
							'saveAsImage': {
								'show': true
							}
						}
					},
					dataZoom: [{
						startValue: '2014-06-01'
					}, {
						type: 'inside'
					}],
					visualMap: {
						top: 10,
						right: 10,
						pieces: [{
							gt: 0,
							lte: 100,
							color: '#325B69'
						}, {
							gt: 100,
							lte: 200,
							color: '#698570'
						}, {
							gt: 200,
							lte: 300,
							color: '#9CC2B0'
						}, {
							gt: 300,
							lte: 360,
							color: '#AE5548'
						},{
							gt: 360,
							color: '#C98769'
						}],
						outOfRange: {
							color: '#999'
						}
					},
					series: {
						name: '时延',
						type: 'line',
						data: this.durationList.map(function(item) {
							return item[1];
						}),
						markLine: {
								symbol: ['arrow', 'none'],
								symbolSize: [4, 2],
								itemStyle: {
									normal: {
										lineStyle: {
											color: 'orange'
										},
										barBorderColor: 'orange',
										label: {
											position: 'left',
											formatter: function(
												params) {
												return Math
													.round(params.value);
											},
											textStyle: {
												color: 'orange'
											}
										}
									}
								},
								'data': [{
									'type': 'average',
									'name': '平均值'
								},{
 								yAxis: 360
 							}]
 						}
					}
    });
    this.init()
  }
}

</script>
