<template>
  <div>
    <div class="top">
      <div class="top_from">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-form-item label="司机名称：">
            <el-input
              v-model="page.search.name"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属车队：">
            <el-select v-model="page.search.fleetId" placeholder="请选择">
              <el-option
                v-for="(data, index) in FleetList"
                :key="index"
                :label="data.name"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryPageTruckDriver"
              >查询</el-button
            >
            <el-button type="" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="centen">
      <el-table :data="TruckDriverList" style="width: 100%" max-height="500px">
        <el-table-column fixed prop="id" label="司机编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="司机名称" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="司机电话" width="120">
        </el-table-column>
        <el-table-column prop="orgName" label="所属机构" width="120">
        </el-table-column>
        <el-table-column prop="fleetName" label="所属车队" width="300">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetails(scope.row)">
              查看详情
            </el-button>
            <el-button
              type="text"
              @click="
                centerDialogVisible = true;
                form = scope.row;
              "
              size="small"
            >
              编辑车队
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
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="司机名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="司机车队">
            <el-select v-model="form.fleetId" placeholder="请选择车队">
              <el-option
                v-for="item in FleetList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              centerDialogVisible = false;
              updateFleet();
            "
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      centerDialogVisible: false,
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 5,
        search: {},
      },
      FleetList: [],
      TruckDriverList: [],
    };
  },
  methods: {
    //编辑车队
    updateFleet() {
      this.axios
        .post(
          "/api/base/pd-truck-driver/updateFleetByUserId/" +
            this.form.id +
            "/" +
            this.form.fleetId
        )
        .then((resule) => {
          this.$message.success("修改成功");
          this.queryPageTruckDriver();
        });
    },
    //跳转详情页
    viewDetails(dd) {
      this.$router.push({
        path: "/index/TruckDriverDetails/",
        query: { data: JSON.stringify(dd) },
      });
    },
    //清空
    reset() {
      this.page.search = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.queryPageTruckDriver();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.queryPageTruckDriver();
    },
    //查询车队
    queryAllFleet() {
      this.axios.post("/api/base/pd_fleet/queryAllFleet").then((resule) => {
        this.FleetList = resule.data.data;
      });
    },
    //查询司机
    queryPageTruckDriver() {
      this.axios
        .post("/api/base/pd-truck-driver/queryPageTruckDriver", this.page)
        .then((resule) => {
          console.log(resule);
          this.TruckDriverList = resule.data.list;
          this.total = resule.data.total;
        });
    },
  },
  created() {
    this.queryAllFleet();
    this.queryPageTruckDriver();
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
