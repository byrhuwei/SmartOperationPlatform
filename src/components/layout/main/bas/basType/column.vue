<!-- 话单量图 -->
<style lang="stylus" scoped>
.columnChart
  height 800px
  background url('../../../../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  color white
  .main
    width 100%
    height calc(100% - 40px)
    margin-top 10px
</style>

<template>
<div class="columnChart">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
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
      name: '实时指标',
			durationList: [321, 234, 234, 124, 276, 267, 287, 278, 144, 322, 133, 164, 166, 141, 321, 234, 234, 124,
				231, 321,323,222,312, 288], //端到端时延数据列表 
			cdrAmountList: [32, 23, 23, 12, 27, 26, 27, 28, 14, 32, 13, 14, 16, 11, 21, 34, 34, 24,
				21, 21,23,22,12, 18], //话单量数据列表 
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
    'v-header': header
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.columnChart .main'));
    this.myChart.setOption({
					title: { //标题组件
						show:false
					},
					tooltip: { //提示框组件
						trigger: 'axis',
						showDelay: 5
					},
					color: this.color,
					toolbox: {
						show: true,
						orient: 'vertical',
						x: 'right',
						y: 'center',
						feature: {
							mark: {
								show: true
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					xAxis: { //直角坐标系 grid 中的 x 轴				
						type: 'category',
						axisTick: {
						  show: false
						},
						nameTextStyle: {
						  color: 'rgba(255, 255, 255, 0.69)'
						},
						axisLabel: {
						  textStyle: {
						    color: 'white'
						  },
							show: true,
							interval: 0,
							formatter: '{value}:00',
							rotate: 40
						},
						axisLine: {
							show:false
						},
						data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
							'10', '11', '12', '13', '14', '15', '16', '17', '18',
							'19', '20', '21', '22', '23'
						]
					},
					yAxis: [{ 
						axisLine: {
						  show: false
						},
						nameLocation: 'end',
						nameGap: 20,
						nameRotate: 0,
						axisTick: {
						  show: false
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
					}, { 
						axisLine: {
						  show: false
						},
						nameLocation: 'end',
						nameGap: 20,
						nameRotate: 0,
						axisTick: {
						  show: false
						},
						axisLabel: {
						  textStyle: {
						    color: 'white',
						    fontSize: 14
						  }
						},
						name: '亿',
						type: 'value',
						nameTextStyle: {
						  color: 'rgba(255, 255, 255, 0.69)'
						}
					}],
					series: [ //系列列表
						{
							name: '端到端处理时长(秒)',
							type: 'line',
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
								}]
							},
							itemStyle: {
								normal: {
									label: {
										show: true
									}
								}
							},
							data: this.durationList,
						}, {
							name: '基准线(秒)',
							type: 'line',
							itemStyle: {
								normal: {
									lineStyle: {
										color: 'orange'
									},
									barBorderColor: 'orange',
								}
							},
							markLine: {
								silent: true,
								data: [{
									yAxis: 360
								}]
							},
						}, {
							name: '话单量（亿条）',
							type: 'bar',
							//barWidth : 30,//柱图宽度
							'yAxisIndex': 1,
							itemStyle: {
								normal: {
									label: {
										//show : true
									}
								}
							},
							data: this.cdrAmountList
						}
					]
    });
    this.init()
  }
}

</script>
