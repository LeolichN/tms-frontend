<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="所属机构">
          <el-select v-model="search.agencyId" placeholder="请选择">
            <el-option label="--请选择--" :value="0">--请选择--</el-option>
            <el-option v-for="(data, index) in TruckType" :key="index" :label="data.name" :value="data.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车队名称：">
          <el-input v-model="search.name" placeholder="请输入车队名称："></el-input>
        </el-form-item>
        <el-form-item>

          <el-button style="background-color: #E05635;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
            @click="findFleetByName">{{ $t('table.search') }}</el-button>
          <el-button style="background-color: #fff;color: #606266;border-radius: 5px;border-color: #DCDFE6;"
            @click="reset">{{ $t('table.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never" style="margin-top: 10px;">
      <div style="margin-left: 5%">
        <el-button type="primary" @click="modal = true"
          style="background-color: #E05635;color: #fff;border-radius: 5px;border-color: #DCDFE6;">添加车队</el-button>
      </div>
      <el-table :data="tableData.items" style="width: 100%" max-height="500px"
        :header-cell-style="{ background: '#FCFBFF', border: '0' }" fit>
        <el-table-column fixed prop="id" label="车队编号"> </el-table-column>
        <el-table-column prop="name" label="车队名称"> </el-table-column>
        <el-table-column prop="agencyId" label="机构id"> </el-table-column>
        <el-table-column prop="agencyName" label="所属机构"> </el-table-column>
        <el-table-column prop="manager" label="负责人"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updFleet(scope.row), (modal1 = true)">
              修改
            </el-button>
            <el-button type="text" size="small" @click="deleteTruck(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="true" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page.sync="tableData.current" :page-sizes="[1, 5, 10, 100]" :limit.sync="tableData.size"
        :total="Number(tableData.total)" @pagination="findFleetByName">
      </pagination>
      <el-dialog :close-on-click-modal="false" :visible.sync="modal" title="添加车队">
        <el-form :model="pdFleet1" label-position="left" :label-width="100">
          <el-form-item label="车队编号">
            <el-input v-model="pdFleet1.id"> </el-input>
          </el-form-item>
          <el-form-item label="所属机构" prop="agencyId">
            <el-tree ref="orgTree" v-model="pdFleet1.agencyId" :check-strictly="true" :data="orgList" node-key="id"
              :expand-on-click-node="false" highlight-current :default-checked-keys="pdFleet.agencyId"
              :default-expanded-keys="pdFleet.agencyId" show-checkbox />
          </el-form-item>
          <el-form-item label="车队名称">
            <el-input v-model="pdFleet1.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="pdFleet1.manager"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button plain type="warning" @click="modal = false">{{ $t('common.cancel') }}</el-button>
          <el-button plain type="primary" @click="addFleetById">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </el-card>

    <!--  model  -->

    <el-dialog :visible.sync="modal1" title="添加车队" top="50px">
      <el-form :model="pdFleet" label-position="left" :label-width="100">
        <el-form-item label="车队编号">
          <el-input v-model="pdFleet.id"> </el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="orgList">
          <el-tree ref="orgTree" :check-strictly="true" :data="orgList" v-model="pdFleet.agencyId"
            :default-checked-keys="pdFleet.agencyId" :default-expanded-keys="pdFleet.agencyId"
            :expand-on-click-node="false" highlight-current node-key="id" show-checkbox />
        </el-form-item>
        <el-form-item label="车队名称">
          <el-input v-model="pdFleet.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="pdFleet.manager"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button plain type="warning" @click="modal = false">{{ $t('common.cancel') }}</el-button>
        <el-button plain type="primary" @click="updFleet1">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TruckApi from '@/api/Truck.js'
import orgApi from '@/api/Org.js'
export default {
  components: { Pagination },
  data() {
    return {
      pdFleet: {
      },
      orgList: [],
      pdFleet1: {},
      modal: false,
      modal1: false,
      TruckType: [],
      FleetList: [],
      search: {},
      tableData: {
        total: 0,
        current: 1,
        size: 5,
      }, //分页查询
    };
  },
  methods: {
    initOrg() {
      orgApi.allTree({ status: true }).then(response => {
        const res = response.data

        this.orgList = res.data
      })
    },
    //点击修改将表格值传进去
    updFleet(i) {
      this.pdFleet = i;
    },
    //修改
    updFleet1() {
      TruckApi.upFleet(
        this.pdFleet
      ).then(() => {
        this.findFleetByName();
      });
    },
    //查询
    findFleetByName(params = {}) {
      params.size = this.tableData.size
      params.current = this.tableData.current
      TruckApi.Fleetlist(params).then(response => {
        this.tableData = response.data
      })
    },
    //删除
    deleteTruck(i) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          TruckApi.delFleet(i)
        })
    },
    addFleetById() {
      TruckApi.saveFleet(
        this.pdFleet1
      )
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
      this.findFleetByName({ ...this.search });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableData.current = val;
      this.findFleetByName({ ...this.search });
    },
  },
  created() {
    this.initOrg()
    this.findFleetByName();
  },
};
</script>

<style lang="scss" scoped></style>
