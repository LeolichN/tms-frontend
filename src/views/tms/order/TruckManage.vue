<template>
  <div>
    <div class="top">
      <div class="top_from">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-form-item label="车俩类型：">
            <el-select v-model="page.search.truckTypeId" placeholder="请选择">
              <el-option
                v-for="(data, index) in TruckType"
                :key="index"
                :label="data.name"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车队名称：">
            <el-select v-model="page.search.fleetId" placeholder="请选择">
              <el-option
                v-for="(data, index) in FleetList"
                :key="index"
                :label="data.name"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号码：">
            <el-input
              v-model="page.search.licensePlate"
              placeholder="请输入车牌号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryPageTruck">查询</el-button>
            <el-button type="" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="centen">
      <div style="margin-left: 5%">
        <Button type="info" @click="modal = true">添加车俩</Button>
      </div>
      <hr />
      <el-table :data="TruckList" style="width: 100%" max-height="500px">
        <el-table-column fixed prop="id" label="车俩编号" width="150">
        </el-table-column>
        <el-table-column prop="truckTypeName" label="车俩类型" width="120">
        </el-table-column>
        <el-table-column prop="licensePlate" label="车牌号码" width="120">
        </el-table-column>
        <el-table-column prop="fleetName" label="车队名称" width="120">
        </el-table-column>
        <el-table-column prop="deviceGpsId" label="GPS" width="180">
        </el-table-column>
        <el-table-column prop="allowableLoad" label="准载重量" width="120">
        </el-table-column>
        <el-table-column prop="allowableVolume" label="准载体积" width="120">
        </el-table-column>
        <el-table-column prop="validityPeriod" label="过期时间" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.validityPeriod | validityPeriodFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transportTripsId" label="车次编号" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetails(scope.row)">
              查看详情
            </el-button>
            <el-button type="text" size="small" @click="deleteTruck(scope.row)">
              移除
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
        v-model="modal"
        title="添加车俩"
        @on-ok="addTruck"
        @on-cancel="cancel"
      >
        <Form :model="commitTruck" label-position="left" :label-width="100">
          <FormItem label="车俩类型">
            <Select v-model="commitTruck.truckTypeId">
              <Option
                v-for="(data, index) in TruckType"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="车牌号码">
            <Input v-model="commitTruck.licensePlate"></Input>
          </FormItem>
          <FormItem label="所属车队">
            <Select v-model="commitTruck.fleetId">
              <Option
                v-for="(data, index) in FleetList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="品牌">
            <Input v-model="commitTruck.brand"></Input>
          </FormItem>
          <FormItem label="GPS设备ID">
            <Input v-model="commitTruck.deviceGpsId"></Input>
          </FormItem>
          <FormItem label="准载重量">
            <Input v-model="commitTruck.allowableLoad">
              <template slot="append">千克</template>
            </Input>
          </FormItem>
          <FormItem label="准载体积">
            <Input v-model="commitTruck.allowableVolume">
              <template slot="append">方</template>
            </Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      commitTruck: {},
      modal: false,

      total: 0,
      page: {
        pageNum: 1,
        pageSize: 5,
        search: {},
      },
      TruckType: [],
      FleetList: [],
      TruckList: [],
    };
  },
  methods: {
    viewDetails(dd) {
      this.$router.push({
        path: "/index/TruckDetails/",
        query: { data: JSON.stringify(dd) },
      });
    },
    deleteTruck(data) {
      this.$confirm("此操作将删除该车俩, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get("/api/base/pd_truck/deleteTruck?id=" + data.id)
            .then((result) => {
              if (result.data.flag) {
                this.$Message.success("删除成功");
                this.queryPageTruck();
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
    addTruck() {
      this.axios
        .post("/api/base/pd_truck/addTruck", this.commitTruck)
        .then((result) => {
          if (result.data.flag) {
            this.$Message.success("添加成功");
            this.queryPageTruck();
          }
        })
        .catch((error) => {
          this.$Message.error("添加失败：" + error);
        });
    },
    cancel() {
      this.$Message.info("取消添加");
    },
    reset() {
      this.page.search = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.queryPageTruck();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.queryPageTruck();
    },
    queryAllTruckType() {
      this.axios
        .post("/api/base/pd_truck_type/queryAllTruckType")
        .then((resule) => {
          this.TruckType = resule.data.data;
        });
    },
    queryAllFleet() {
      this.axios.post("/api/base/pd_fleet/queryAllFleet").then((resule) => {
        this.FleetList = resule.data.data;
      });
    },
    queryPageTruck() {
      this.axios
        .post("/api/base/pd_truck/queryPageTruck", this.page)
        .then((resule) => {
          console.log(resule);
          this.TruckList = resule.data.data.list;
          this.total = resule.data.data.total;
        });
    },
  },
  created() {
    this.queryAllTruckType();
    this.queryAllFleet();
    this.queryPageTruck();
  },
  filters: {
    validityPeriodFilter: function (value) {
      let isBefore = moment(moment(new Date()).format("YYYY-MM-DD")).isBefore(
        moment(value).format("YYYY-MM-DD")
      );
      return isBefore == true ? "未过期" : "已过期";
    },
  },
};
</script>

<style>
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
