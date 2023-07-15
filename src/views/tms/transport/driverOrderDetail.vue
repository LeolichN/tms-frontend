<template>
    <div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 20px;margin-left: 20px;">
            <el-form :model="query" :inline="true" style="margin-left: 50px;">
                <div style="height: 25px;"></div>
                <el-form-item label="订单编号：" style="width: 23%;">
                    <el-input placeholder="审批人" v-model="query.poid"></el-input>
                </el-form-item>
                <el-form-item label="运单编号：" style="width: 23%;">
                    <el-input placeholder="审批人" v-model="query.ptoid"></el-input>
                </el-form-item>
                <el-form-item label="下单时间：" style="width: 23%;">
                    <el-input placeholder="审批人" v-model="query.createtime"></el-input>
                </el-form-item>
                <el-form-item label="订单状态：" style="width: 23%;">
                    <el-input placeholder="审批人" v-model="query.postatus==1?'网点出库':'正常'"></el-input>
                </el-form-item>
                <el-form-item label="预计到达日期：" style="width: 30%;">
                    <el-input placeholder="审批人" v-model="query.estimatedarrivaltime"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName1">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;">
                            <h3>基本数据</h3>
                        </div>
                    </template>
                    <el-container>
                        <el-aside width="40px" style="margin-left: 20px;">
                            <img style="width:20px;height: 20px;margin-left: 20px;margin-top: 30px;"
                                src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/5dbb0c0f7eb3b3f4d02de0e4a6e1478.png" />
                            <hr style="border:1px dashed #000;width:0px;height: 125px;margin-left: 27px;" />
                            <img style="width:20px;height: 20px;margin-left: 20px;margin-top: 5px;"
                                src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/da7bd83fc857bab5b8ced3b91404269.png" />
                            <img style="width:20px;height: 20px;margin-left: 20px;margin-top: 130px;"
                                src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/ee2e5913a38ab3ecedf1f00eef4f196.png" />
                        </el-aside>
                        <el-container>
                            <el-main>
                                <el-form :model="query" :inline="true" style="width:800px">
                                    <div style="font-size:20px">发货方</div>
                                    <el-form-item label="发货方姓名：" style="width: 40%;">
                                        <el-input placeholder="审批人" v-model="query.sendername"></el-input>
                                    </el-form-item>
                                    <el-form-item label="发货方地址：" style="width: 40%;">
                                        <el-input placeholder="审批人"
                                            v-model="query.senderprovincename+query.sendercityname+query.sendercountyname"></el-input>
                                    </el-form-item>
                                    <el-form-item label="发货方电话：" style="width: 40%;">
                                        <el-input placeholder="审批人" v-model="query.senderphone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="详细地址：" style="width: 40%;">
                                        <el-input placeholder="审批人" v-model="query.senderaddress"></el-input>
                                    </el-form-item>
                                </el-form>
                                <el-form :inline="true" style="width:800px">
                                    <div style="font-size:20px">收货方</div>
                                    <el-form-item label="收货方姓名：" style="width: 40%;">
                                        <el-input placeholder="审批人" v-model="query.receivername"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货方地址：" style="width: 40%;">
                                        <el-input placeholder="审批人"
                                            v-model="query.receiverprovincename+query.receivercityname+query.receivercountyname"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货方电话：" style="width: 40%;">
                                        <el-input placeholder="审批人" v-model="query.receiverphone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="详细地址：" style="width: 40%;">
                                        <el-input placeholder="审批人" v-model="query.receiveraddress"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div>距离:<el-input v-model="query.podistance" style="width:150px"></el-input>地图:<a
                                        href="#" @click="dialogVisible = true">地图查看</a></div>
                            </el-main>
                        </el-container>
                    </el-container>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName2">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;">
                            <h3>费用信息</h3>
                        </div> 、
                    </template>

                    <el-form :inline="true" style="margin-left: 50px;">
                        <el-form-item label="运费：" style="width: 30%;">
                            <el-input placeholder="审批人" v-model="query.amount"></el-input>
                        </el-form-item>
                        <el-form-item label="支付方式：" style="width: 30%;">
                            <el-input placeholder="审批人" v-model="query.paymentmethod==1?'预结':'到付'"></el-input>
                        </el-form-item>
                        <el-form-item label="付款状态：" style="width: 30%;">
                            <el-input placeholder="审批人" v-model="query.paymentstatus==1?'未付':'已付'"></el-input>
                        </el-form-item>
                    </el-form>

                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName3">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;">
                            <h3>货品信息</h3>
                        </div> 、
                    </template>
                    <el-table :header-cell-style="{background:'rgb(238, 238, 238)',color:'black'}" ref="multipleTable"
                        :data="ordercargoa" tooltip-effect="dark"
                        style="width: 90%;margin-left: 60px;margin-top: 30px;">
                        <el-table-column prop="id" label="货物编号">
                            <template slot-scope="a">
                                <span>{{a.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="货物名称"></el-table-column>
                        <el-table-column prop="quantity" label="货品数量"></el-table-column>
                        <el-table-column prop="typename" label="货物类型"></el-table-column>
                        <el-table-column prop="weight" label="货品重量"></el-table-column>
                        <el-table-column prop="volume" label="货品体积"></el-table-column>
                        <el-table-column prop="cargoBarcode" label="货品条码"></el-table-column>
                        <el-table-column prop="remark" label="货品备注"></el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName4">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;">
                            <h3>取件信息</h3>
                        </div>
                    </template>
                    <el-form :model="qj" :inline="true" style="margin-left: 50px;">
                        <el-form-item label="所在网点：" style="width: 23%;">
                            <el-input v-model="qj.pconame"></el-input>
                        </el-form-item>
                        <el-form-item label="取件类型：" style="width: 23%;">
                            <el-input v-model="qj.pickuptype==1?'网点自寄':'上门取件'"></el-input>
                        </el-form-item>
                        <el-form-item label="作业状态：" style="width: 23%;">
                            <el-input
                                v-model="qj.ptpdstatus==1?'待上门':qj.ptpdstatus==3?'待妥投':qj.ptpdstatus==4?'已完成':'已取消'"></el-input>
                        </el-form-item>
                        <el-form-item label="取件快递员：" style="width: 23%;">
                            <el-input v-model="qj.pauname"></el-input>
                        </el-form-item>
                        <el-form-item label="快递员电话：" style="width: 23%;">
                            <el-input v-model="qj.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="预计取件时间：" style="width: 24%;">
                            <el-input v-model="qj.estimatedstarttime"></el-input>
                        </el-form-item>
                        <el-form-item label="取件完成时间：" style="width: 24%;">
                            <el-input v-model="qj.actualstarttime"></el-input>
                        </el-form-item>
                        <el-form-item label="取件实际时间：" style="width: 24%;">
                            <el-input v-model="qj.actualendtime"></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName5">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;">
                            <h3>派送信息</h3>
                        </div> 、
                    </template>
                    <el-form :model="pj" :inline="true" style="margin-left: 50px;">
                        <el-form-item label="所在网点：" style="width: 23%;">
                            <el-input v-model="pj.pconame"></el-input>
                        </el-form-item>
                        <el-form-item label="作业状态：" style="width: 23%;">
                            <el-input
                                v-model="pj.ptpdstatus==1?'待交接':pj.ptpdstatus==3?'待交件':pj.ptpdstatus==4?'已完成':'已取消'"></el-input>
                        </el-form-item>
                        <el-form-item label="派送快递员：" style="width: 23%;">
                            <el-input v-model="pj.pauname"></el-input>
                        </el-form-item>
                        <el-form-item label="派送员电话：" style="width: 23%;">
                            <el-input p v-model="pj.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="预计派送时间：" style="width: 24%;">
                            <el-input v-model="pj.estimatedstarttime"></el-input>
                        </el-form-item>
                        <el-form-item label="派送完成时间：" style="width: 24%;">
                            <el-input v-model="pj.actualendtime"></el-input>
                        </el-form-item>

                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName6">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;">
                            <h3>运输信息</h3>
                        </div>
                    </template>
                    <el-progress type="circle" :percentage="100" :stroke-width="3" status="success" color="#409EFF"
                        :width="70" style="margin-left: 45%;"></el-progress>
                    <h4 style="margin-left: 45%;">{{taskpost.diaoduname}}</h4>
                    <div style="background-color: #F2F6FC;width: 230px;height: 130px;margin-left: 38%;margin-top: 1%;">
                        <p style="margin-left: 8%;">预计到达：<span style="text-align: left;">{{taskpost.endname}}</span></p>
                        <p style="margin-left: 8%;">运输任务：<span style="color: royalblue;">{{taskpost.pttid}}</span></p>
                        <p style="margin-left: 8%;">车辆： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                                style="text-align: left;">{{taskpost.licenseplate}}</span></p>
                        <p style="margin-left: 8%;">司机：
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{taskpost.pauname}}</span></p>
                        <p style="margin-left: 8%;">到达时间：<span>{{taskpost.actualarrivaltime}}</span></p>

                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;"
            @click="adb">
            <el-collapse accordion v-model="activeName7">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;">
                            <h3>订单轨迹</h3>
                        </div> 、
                    </template>
                    <baidu-map style="margin-left: 4%; margin-top: 3%" :center="end">
                        <bm-view class="map" style="height: 400px; width: 1000px"> </bm-view>
                        <bm-driving :start="start" :end="end" :auto-viewport="true" :panel="false"></bm-driving>
                        <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
                    </baidu-map>
                </el-collapse-item>
            </el-collapse>
        </div>
        </el-dialog>
        <br>
        <Divider />
        <Button size="large" style="width: 100px;margin-left: 40%;" @click="returntask">返回</Button>
    </div>
</template>

<script>
    export default {
        data() {

            return {
                activeName1: "1",
                activeName2: "2",
                activeName3: "3",
                activeName4: "4",
                activeName5: "5",
                activeName6: "6",
                activeName7: "7",
                dialogVisible: false,
                query: {},
                ordercargoa: [],
                qj: {},
                pj: {},
                start: { lng: 0, lat: 0 },
                end: { lng: 0, lat: 0 },
                taskpost: {},
            }
        },
        methods: {
            adb() {
                this.querylnglat()
            },
            //返回
            returntask() {
                this.$router.push("/index/tasktransport")
            },
            //查询货物信息
            queryOrderCargoa(a, b) {
                const loading = this.$loading({
                    lock: true,
                    text: '加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios.post("/api/work/pd-task-transport/lcselectOrderCargoaByorderid", {
                    orderid: a,
                    tranorderid: b
                })
                    .then(res => {
                        this.ordercargoa = res.data.data
                        loading.close();
                    })
                    .catch(err => {
                        this.$message.error(err);
                        loading.close();
                    })
            },
            //查询取件和派件
            queryPdTaskPickupDispatchView(a) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios.get("/api/work/pd-task-pickup-dispatch/lcqueryPdTaskPickupDispatchView/" + a)
                    .then(res => {
                        res.data.data.forEach(element => {
                            if (element.tasktype == 1) {
                                this.qj = element
                            } else if (element.tasktype == 2) {
                                this.pj = element
                            }
                            loading.close();
                        });
                    })
                    .catch(err => {
                        this.$message.error(err);
                        loading.close();
                    })
            },
            querylnglat() {
                //查询经度和纬度
                //查询起点
                const loading = this.$loading({
                    lock: true,
                    text: '加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios.get("/api/aggregation/pd_order/getCoordinate/" + this.query.sendercountyname + this.query.sendercityname + this.query.senderprovincename + this.query.senderaddress)
                    .then(res => {
                        loading.close();
                        this.start.lng = res.data.substring(0, res.data.indexOf(","));
                        this.start.lat = res.data.substring(res.data.indexOf(",") + 1);
                        console.log(this.start)
                    })
                    .catch(err => {
                        loading.close();
                        console.error(err);
                    })
                //终点
                this.axios.get("/api/aggregation/pd_order/getCoordinate/" + this.query.receivercountyname + this.query.sendercityname + this.query.receiverprovincename + this.query.receiveraddress)
                    .then(res => {
                        loading.close();
                        this.end.lng = res.data.substring(0, res.data.indexOf(","));
                        this.end.lat = res.data.substring(res.data.indexOf(",") + 1);
                    })
                    .catch(err => {
                        loading.close();
                        console.error(err);
                    })
            },

        },
        created() {
            var z = JSON.parse(this.$route.query.data)
            this.query = z;
            console.log(this.query) //运单信息
            this.queryOrderCargoa(this.query.poid, this.query.ptoid)
            this.queryPdTaskPickupDispatchView(this.query.poid)
            var x = JSON.parse(this.$route.query.pdata)
            console.log(x)
            this.taskpost = x//运输任务信息
        },
    }
</script>

<style>
    .name {
        border: 1px solid red;
        height: 100px;
    }

    .map {
        width: 100%;
        height: 800px;
    }

    .el-input__inner {
        border: 0;
    }
</style>