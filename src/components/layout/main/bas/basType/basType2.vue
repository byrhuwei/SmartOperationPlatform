<template>
	<div id="main" style="width: 100%; height: 100%;" class='dashboard'>内容计费</div>
</template>

<script>
	var echarts = require('echarts');
	var axios = require('axios');
	export default {
		name: "basType2",
		data() {
			return {
				durationList: [
					["2019-07-01", 283],
					["2019-07-02", 125],
					["2019-07-03", 390],
					["2019-07-04", 22],
					["2019-07-05", 244],
					["2019-07-06", 272],
					["2019-07-07", 206],
					["2019-07-08", 207],
					["2019-07-09", 266],
					["2019-07-10", 291],
					["2019-07-11", 292],
					["2019-07-12", 213],
					["2019-07-13", 207],
					["2019-07-14", 231],
					["2019-07-15", 211],
					["2019-07-16", 264],
					["2019-07-17", 269],
					["2019-07-18", 288],
					["2019-07-19", 277],
					["2019-07-20", 283],
					["2019-07-21", 211],
					["2019-07-22", 257],
					["2019-07-23", 255],
					["2019-07-24", 260],
					["2019-07-25", 244],
					["2019-07-26", 227],
					["2019-07-27", 214],
					["2019-07-28", 286],
					["2019-07-29", 273],
					["2019-07-30", 252],
					["2019-07-31", 269]
				]
				//端到端时延数据列表 
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
		watch: {
			durationList(val) { //监听数据发生改变 刷新图表数据
				this.drawDataTable1()
			}
		},
		methods: {
			drawDataTable1() {
				let myChart = echarts.init(document.getElementById('main'));
				myChart.setOption({
					title: {
						text: '端到端时延日指标',
						'subtext': '数据来自NRJF系统',
						x: 'left',
						y: 'top',
						textAlign: 'left',
						textStyle: {
							color: '#00B2EE',
							fontSize: 16
						}
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						data: this.durationList.map(function(item) {
							return item[0];
						})
					},
					yAxis: {
						splitLine: {
							show: false
						}
					},
					toolbox: {
						left: 'center',
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							restore: {},
							saveAsImage: {}
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
							lte: 50,
							color: '#096'
						}, {
							gt: 50,
							lte: 100,
							color: '#ffde33'
						}, {
							gt: 100,
							lte: 150,
							color: '#ff9933'
						}, {
							gt: 150,
							lte: 200,
							color: '#cc0033'
						}, {
							gt: 200,
							lte: 360,
							color: '#660099'
						}, {
							gt: 360,
							color: '#7e0023'
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
							silent: true,
							data: [{
								yAxis: 360
							}]
						}
					}
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
	padding-top 5%;
	background url('../../../../../assets/bg.jpg');
	background-size 100% 100%;
</style>
