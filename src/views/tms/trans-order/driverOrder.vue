<template>
  <div>
    <div class="sousuo">
      <el-form :inline="true" :label-position="labelPosition">
        <el-form-item label="运单编号:" style="width: 30%">
          <el-input
            v-model="PdOrder.tid"
            placeholder="请输入订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="运单状态:" style="width: 30%">
          <el-select placeholder="请选择" v-model="PdOrder.tstatus">
            <el-option label="新建" value="1"></el-option>
            <el-option label="已装车" value="2"></el-option>
            <el-option label="到达" value="3"></el-option>
            <el-option label="到达终端网点" value="4"></el-option>
            <el-option label="已签收" value="5"></el-option>
            <el-option label="拒收" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发件人地址:" style="width: 30%">
          <div style="width: 330px">
            <el-select
              v-model="PdOrder.senderProvinceId"
              @change="shishow"
              placeholder="请选择"
              style="width: 30%"
            >
              <el-option
                v-for="(item, index) in sheng"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择"
              @change="qushow"
              v-model="PdOrder.senderCityId"
              style="width: 30%; margin-left: 8px"
            >
              <el-option
                v-for="(item, index) in shilist"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择"
              v-model="PdOrder.senderCountyId"
              style="width: 30%; margin-left: 8px"
            >
              <el-option
                v-for="(item, index) in qulist"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="发件人姓名:" style="width: 30%">
          <el-input
            placeholder="请输入发件人姓名"
            v-model="PdOrder.senderName"
          ></el-input>
        </el-form-item>
        <el-form-item label="发件人电话:" style="width: 30%">
          <el-input
            placeholder="请输入发件人电话"
            v-model="PdOrder.senderPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人地址:" style="width: 30%">
          <div style="width: 330px">
            <el-select
              v-model="PdOrder.receiverProvinceId"
              @change="shoushishow"
              placeholder="请选择"
              style="width: 30%"
            >
              <el-option
                v-for="(item, index) in sheng"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择"
              @change="shouqushow"
              v-model="PdOrder.receiverCityId"
              style="width: 30%; margin-left: 8px"
            >
              <el-option
                v-for="(item, index) in shoushilist"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择"
              v-model="PdOrder.receiverCountyId"
              style="width: 30%; margin-left: 8px"
            >
              <el-option
                v-for="(item, index) in shouqulist"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="收件人姓名:" style="width: 30%">
          <el-input
            placeholder="请输入收件人姓名"
            v-model="PdOrder.receiverName"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人电话:" style="width: 30%">
          <el-input
            placeholder="请输入收件人电话"
            v-model="PdOrder.receiverPhone"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="show">搜索</el-button
      ><el-button @click="clear">重置</el-button>
    </div>
    <div>
      <el-table
        :header-cell-style="{
          background: 'rgb(238, 238, 238)',
          color: 'black',
        }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="tid" label="运单编号"></el-table-column>
        <el-table-column prop="tstatus" label="运单状态">
          <template v-slot="tt">
            <span v-if="tt.row.paymentStatus == 1">新建</span>
            <span v-if="tt.row.paymentStatus == 2">已装车</span>
            <span v-if="tt.row.paymentStatus == 3">到达</span>
            <span v-if="tt.row.paymentStatus == 4">到达终端网点</span>
            <span v-if="tt.row.paymentStatus == 5">已签收</span>
            <span v-if="tt.row.paymentStatus == 6">拒收</span>
          </template>
        </el-table-column>
        <el-table-column prop="schedulingStatus" label="调度状态">
          <template v-slot="tt">
            <span v-if="tt.row.paymentStatus == 1">待调度</span>
            <span v-if="tt.row.paymentStatus == 2">未匹配线路</span>
            <span v-if="tt.row.paymentStatus == 3">已调度</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="订单编号"></el-table-column>
        <el-table-column prop="createTime" label="下单时间"></el-table-column>
        <el-table-column prop="senderName" label="发件人姓名"></el-table-column>
        <el-table-column
          prop="senderPhone"
          label="发件人电话"
        ></el-table-column>
        <el-table-column prop="senderProvinceId" label="发件人地址">
          <template v-slot="tt">
            <span v-for="list in arealist" :key="list.senderProvinceId">
              <span v-if="tt.row.senderProvinceId == list.id">{{
                list.name
              }}</span>
              <span v-if="tt.row.senderCityId == list.id">{{ list.name }}</span>
              <span v-if="tt.row.senderCountyId == list.id">{{
                list.name
              }}</span>
            </span>
            <span>{{ tt.row.senderAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="receiverName"
          label="收件人姓名"
        ></el-table-column>
        <el-table-column
          prop="receiverPhone"
          label="收件人电话"
        ></el-table-column>
        <el-table-column prop="receiverProvinceId" label="收件人地址">
          <template v-slot="tt">
            <span v-for="list in arealist" :key="list.senderProvinceId">
              <span v-if="tt.row.receiverProvinceId == list.id">{{
                list.name
              }}</span>
              <span v-if="tt.row.receiverCityId == list.id">{{
                list.name
              }}</span>
              <span v-if="tt.row.receiverCountyId == list.id">{{
                list.name
              }}</span>
            </span>
            <span>{{ tt.row.receiverAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" fixed="right" align="center" label="操作">
          <template v-slot="tt">
            <el-button
              size="mini"
              @click="chakan(tt.row)"
              icon="el-icon-edit"
              type="warning"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 4, 6, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ids: [],
      total: 0, //总条数
      tableData: [],
      page: 1, //当前页
      pageSize: 4, //每页的数据条数
      labelPosition: "left",
      arealist: [],
      sheng: [],
      shi: [],
      shilist: [],
      shoushilist: [],
      qu: [],
      qulist: [],
      shouqulist: [],
      PdOrder: {
        tid: "",
        tstatus: "",
        senderName: "",
        senderPhone: "",
        senderProvinceId: "",
        senderCityId: "",
        senderCountyId: "",
        receiverName: "",
        receiverPhone: "",
        receiverProvinceId: "",
        receiverCityId: "",
        receiverCountyId: "",
      },
    };
  },

  methods: {
    clear() {
      this.PdOrder.id = "";
      this.PdOrder.tstatus = "";
      this.PdOrder.senderName = "";
      this.PdOrder.senderPhone = "";
      this.PdOrder.senderProvinceId = "";
      this.PdOrder.senderCityId = "";
      this.PdOrder.senderCountyId = "";
      this.PdOrder.receiverName = "";
      this.PdOrder.receiverPhone = "";
      this.PdOrder.receiverProvinceId = "";
      this.PdOrder.receiverCityId = "";
      this.PdOrder.receiverCountyId = "";
    },
    area() {
      this.axios.post("/api/aggregation/pd-area/findarea").then((res) => {
        this.arealist = res.data;
        for (let index = 0; index < this.arealist.length; index++) {
          if (this.arealist[index].pid == 0) {
            this.sheng.push(this.arealist[index]);
            for (let index2 = 0; index2 < this.arealist.length; index2++) {
              if (this.arealist[index2].pid == this.arealist[index].id) {
                this.shi.push(this.arealist[index2]);
                for (let index3 = 0; index3 < this.arealist.length; index3++) {
                  if (this.arealist[index3].pid == this.arealist[index2].id) {
                    this.qu.push(this.arealist[index3]);
                  }
                }
              }
            }
          }
        }
      });
    },
    shishow() {
      this.shilist = [];
      for (let i = 0; i < this.shi.length; i++) {
        if (this.PdOrder.senderProvinceId == this.shi[i].pid) {
          this.shilist.push(this.shi[i]);
        }
      }
    },
    qushow() {
      this.qulist = [];
      for (let i = 0; i < this.qu.length; i++) {
        if (this.PdOrder.senderCityId == this.qu[i].pid) {
          this.qulist.push(this.qu[i]);
        }
      }
    },
    shoushishow() {
      this.shoushilist = [];
      for (let i = 0; i < this.shi.length; i++) {
        if (this.PdOrder.receiverProvinceId == this.shi[i].pid) {
          this.shoushilist.push(this.shi[i]);
        }
      }
    },
    shouqushow() {
      this.shouqulist = [];
      for (let i = 0; i < this.qu.length; i++) {
        if (this.PdOrder.receiverCityId == this.qu[i].pid) {
          this.shouqulist.push(this.qu[i]);
        }
      }
    },
    chakan(id) {
      this.$router.push({
        path: "/index/driverOrderDetail",
        query: { data: JSON.stringify(id) },
      });
    },

    show() {
      this.axios
        .post("/api/aggregation/pd_order/findOrderTransport", {
          pageNum: this.page,
          pageSize: this.pageSize,
          search: this.PdOrder,
        })
        .then((res) => {
          if (res.data.code == 11051) {
            this.$Message.error(res.data.msg);
          } else {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        });
    },
    handleSelectionChange(val) {
      this.ids = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.show(this.page, this.pageSize);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.show(this.page, this.pageSize);
    },
  },
  created() {
    this.area();
    this.show();
  },
};
</script>

<style>
.sousuo {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
