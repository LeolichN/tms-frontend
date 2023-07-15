<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="车型名称：">
          <el-input v-model="search.name" placeholder="请输入车型名称："></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="background-color: #E05635;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
            @click="searchType">{{ $t('table.search') }}</el-button>
          <el-button style="background-color: #fff;color: #606266;border-radius: 5px;border-color: #DCDFE6;"
            @click="reset">{{ $t('table.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never" style="margin-top: 10px;">
      <div style="margin-left: 5%">
        <el-button type="primary" @click="modal = true"
          style="background-color: #E05635;color: #fff;border-radius: 5px;border-color: #DCDFE6;">添加车型</el-button>
      </div>
      <el-table :data="tableData.items" style="width: 100%" max-height="500px"
        :header-cell-style="{ background: '#FCFBFF', border: '0' }" fit>
        <el-table-column fixed prop="id" label="车型编号"> </el-table-column>
        <el-table-column prop="name" label="车型名称"> </el-table-column>
        <el-table-column prop="allowableLoad" label="准载重量">
        </el-table-column>
        <el-table-column prop="allowableVolume" label="准载体积">
        </el-table-column>
        <el-table-column prop="measureLong" label="长"> </el-table-column>
        <el-table-column prop="measureWidth" label="宽"> </el-table-column>
        <el-table-column prop="measureHigh" label="高"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="
              selectTruckType(scope.row);
            modal1 = true;
            " v-hasPermission="['update:truckType']">
              修改
            </el-button>
            <el-button type="text" size="small" @click="deleteTruck(scope.row.id)" v-hasPermission="['delete:truckType']">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="true" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page.sync="tableData.current" :page-sizes="[1, 5, 10, 100]" :limit.sync="tableData.size"
        :total="Number(tableData.total)" @pagination="findTruckType">
      </pagination>
      <el-dialog :close-on-click-modal="false" :visible.sync="modal" title="添加车型">
        <el-form :model="TruckType1" label-position="right" label-width="100px" ref="form">
          <el-form-item label="车型编号" prop="id">
            <el-input v-model="TruckType1.id"></el-input>
          </el-form-item>
          <el-form-item label="车型名称" prop="name">
            <el-input v-model="TruckType1.name"></el-input>
          </el-form-item>
          <el-form-item label="准载重量" prop="allowableLoad">
            <el-input v-model="TruckType1.allowableLoad"></el-input>
          </el-form-item>
          <el-form-item label="准载体积" prop="allowableLoad">
            <el-input v-model="TruckType1.allowableVolume"></el-input>
          </el-form-item>
          <el-form-item label="长">
            <el-input v-model="TruckType1.measureLong"></el-input>
          </el-form-item>
          <el-form-item label="宽">
            <el-input v-model="TruckType1.measureWidth"></el-input>
          </el-form-item>
          <el-form-item label="高">
            <el-input v-model="TruckType1.measureHigh"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button plain type="warning" @click="modal = false">{{ $t('common.cancel') }}</el-button>
          <el-button plain type="primary" @click="addTruckType">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </el-card>

    <!--  model  -->

    <el-dialog :visible.sync="modal1" title="修改车型" top="50px">
      <el-form :model="TruckType" label-position="right" :label-width="100">
        <el-form-item label="车型编号">
          <el-input v-model="TruckType.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="车型名称">
          <el-input v-model="TruckType.name"></el-input>
        </el-form-item>
        <el-form-item label="准载重量">
          <el-input v-model="TruckType.allowableLoad"></el-input>
        </el-form-item>
        <el-form-item label="准载体积">
          <el-input v-model="TruckType.allowableVolume"></el-input>
        </el-form-item>
        <el-form-item label="长">
          <el-input v-model="TruckType.measureLong"></el-input>
        </el-form-item>
        <el-form-item label="宽">
          <el-input v-model="TruckType.measureWidth"></el-input>
        </el-form-item>
        <el-form-item label="高">
          <el-input v-model="TruckType.measureHigh"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button plain type="warning" @click="modal = false">{{ $t('common.cancel') }}</el-button>
        <el-button plain type="primary" @click="upTruckType">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TruckApi from '@/api/Truck.js'
export default {
  components: { Pagination },
  data() {
    return {
      TruckType: {}, //修改
      TruckType1: {}, //添加
      modal: false, //添加模态框
      modal1: false, //修改模态框
      search: {},
      tableData: {
        total: 0,
        current: 1,
        size: 5,
      }, //分页查询
    };
  },
  methods: {
    //   //点击修改将表格值传进去
    async selectTruckType(i) {
      this.TruckType = i;
      console.log(this.TruckType);
    },
    //   //修改
    upTruckType() {
      TruckApi.updateTruckType(
        this.TruckType.id,
        this.TruckType
      ).then(() => {
        this.findTruckType();
      })
    },
    searchType() {
      this.findTruckType({ ...this.search })
    },

    //查询
    findTruckType(params = {}) {
      params.size = this.tableData.size
      params.current = this.tableData.current
      TruckApi.truckTypelist(params).then(response => {
        this.tableData = response.data
      })
    },
    //   //删除
    deleteTruck(i) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          TruckApi.delTruckType(i)
        })
    },
    //添加
    async addTruckType() {
      TruckApi.saveTruckType(
        this.TruckType1
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
      this.findTruckType({ ...this.search });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableData.current = val;
      this.findTruckType({ ...this.search });
    },
  },
  created() {
    this.findTruckType();
  },
};
</script>

<style lang="scss" scoped></style>
