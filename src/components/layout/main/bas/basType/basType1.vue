<template>
	<div id="main" style="width: 100%; height: 100%;" class='dashboard'>内容计费一</div>
</template>

<script>
	var echarts = require('echarts');
	var axios = require('axios');
	export default {
		name: "basType1",
		data() {
			return {
				durationList: [321, 234, 234, 124, 276, 267, 287, 278, 144, 322, 133, 164, 166, 141, 321, 234, 234, 124,
					0, 0, 0, 0, 0, 0
				], //端到端时延数据列表 
				cdrAmountList: [], //话单量数据列表 
			}
		},
		created() {
			var that = this;
			// 先获取接口的价格数据
			that.getDurationList();
			window.setInterval(() => { //每小时请求一次接口
				setTimeout(that.getDurationList, 0)
			}, 360000)
		},
		//挂载前初始化echarts实例
		mounted() {
			// 绘制图表
			this.drawDataTable1();
		},
		methods: {
			drawDataTable1() {
				let myChart = echarts.init(document.getElementById('main'), 'purple-passion');
				myChart.setOption({
					title: { //标题组件
						text: '端到端时延和话单量',
						'subtext': '数据来自NRJF系统',
						x: 'left',
						y: 'top',
						textAlign: 'left',
						textStyle: {
							color: '#00B2EE',
							fontSize: 16
						}
					},
					tooltip: { //提示框组件
						trigger: 'axis',
						showDelay: 5
					},
					legend: { //图例组件
						left: 'right',
						data: ['端到端处理时长(秒)', '基准线(秒)', '话单量（亿条）'],
						textStyle: {
							color: '#00B2EE',
							fontSize: 10
						}
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						x: 'right',
						y: 'center',
						feature: {
							mark: {
								show: true
							},
							//dataZoom : {show: true},
							//dataView : {show: true, readOnly: false},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					xAxis: { //直角坐标系 grid 中的 x 轴				
						type: "category",
						axisLabel: {
							show: true,
							interval: 0,
							formatter: '{value}:00',
							rotate: 40
						},
						axisLine: {
							lineStyle: {
								color: '#00B2EE'
							}
						},
						data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
							'10', '11', '12', '13', '14', '15', '16', '17', '18',
							'19', '20', '21', '22', '23'
						]
					},
					yAxis: [{ //直角坐标系 grid 中的 y 轴
						min: 0,
						max: 1050,
						interval: 150,
						//name:"值", 
						axisLine: {
							lineStyle: {
								color: '#00B2EE'
							}
						},
						splitLine: {
							show: false
						}
					}, { //直角坐标系 grid 中的 y 轴
						min: 0,
						max: 20,
						interval: 5,
						//name:"亿条", 
						axisLine: {
							lineStyle: {
								color: '#00B2EE'
							}
						},
						splitLine: {
							show: false
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
									label: {
										//show : false
									},
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

			},
			getDurationList() {
				axios.get('./gprs/duration/average/hour/2019-03-18').then(res => { // 调用接口
					console.log("qqqqqqqq");
				});
			}

		}
	}
</script>

<style lang="stylus" scoped>
.dashboard 
	position:relative;
	width:100%;
	height:100%;
	margin:0px;
	padding:0px;
	background url('../../../../../assets/bg.jpg');
	background-size:100%,100%;
	//background:rgba(0 0 0 0.1);
</style>
