<template>
  <el-container style="height:600px">
    <el-aside width="25%" style="
        margin-right: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      ">
      <el-input placeholder="请输入内容" v-model="wangdian" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="queyrone"></el-button>
      </el-input>
      <el-tree :data="options" @node-click="handleNodeClick"></el-tree>
    </el-aside>
    <el-container style="
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      ">
      <el-header style="margin-bottom: 20px; background-color: rgb(235, 235, 235)">
        <h1 style="margin-top: 10px">作业范围</h1>

      </el-header>
      <el-form :inline="true" style="margin-left: 50px;">
        <el-form-item label="编辑">
          <el-checkbox v-model="editable" />
        </el-form-item>
        <el-form-item label="禁止编辑">
          <el-checkbox v-model="draggable" />
        </el-form-item>
        <el-form-item>
          <el-button @click="jgfanweisave">保存</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="jgfanweiupdate">修改</el-button>
        </el-form-item>
      </el-form>
      <amap :center="position" :zoom="13">
        <amap-polygon :path.sync="bounds" :fill-color="fill" :fill-opacity="0.5" :stroke-color="stroke"
          :editable="editable" :draggable="draggable" />
        <amap-marker :position="position" />
      </amap>

    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      wangdian: "",
      arealist: [],
      bounds: [[112.880426, 28.118083], [112.898923, 28.134988], [112.898968, 28.134933]],
      options: [],
      position: [112.89766, 28.126767],
      label: "",
      fill: '#409EFF',
      stroke: '#000A58',
      editable: false,
      draggable: true,
      id: {},
      jgfanwei: {}
    }
  },
  methods: {
    jgfanweiupdate() {
      if (this.id.id != null && this.editable == true) {
        if (this.jgfanwei.mutiPoints != null) {
          this.axios.post("/api/base/pd-agency-scope/jgfanweiupdate", { id: this.jgfanwei.id, mutiPoints: JSON.stringify(this.bounds) }).then(res => {
            alert("修改成功")
          })
        }
      } else {
        alert("请选择机构并点击编辑")
      }
    },
    jgfanweisave() {
      if (this.id.id != null && this.editable == true) {
        if (this.jgfanwei.mutiPoints != null) {
          alert("此机构只能修改")
        } else {
          this.axios.post("/api/base/pd-agency-scope/jgfanweisave", { agencyId: this.id.id, areaId: this.id.countyId, mutiPoints: JSON.stringify(this.bounds) }).then(res => {
            alert("添加成功")
          })
        }
      } else {
        alert("请选择机构并点击编辑")
      }
    },
    queyrone() {

    },
    area() {
      this.axios.post("/api/auth/pd-core-org/findcoreOrg").then(res => {
        this.arealist = res.data;
        let menus = [];
        this.arealist.forEach((m1) => {
          if (m1.parentId == 0) {
            var m1 = {
              id: m1.id,
              label: m1.name,
              status: m1.status,
              provinceId: m1.provinceId, //省id
              cityId: m1.cityId, //市id
              countyId: m1.countyId, //区id
              latitude: m1.latitude, //纬度
              longitude: m1.longitude, //经度
              address: m1.address, //详细地址
              children: [],
            };
            this.arealist.forEach((m2) => {
              if (m1.id == m2.parentId) {
                var m2 = {
                  id: m2.id,
                  label: m2.name,
                  status: m2.status,
                  provinceId: m2.provinceId, //省id
                  cityId: m2.cityId, //市id
                  countyId: m2.countyId, //区id
                  latitude: m2.latitude, //纬度
                  longitude: m2.longitude, //经度
                  address: m2.address, //详细地址
                  children: [],
                };
                m1.children.push(m2);
                this.arealist.forEach((m3) => {
                  if (m2.id == m3.parentId) {
                    var m3 = {
                      id: m3.id,
                      label: m3.name,
                      provinceId: m3.provinceId, //省id
                      cityId: m3.cityId, //市id
                      countyId: m3.countyId, //区id
                      latitude: m3.latitude, //纬度
                      longitude: m3.longitude, //经度
                      address: m3.address, //详细地址
                      children: [],
                    };
                    m2.children.push(m3);
                    this.arealist.forEach((m4) => {
                      if (m3.id == m4.parentId) {
                        var m4 = {
                          id: m4.id,
                          label: m4.name,
                          provinceId: m4.provinceId, //省id
                          cityId: m4.cityId, //市id
                          countyId: m4.countyId, //区id
                          latitude: m4.latitude, //纬度
                          longitude: m4.longitude, //经度
                          address: m4.address, //详细地址
                          children: [],
                        };
                        m3.children.push(m4);
                        this.arealist.forEach((m5) => {
                          if (m4.id == m5.parentId) {
                            var m5 = {
                              id: m5.id,
                              label: m5.name,
                              provinceId: m5.provinceId, //省id
                              cityId: m5.cityId, //市id
                              countyId: m5.countyId, //区id
                              latitude: m5.latitude, //纬度
                              longitude: m5.longitude, //经度
                              address: m5.address, //详细地址
                              children: [],
                            };
                            m4.children.push(m5);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
            menus.push(m1);
          }
        });
        this.options = menus;
      })


    },
    handleNodeClick(node) {
      this.id = node
      console.log(this.id);
      this.position = [this.id.longitude, this.id.latitude]
      this.bounds = [[112.880426, 28.118083], [112.898923, 28.134988], [112.898968, 28.134933]];

      this.axios.post("/api/base/pd-agency-scope/jgfanweiquery", { agencyId: this.id.id, areaId: this.id.countyId }).then(res => {
        if (res.data.mutiPoints != null) {
          this.jgfanwei = res.data;
          this.bounds = JSON.parse(res.data.mutiPoints);
        }
      })
      console.log(this.bounds);
    }
  },
  created() {

    this.area();
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 800px;
}
</style>