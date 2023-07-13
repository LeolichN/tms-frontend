<template>
  <div>
    <div class="top">
      <div class="top_from">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-form-item label="线路编号：">
            <el-input
              v-model="page.search.lineNumber"
              placeholder="请输入线路编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="线路名称：">
            <el-input
              v-model="page.search.name"
              placeholder="请输入线路名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="线路类型：">
            <el-select
              v-model="page.search.transportLineTypeId"
              placeholder="请选择"
            >
              <el-option
                v-for="(data, index) in TransportLineTypeList"
                :key="index"
                :label="data.name"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryPageTransportLine"
              >查询</el-button
            >
            <el-button type="" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="centen">
      <div style="margin-left: 5%">
        <Button type="info" @click="modal = true">新增线路</Button>
      </div>
      <hr />
      <el-table
        :data="TransportLineList"
        style="width: 100%"
        max-height="500px"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="handleExpandChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              height="250"
              :data="scope.row.transportTripsList"
              element-loading-text="拼命加载中"
              style="width: 1000px; margin-left: 5%"
            >
              <el-table-column prop="name" label="车次名称" width="180">
              </el-table-column>
              <el-table-column
                prop="departureTime"
                label="发车频次"
                width="180"
              >
              </el-table-column>
              <el-table-column label="到达时间" width="180">
                <template slot-scope="scope">
                  <span>/{{ scope.row.period }}</span>
                </template>
              </el-table-column>
              <el-table-column label="车俩司机安排" width="180">
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.licensePlate }}--{{
                      scope.row.userName
                    }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    @click="
                      UpdatetransportTripsData = scope.row;
                      UpdateTransportTripsmodal = true;
                    "
                    type="text"
                    >编辑车次</el-button
                  >
                  <el-button
                    @click="
                      deleteTransportTrips(scope.row.id, scope.row.tttpId)
                    "
                    type="text"
                    >删除车次</el-button
                  >
                  <el-button
                    @click="
                      queryFleetList(scope.row);
                      vv(scope.row.parentData)
                      trucksmodal = true;
                    "
                    type="text"
                    >安排车俩</el-button
                  >
                  <el-button
                    @click="
                      detailsmodal = true;

                      queryFleetList(scope.row);
                    "
                    type="text"
                    >安排司机</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column prop="lineNumber" label="线路编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="线路名称" width="150">
        </el-table-column>
        <el-table-column
          prop="transportLineTypeId"
          label="线路类型"
          width="150"
        >
          <template slot-scope="scope">
            {{
              scope.row.transportLineTypeId
                | TransportLineTypeFilter(TransportLineTypeList)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="startAgencyId" label="起始地机构" width="150">
          <template slot-scope="scope">
            {{ scope.row.startAgencyId | orgFilter(orgList) }}
          </template>
        </el-table-column>
        <el-table-column prop="endAgencyId" label="终点地机构" width="150">
          <template slot-scope="scope">
            {{ scope.row.endAgencyId | orgFilter(orgList) }}
          </template>
        </el-table-column>
        <el-table-column prop="distance" label="距离（千米）" width="150">
        </el-table-column>
        <el-table-column prop="cost" label="平均成本（元）" width="150">
        </el-table-column>
        <el-table-column
          prop="estimatedTime"
          label="预计时间（分钟）"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="allowableLoad" label="线路地图" width="150">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-location-outline"
              @click="map(scope.row)"
              type="text"
              >地图</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="
                updateTransportLineData = scope.row;
                modal2 = true;
              "
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteTransportLine(scope.row)"
            >
              移除
            </el-button>
            <el-button
              @click="
                TransportTripsmodal = true;
                transportTripsData.TransportLineName = scope.row.name;
                transportTripsData.transportLineId = scope.row.id;
              "
              type="text"
              size="small"
            >
              增加车次
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[1, 5, 10, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!--  model  -->
    <div>
      <Modal
        v-model="detailsmodal"
        title="安排司机"
        @on-ok="arrangeDetails"
        @on-cancel="cancel"
      >
        <Form :model="UpdatetransportTripsData" :label-width="100">
          <FormItem label="车次名称" prop="name">
            <Input
              v-model="UpdatetransportTripsData.name"
              placeholder="名称"
            ></Input>
          </FormItem>
          <FormItem label="发车时间">
            <Input
              disabled
              v-model="UpdatetransportTripsData.departureTime"
              placeholder="Enter your name"
            ></Input>
          </FormItem>
          <FormItem label="安排司机">
            <el-select
              v-model="UpdatetransportTripsData.userId"
              placeholder="请选择"
            >
              <el-option-group
                v-for="group in FleetList"
                :key="group.id"
                :label="group.name"
              >
                <el-option
                  v-for="item in group.pdAuthUsers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        v-model="trucksmodal"
        title="安排车俩"
        @on-ok="arrangeTruck"
        @on-cancel="cancel"
      >
        <Form :model="UpdatetransportTripsData" :label-width="100">
          <FormItem label="车次名称" prop="name">
            <Input
              v-model="UpdatetransportTripsData.name"
              placeholder="名称"
            ></Input>
          </FormItem>
          <FormItem label="发车时间">
            <Input
              disabled
              v-model="UpdatetransportTripsData.departureTime"
              placeholder="Enter your name"
            ></Input>
          </FormItem>
          <FormItem label="安排车俩">
            <el-select
              v-model="UpdatetransportTripsData.truckId"
              placeholder="请选择"
            >
              <el-option-group
                v-for="group in FleetList"
                :key="group.id"
                :label="group.name"
              >
                <el-option
                  v-for="item in group.pdTrucks"
                  :key="item.id"
                  :label="item.licensePlate"
                  :value="item.id"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        v-model="UpdateTransportTripsmodal"
        title="修改车次"
        @on-ok="updatePdTransportTrips"
        @on-cancel="cancel"
      >
        <Form :model="UpdatetransportTripsData" :label-width="100">
          <!-- <FormItem label="线路名称" prop="TransportLineName">
            <Input
              disabled
              v-model="UpdatetransportTripsData.TransportLineName"
              placeholder="Enter your name"
            ></Input>
          </FormItem> -->
          <FormItem label="车次名称" prop="name">
            <Input
              v-model="UpdatetransportTripsData.name"
              placeholder="名称"
            ></Input>
          </FormItem>
          <FormItem label="发车时间">
            <Row>
              <Col span="11">
                <TimePicker
                  type="time"
                  placeholder="请选择发车时间"
                  v-model="UpdatetransportTripsData.departureTime"
                ></TimePicker>
              </Col>
              <Col span="2" style="text-align: center"> </Col>
              <Col span="11">
                <Select
                  v-model="UpdatetransportTripsData.period"
                  style="width: 178px"
                >
                  <Option :value="1">天</Option>
                  <Option :value="2">周</Option>
                  <Option :value="3">月</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        v-model="TransportTripsmodal"
        title="增加车次"
        @on-ok="addPdTransportTrips"
        @on-cancel="cancel"
      >
        <Form :model="transportTripsData" :label-width="100">
          <FormItem label="线路名称" prop="TransportLineName">
            <Input
              disabled
              v-model="transportTripsData.TransportLineName"
              placeholder="Enter your name"
            ></Input>
          </FormItem>
          <FormItem label="车次名称" prop="name">
            <Input v-model="transportTripsData.name" placeholder="名称"></Input>
          </FormItem>
          <FormItem label="发车时间">
            <Row>
              <Col span="11">
                <TimePicker
                  type="time"
                  placeholder="请选择发车时间"
                  v-model="transportTripsData.departureTime"
                ></TimePicker>
              </Col>
              <Col span="2" style="text-align: center"> </Col>
              <Col span="11">
                <Select
                  v-model="transportTripsData.period"
                  style="width: 178px"
                >
                  <Option :value="1">天</Option>
                  <Option :value="2">周</Option>
                  <Option :value="3">月</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>

      <!-- 查看地图> -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="50%"
        center
      >
        <baidu-map
          class="map"
          style="display: flex; flex-direction: column"
          center="北京"
        >
          <bm-view style="width: 100%; height: 100px; flex: 1"></bm-view>
          <bm-driving
            :start="startCity"
            :end="endCity"
            :auto-viewport="true"
            :panel="false"
          >
          </bm-driving>
        </baidu-map>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 修改线路信息 -->
      <Modal
        v-model="modal2"
        title="修改线路信息"
        @on-ok="updataTransportLine"
        @on-cancel="cancel"
      >
        <Form
          :model="updateTransportLineData"
          label-position="left"
          :label-width="100"
        >
          <FormItem label="线路编号">
            <Input v-model="updateTransportLineData.lineNumber"></Input>
          </FormItem>
          <FormItem label="线路名称">
            <Input v-model="updateTransportLineData.name"></Input>
          </FormItem>
          <FormItem label="线路类型">
            <Select v-model="updateTransportLineData.transportLineTypeId">
              <Option
                v-for="(data, index) in TransportLineTypeList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="起始机构类型">
            <Select v-model="updateTransportLineData.startAgencyId">
              <Option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="终点机构类型">
            <Select v-model="updateTransportLineData.endAgencyId">
              <Option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="距离">
            <Input v-model="updateTransportLineData.distance">
              <template slot="append">千米</template></Input
            >
          </FormItem>
          <FormItem label="成本">
            <Input v-model="updateTransportLineData.cost">
              <template slot="append">元</template>
            </Input>
          </FormItem>
          <FormItem label="分钟">
            <Input v-model="updateTransportLineData.estimatedTime">
              <template slot="append">分钟</template>
            </Input>
          </FormItem>
        </Form>
      </Modal>
      <!-- 添加线路信息 -->
      <Modal
        v-model="modal"
        title="添加线路信息"
        @on-ok="addTransportLine"
        @on-cancel="cancel"
      >
        <Form
          :model="addTransportLineData"
          label-position="left"
          :label-width="100"
        >
          <FormItem label="线路编号">
            <Input v-model="addTransportLineData.lineNumber"></Input>
          </FormItem>
          <FormItem label="线路名称">
            <Input v-model="addTransportLineData.name"></Input>
          </FormItem>
          <FormItem label="线路类型">
            <Select v-model="addTransportLineData.transportLineTypeId">
              <Option
                v-for="(data, index) in TransportLineTypeList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="起始机构类型">
            <Select v-model="addTransportLineData.startAgencyId">
              <Option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="终点机构类型">
            <Select v-model="addTransportLineData.endAgencyId">
              <Option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="距离">
            <Input v-model="addTransportLineData.distance">
              <template slot="append">千米</template></Input
            >
          </FormItem>
          <FormItem label="成本">
            <Input v-model="addTransportLineData.cost">
              <template slot="append">元</template>
            </Input>
          </FormItem>
          <FormItem label="分钟">
            <Input v-model="addTransportLineData.estimatedTime">
              <template slot="append">分钟</template>
            </Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FleetList: [],
      pd_transport_trips_truck_driver: {
        truckId: "",
      },
      startCity: { lng: "", lat: "" },
      endCity: { lng: "", lat: "" },
      transportTripsData: {
        TransportLineName: "",
        name: "",
        transportLineId: "",
        period: 1,
        departureTime: "",
      },
      UpdatetransportTripsData: {
        TransportLineName: "",
        name: "",
        transportLineId: "",
        period: 1,
        departureTime: "",
      },
      center: { lng: 0, lat: 0 },
      zoom: 3,
      centerDialogVisible: false,
      addTransportLineData: {},
      TransportTripsmodal: false,
      UpdateTransportTripsmodal: false,
      trucksmodal: false,
      detailsmodal: false,
      transportTripsList: [],
      modal: false,
      modal2: false,
      updateTransportLineData: {},
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 5,
        search: {},
      },
      expands: [],
      getRowKeys(row) {
        return row.id;
      },
      TransportLineTypeList: [],
      orgList: [],
      TransportLineList: [],
      value: "",
    };
  },
  methods: {
    vv(data){
        console.log(data);
    },
    //删除车次
    deleteTransportTrips(id, tttpid) {
      console.log(id + "===" + tttpid);
      this.axios
        .post(
          "/api/base/pd_transport_trips/deleteTransportTripsById/" +
            id +
            "/" +
            tttpid
        )
        .then((result) => {
          this.$message.success("删除成功");
          this.queryPageTransportLine();
        });
    },
    //安排司机
    arrangeDetails() {
      console.log(this.UpdatetransportTripsData);
      this.pd_transport_trips_truck_driver.transportTripsId =
        this.UpdatetransportTripsData.id;
      this.pd_transport_trips_truck_driver.userId =
        this.UpdatetransportTripsData.userId;
      console.log(this.pd_transport_trips_truck_driver);
      // this.axios.post("/api/base/pd-transport-trips-truck-driver/updateTransport_trips_truck_driver",this.pd_transport_trips_truck_driver)
      // .then(result=>{
      //   this.$message.success("操作成功")
      //   this.queryPageTransportLine();
      // })
    },
    //安排车俩
    arrangeTruck() {
      // console.log(this.UpdatetransportTripsData);
      this.pd_transport_trips_truck_driver.transportTripsId =
        this.UpdatetransportTripsData.id;
      this.pd_transport_trips_truck_driver.truckId =
        this.UpdatetransportTripsData.truckId;
      console.log(this.pd_transport_trips_truck_driver);
      this.axios
        .post(
          "/api/base/pd-transport-trips-truck-driver/updateTransport_trips_truck_driver",
          this.pd_transport_trips_truck_driver
        )
        .then((result) => {
          this.$message.success("操作成功");
          this.queryPageTransportLine();
        });
    },
    //查询车队下的车俩与司机
    queryFleetList(data) {
      this.UpdatetransportTripsData = data;
      this.pd_transport_trips_truck_driver.truckId =
        this.UpdatetransportTripsData.truckId;
      if (this.FleetList.length == 0) {
        this.axios
          .get("/api/base/pd_fleet/queryFleetAndTruckAndUser")
          .then((result) => {
            // console.log(result.data);
            this.FleetList = result.data;
          });
      }
    },
    //地图
    map(data) {
      this.orgList.forEach((element) => {
        if (data.startAgencyId == element.id) {
          // console.log(element);
          this.startCity.lat = element.latitude;
          this.startCity.lng = element.longitude;
          return;
        }
        if (data.endAgencyId == element.id) {
          this.endCity.lat = element.latitude;
          this.endCity.lng = element.longitude;
          return;
        }
      });
      this.centerDialogVisible = true;
    },
    //修改车次
    updatePdTransportTrips() {
      this.UpdatetransportTripsData;
      this.axios
        .post(
          "/api/base/pd_transport_trips/updateTransportTripsBy",
          this.UpdatetransportTripsData
        )
        .then((result) => {
          this.$message.success("修改成功");
          this.queryPageTransportLine();
        });
    },
    // 展开行
    handleExpandChange(row, expandedRows) {
      var that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (row) {
          that.expands.push(row.id);
        }
      } else {
        that.expands = [];
      }
      // 该处是用于判断是展开还是收起行，只有展开的时候做请求，避免多次请求！
      // 展开的时候expandedRows有值，收起的时候为空.

      // 遍历当前页面表
      this.TransportLineList.forEach((temp, index) => {
        // 找到当前点击的行，把动态获取到的数据赋值进去
        if (temp.id === row.id) {
          this.axios
            .get(
              "/api/base/pd_transport_trips/queryTransportTripsByTransportLineId/" +
                row.id
            )
            .then((result) => {
              // console.log(result.data);
              this.TransportLineList[index].transportTripsList = result.data;
            });
        }
      });
    },
    //添加车次
    addPdTransportTrips() {
      // console.log(this.transportTripsData);
      this.axios
        .post(
          "/api/base/pd_transport_trips/addPdTransportTrips",
          this.transportTripsData
        )
        .then((result) => {
          this.$message.success("添加车次成功");
          this.queryPageTransportLine();
        })
        .catch((error) => {});
    },
    handler({ BMap, map }) {
      console.log(BMap, map);
      const startPoint = BMap.Point(this.startCity.lat, this.startCity.lng);
      const endPoint = BMap.Point(this.endCity.lat, this.endCity.lng);
      const driving = BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true,
        },
      });
      根据起点和终点坐标进行路线规划;
      driving.search(startPoint, endPoint);
    },
    //修改线路
    updataTransportLine() {
      console.log(this.updateTransportLineData);
      this.axios
        .post(
          "/api/base/pd_transport_line/updataTransportLine",
          this.updateTransportLineData
        )
        .then((result) => {
          if (result.data.flag) {
            this.$Message.success("修改成功");
            this.queryPageTransportLine();
          }
        })
        .catch((error) => {
          this.$Message.error("修改失败：" + error);
        });
    },
    //删除线路
    deleteTransportLine(data) {
      this.$confirm("此操作将删除该线路, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get(
              "/api/base/pd_transport_line/deleteTransportLine?id=" + data.id
            )
            .then((result) => {
              if (result.data.flag) {
                this.$Message.success("删除成功");
                this.queryPageTransportLine();
              }
            })
            .catch((error) => {
              this.$Message.error("删除失败：" + error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加线路
    addTransportLine() {
      console.log(this.addTransportLineData);

      this.axios
        .post(
          "/api/base/pd_transport_line/addTransportLine",
          this.addTransportLineData
        )
        .then((result) => {
          if (result.data.flag) {
            this.$Message.success("添加成功");
            this.queryPageTransportLine();
          }
        })
        .catch((error) => {
          this.$Message.error("添加失败：" + error);
        });
    },
    cancel() {
      this.$Message.info("取消操作");
    },
    reset() {
      this.page.search = {};
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.queryPageTransportLine();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.queryPageTransportLine();
    },
    // 查询机构类型
    queryAllOrg() {
      this.axios
        .post("/api/base/pd_transport_line_type/queryPdOrg")
        .then((resule) => {
          this.orgList = resule.data.data;
        });
    },
    //查询线路类型
    queryAllTransportLineType() {
      this.axios
        .get("/api/base/pd_transport_line_type/queryAllTransportLineType")
        .then((result) => {
          console.log(result);
          this.TransportLineTypeList = result.data;
        });
    },
    //查询线路
    queryPageTransportLine() {
      console.log(this.page);
      this.axios
        .post("/api/base/pd_transport_line/queryPageTransportLine", this.page)
        .then((result) => {
          // console.log(resule);
          if (result.data != "") {
            for (let index = 0; index < result.data.data.list.length; index++) {
              result.data.data.list[index].transportTripsList = [];
            }
            this.TransportLineList = result.data.data.list;
            this.total = result.data.data.total;
          }
        });
    },
  },
  created() {
    this.queryPageTransportLine();
    this.queryAllOrg();
    this.queryAllTransportLineType();
  },
  filters: {
    orgFilter: function (value, orgList) {
      let val = value;
      orgList.forEach((element) => {
        if (value == element.id) {
          val = element.name;
        }
      });
      return val;
    },
    TransportLineTypeFilter: function (value, list) {
      let val = value;
      list.forEach((element) => {
        val = element.name;
      });
      return val;
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
.detailsmoda_top {
  width: 15%;
  height: 500px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.paging {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
.centen {
  /* border: 1ch black solid; */
  margin: 0 auto;
  margin-top: 50px;
  width: 90%;
  /* height: 500px; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.top {
  /* border: 1ch black solid; */
  margin: 0 auto;
  width: 90%;
  height: 25%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* margin-top: 20px; */
}
.top_from {
  width: 90%;
  margin: 0 auto;
}
</style>
