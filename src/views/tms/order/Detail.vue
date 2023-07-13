<template>
    <div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 20px;margin-left: 20px;">
            <el-form :inline="true" style="margin-left: 50px;">
                <div style="height: 25px;"></div>
                <el-form-item label="订单编号：" style="width: 30%;">
                    <span>{{ orderlist.id }}</span>
                </el-form-item>
                <el-form-item label="下单时间：" style="width: 30%;">
                    <span>{{ orderlist.createTime }}</span>
                </el-form-item>
                <el-form-item label="订单状态：" style="width: 30%;">
                    <span v-if="orderlist.status=1">待取件</span>
                    <span v-else-if="orderlist.status=1">待取件</span>
                    <span v-else-if="orderlist.status=2">已取件</span>
                    <span v-else-if="orderlist.status=3">网点入库</span>
                    <span v-else-if="orderlist.status=4">待装车</span>
                    <span v-else-if="orderlist.status=5">运输中</span>
                    <span v-else-if="orderlist.status=6">网点出库</span>
                    <span v-else-if="orderlist.status=7">待派送</span>
                    <span v-else-if="orderlist.status=8">派送中</span>
                    <span v-else-if="orderlist.status=9">已签收</span>
                    <span v-else-if="orderlist.status=10">拒收</span>
                    <span v-else>已取消</span>
                </el-form-item>
                <el-form-item label="预计到达日期：" style="width: 30%;">
                    <span>{{ orderlist.estimatedArrivalTime }}</span>
                </el-form-item>
            </el-form>
        </div>
        
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;"><h3>基本数据</h3></div>      
                    </template>
                    <el-container>
                    <el-aside width="40px" style="margin-left: 20px;">
                        <img style="width:20px;height: 20px;margin-left: 20px;margin-top: 30px;" src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/da7bd83fc857bab5b8ced3b91404269.png"/>
                        <hr style="border:1px dashed #000;width:0px;height: 125px;margin-left: 27px;"/>
                        <img style="width:20px;height: 20px;margin-left: 20px;margin-top: 5px;" src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/ee2e5913a38ab3ecedf1f00eef4f196.png"/>
                        <img style="width:20px;height: 20px;margin-left: 20px;margin-top: 130px;" src="https://projectvue.oss-cn-hangzhou.aliyuncs.com/5dbb0c0f7eb3b3f4d02de0e4a6e1478.png"/>
                    </el-aside>
                    <el-container>
                        <el-main>
                        <el-form :inline="true" style="width:800px">
                            <div style="font-size:20px">发货方</div>
                            <el-form-item label="发货方姓名：" style="width: 40%;">
                                <span>{{ orderlist.senderName }}</span>
                            </el-form-item>
                            <el-form-item label="发货方地址：" style="width: 40%;">
                                <span v-for="list in arealist" :key="list.senderProvinceId">
                                    <span v-if="(orderlist.senderProvinceId==list.id)">{{ list.name }}</span>
                                    <span v-if="(orderlist.senderCityId==list.id)">{{ list.name }}</span>
                                    <span v-if="(orderlist.senderCountyId==list.id)">{{ list.name }}</span>       
                                </span>
                            </el-form-item>
                            <el-form-item label="发货方电话：" style="width: 40%;">
                                <span>{{ orderlist.senderPhone }}</span>
                            </el-form-item>
                            <el-form-item label="详细地址：" style="width: 40%;">
                                <span>{{ orderlist.senderAddress }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" style="width:800px">
                            <div style="font-size:20px">收货方</div>
                            <el-form-item label="收货方姓名：" style="width: 40%;">
                                <span>{{ orderlist.receiverName }}</span>
                            </el-form-item>
                            <el-form-item label="收货方地址：" style="width: 40%;">
                                <span v-for="list in arealist" :key="list.senderProvinceId">
                                    <span v-if="(orderlist.receiverProvinceId==list.id)">{{ list.name }}</span>
                                    <span v-if="(orderlist.receiverCityId==list.id)">{{ list.name }}</span>
                                    <span v-if="(orderlist.receiverCountyId==list.id)">{{ list.name }}</span>       
                                </span>
                            </el-form-item>
                            <el-form-item label="收货方电话：" style="width: 40%;">
                                <span>{{ orderlist.receiverPhone }}</span>
                            </el-form-item>
                            <el-form-item label="详细地址：" style="width: 40%;">
                                <span>{{ orderlist.receiverAddress }}</span>
                            </el-form-item>
                        </el-form>
                        <div>距离:<span style="font-size:20px;margin-right: 50px;">{{ orderlist.distance }}km</span>地图:<a href="#" @click="dialogVisible = true" >地图查看</a></div>
                    </el-main>
                    </el-container>
                </el-container>
                </el-collapse-item>              
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName1">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;"><h3>费用信息</h3></div> 、   
                    </template>
                    
                        <el-form :inline="true" style="margin-left: 50px;">     
                            <el-form-item label="运费：" style="width: 30%;">
                                <span style="color:orange;">{{ orderlist.amount }}元</span>
                            </el-form-item>
                            <el-form-item label="支付方式：" style="width: 30%;">
                                <span v-if="orderlist.paymentMethod=1">预付</span>
                                <span v-else-if="orderlist.paymentMethod=2">到付</span>
                            </el-form-item>
                            <el-form-item label="付款状态：" style="width: 30%;">
                                <span v-if="orderlist.paymentStatus=1">未付</span>
                                <span v-else-if="orderlist.paymentStatus=2">已付</span>
                            </el-form-item>
                        </el-form>  
                          
                </el-collapse-item>              
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName2">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;"><h3>货品信息</h3></div> 、   
                    </template>
                    <el-table
                    :header-cell-style="{background:'rgb(238, 238, 238)',color:'black'}"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 90%;margin-left: 60px;margin-top: 30px;"
                    @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="货物编号"></el-table-column>
                <el-table-column prop="name" label="货物名称"></el-table-column>        
                <el-table-column prop="quantity" label="货品数量"></el-table-column>    
                <el-table-column prop="goodsTypeId" label="货物类型"></el-table-column>
                <el-table-column prop="weight" label="货品重量"></el-table-column>   
                <el-table-column prop="volume" label="货品体积"></el-table-column>  
                <el-table-column prop="cargoBarcode" label="货品条码"></el-table-column>
                <el-table-column prop="remark" label="货品备注"></el-table-column>
                </el-table>          
                </el-collapse-item>              
            </el-collapse>
        </div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 30px;margin-left: 20px;">
            <el-collapse accordion v-model="activeName1">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="width:100%;margin-left: 50px;"><h3>取件信息</h3></div> 
                    </template>
                        <el-form :inline="true" style="margin-left: 50px;">     
                            <el-form-item label="所在网点：" style="width: 23%;">
                                <span>{{ pickuplist.name }}</span>
                            </el-form-item>
                            <el-form-item label="取件类型：" style="width: 23%;">
                                <span v-if="pickuplist.taskType==1">取件任务</span>
                                <span v-if="pickuplist.taskType==2">派件任务</span>
                            </el-form-item>
                            <el-form-item label="作业状态：" style="width: 23%;">
                                <span v-if="pickuplist.status==1">待执行</span>
                                <span v-if="pickuplist.status==2">进行中</span>
                                <span v-if="pickuplist.status==3">待确认</span>
                                <span v-if="pickuplist.status==4">已完成</span>
                                <span v-if="pickuplist.status==5">已取消</span>
                            </el-form-item>
                            <el-form-item label="取件快递员：" style="width: 23%;">
                                <span>{{ pickuplist.cname }}</span>
                            </el-form-item>
                            <el-form-item label="快递员电话：" style="width: 23%;">
                                <span>{{ pickuplist.mobile }}</span>
                            </el-form-item>
                            <el-form-item label="预计取件时间：" style="width: 25%;">
                                <span>{{ pickuplist.estimatedStartTime }}</span>
                            </el-form-item>
                            <el-form-item label="取件完成时间：" style="width: 25%;">
                                <span>{{ pickuplist.estimatedEndTime }}</span>
                            </el-form-item>
                        </el-form>  
                          
                </el-collapse-item>              
            </el-collapse>
        </div>
                    <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="70%">
                            <div class="map">
                                <el-amap class="amap-box" :vid="'amap-vue'" :center="arealist[0]">
                                    <el-amap-marker
                                        :position="arealist[0]"
                                    />
                                    <el-amap-polyline :path="arealist"></el-amap-polyline>
                                    
                                    <el-amap-marker
                                        :position="arealist[1]"
                                    />
                                </el-amap>
                            </div>      
                    </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data(){
  
        return{
            ids:[],
            activeName:"1",
            activeName1:"1",
            activeName2:"1",
            dialogVisible: false,
            tableData:[],  
            orderlist:[],
            pickuplist:[],
            id:[],
            arealist:[[121.5389385, 31.21515044], [121.5389385, 31.29615044]]
            
            
        }
    },
    methods:{
        show(){
            this.id = JSON.parse(this.$route.query.data);
           
                        this.orderlist=this.id;
            this.axios.post("/api/aggregation/pd-area/findarea").then(res => {
                   
                   this.arealist =res.data;  
                })
        },
        showcargo(){
            this.axios.post("/api/oms/pd-order-cargo/findOrderCargoOne",this.id).then(res => {    
                if (res.data.code == 11051) {
                    this.$Message.error(res.data.msg);
                    this.$router.push({path:"/index/order"});
                    }else{
                   
                        this.tableData=res.data;
                    }       
            
          })
        },
        showpickup(){
            this.axios.post("/api/aggregation/pd-task-pickup-dispatch/findPickupOne",this.id).then(res => {    
              //   if (res.data.code == 11051) {
              //       this.$Message.error(res.data.msg);
              //       this.$router.push({path:"/index/order"});
              //       }else{
                        this.pickuplist=res.data;
                      
                  //   }      
            
          })
        },
        handleSelectionChange(val) {       
          this.ids = val;
        },
       
    },
    created(){
        // this.show();
        // this.showcargo();
        // this.showpickup();
    }
  }
  </script>
  
  <style>
  .map {
  width: 100%;
  height: 800px;
  }
  
  </style>