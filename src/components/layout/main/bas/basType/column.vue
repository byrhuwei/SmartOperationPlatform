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
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'
import header from './header.vue'
import filter from './filter.vue'
import axios from 'axios'

export default {
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '实时指标',
	  durationList: [321, 274, 284, 274, 276, 287, 287, 278, 284, 322, 283, 284, 286, 281, 321, 284, 284, 284,
				271, 321,323,282,312, 288], //端到端时延数据列表 
	  cdrAmountList: [12, 13, 13, 12, 17, 16, 17, 18, 14, 12, 13, 14, 16, 11,11, 14,14, 14,
				11, 11,13,12,12, 18], //话单量数据列表 
    }
  },
  watch: {
	durationList(){
		this.drawEchart();
	},
	cdrAmountList(){
		this.drawEchart();
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
	},
    getDurationData() {
		var that = this;
        axios.get('gprs/duration/average/hour/2019-03-18').then((res) => {
        that.durationList = res.data.data
      })
	},
	getBusiAmountData() {
		var that = this;
        axios.get('gprs/busi/amount/2019-03-18').then((res) => {
		var data = res.data.data;
		var array = [];
		data.forEach(function(v) {
			array.push(v / 100000000)
		});  
        that.cdrAmountList = array
      })
	},
    drawEchart(){
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
						min: 0,
						max: 600,
						interval: 150,
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
						min: 0,
						max: 20,
						interval: 5,
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
	}
  },
  components: {
    'v-header': header
  },
  mounted() {
    this.drawEchart();
	this.init();
	this.getDurationData();
	this.getBusiAmountData();
  }
}

</script>
