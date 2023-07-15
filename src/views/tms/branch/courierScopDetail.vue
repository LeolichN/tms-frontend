<template>
    <demo-view >
      <el-form :inline="true" style="margin-left: 50px;">
                <div style="height: 25px;"></div>
                <el-form-item label="范围中心" style="width: 30%;">
                  <el-input read-only :value="center.join(',')" style="width: 180px;"/>
                </el-form-item>
                <el-form-item label="范围半径" style="width: 30%;">
                  <el-slider v-model="radius" :min="20" :max="5000" style="width: 180px;"/>
                </el-form-item>
                <el-form-item label="编辑">
                <el-checkbox v-model="editable"/>
              </el-form-item>
                <el-button @click="fanweisave">范围保存</el-button>
            </el-form>
     
      
        <amap :center="center" :zoom="13">
              <amap-circle
              :center.sync="center"
              :radius="radius"
              :fill-color="fill"
              :fill-opacity="0.5"
              :stroke-color="stroke"
              cursor="pointer"
              :editable="editable"
            />
            <amap-scale position="LB" />
            <amap-tool-bar position='LT'/>
        </amap>

    </demo-view>
</template>
  <script>
export default {
  data() {
    return {
      center: [],
      radius: 50,
      id:[],
      fill: '#409EFF',
      stroke: '#000A58',
      editable:false
    };
  },
  methods:{
    show(){
      this.id = JSON.parse(this.$route.query.data);
      this.center=[this.id.longitude,this.id.latitude]
    },
    fanweisave(){
      let muti=this.center[1]+","+this.center[0]+","+this.radius;
      if(this.id.id!=null && this.editable==true){
        this.axios.post("/api/base/pd-courier-scop/fanweisave",{userId:this.id.id,areaId:this.id.countyId,mutiPoints:muti}).then(res => {        
                            // if (res.data.code == 11051) {
                            //     this.$Message.error(res.data.msg);
                            // }else{
                               alert(添加成功)
                            // }    
              })

      }else{
        alert("快递员数据不能为空,请点击编辑才能添加")
      }
      }
     
  },
  created(){
    this.show();
  }
  
};
</script>