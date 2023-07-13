<template>
  <div>
    <div class="top">
      <div class="top_from">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-form-item label="车型名称：">
            <el-input
              v-model="page.search.name"
              placeholder="请输入车型名称："
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="findTruckType">查询</el-button>
            <el-button type="" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="centen">
      <div style="margin-left: 5%">
        <Button type="info" @click="modal = true">添加车型</Button>
      </div>
      <hr />
      <el-table :data="TruckTypeList" style="width: 100%" max-height="500px">
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
            <el-button
              type="text"
              size="small"
              @click="
                selectTruckType(scope.row);
                modal1 = true;
              "
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteTruck(scope.row.id)"
            >
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
        title="添加车型"
        @on-ok="addTruckType"
        @on-cancel="cancel"
      >
        <Form :model="TruckType1" label-position="left" :label-width="100">
          <FormItem label="车型编号">
            <Input v-model="TruckType1.id"></Input>
          </FormItem>
          <FormItem label="车型名称">
            <Input v-model="TruckType1.name"></Input>
          </FormItem>
          <FormItem label="准载重量">
            <Input v-model="TruckType1.allowableLoad"></Input>
          </FormItem>
          <FormItem label="准载体积">
            <Input v-model="TruckType1.allowableVolume"></Input>
          </FormItem>
          <FormItem label="长">
            <Input v-model="TruckType1.measureLong"></Input>
          </FormItem>
          <FormItem label="宽">
            <Input v-model="TruckType1.measureWidth"></Input>
          </FormItem>
          <FormItem label="高">
            <Input v-model="TruckType1.measureHigh"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>

    <!--  model1  -->
    <div>
      <Modal
        v-model="modal1"
        title="修改车型"
        @on-ok="updTruckType"
        @on-cancel="cancel1"
      >
        <Form :model="TruckType" label-position="left" :label-width="100">
          <FormItem label="车型编号">
            <Input v-model="TruckType.id" readonly></Input>
          </FormItem>
          <FormItem label="车型名称">
            <Input v-model="TruckType.name"></Input>
          </FormItem>
          <FormItem label="准载重量">
            <Input v-model="TruckType.allowableLoad"></Input>
          </FormItem>
          <FormItem label="准载体积">
            <Input v-model="TruckType.allowableVolume"></Input>
          </FormItem>
          <FormItem label="长">
            <Input v-model="TruckType.measureLong"></Input>
          </FormItem>
          <FormItem label="宽">
            <Input v-model="TruckType.measureWidth"></Input>
          </FormItem>
          <FormItem label="高">
            <Input v-model="TruckType.measureHigh"></Input>
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
      TruckType: {}, //修改
      TruckType1: {}, //添加
      modal: false, //添加模态框
      modal1: false, //修改模态框
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 5,
        search: {},
      },
      TruckTypeList: [], //分页查询
    };
  },
  methods: {
    //   //点击修改将表格值传进去
    async selectTruckType(i) {
      this.TruckType = i;
      console.log(this.TruckType);
    },
    //   //修改
    async updTruckType() {
      try {
        const result = await this.axios.post(
          "/api/base/pd_truck_type/updTruckTypeById",
          this.TruckType
        );
        if (result) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.findTruckType();
        } else {
          this.$message({
            type: "info",
            message: "修改失败!",
          });
          this.findTruckType();
        }
      } catch (error) {
        console.error(error);
      }
    },

    //查询
    async findTruckType() {
      try {
        const result = await this.axios.post(
          "/api/base/pd_truck_type/findTruckType",
          this.page
        );
        console.log(result.data);

        if (result.data.code == 11051) {
          this.$Message.error(result.data.msg);
          }else{
            this.TruckTypeList = result.data.list;
            this.total = result.data.total;
          }
      } catch (error) {
        console.error(error);
      }
    },
    //   //删除
    async deleteTruck(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          try {
            const result = this.axios.get(
              "/api/base/pd_truck_type/delTruckTypeById",
              {
                params: {
                  id: i,
                },
              }
            );
            if (result) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.findTruckType();
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
    //添加
    async addTruckType() {
      var result = await this.axios.post(
        "/api/base/pd_truck_type/addTruckType",
        this.TruckType1
      );
      console.log(result);
      if (result.data.code == 11051) {
          this.$Message.error(result.data.msg);
          }else{
            this.findTruckType();
          this.$Message.success("成功新增一条数据!");
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
      this.findTruckType();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.findTruckType();
    },
  },
  created() {
    this.findTruckType();
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
