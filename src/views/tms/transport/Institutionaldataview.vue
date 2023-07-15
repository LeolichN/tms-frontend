<template>
    <div id='institutionaldataview'>
        <Row>
            <Col span="6">
            <Card style="background-color: #F2F6FC;">
                <template>
                    <Icon type="ios-square" style="color: #F90511;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;">司机</span>
                </template>
                <div>
                    <!-- <div style="font-size: 12px;margin-top: 5%;">
                        <span style="color: #409EFF;font-weight: 500;margin-right: 22%;margin-left: 10%;">{{
                            g.driverCount }}</span>
                        <span style="color: #409EFF;font-weight: 500;margin-right: 25%;">{{
                            g.readyCount }}</span>
                        <span style="color: #409EFF;font-weight: 500;">{{
                            g.wayCount }}</span>
                        <br>
                        <span style="font-weight: 500;margin-left: 10%;">司机总数</span>
                        <span style="font-weight: 500;margin-left: 12%;">待发车司机</span>
                        <span style="font-weight: 500;margin-left: 8%;">在途司机</span>
                    </div>
                    <div style="font-size: 12px;margin-top: 10%;">
                        <span style="color: #409EFF;font-weight: 500;margin-right: 22%;margin-left: 10%;">{{
                            g.noreturnCount }}</span>
                        <span style="color: #409EFF;font-weight: 500;margin-right: 30%;">{{g.alltransittime}}h</span>
                        <br>
                        <span style="font-weight: 500;margin-left: 10%;">待返回司机</span>
                        <span style="font-weight: 500;margin-left: 7%;">人均运输时长</span>
                    </div> -->
                    <div style="display: flex;font-size: 12px;margin-top: 5%;">
                        <div style="margin-left: 10%;">
                            <p style="color: #409EFF;font-weight: 500;">{{
                                g.driverCount }}</p>
                            <p>司机总数</p>
                        </div>
                        <div style="margin-left: 10%;">
                            <p style="color: #409EFF;font-weight: 500;">{{
                                g.readyCount }}</p>
                            <p>待发车司机</p>
                        </div>
                        <div style="margin-left: 10%;">
                            <p style="color: #409EFF;font-weight: 500;">{{
                                g.wayCount }}</p>
                            <p>在途司机</p>
                        </div>
                    </div>
                    <div style="display: flex;font-size: 12px;margin-top: 10%;">
                        <div style="margin-left: 10%;">
                            <p style="color: #409EFF;font-weight: 500;">{{
                                g.noreturnCount }}</p>
                            <p>待返回司机</p>
                        </div>
                        <div style="margin-left: 10%;">
                            <p style="color: #409EFF;font-weight: 500;">1</p>
                            <p>人均运输时长</p>
                        </div>
                    </div>
                </div>
            </Card>
            <Card style="background-color: #F2F6FC;margin-top: 5%;">
                <template>
                    <Icon type="ios-square" style="color: #F90511;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;">车辆装载</span>
                </template>
                <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                <div id="main" style="height: 150px;width: 100%;"></div>
            </Card>
            <Card style="background-color: #F2F6FC;margin-top: 5%;">
                <template>
                    <Icon type="ios-square" style="color: #F90511;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;">目的地运输量</span>
                </template>
                <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                <div id="main1" style="height: 230px;width: 100%;"></div>
            </Card>
            </Col>
            <Col span="1">
            </Col>

            <Col span="10">
            <Card style="background-color: #F2F6FC;">
                <template>
                    <Icon type="ios-square" style="color: #F90511;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;">运单统计</span>
                </template>
                <div style="margin-top: 7%;">
                    <Row>
                        <Col span="7">
                        <Card style="background-color: #F2F6FC;height: 75px;">
                            <div style="display: flex;justify-content: space-between;">
                                <el-image
                                    style="width: 37%;height: 45px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 5px;"
                                    src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/1.3d3a506e.png">
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                </el-image>
                                <div>
                                    <p style="font-weight: 600; color: #F90511;font-size: 15px;">{{g.waybillCount}}</p>
                                    <p style="font-size: 12px;">运单总数</p>
                                </div>
                            </div>
                        </Card>
                        </Col>
                        <Col span="17">
                        <Card :dis-hover="true" style="background-color: #F2F6FC;">
                            <div style="display: flex;">
                                <div style="display: flex;justify-content: space-between;margin-left: %;">
                                    <el-image
                                        style="width: 45%;height: 45px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 5px;"
                                        src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/2.44d56821.png">
                                        <div slot="placeholder" class="image-slot">
                                            加载中<span class="dot">...</span>
                                        </div>
                                    </el-image>
                                    <div>
                                        <p style="font-weight: 500; color: #409EFF;font-size: 13px;margin-left: 1%;">
                                            {{g.readygotoCount}}
                                        </p>
                                        <p style="font-size: 12px;">待发车</p>
                                    </div>
                                </div>
                                <div style="display: flex;justify-content: space-between;margin-left: 5%;"">
                                    <el-image
                                    style=" width: 45%;height: 45px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0,
                                    0.1);border-radius: 5px;"
                                    src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/1.3d3a506e.png">
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                    </el-image>
                                    <div>
                                        <p style="font-weight: 500; color: #409EFF;font-size: 13px;margin-left: 1%;">
                                            {{g.intransitCount}}
                                        </p>
                                        <p style="font-size: 12px;">运输中</p>
                                    </div>
                                </div>
                                <div style="display: flex;justify-content: space-between;margin-left: 5%;"">
                                    <el-image
                                    style=" width: 45%;height: 45px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0,
                                    0.1);border-radius: 5px;"
                                    src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/4.dae4931e.png">
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                    </el-image>
                                    <div>
                                        <p style="font-weight: 500; color: #409EFF;font-size: 13px;margin-left: 1%;">
                                            {{g.arrivedCount}}
                                        </p>
                                        <p style="font-size: 12px;">已到达</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        </Col>
                    </Row>

                </div>
                <template>
                    <Icon type="ios-square" style="color: #F90511;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;">运单线路图</span>
                </template>
                <!-- 中国地图 -->
                <div>
                    <div class="map-box" ref="chinaMap" style="height: 500px;width: 100%;" />
                </div>
            </Card>
            </Col>
            <Col span="1">
            </Col>
            <Col span="6">
            <Card style="background-color: #F2F6FC;height: 170px;">
                <template>
                    <Icon type="ios-square" style="color: #F90511;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;">运输准时率</span>
                </template>
                <Row>
                    <Col span="8">
                    <el-image style=" width: 30%;height: 35px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0,
                    0.1);border-radius: 5px;margin-top: 30%;margin-left: 50%;"
                        src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/truck.png">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                    <p style="font-size: 10px;color: #409EFF;margin-left: 50%;">{{g.startontime}}%</p>
                    <p style="font-size: 10px;margin-left: 30%;">发出准时率</p>
                    </Col>
                    <Col span="8">
                    <svg class="dashed-line" width="100%" height="100%">
                        <path stroke="#ccc" stroke-dasharray="5, 5"
                            d="M 0 50 Q 50 0 100 50 Q 150 100 200 50 Q 250 0 300 50 Q 350 100 400 50 Q 450 0 500 50"
                            fill="none" />
                    </svg>
                    </Col>
                    <Col span="8">
                    <el-image style=" width: 30%;height: 30px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0,
                        0.1);border-radius: 5px;margin-top: 30%;margin-left: 20%;"
                        src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/flag-fill.png">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                    <p style="font-size: 10px;color: #409EFF;margin-left: 20%;">{{g.endontime}}%</p>
                    <p style="font-size: 10px;">到达准时率</p>
                    </Col>
                </Row>

            </Card>
            <Card
                style="background-color: #F2F6FC;margin-top: 7%; background: linear-gradient(to right, #EB4444, #F77A7A);">
                <template>
                    <Icon type="ios-square" style="color: #F48383;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;color: white;">异常运输</span></span>
                </template>
                <Row>
                    <Col span="12">
                    <p style="font-size: 15px;color: white;margin-top: 15%;margin-left: 15%;font-weight: bolder;">
                        {{g.exceptionCount}}</p>
                    <p style="font-size: 12px;color: white;margin-left: 15%;font-weight: bolder;"> 异常运输任务总数</p>
                    </Col>
                    <Col span="12">
                    <el-progress type="circle" :percentage="percentage" :stroke-width="7" color="#42B983" :width="80"
                        :format="formatLabel" style="margin-left: 20%;">
                    </el-progress>
                    </Col>
                </Row>
                <div style="width: 100%;height: 100px;background-color: white;margin-top: 5%;height: 100px;">
                    <table style="font-size: 2px;text-align: center;width: 100%;">
                        <tr>
                            <th>运输任务编号</th>
                            <th>目的地</th>
                            <th>延迟时间</th>
                        </tr>
                        <tr v-for="x in exe ">
                            <td>{{x.id}}</td>
                            <td>{{x.name}}</td>
                            <td>{{x.yctime}}</td>
                        </tr>


                    </table>
                </div>


            </Card>
            <Card style="background-color: #F2F6FC;margin-top: 7%;">
                <template>
                    <Icon type="ios-square" style="color: #F90511;" />
                    <span style="font-weight: bold;font-size: 10px;margin-left: 2%;">实时到达</span>
                </template>
                <div style="margin-top: 3%;height: 160px;">
                    <table style="font-size: 2px;text-align: center;width: 100%;">
                        <tr>
                            <th>运输任务编号</th>
                            <th>目的地</th>
                            <th>交付时间</th>
                        </tr>
                        <tr v-for="x in real">
                            <td>{{x.id}}</td>
                            <td>{{x.name}}</td>
                            <td>{{x.yctime}}</td>
                        </tr>

                    </table>
                </div>
            </Card>
            </Col>
        </Row>
        </el-row>



    </div>
