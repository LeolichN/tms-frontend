<template>
  <div>
    <div class="top">
      <div class="top_from">
        <el-form :inline="true" :model="page" class="demo-form-inline">
          <el-form-item label="类型编号：">
            <el-input
              v-model="page.search.id"
              placeholder="请输入编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型名称：">
            <el-input
              v-model="page.search.name"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构类型：">
            <el-select v-model="page.search.endAgencyType" placeholder="请选择">
              <el-option
                v-for="(data, index) in orgList"
                :key="index"
                :label="data.name"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryPageTransportLineType"
              >查询</el-button
            >
            <el-button type="" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="centen">
      <div style="margin-left: 5%">
        <Button type="info" @click="modal = true">新增线路类型</Button>
      </div>
      <hr />
      <el-table
        :data="TransportLineTypeList"
        style="width: 100%"
        max-height="500px"
      >
        <el-table-column fixed prop="id" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="typeNumber" label="线路类型编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="线路类型名称" width="120">
        </el-table-column>
        <el-table-column
          prop="startAgencyType"
          label="起始机构类型"
          width="120"
        >
          <template v-slot="scope">
            {{ scope.row.startAgencyType | orgFilters(orgList) }}
          </template>
        </el-table-column>
        <el-table-column prop="endAgencyType" label="终点机构类型" width="120">
          <template v-slot="scope">
            {{ scope.row.endAgencyType | orgFilters(orgList) }}
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="最新更新时间" width="200">
        </el-table-column>
        <el-table-column prop="updater" label="更新人" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="
                updateTransportLineTypeData = scope.row;
                modal2 = true;
              "
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteTransportLineType(scope.row)"
            >
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
      <el-dialog
        v-model="modal2"
        title="修改线路类型信息"
        @on-ok="updataTransportLineType"
        @on-cancel="cancel"
      >
        <el-form
          :model="updateTransportLineTypeData"
          label-position="left"
          :label-width="100"
        >
          <el-form-item label="线路类型编号">
            <el-input v-model="updateTransportLineTypeData.endAgencyType"></el-input>
          </el-form-item>
          <el-form-item label="线路类型名称">
            <el-input v-model="updateTransportLineTypeData.name"></el-input>
          </el-form-item>
          <el-form-item label="起始机构类型">
            <el-select v-model="updateTransportLineTypeData.startAgencyType">
              <el-option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="终点机构类型">
            <el-select v-model="updateTransportLineTypeData.endAgencyType">
              <el-option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog
        v-model="modal"
        title="添加线路类型信息"
        @on-ok="addTransportLineType"
        @on-cancel="cancel"
      >
        <el-form
          :model="addTransportLineTypeData"
          label-position="left"
          :label-width="100"
        >
          <el-form-item label="线路类型编号">
            <el-input v-model="addTransportLineTypeData.typeNumber"></el-input>
          </el-form-item>
          <el-form-item label="线路类型名称">
            <el-input v-model="addTransportLineTypeData.name"></el-input>
          </el-form-item>
          <el-form-item label="起始机构类型">
            <el-select v-model="addTransportLineTypeData.startAgencyType">
              <el-option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="终点机构类型">
            <el-select v-model="addTransportLineTypeData.endAgencyType">
              <el-option
                v-for="(data, index) in orgList"
                :key="index"
                :value="data.id"
                >{{ data.name }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      addTransportLineTypeData: {
        lastUpdateTime: moment(new Date()).format("YYYY-MM-DD"),
        updater: JSON.parse(sessionStorage.getItem("satoken")).loginId,
      },
      modal: false,
      modal2: false,
      updateTransportLineTypeData: {
        lastUpdateTime: moment(new Date()).format("YYYY-MM-DD"),
        updater: JSON.parse(sessionStorage.getItem("satoken")).loginId,
      },
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 5,
        search: {},
      },
      orgList: [],
      TransportLineTypeList: [],
    };
  },
  methods: {
    updataTransportLineType() {
      this.axios
        .post(
          "/api/base/pd_transport_line_type/updataTransportLineType",
          this.updateTransportLineTypeData
        )
        .then((result) => {
          if (result.data) {
            this.$Message.success("修改成功");
            this.queryPageTransportLineType();
          }
        })
        .catch((error) => {
          this.$Message.error("修改失败：" + error);
        });
    },
    deleteTransportLineType(data) {
      this.$confirm("此操作将删除该线路类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get(
              "/api/base/pd_transport_line_type/deleteTransportLineType?id=" +
                data.id
            )
            .then((result) => {
              if (result.data) {
                this.$Message.success("删除成功");
                this.queryPageTransportLineType();
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
    addTransportLineType() {
      this.axios
        .post(
          "/api/base/pd_transport_line_type/addTransportLineType",
          this.addTransportLineTypeData
        )
        .then((result) => {
          if (result.data) {
            this.$Message.success("添加成功");
            this.queryPageTransportLineType();
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
    //查询机构类型
    queryAllOrg() {
      this.axios
        .post("/api/base/pd_transport_line_type/queryPdOrg")
        .then((resule) => {
          this.orgList = resule.data.data;
        });
    },
    //查询线路类型
    queryPageTransportLineType() {
      this.axios
        .post(
          "/api/base/pd_transport_line_type/queryPageTransportLineType",
          this.page
        )
        .then((resule) => {
          console.log(resule);
          this.TransportLineTypeList = resule.data.data.list;
          this.total = resule.data.data.total;
        });
    },
  },
  created() {
    this.queryPageTransportLineType();
    this.queryAllOrg();
  },
  filters: {
    orgFilters: function (val, multiplier) {
      // console.log(multiplier.length);
      for (let index = 0; index < multiplier.length; index++) {
        if (val == multiplier[index].id) {
          return multiplier[index].name;
        }
      }
      return val;
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
