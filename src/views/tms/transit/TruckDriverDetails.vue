<template>
  <div>
    <el-tabs @tab-click="handleClick" tab-position="left" style="height: 100%">
      <el-tab-pane label="基本信息">
        <div>
          <div class="detailsm_right">
            <h3>基本信息</h3>
            <div style="display: flex; justify-content: space-around">
              <div style="width: 400px">
                <el-form
                  :model="truckDriverData"
                  label-position="left"
                  :label-width="80"
                >
                  <el-form-item label="员工编号">
                    <el-input disabled v-model="truckDriverData.id"></el-input>
                  </el-form-item>
                  <el-form-item label="所属机构">
                    <el-input disabled v-model="truckDriverData.orgName"></el-input>
                  </el-form-item>
                  <el-form-item label="电话">
                    <el-input disabled v-model="truckDriverData.mobile"></el-input>
                  </el-form-item>
                </el-form>
              </div>

              <div style="width: 400px">
                <el-form
                  :model="truckDriverData"
                  label-position="left"
                  :label-width="80"
                >
                  <el-form-item label="司机名称">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverData.name"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="所属车队">
                    <el-input disabled v-model="truckDriverData.fleetName"></el-input>
                  </el-form-item>
                  <el-form-item label="年龄">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverData.age"
                    ></el-input>
                  </el-form-item>
                </el-form>
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
              <el-button @click="Back">返回</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="驾驶征信息">
        <div>
          <div class="detailsm_right">
            <h3>驾驶征信息</h3>
            <div style="display: flex; justify-content: space-around">
              <div style="width: 400px">
                <el-form
                  :model="truckDriverLicenseData"
                  label-position="left"
                  :label-width="100"
                >
                  <el-form-item label="驾驶证号">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.licenseNumber"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="初次领证日期">
                    <el-date-picker
                      style="width: 300px"
                      format="yyyy-MM-dd"
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.initialCertificateDate"
                      type="date"
                      placeholder="请选择注册时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="驾龄">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.driverAge"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="从业资格证">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.qualificationCertificate"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="图片信息">
                    <el-upload
                      :disabled="isdisabled"
                      class="avatar-uploader"
                      action="/api/base/pd-truck-license/uploadcontrollerPdTruckLicense"
                      :show-file-list="false"
                      name="myfile"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="truckDriverLicenseData.picture"
                        :src="truckDriverLicenseData.picture"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
              </div>

              <div style="width: 400px">
                <el-form
                  :model="truckDriverLicenseData"
                  label-position="left"
                  :label-width="100"
                >
                  <el-form-item label="准驾车型">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.allowableType"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="驾驶证有效期">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.validPeriod"
                    >
                      <template slot="append">年</template></el-input
                    >
                  </el-form-item>
                  <el-form-item label="驾驶证类型">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.licenseType"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="入场证信息">
                    <el-input
                      :disabled="isdisabled"
                      v-model="truckDriverLicenseData.passCertificate"
                    ></el-input>
                  </el-form-item>
                </el-form>
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
                @click="updatetruckDriverLicense()"
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
          <el-form
            :inline="true"
            :model="TruckDriverTheTruckMessage"
            class="demo-form-inline"
          >
            <el-form-item label="当前使用车俩：">
              <el-input
                disabled
                v-model="TruckDriverTheTruckMessage.licensePlate"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item label="车俩所属路线：">
              <el-input
                disabled
                v-model="TruckDriverTheTruckMessage.name"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item label="车俩所属车次：">
              <el-input
                disabled
                v-model="TruckDriverTheTruckMessage.id"
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
      truckDriverData: {},
      truckDriverLicenseData: {},
      TruckDriverTheTruckMessage: {},
    };
  },
  methods: {
    //修改车俩基本信息
    updatetruck() {
      console.log(this.truckDriverData);
      this.axios
        .post("/api/base/pd_truck/updateTruckByid", this.truckDriverData)
        .then((result) => {
          if (result.data.flag) {
            this.$message.success("保存成功");
          } else {
            this.$message.success("保存失败");
          }
        });
    },
    //修改驾驶证信息
    updatetruckDriverLicense() {
      console.log(this.truckDriverLicenseData);
      this.axios
        .post(
          "/api/base/pd-truck-driver-license/updateTruckDriverLicense",
          this.truckDriverLicenseData
        )
        .then((result) => {
          if (result.data) {
            this.$message.success("保存成功");
          } else {
            this.$message.success("保存失败");
          }
        });
    },
    // 返回
    Back() {
      this.$router.push("/index/TruckDriver");
    },
    // 修改按钮
    edit() {
      this.isdisabled = false;
      this.mm = "保存";
    },
    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.truckDriverLicenseData.picture = res;
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
            "/api/base/pd-truck-driver-license/queryTruckDriverLicenseByUserId/" +
              this.truckDriverData.id
          )
          .then((result) => {
            console.log(result);

            this.truckDriverLicenseData = result.data;
          });
      }

      if (tab.index == 2) {
        this.axios
          .post(
            "/api/base/pd-truck-driver/queryTruckDriverTheTruckMessage/" +
              this.truckDriverData.id
          )
          .then((result) => {
            console.log(result);
            this.TruckDriverTheTruckMessage = result.data;
          });
      }
    },
  },
  created() {
    this.truckDriverData = JSON.parse(this.$route.query.data);
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
