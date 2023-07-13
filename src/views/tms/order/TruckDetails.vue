<template>
  <div>
    <el-tabs @tab-click="handleClick" tab-position="left" style="height: 100%">
      <el-tab-pane label="基本信息">
        <div>
          <div class="detailsm_right">
            <h3>车俩基本信息</h3>
            <div style="display: flex; justify-content: space-around">
              <div style="width: 400px">
                <Form
                  :model="truckData"
                  label-position="left"
                  :label-width="80"
                >
                  <FormItem label="车俩编号">
                    <Input disabled v-model="truckData.id"></Input>
                  </FormItem>
                  <FormItem label="所属机构">
                    <Input disabled v-model="truckData.orgName"></Input>
                  </FormItem>
                  <FormItem label="车型名称">
                    <Input disabled v-model="truckData.truckTypeName"></Input>
                  </FormItem>
                  <FormItem label="车辆载重">
                    <Input
                      class="x"
                      :disabled="isdisabled"
                      v-model="truckData.allowableLoad"
                    ></Input>
                  </FormItem>
                  <FormItem label="工作状态">
                    <Input disabled v-model="truckData.status"></Input>
                  </FormItem>
                  <FormItem label="GPSID">
                    <Input
                      class="x"
                      :disabled="isdisabled"
                      v-model="truckData.deviceGpsId"
                    ></Input>
                  </FormItem>
                </Form>
              </div>

              <div style="width: 400px">
                <Form
                  :model="truckData"
                  label-position="left"
                  :label-width="80"
                >
                  <FormItem label="车牌号码">
                    <Input
                      :disabled="isdisabled"
                      v-model="truckData.licensePlate"
                    ></Input>
                  </FormItem>
                  <FormItem label="所属车队">
                    <Input disabled v-model="truckData.fleetName"></Input>
                  </FormItem>
                  <FormItem label="车俩体积">
                    <Input
                      :disabled="isdisabled"
                      v-model="truckData.allowableVolume"
                    ></Input>
                  </FormItem>
                  <FormItem :disabled="isdisabled" label="过期状态">
                    <Input
                      disabled
                      v-bind:value="
                        truckData.validityPeriod | validityPeriodFilter
                      "
                    >
                    </Input>
                  </FormItem>
                  <FormItem label="装载状态">
                    <Input disabled v-model="truckData.input3"></Input>
                  </FormItem>
                </Form>
              </div>
            </div>
            <hr />
            <div
              style="
                width: 500px;
                margin: 0 auto;
                margin-top: 50px;
                padding-left: 15%;
              "
            >
              <el-button v-if="mm == '编辑'" @click="edit()" type="primary"
                >编辑</el-button
              >
              <el-button
                v-if="mm == '保存'"
                @click="updatetruck()"
                type="primary"
                >保存</el-button
              >
              <el-button @click="Back">返回</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="行驶征信息">
        <div>
          <div class="detailsm_right">
            <h3>行驶征信息</h3>
            <div style="display: flex; justify-content: space-around">
              <div style="width: 400px">
                <Form
                  :model="truckLicenseData"
                  label-position="left"
                  :label-width="100"
                >
                  <FormItem label="行驶编号">
                    <Input
                      :disabled="isdisabled"
                      v-model="truckLicenseData.id"
                    ></Input>
                  </FormItem>
                  <FormItem label="注册时间">
                    <el-date-picker
                      style="width: 300px"
                      format="yyyy-MM-dd"
                      :disabled="isdisabled"
                      v-model="truckLicenseData.registrationDate"
                      type="date"
                      placeholder="请选择注册时间"
                    >
                    </el-date-picker>
                  </FormItem>
                  <FormItem label="整备质量">
                    <Input
                      :disabled="isdisabled"
                      v-model="truckLicenseData.overallQuality"
                    ></Input>
                  </FormItem>
                  <FormItem label="核定载质量">
                    <Input
                      :disabled="isdisabled"
                      v-model="truckLicenseData.allowableWeight"
                    ></Input>
                  </FormItem>
                  <FormItem label="道路运输证号">
                    <Input
                      :disabled="isdisabled"
                      v-model="truckLicenseData.transportCertificateNumber"
                    ></Input>
                  </FormItem>
                  <FormItem label="图片信息">
                    <el-upload
                      class="avatar-uploader"
                      action="/api/base/pd-truck-license/uploadcontrollerPdTruckLicense"
                      :show-file-list="false"
                      name="myfile"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="truckLicenseData.picture"
                        :src="truckLicenseData.picture"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </FormItem>
                </Form>
              </div>

              <div style="width: 400px">
                <Form
                  :model="truckLicenseData"
                  label-position="left"
                  :label-width="100"
                >
                  <FormItem label="发动机号码">
                    <Input
                      :disabled="isdisabled"
                      v-model="truckLicenseData.engineNumber"
                    ></Input>
                  </FormItem>
                  <FormItem label="强制报废日期">
                    <el-date-picker
                      style="width: 300px"
                      :disabled="isdisabled"
                      v-model="truckLicenseData.mandatoryScrap"
                      type="date"
                      format="yyyy-MM-dd"
                      placeholder="请选择国家强制报废日期"
                    >
                    </el-date-picker>
                  </FormItem>
                  <FormItem label="检验有效期">
                    <el-date-picker
                      style="width: 300px"
                      :disabled="isdisabled"
                      format="yyyy-MM-dd"
                      v-model="truckLicenseData.expirationDate"
                      type="date"
                      placeholder="请选择检验有效期"
                    >
                    </el-date-picker>
                  </FormItem>
                  <FormItem label="有效期">
                    <el-date-picker
                      style="width: 300px"
                      :disabled="isdisabled"
                      format="yyyy-MM-dd"
                      v-model="truckLicenseData.validityPeriod"
                      type="date"
                      placeholder="请选择行驶证有效期"
                    >
                    </el-date-picker>
                  </FormItem>
                </Form>
              </div>
            </div>
            <hr />
            <div
              style="
                width: 500px;
                margin: 0 auto;
                margin-top: 50px;
                padding-left: 15%;
              "
            >
              <el-button v-if="mm == '编辑'" @click="edit()" type="primary"
                >编辑</el-button
              >
              <el-button
                v-if="mm == '保存'"
                @click="updatetruckLicense()"
                type="primary"
                >保存</el-button
              >
              <el-button @click="Back">返回</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="车次信息">
        <h3>车次信息</h3>
        <div style="margin: 0 auto; width: 800px">
          <el-form :inline="true" :model="truckData" class="demo-form-inline">
            <el-form-item label="所属路线：">
              <el-input
                disabled
                v-model="truckData.lineName"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item label="所属车次：">
              <el-input
                disabled
                v-model="truckData.transportTripsId"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <hr />
        <div
          style="
            width: 500px;
            margin: 0 auto;
            margin-top: 50px;
            padding-left: 8%;
          "
        >
          <el-button @click="Back">返回</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      mm: "编辑",
      isdisabled: true,
      imageUrl: "",
      truckData: {},
      truckLicenseData: {},
    };
  },
  methods: {
    //修改车俩基本信息
    updatetruck() {
      console.log(this.truckData);
      this.axios
        .post("/api/base/pd_truck/updateTruckByid", this.truckData)
        .then((result) => {
          if (result.data.flag) {
            this.$message.success("保存成功");
          } else {
            this.$message.success("保存失败");
          }
        });
    },
    //修改行驶证信息
    updatetruckLicense() {
      console.log(this.truckLicenseData);
      this.axios
        .post(
          "/api/base/pd-truck-license/updateTruckLicense",
          this.truckLicenseData
        )
        .then((result) => {
          if (result.data.flag) {
            this.$message.success("保存成功");
          } else {
            this.$message.success("保存失败");
          }
        });
    },
    // 返回
    Back() {
      this.$router.push("/index/TruckManage");
    },
    // 修改按钮
    edit() {
      this.isdisabled = false;
      this.mm = "保存";
    },
    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.truckLicenseData.picture = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleClick(tab, event) {
      this.mm = "编辑";
      // console.log(tab.index);
      this.isdisabled = true;
      if (tab.index == 1) {
        // console.log(tab.index);
        this.axios
          .post(
            "/api/base/pd-truck-license/queryById/" +
              this.truckData.truckLicenseId
          )
          .then((result) => {
            console.log(result);
            this.truckLicenseData = result.data.data;
          });
      }
    },
  },
  created() {
    this.truckData = JSON.parse(this.$route.query.data);
    //  this.truckData=JSON.parse(aa);
    // console.log(this.truckData);
  },
  filters: {
    validityPeriodFilter: function (value) {
      let isBefore = moment(moment(new Date()).format("YYYY-MM-DD")).isBefore(
        moment(value).format("YYYY-MM-DD")
      );
      return isBefore == true ? "未过期" : "已过期";
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.details_left {
  text-align: center;
  width: 15%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

p {
  display: block;
  margin: 0 auto;
}

.detailsm_right {
  width: 80%;
  height: 700px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
