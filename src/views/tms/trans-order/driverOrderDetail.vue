<template>
    <div>
        <div style="width:96%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 20px;margin-left: 20px;">
            <el-form :inline="true" style="margin-left: 50px;">
                <div style="height: 25px;"></div>
                <el-form-item label="订单编号：" style="width: 23%;">
                    <span>{{ id.id }}</span>
                </el-form-item>
                <el-form-item label="运单编号：" style="width: 23%;">
                    <span>{{ id.tid }}</span>
                </el-form-item>
                <el-form-item label="下单时间：" style="width: 23%;">
                    <span>{{ id.createTime }}</span>
                </el-form-item>
                <el-form-item label="订单状态：" style="width: 23%;">
                    <span v-if="id.status=1">待取件</span>
                    <span v-else-if="id.status=1">待取件</span>
                    <span v-else-if="id.status=2">已取件</span>
                    <span v-else-if="id.status=3">网点入库</span>
                    <span v-else-if="id.status=4">待装车</span>
                    <span v-else-if="id.status=5">运输中</span>
                    <span v-else-if="id.status=6">网点出库</span>
                    <span v-else-if="id.status=7">待派送</span>
                    <span v-else-if="id.status=8">派送中</span>
                    <span v-else-if="id.status=9">已签收</span>
                    <span v-else-if="id.status=10">拒收</span>
                    <span v-else>已取消</span>
                </el-form-item>
                <el-form-item label="预计到达日期：" style="width: 30%;">
                    <span>{{ id.estimatedArrivalTime }}</span>
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
                                <span>{{ id.senderName }}</span>
                            </el-form-item>
                            <el-form-item label="发货方地址：" style="width: 40%;">
                                <span v-for="list in arealist" :key="list.senderProvinceId">
                                    <span v-if="(id.senderProvinceId==list.id)">{{ list.name }}</span>
                                    <span v-if="(id.senderCityId==list.id)">{{ list.name }}</span>
                                    <span v-if="(id.senderCountyId==list.id)">{{ list.name }}</span>       
                                </span>
                            </el-form-item>
                            <el-form-item label="发货方电话：" style="width: 40%;">
                                <span>{{ id.senderPhone }}</span>
                            </el-form-item>
                            <el-form-item label="详细地址：" style="width: 40%;">
                                <span>{{ id.senderAddress }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" style="width:800px">
                            <div style="font-size:20px">收货方</div>
                            <el-form-item label="收货方姓名：" style="width: 40%;">
                                <span>{{ id.receiverName }}</span>
                            </el-form-item>
                            <el-form-item label="收货方地址：" style="width: 40%;">
                                <span v-for="list in arealist" :key="list.senderProvinceId">
                                    <span v-if="(id.receiverProvinceId==list.id)">{{ list.name }}</span>
                                    <span v-if="(id.receiverCityId==list.id)">{{ list.name }}</span>
                                    <span v-if="(id.receiverCountyId==list.id)">{{ list.name }}</span>       
                                </span>
                            </el-form-item>
                            <el-form-item label="收货方电话：" style="width: 40%;">
                                <span>{{ id.receiverPhone }}</span>
                            </el-form-item>
                            <el-form-item label="详细地址：" style="width: 40%;">
                                <span>{{ id.receiverAddress }}</span>
                            </el-form-item>
                        </el-form>
                        <div>距离:<span style="font-size:20px;margin-right: 50px;">{{ id.distance }}km</span>地图:<a href="#" @click="dialogVisible = true" >地图查看</a></div>
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
                                <span style="color:orange;">{{ id.amount }}元</span>
                            </el-form-item>
                            <el-form-item label="支付方式：" style="width: 30%;">
                                <span v-if="id.paymentMethod=1">预付</span>
                                <span v-else-if="id.paymentMethod=2">到付</span>
                            </el-form-item>
                            <el-form-item label="付款状态：" style="width: 30%;">
                                <span v-if="id.paymentStatus=1">未付</span>
                                <span v-else-if="id.paymentStatus=2">已付</span>
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
                    >
                      <el-table-column prop="id" label="货物编号"></el-table-column>
                      <el-table-column prop="name" label="货物名称"></el-table-column>        
                      <el-table-column prop="quantity" label="货品数量"></el-table-column>    
                      <el-table-column prop="goodsTypeId" label="货物类型"></el-table-column>
                      <el-table-column prop="weight" label="货品重量"></el-table-column>   
                      <el-table-column prop="volume" label="货品体积"></el-table-column>
                      <el-table-column prop="cargoValue" label="货品货值"></el-table-column>  
                      <el-table-column prop="cargoBarcode" label="货品条码"></el-table-column>
                      <el-table-column prop="remark" label="货品备注"></el-table-column>
                </el-table>       
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      style="
        width: 96%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 30px;
        margin-left: 20px;
      "
    >
      <el-collapse accordion v-model="activeName3">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="width: 100%; margin-left: 50px"><h3>取件信息</h3></div>
            、
          </template>
          <el-form :inline="true" style="margin-left: 50px">
            <el-form-item label="所在网点：" style="width: 23%">
              <span>{{ pickuplist.name }}</span>
            </el-form-item>
            <el-form-item label="取件类型：" style="width: 23%">
              <span v-if="pickuplist.taskType == 1">取件任务</span>
              <span v-if="pickuplist.taskType == 2">派件任务</span>
            </el-form-item>
            <el-form-item label="作业状态：" style="width: 23%">
              <span v-if="pickuplist.status == 1">待执行</span>
              <span v-if="pickuplist.status == 2">进行中</span>
              <span v-if="pickuplist.status == 3">待确认</span>
              <span v-if="pickuplist.status == 4">已完成</span>
              <span v-if="pickuplist.status == 5">已取消</span>
            </el-form-item>
            <el-form-item label="取件快递员：" style="width: 23%">
              <span>{{ pickuplist.cname }}</span>
            </el-form-item>
            <el-form-item label="快递员电话：" style="width: 23%">
              <span>{{ pickuplist.mobile }}</span>
            </el-form-item>
            <el-form-item label="预计取件时间：" style="width: 24%">
              <span>{{ pickuplist.estimatedStartTime }}</span>
            </el-form-item>
            <el-form-item label="取件完成时间：" style="width: 24%">
              <span>{{ pickuplist.estimatedEndTime }}</span>
            </el-form-item>
            <el-form-item label="取件实际时间：" style="width: 24%">
              <span>{{ pickuplist.actualEndTime }}</span>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      style="
        width: 96%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 30px;
        margin-left: 20px;
      "
    >
      <el-collapse accordion v-model="activeName4">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="width: 100%; margin-left: 50px"><h3>派送信息</h3></div>
            、
          </template>
          <el-form :inline="true" style="margin-left: 50px">
            <el-form-item label="所在网点：" style="width: 23%">
              <span>{{ pickuppailist.name }}</span>
            </el-form-item>
            <el-form-item label="作业状态：" style="width: 23%">
              <span v-if="pickuppailist.status == 1">待执行</span>
              <span v-if="pickuppailist.status == 2">进行中</span>
              <span v-if="pickuppailist.status == 3">待确认</span>
              <span v-if="pickuppailist.status == 4">已完成</span>
              <span v-if="pickuppailist.status == 5">已取消</span>
            </el-form-item>
            <el-form-item label="派送快递员：" style="width: 23%">
              <span>{{ pickuppailist.cname }}</span>
            </el-form-item>
            <el-form-item label="派送员电话：" style="width: 23%">
              <span>{{ pickuppailist.mobile }}</span>
            </el-form-item>
            <el-form-item label="预计派送时间：" style="width: 24%">
              <span>{{ pickuppailist.estimatedStartTime }}</span>
            </el-form-item>
            <el-form-item label="派送完成时间：" style="width: 24%">
              <span>{{ pickuppailist.estimatedEndTime }}</span>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      style="
        width: 96%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 30px;
        margin-left: 20px;
      "
    >
      <el-collapse accordion v-model="activeName5">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="width: 100%; margin-left: 50px"><h3>运输信息</h3></div>
            、
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      style="
        width: 96%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 30px;
        margin-left: 20px;
      "
    >
      <el-collapse accordion v-model="activeName6">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="width: 100%; margin-left: 50px"><h3>订单轨迹</h3></div>
            、
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <baidu-map class="map" center="中国">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
      </baidu-map>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){

        return{
            activeName:"1",
            activeName1:"1",
            activeName2:"1",
            activeName3:"1",
            activeName4:"1",
            activeName5:"1",
            activeName6:"1",
            dialogVisible: false,
            tableData:[],
            id:[],
            pickuplist:[],
            pickuppailist:[],
            arealist:[]       
        }
    },

    methods:{

        show(){
            this.id = JSON.parse(this.$route.query.data);   
            this.axios.post("/api/oms/pd-order-cargo/findOrderCargoOne",this.id).then(res => {    
                if (res.data.code == 11051) {
                    this.$Message.error(res.data.msg);
                    this.$router.push({path:"/index/order"});
                    }else{
                   
                        this.tableData=res.data;
                    }       
            
          })
          this.axios.post("/api/aggregation/pd-area/findarea").then(res => {
                   
                   this.arealist =res.data;  
                
                })       
        },
        showpickupshou(){
            this.axios.post("/api/aggregation/pd-task-pickup-dispatch/findPickupOne",this.id).then(res => {    
                if (res.data.code == 11051) {
                    this.$Message.error(res.data.msg);
                    this.$router.push({path:"/index/driverOrder"});
                    }else{
                        this.pickuplist=res.data;
                    }      
            
          })
        }, 
        showpickuppai(){
            this.axios.post("/api/aggregation/pd-task-pickup-dispatch/findPickuppaiOne",this.id).then(res => {  
                if (res.data.code == 11051) {
                    this.$Message.error(res.data.msg);
                    this.$router.push({path:"/index/driverOrder"});
                    }else{
                        this.pickuppailist=res.data;
                    }        
            
          })
        },      
    },
    created() {
    this.show();
    this.showpickupshou();
    this.showpickuppai();
  },
  }
</script>

<style>
.map {
  width: 100%;
  height: 800px;
}
</style>
