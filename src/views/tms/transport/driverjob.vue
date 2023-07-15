<template>
  <div id="driverjob">
    <div class="task_top">
      <Form
        :model="page.search"
        inline
        label-position="right"
        :label-width="100"
      >
        <FormItem label="作业编号" style="float: left; margin-left: 3%">
          <Input
            type="text"
            style="width: 230px"
            size="large"
            v-model="page.search.id"
            placeholder="请输入任务编号"
          >
          </Input>
        </FormItem>
        <FormItem label="司机名称" style="margin-left: 7%">
          <Input
            type="text"
            style="width: 230px"
            size="large"
            v-model="page.search.name"
            placeholder="请输入司机名称"
          >
          </Input>
        </FormItem>
        <FormItem label="作业状态" style="float: right; margin-right: 3%">
          <Select
            v-model="page.search.status"
            style="width: 230px"
            size="large"
          >
            <Option
              v-for="item in cityList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select> </FormItem
        ><br />
        <FormItem
          label="运输任务编号"
          style="float: left; margin-left: 3%; margin-right: 5%"
        >
          <Input
            type="text"
            style="width: 230px"
            size="large"
            v-model="page.search.pttid"
            placeholder="请输入司机名称"
          >
          </Input>
        </FormItem>
        <Button
          type="error"
          size="large"
          style="width: 100px; margin-left: 3%"
          @click="queypagelist"
          >搜索</Button
        >
        <Button
          size="large"
          style="margin-left: 2%; width: 100px"
          @click="reset"
          >重置</Button
        >
      </Form>
    </div>
    <Divider />
    <div class="task_center">
      <el-table :data="dataTable">
        <el-table-column label="序号" align="center" prop="">
          <template slot-scope="a">
            <span>{{ a.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作业编号" align="center" prop="id">
        </el-table-column>
        <el-table-column label="司机姓名" align="center" prop="name">
        </el-table-column>
        <el-table-column label="所属转运中心" align="center" prop="orgname" width="200">
        </el-table-column>
        <el-table-column label="车牌号码" align="center" prop="licenseplate">
        </el-table-column>
        <el-table-column
          label="计划发车时间"
          align="center"
          prop="plandeparturetime"
        >
        </el-table-column>
        <el-table-column
          label="实际到达时间"
          align="center"
          prop="planarrivaltime"
        >
        </el-table-column>
        <el-table-column label="运输任务编号" align="center" prop="pttid">
        </el-table-column>
        <el-table-column label="作业状态" align="center" prop="status">
          <template v-slot="c">
            {{ c.row.status | statusfilter }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        style="margin-left: 20%"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTable: [],
      page: {
        pageSize: 3,
        pageNum: 1,
        total: 0,
        search: {},
      },
      cityList: [
        {
          value: "1",
          label: "待提货",
        },
        {
          value: "2",
          label: "在途",
        },
        {
          value: "3",
          label: "已交付",
        },
        {
          value: "4",
          label: "已作废",
        },
      ],
      data: [
        {
          id: 1,
          cz: "sss",
        },
      ],
    };
  },
  methods: {
    queypagelist() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.axios
        .post("/api/work/pd-driver-job/lcquerydrivertaskcontroller", this.page)
        .then((res) => {
          if (res.data.code == 11051) {
            loading.close();
            this.$Message.error(res.data.msg);
          } else {
            this.dataTable = res.data.data.list;
            this.page.total = res.data.data.total;
            console.log(res.data);
            loading.close();
          }
        })
        .catch((err) => {
          this.$message.error(err);
          loading.close();
        });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.queypagelist();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.queypagelist();
    },
    reset() {
      this.page.search = {};
      this.queypagelist();
    },
  },
  created() {
    this.queypagelist();
  },
  filters: {
    statusfilter: function (val) {
      return val == 1
        ? "待提货"
        : val == 2
        ? "在途"
        : val == 3
        ? "已交付"
        : "已交付";
    },
  },
};
</script>

<style scoped></style>
