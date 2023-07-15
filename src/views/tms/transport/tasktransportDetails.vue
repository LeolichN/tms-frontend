<template>
  <div id="tasktransportDetails">
    <el-tabs
      @tab-click="aa"
      tab-position="left"
      style="height: 100%; margin-left: 2%"
    >
      <el-tab-pane label="基本信息">
        <h3 style="margin-left: 4%; margin-top: 2%">基本信息</h3>

        <el-form
          :model="query"
          inline
          label-position="right"
          :label-width="120"
          style="margin-left: 8%; margin-top: 2%"
        >
          <el-form-item label="运输任务编号：" style="float: left; margin-left: 3%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.pttid"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="车牌号码" style="float: left; margin-left: 10%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.licenseplate"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="调度机构" style="float: left; margin-left: 3%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.diaoduname"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="起始地" style="float: left; margin-left: 10%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.startname"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="目的地" style="float: left; margin-left: 3%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.endname"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <br />
        <Divider />
        <Button
          size="large"
          style="width: 100px; margin-left: 40%"
          @click="returntask"
          >返回</Button
        >
      </el-tab-pane>

      <el-tab-pane label="任务轨迹">
        <h3 style="margin-left: 4%; margin-top: 2%">任务轨迹</h3>
        <el-form
          :model="query"
          inline
          label-position="right"
          :label-width="120"
          style="margin-left: 8%; margin-top: 2%"
        >
          <el-form-item label="车牌号：" style="float: left; margin-left: 3%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.licenseplate"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="司机：" style="float: left; margin-left: 10%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.pauname"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="预计发车时间" style="float: left; margin-left: 3%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.plandeparturetime"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="实际发车时间："
            style="float: left; margin-left: 10%"
          >
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.actualdeparturetime"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="计划到达时间：" style="float: left; margin-left: 3%">
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.planarrivaltime"
              placeholder="请输入任务编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="实际到达时间："
            style="float: left; margin-left: 10%"
          >
            <el-input
              type="text"
              style="width: 230px"
              disabled
              size="large"
              v-model="query.actualarrivaltime"
              placeholder="请输入任务编号">
            </el-input>
          </el-form-item>
        </el-form>


        <br />
        <Divider :dashed="true" />
        <h3 style="margin-left: 4%; margin-top: 2%">轨迹查看</h3>
        <baidu-map style="margin-left: 4%; margin-top: 3%" center="北京">
          <bm-view class="map" style="height: 400px; width: 800px"> </bm-view>
          <bm-driving
            :start="start"
            :end="end"
            :auto-viewport="true"
            :panel="false"
          ></bm-driving>
          <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
        </baidu-map>
        <br />
        <Divider />
        <Button
          size="large"
          style="width: 100px;
           margin-left: 40%"
          @click="returntask"
          >返回</Button
        >
      </el-tab-pane>

      <el-tab-pane label="运单详情">
        <h3 style="margin-left: 4%; margin-top: 2%">
          共计{{ dataTable.length }}票运单
        </h3>
        <el-table
          :data="dataTable"
          border
          style="width: 85%; margin-left: 7%; margin-top: 4%"
        >
          <el-table-column label="序号" prop="a" align="center" width="120">
            <template slot-scope="a">
              <span>{{ a.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="运单编号"
            prop="ptoid"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            label="下单时间"
            prop="createtime"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="发件人姓名"
            prop="sendername"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="发件人电话"
            prop="senderphone"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="收件人姓名"
            prop="receivername"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="收件人电话"
            prop="receiverphone"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <br />
        <Divider />
        <Button
          size="large"
          style="width: 100px; margin-left: 40%"
          @click="returntask"
          >返回</Button
        >
      </el-tab-pane>

      <el-tab-pane label="交付照片">
        <h3 style="margin-left: 4%; margin-top: 2%">交付货品照片</h3>
        <el-image
          style="
            width: 30%;
            height: 250px;
            margin-left: 9%;
            margin-top: 2%;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          "
          :src="query.deliverpicture"
        >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <h3 style="margin-left: 4%; margin-top: 2%">支付回单照片</h3>
        <el-image
          style="
            width: 30%;
            height: 250px;
            margin-left: 9%;
            margin-top: 2%;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          "
          :src="query.transportcertificate"
        >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <br />
        <Divider />
        <Button
          size="large"
          style="width: 100px; margin-left: 40%"
          @click="returntask"
          >返回</Button
        >
      </el-tab-pane>

      <el-tab-pane label="提货照片">
        <h3 style="margin-left: 4%; margin-top: 2%">提货货品照片</h3>
        <el-image
          style="
            width: 30%;
            height: 250px;
            margin-left: 9%;
            margin-top: 2%;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          "
          :src="query.cargopicture"
        >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <h3 style="margin-left: 4%; margin-top: 2%">提货凭证照片</h3>
        <el-image
          style="
            width: 30%;
            height: 250px;
            margin-left: 9%;
            margin-top: 2%;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          "
          :src="query.cargopickuppicture"
        >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <br />
        <Divider />
        <Button
          size="large"
          style="width: 100px; margin-left: 40%"
          @click="returntask"
          >返回</Button
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {}, //基本信息
      dataTable: [],
      query: {},
      // 定位位置
      //center: { lng: 0, lat: 0 },
      // 地图放大等级
      //zoom: 15,
      start: { lng: 0, lat: 0 },
      end: { lng: 0, lat: 0 },
    };
  },
  methods: {
    aa(tab, event) {
      console.log(tab.index);
      if (tab.index == 1) {
        this.start.lng = this.query.deliverylongitude;
        this.start.lat = this.query.deliverylatitude;
        this.end.lng = this.query.deliverlongitude;
        this.end.lat = this.query.deliverlatitude;
        console.log(this.start);
      }
    },
    //返回
    returntask() {
      this.$router.push("/index/tasktransport");
    },
    //查看详情
    handleClick(z) {
      this.$router.push({
        path: "/index/driverOrderxiangq",
        query: { data: JSON.stringify(z), pdata: JSON.stringify(this.query) },
      });
    },
    //查询运单
    querytransportorder() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.axios
        .get(
          "/api/work/pd-transport-order/lcquerypagetransportorderview/" +
            this.query.pttid
        )
        .then((res) => {
          if (res.data.code == 11051) {
            this.$Message.error(res.data.msg);
            this.$router.push("/index/tasktransport");
          }
          this.dataTable = res.data.data;
          loading.close();
        })
        .catch((err) => {
          this.$message.error(err);
          loading.close();
        });
    },
  },
  created() {
    var z = JSON.parse(this.$route.query.data);
    this.query = z;
    console.log(this.query);
    // this.start.lng = z.deliverylongitude;
    // this.start.lat = z.deliverylatitude;
    // this.end.lng = z.deliverlongitude;
    // this.end.lat = z.deliverlatitude;
    this.querytransportorder();
  },
};
</script>
