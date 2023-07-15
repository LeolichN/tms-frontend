<template>

    <div>
        <div class="sousuo">
            <el-form :inline="true" :label-position="labelPosition"  >
                    <el-form-item label="快递员姓名:" style="width: 30%;">
                        <el-input v-model="AuthUserAndCoreOrg.name"></el-input>
                    </el-form-item>
                    <el-form-item label="快递员手机:" style="width: 30%;">
                        <el-input v-model="AuthUserAndCoreOrg.mobile"></el-input>      
                    </el-form-item>
                    <el-button type="danger" @click="show">搜索</el-button><el-button @click="clear">重置</el-button>
            </el-form>
           
        </div>
        <div>
                <el-table
                        :header-cell-style="{background:'rgb(238, 238, 238)',color:'black'}"
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column prop="id" label="编号"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>        
                    <el-table-column prop="mobile" label="手机号"></el-table-column>    
                    <el-table-column prop="cname" label="所属机构"></el-table-column>
                    <el-table-column prop="account" label="快递员APP账号"></el-table-column>
                    <el-table-column prop="id"  fixed="right" align="center" label="操作">
                            <template v-slot="tt">
                                <el-button size="mini"  icon="el-icon-edit" @click="courierScopDetail(tt.row)" type="warning">作业范围分配</el-button>
                                <el-button size="mini" icon="el-icon-edit" @click="xiangqing(tt.row,dialogVisible=true)" type="danger">快递员详情</el-button>
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
                                :total="total">
                    </el-pagination>

        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%">
            员工编号：<el-input v-model="xq.id"></el-input>
            快递员姓名：<el-input v-model="xq.name"></el-input>      
            所属机构：<el-input v-model="xq.cname"></el-input>  
            手机号：<el-input v-model="xq.mobile"></el-input>      
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>
           
    
    <script>
    export default {
            data(){
                return{
              ids:[],
              total:0,//总条数  
              tableData:[],    
              page:1,//当前页
              pageSize:4,//每页的数据条数 
              labelPosition:"left",
              dialogVisible:false,
              xq:{},
              AuthUserAndCoreOrg:{
                name:"",
                mobile:""
              },
            
            }
        },
            
            methods:{
                clear(){
                    this.AuthUserAndCoreOrg.name="";
                    this.AuthUserAndCoreOrg.mobile="";
                },
                courierScopDetail(id){
                this.$router.push({
                    path: "/index/courierScopDetail",
                    query: { data: JSON.stringify(id) },
                });
                },
                updateCirclePath(e){
                this.center = e.target.getCenter()
                this.radius = e.target.getRadius()
                },
                xiangqing(data){            
                    this.xq=data
                },
            show(){
                this.axios.post("/api/aggregation/pd-auth-user/findAuthUserAndCoreOrg",{pageNum:this.page,pageSize:this.pageSize,search:this.AuthUserAndCoreOrg}).then(res => {        
                            if (res.data.code == 11051) {
                                this.$Message.error(res.data.msg);
                            }else{
                                this.tableData=res.data.list;
                                this.total=res.data.total;
                            }    
                   
              })
            },
            handleSelectionChange(val) {       
              this.ids = val;
            },
            handleSizeChange(val) {
              this.pageSize=val;
              this.show(this.page,this.pageSize);
            },
            handleCurrentChange(val) {
              this.page=val;
              this.show(this.page,this.pageSize);
            }
            },
            created(){
                this.show();
            }
    }
    </script>
    
    <style>
    .sousuo{
       
        margin-top: 20px;
        margin-bottom: 20px;    
    }
    .map {
 width: 100%;
 height: 800px;
}
    </style>