</template>

<script>
    import * as echarts from 'echarts';
    import roma from '@/plugins/roma'
    export default {

        data() {
            return {
                percentage: 50,
                g: {},
                exe: [],
                real: [],

            }
        },
        methods: {
            formatLabel(percentage) {
                return `${percentage}` + '%\n' + '异常占比';
            },
            //环形图
            DoughnutChart() {
                this.axios.get("/api/aggregation/pd-task-transport/querynstitutionaldataKanbanboard")
                    .then(res => {
                        var chartDom = document.getElementById('main');
                        var myChart = echarts.init(chartDom, 'roma');
                        this.axios.get
                        myChart.setOption({

                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {d}%'
                            },

                            series: [
                                {
                                    name: '车辆装载',
                                    type: 'pie',
                                    radius: ['30%', '70%'],
                                    avoidLabelOverlap: false,

                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }
                                    },
                                    labelLine: {
                                        show: false,

                                    },
                                    data: [
                                        { value: res.data.fullpercentage, name: '满载车' },
                                        { value: res.data.halfpercentage, name: '半载车' },
                                        { value: res.data.nullpercentage, name: '空载车' },
                                    ]
                                }
                            ]
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //柱状和折线图
            BasicBar() {
                var chartDom = document.getElementById('main1');
                var myChart = echarts.init(chartDom, 'roma');
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        data: ['北京', '天津', '上海', '成都', '河北', '云南', '长沙']
                    },
                    legend: {
                        data: ['订单数量', '同比增长']
                    },
                    yAxis: [
                        {
                            type: 'value',
                            min: 0,
                            max: 1200,
                            position: 'right',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            min: 0,
                            max: 30,
                            position: 'left',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],

                    series: [
                        {
                            name: '订单数量',
                            data: [200, 500, 300, 800, 500, 700, 1100],
                            type: 'bar',
                            yAxisIndex: 0
                        },
                        {
                            name: '同比增长',
                            data: [5, 10, 20, 12, 30, 27, 30],
                            stack: 'Total',
                            type: 'line',
                            yAxisIndex: 1
                        }
                    ]
                });
            },
            //地图
            mapChinaOptions(data, formatter) {
                let max = 0;
                let riskMaxPoint = data.map((item) => {
                    return item.riskPointNum
                })
                if (data && data.length) {
                    max = Math.max(...riskMaxPoint)
                }
                return {
                    visualMap: {
                        show: false,
                        min: 0,
                        max: max,
                        // inRange: {
                        //     color: ['#fae8e9', '#f7a8be', '#f1658b ', '#CB000C']
                        // },
                    },
                    // 暂且不知道做啥子用的
                    // geo: {
                    //     map: 'china',
                    //     // layoutCenter:['10%','5%'],
                    //     // center: [104.114129, 35.950339],
                    // },
                    grid: {
                        top: 10,
                        bottom: 10,
                        width: '1000px',
                        height: '500px'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: formatter ? formatter : '{b}<br/>{c}',
                        borderColor: '#CB000C',
                        borderWidth: '1'
                    },
                    dataRange: { // 数值范围对应的 取色
                        x: 'left',
                        y: 'bottom',
                        show: true,
                        splitList: [
                            { start: 500, color: '#CB000C' },
                            { start: 201, end: 500, color: '#f7a8be' },
                            { start: 101, end: 200, color: '#f1658b' },
                            { start: 51, end: 100, color: '#CB000C' },
                            { end: 50, color: '#fae8e9' }
                        ],
                        color: ['#fae8e9', '#f7a8be', '#f1658b ', '#CB000C']
                    },
                    series: [
                        {
                            type: 'map',
                            map: 'china',
                            itemStyle: {
                                areaColor: '#fff', //地图的颜色
                                borderColor: 'rgba(60,70,88,.5)', //边界线颜色
                                borderWidth: '.5', //边界线宽
                                emphasis: { // 对应的鼠标悬浮效果
                                    color: '#FF0000',
                                    areaColor: '#CB000C',
                                    borderColor: '#FFF',
                                    borderWidth: 1,
                                }
                            },
                            label: {
                                fontSize: 12,
                                normal: {
                                    show: true, // 默认 是否显示省份标签
                                    color: '#000',
                                },
                                emphasis: {
                                    show: true, // 鼠标 hover 时是否显示身份标签
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                            data: data
                        },

                    ]
                }
            },
            //查询机构数据看板的数据
            querynstitutionaldataKanbanboard() {
                this.axios.get("/api/aggregation/pd-task-transport/querynstitutionaldataKanbanboard")
                    .then(res => {
                        console.log(res.data)
                        this.g = res.data
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //查询异常任务
            queryExceptionTaskController() {
                this.axios.get("/api/aggregation/pd-task-transport/queryExceptionTaskController")
                    .then(res => {
                        this.exe = res.data
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //最新到达的表 查询30分钟内到达的运输任务表
            queryrealtimecontroller() {
                this.axios.get("/api/aggregation/pd-task-transport/queryrealtimecontroller")
                    .then(res => {
                        console.log(res.data)
                        this.real = res.data
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
        },
        created() {
            this.queryExceptionTaskController();
            this.queryrealtimecontroller();
        },
        mounted() {
            this.querynstitutionaldataKanbanboard();
            this.DoughnutChart()
            this.BasicBar()
            let map = this.$echarts.init(this.$refs.chinaMap),
                data = [
                    { "name": "北京", "value": 600, "riskNum": 563, "riskPointNum": 69 },
                    { "name": "黑龙江", "value": 501, },
                    { "name": "福建", "value": 501, },
                    { "name": "辽宁", "value": 501, },
                    { "name": "甘肃", "value": 501, },
                    { "name": "贵州", "value": 501, },
                    { "name": "西藏", "value": 501, },
                    { "name": "山西", "value": 501, },
                    { "name": "吉林", "value": 501, },
                    { "name": "山东", "value": 501, },
                    { "name": "河北", "value": 98, },
                    { "name": "内蒙古", "value": 201 },
                    { "name": "新疆", "value": 201 },
                    { "name": "宁夏", "value": 201 },
                    { "name": "河南", "value": 201 },
                    { "name": "四川", "value": 201 },
                    { "name": "江西", "value": 167 },
                    { "name": "江苏", "value": 122 },
                    { "name": "浙江", "value": 103 },
                    { "name": "上海", "value": 89 },
                    { "name": "重庆", "value": 67 },
                    { "name": "广东", "value": 51 },
                    { "name": "湖北", "value": 51 },
                    { "name": "广西", "value": 12 },
                    { "name": "湖南", "value": 12 },
                    { "name": "青海", "value": 12 },
                    { "name": "云南", "value": 12 },
                    { "name": "安徽", "value": 12 },
                    { "name": "陕西", "value": 12 },
                    { "name": "台湾", "value": 12 },
                ];


            let options = this.mapChinaOptions(data);

            map.setOption(options);
        }

    }
</script>

<style scoped>
    /deep/ .el-progress__text {
        white-space: pre;
    }

</style>