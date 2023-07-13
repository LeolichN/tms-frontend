<template>
  <div>
    <div class="top">
      <div class="top_from">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-form-item label="所属机构">
            <el-select v-model="page.search.agencyId" placeholder="请选择">
              <el-option label="--请选择--" :value="0">--请选择--</el-option>
              <el-option
                v-for="(data, index) in TruckType"
                :key="index"
                :label="data.name"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车队名称：">
            <el-input
              v-model="page.search.name"
              placeholder="请输入车队名称："
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="findFleetByName">查询</el-button>
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
        <el-table-column fixed prop="id" label="车队编号"> </el-table-column>
        <el-table-column prop="name" label="车队名称"> </el-table-column>
        <el-table-column prop="agencyId" label="机构id"> </el-table-column>
        <el-table-column prop="agencyName" label="所属机构"> </el-table-column>
        <el-table-column prop="manager" label="负责人"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="updFleet(scope.row), (modal1 = true)"
            >
              修改
            </el-button>
            <el-button type="text" size="small" @click="deleteTruck(scope.row)">
              删除
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
        title="添加车队"
        @on-ok="addFleetById"
        @on-cancel="cancel"
      >
        <Form :model="pdFleet" label-position="left" :label-width="100">
          <FormItem label="车队编号">
            <Input v-model="pdFleet.id"> </Input>
          </FormItem>
          <FormItem label="所属机构">
            <Select v-model="pdFleet.agencyId">
              <Option
                v-for="(data, index) in TruckType"
                :key="index"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="车队名称">
            <Input v-model="pdFleet.name"></Input>
          </FormItem>
          <FormItem label="负责人">
            <Input v-model="pdFleet.manager"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>

    <!--  model1  -->
    <div>
      <Modal
        v-model="modal1"
        title="修改车队"
        @on-ok="updFleet1"
        @on-cancel="cancel1"
      >
        <Form :model="pdFleet1" label-position="left" :label-width="100">
          <FormItem label="车队编号">
            <Input v-model="pdFleet1.id"> </Input>
          </FormItem>
          <FormItem label="所属机构">
            <Select v-model="pdFleet1.agencyId">
              <Option
                v-for="data in TruckType"
                :key="data.id"
                :value="data.id"
                >{{ data.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="车队名称">
            <Input v-model="pdFleet1.name"></Input>
          </FormItem>
          <FormItem label="负责人">
            <Input v-model="pdFleet1.manager"></Input>
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
      pdFleet: {
        agencyId: 1,
      },
      pdFleet1: {},
      modal: false,
      modal1: false,
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
    //点击修改将表格值传进去
    async updFleet(i) {
      this.pdFleet1 = i;
      console.log(this.pdFleet1);
    },
    //修改
    async updFleet1() {
      try {
        const result = await this.axios.post(
          "/api/base/pd_fleet/updFleet1",
          this.pdFleet1
        );
        if (result) {
          this.findFleetByName();
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        } else {
          this.findFleetByName();
          this.$message({
            type: "info",
            message: "修改失败!",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async queryPdOrg() {
      try {
        const result = await this.axios.get(
          "/api/aggregation/pd-core-org/queryPdOrg"
        );
        console.log(result.data);
        this.TruckType = result.data;
      } catch (error) {
        console.error(error);
      }
    },
    //查询
    async findFleetByName() {
      try {
        const result = await this.axios.post(
          "/api/base/pd_fleet/findFleetByName",
          this.page
        );
        this.TruckList = result.data.list;
        this.total = result.data.total;
      } catch (error) {
        console.error(error);
      }
    },
    //删除
    async deleteTruck(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          try {
            const result = this.axios.get("/api/base/pd_fleet/delFleetById", {
              params: {
                id: i.id,
              },
            });
            if (result) {
              this.findFleetByName();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          } catch (error) {
            console.error(error);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async addFleetById() {
      var result = await this.axios.post(
        "/api/base/pd_fleet/addFleetById",
        this.pdFleet
      );
      if (result) {
        this.findFleetByName();
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      } else {
        this.$message({
          type: "info",
          message: "添加失败!",
        });
      }
    },
    cancel() {
      this.$Message.info("取消添加");
    },
    cancel1() {
      this.$Message.info("取消修改");
    },
    reset() {
      this.page.search = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.findFleetByName();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.findFleetByName();
    },
  },
  created() {
    this.queryPdOrg();
    this.findFleetByName();
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
