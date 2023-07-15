<template>
  <div id="tasktransport">
    <div class="task_top">
      <el-form :model="page.search" inline label-position="left" :label-width="100">
        <el-form-item label="任务编号" style="float: left; margin-left: 3%">
          <el-input type="text" style="width: 230px" size="large" v-model="page.search.pttid" placeholder="请输入任务编号">
          </el-input>
        </el-form-item>
        <el-form-item label="司机名称" style="margin-left: 7%">
          <el-input type="text" style="width: 230px" size="large" v-model="page.search.pauname" placeholder="请输入司机名称">
          </el-input>
        </el-form-item>
        <el-form-item label="任务状态" style="float: right; margin-right: 3%">
          <el-select v-model="page.search.pttstatus" style="width: 230px" size="large">
            <el-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</el-option>
          </el-select> </el-form-item><br />
        <Button type="error" size="large" style="width: 100px; margin-left: 3%" @click="queypagelist">搜索</Button>
        <Button size="large" style="margin-left: 2%; width: 100px" @click="reset">重置</Button>
      </el-form>
    </div>
    <div class="task_center">
      <el-table :data="dataTable" border style="width: 100%">
        <el-table-column label="序号" prop="a" align="center" width="120">
          <template slot-scope="a">
            <span>{{ a.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="运输任务编号" prop="pttid" align="center" width="120">
        </el-table-column>
        <el-table-column label="车牌号码" prop="licenseplate" align="center" width="120">
        </el-table-column>
        <el-table-column label="调度机构" prop="diaoduname" align="center" width="200">
        </el-table-column>
        <el-table-column label="起始地" prop="startname" align="center" width="200">
        </el-table-column>
        <el-table-column label="目的地" prop="endname" align="center" width="200">
        </el-table-column>
        <el-table-column label="司机" prop="pauname" align="center" width="120">
        </el-table-column>
        <el-table-column label="运输任务状态" align="center" prop="pttstatus" width="120">
          <template v-slot="a">
            {{ a.row.pttstatus | pttstatusfilter }}
          </template>
        </el-table-column>
        <el-table-column label="车辆转载状态" align="center" prop="loadstatus" width="120">
          <template v-slot="v">
            {{ v.row.loadstatus | loadstatusfilter }}
          </template>
        </el-table-column>
        <el-table-column label="计划提货时间" align="center" prop="planpickupgoodstime" width="200">
        </el-table-column>
        <el-table-column label="实际提货时间" align="center" prop="actualpickupgoodstime" width="200">
        </el-table-column>
        <el-table-column label="计划发车时间" align="center" prop="plandeparturetime" width="200">
        </el-table-column>
        <el-table-column label="实际发车时间" align="center" prop="actualdeparturetime" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看运输任务详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum"
        :page-sizes="[3, 5, 8, 10]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="page.total" style="margin-left: 20%">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import transportTask from '@/api/TransportTask.js'
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
          label: "待发车",
        },
        {
          value: "2",
          label: "在途",
        },
        {
          value: "3",
          label: "已到达",
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
    handleClick(z) {
      this.$router.push({
        path: "/index/tasktransportdetails",
        query: { data: JSON.stringify(z) },
      });
    },
    queypagelist() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      transportTask.page(
        this.page
      )
        .then((res) => {
          this.dataTable = res.data.data.list;
          this.page.total = res.data.data.total;
          loading.close();
        })
        .catch((err) => {
          // this.$message.error(err);
          loading.close();
        });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
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
    pttstatusfilter: function (val) {
      return val == 1 ? "待发车" : val == 2 ? "在途" : "已到达";
    },
    loadstatusfilter: function (val) {
      return val == 1 ? "半载" : val == 2 ? "满载" : "空载";
    },
  },
};
</script>

<style scoped></style>
