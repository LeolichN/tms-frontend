<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="车俩类型：">
          <el-select v-model="search.truckTypeId" placeholder="请选择">
            <el-option v-for="(data, index) in TruckType" :key="index" :label="data.name" :value="data.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车队名称：">
          <el-select v-model="search.fleetId" placeholder="请选择">
            <el-option v-for="(data, index) in FleetList" :key="index" :label="data.name" :value="data.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号码：">
          <el-input v-model="search.licensePlate" placeholder="请输入车牌号"></el-input>
        </el-form-item>
        <el-form-item>

          <el-button style="background-color: #E05635;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
            @click="queryPageTruck">{{ $t('table.search') }}</el-button>
          <el-button style="background-color: #fff;color: #606266;border-radius: 5px;border-color: #DCDFE6;"
            @click="reset">{{ $t('table.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never" style="margin-top: 10px;">
      <div style="margin-left: 5%">
        <el-button type="primary" @click="modal = true"
          style="background-color: #E05635;color: #fff;border-radius: 5px;border-color: #DCDFE6;">添加车俩</el-button>
      </div>
      <el-table :data="tableData.items" style="width: 100%" max-height="500px"
        :header-cell-style="{ background: '#FCFBFF', border: '0' }" fit>
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
      <pagination v-show="true" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page.sync="tableData.current" :page-sizes="[1, 5, 10, 100]" :limit.sync="tableData.size"
        :total="Number(tableData.total)" @pagination="queryPageTruck">
      </pagination>
      <el-dialog :close-on-click-modal="false" :visible.sync="modal" title="添加车队">
        <el-form :model="commitTruck" label-position="left" :label-width="100">
          <el-form-item label="车俩类型">
            </el-select v-model="commitTruck.truckTypeId">
              <el-option v-for="(data, index) in TruckType" :key="index" :value="data.id">{{ data.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号码">
            <el-input v-model="commitTruck.licensePlate"></el-input>
          </el-form-item>
          <el-form-item label="所属车队">
            <el-select v-model="commitTruck.fleetId">
              <el-option v-for="(data, index) in FleetList" :key="index" :value="data.id">{{ data.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-model="commitTruck.brand"></el-input>
          </el-form-item>
          <el-form-item label="GPS设备ID">
            <el-input v-model="commitTruck.deviceGpsId"></el-input>
          </el-form-item>
          <el-form-item label="准载重量">
            <el-input v-model="commitTruck.allowableLoad">
              <template slot="append">千克</template>
            </el-input>
          </el-form-item>
          <el-form-item label="准载体积">
            <el-input v-model="commitTruck.allowableVolume">
              <template slot="append">方</template>
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button plain type="warning" @click="modal = false">{{ $t('common.cancel') }}</el-button>
          <el-button plain type="primary" @click="addTruck">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TruckApi from '@/api/Truck.js'
import moment from "moment";
export default {
  components: { Pagination },
  data() {
    return {
      commitTruck: {},
      modal: false,
      TruckType: [],
      FleetList: [],
      TruckList: [],
      search: {},
      tableData: {
        total: 0,
        current: 1,
        size: 5,
      }, //分页查询
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
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          TruckApi.delFleet(data.id)
        })
    },
    addTruck() {
      TruckApi.saveTruck(
        this.commitTruck
      )
    },

    queryPageTruck(params = {}) {
      params.size = this.tableData.size
      params.current = this.tableData.current
      TruckApi.truckList(params).then(response => {
        this.tableData = response.data
      })
    },
    cancel() {
      this.$Message.info("取消添加");
    },
    cancel1() {
      this.$Message.info("取消修改");
    },
    reset() {
      this.search = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.tableData.size = val;
      this.queryPageTruck({ ...this.search });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableData.current = val;
      this.queryPageTruck({ ...this.search });
    },
    queryAllTruckType(params = {}) {
      TruckApi.truckTypelist(params).then(response => {
        this.TruckType = response.data
      })
    },
    queryAllFleet(params = {}) {
      TruckApi.Fleetlist(params).then(response => {
        this.FleetList = response.data
      })
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

<style lang="scss" scoped></style>
