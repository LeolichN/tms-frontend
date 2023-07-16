<template>
    <el-tabs type="border-card">

        <el-tab-pane label="取件作业">
            <div class="sousuo">
                <el-form :inline="true" :label-position="labelPosition">
                    <el-form-item label="运单编号:" style="width: 30%;">
                        <el-input v-model="PdTickupAndOrder.tid" placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                    <el-form-item label="快递员姓名:" style="width: 30%;">
                        <el-input v-model="PdTickupAndOrder.name" placeholder="请输入发件人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="发件人地址:" style="width: 30%;">
                        <div style="width:330px;">
                            <el-select v-model="PdTickupAndOrderpai.senderProvinceId" @change="shishow" placeholder="请选择"
                                style="width: 30%;">
                                <el-option v-for="(item, index) in sheng" :key="index" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                            <el-select placeholder="请选择" @change="qushow" v-model="PdTickupAndOrderpai.senderCityId"
                                style="width: 30%;margin-left: 8px;">
                                <el-option v-for="(item, index) in shilist" :key="index" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                            <el-select placeholder="请选择" v-model="PdTickupAndOrderpai.senderCountyId"
                                style="width: 30%;margin-left: 8px;">
                                <el-option v-for="(item, index) in qulist" :key="index" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>

                        </div>
                    </el-form-item>
                    <el-form-item label="发件人姓名:" style="width: 30%;">
                        <el-input v-model="PdTickupAndOrder.receiverName" placeholder="请输入发件人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="作业状态:" style="width: 30%;">
                        <el-select v-model="PdTickupAndOrder.status" placeholder="请选择">
                            <el-option label="待提交" value="1"></el-option>
                            <el-option label="在途" value="3"></el-option>
                            <el-option label="已支付" value="4"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <el-button type="danger" @click="show">搜索</el-button><el-button @click="clear">重置</el-button>
                <hr style=" margin-top: 20px;" />
            </div>
            <div style=" margin-top: 20px;">
                <el-button type="danger" @click="shou">+分配快递员</el-button>
                <el-table :header-cell-style="{ background: 'rgb(238, 238, 238)', color: 'black' }" :data="tableData"
                    tooltip-effect="dark" style="width: 100%;margin-top: 20px;" @selection-change="handleSelectionChange">
                    <el-table-column fixed prop="id" type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="取件编号"></el-table-column>
                    <el-table-column prop="tid" label="运单编号"></el-table-column>
                    <el-table-column prop="assignedStatus" label="快递员分配状态">
                        <template v-slot="tt">
                            <span v-if="tt.row.assignedStatus == 1">未分配</span>
                            <span v-if="tt.row.assignedStatus == 2">已分配</span>
                            <span v-if="tt.row.assignedStatus == 3">待人工分配</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间"></el-table-column>
                    <el-table-column prop="status" label="作业状态">
                        <template v-slot="tt">
                            <span v-if="tt.row.status == 1">待提交</span>
                            <span v-if="tt.row.status == 3">在途</span>
                            <span v-if="tt.row.status == 4">已支付</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="快递员姓名"></el-table-column>
                    <el-table-column prop="receiverName" label="收件人姓名"></el-table-column>
                    <el-table-column prop="receiverPhone" label="收件人电话"></el-table-column>
                    <el-table-column label="收件人地址">
                        <template v-slot="tt">
                            <span v-for="list in arealist" :key="list.senderProvinceId">
                                <span v-if="(tt.row.receiverProvinceId == list.id)">{{ list.name }}</span>
                                <span v-if="(tt.row.receiverCityId == list.id)">{{ list.name }}</span>
                                <span v-if="(tt.row.receiverCountyId == list.id)">{{ list.name }}</span>
                            </span>
                            <span>{{ tt.row.receiverAddress }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="estimatedStartTime" label="计划取件时间"></el-table-column>
                    <el-table-column prop="actualEndTime" label="完成时间"></el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                    :page-sizes="[2, 4, 6, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="派件作业">
            <div class="sousuo">
                <el-form :inline="true" :label-position="labelPosition">
                    <el-form-item label="运单编号:" style="width: 30%;">
                        <el-input v-model="PdTickupAndOrderpai.tid" placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                    <el-form-item label="快递员姓名:" style="width: 30%;">
                        <el-input v-model="PdTickupAndOrderpai.name" placeholder="请输入发件人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人地址:" style="width: 30%;">
                        <div style="width:330px;">
                            <el-select v-model="PdTickupAndOrder.receiverProvinceId" @change="shoushishow" placeholder="请选择"
                                style="width: 30%;">
                                <el-option v-for="(item, index) in sheng" :key="index" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                            <el-select placeholder="请选择" @change="shouqushow" v-model="PdTickupAndOrder.receiverCityId"
                                style="width: 30%;margin-left: 8px;">
                                <el-option v-for="(item, index) in shoushilist" :key="index" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                            <el-select placeholder="请选择" v-model="PdTickupAndOrder.receiverCountyId"
                                style="width: 30%;margin-left: 8px;">
                                <el-option v-for="(item, index) in shouqulist" :key="index" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>

                        </div>
                    </el-form-item>
                    <el-form-item label="收件人姓名:" style="width: 30%;">
                        <el-input v-model="PdTickupAndOrderpai.receiverName" placeholder="请输入发件人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="作业状态:" style="width: 30%;">
                        <el-select v-model="PdTickupAndOrderpai.status" placeholder="请选择">
                            <el-option label="待提交" value="1"></el-option>
                            <el-option label="在途" value="3"></el-option>
                            <el-option label="已支付" value="4"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <el-button type="danger" @click="showpai">搜索</el-button><el-button @click="clearpai">重置</el-button>
                <hr style=" margin-top: 20px;" />
            </div>
            <div style=" margin-top: 20px;">
                <el-button type="danger" @click="pai">+分配快递员</el-button>
                <el-table :header-cell-style="{ background: 'rgb(238, 238, 238)', color: 'black' }" ref="multipleTable"
                    :data="tableData1" tooltip-effect="dark" style="width: 100%;margin-top: 20px;"
                    @selection-change="handleSelectionChange1">
                    <el-table-column fixed type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="派件编号"></el-table-column>
                    <el-table-column prop="tid" label="运单编号"></el-table-column>
                    <el-table-column prop="assignedStatus" label="快递员分配状态">
                        <template v-slot="tt">
                            <span v-if="tt.row.assignedStatus == 1">未分配</span>
                            <span v-if="tt.row.assignedStatus == 2">已分配</span>
                            <span v-if="tt.row.assignedStatus == 3">待人工分配</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间"></el-table-column>
                    <el-table-column prop="status" label="作业状态">
                        <template v-slot="tt">
                            <span v-if="tt.row.status == 1">待提交</span>
                            <span v-if="tt.row.status == 3">在途</span>
                            <span v-if="tt.row.status == 4">已支付</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="快递员姓名"></el-table-column>
                    <el-table-column prop="senderName" label="收件人姓名"></el-table-column>
                    <el-table-column prop="senderPhone" label="收件人电话"></el-table-column>
                    <el-table-column prop="receiverProvinceId" label="收件人地址">
                        <template v-slot="tt">
                            <span v-for="list in arealist" :key="list.senderProvinceId">
                                <span v-if="(tt.row.senderProvinceId == list.id)">{{ list.name }}</span>
                                <span v-if="(tt.row.senderCityId == list.id)">{{ list.name }}</span>
                                <span v-if="(tt.row.senderCountyId == list.id)">{{ list.name }}</span>
                            </span>
                            <span>{{ tt.row.senderAddress }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="estimatedStartTime" label="计划派件时间"></el-table-column>
                    <el-table-column prop="actualEndTime" label="完成时间"></el-table-column>
                    <el-table-column prop="signStatus" label="签收状态"></el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="page1"
                    :page-sizes="[2, 4, 6, 10]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="已取消">
            <div style=" margin-top: 20px;">
                <el-table :header-cell-style="{ background: 'rgb(238, 238, 238)', color: 'black' }" ref="multipleTable"
                    :data="tableData2" tooltip-effect="dark" style="width: 100%;margin-top: 20px;"
                    @selection-change="handleSelectionChange2">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column fixed prop="id" label="取件编号"></el-table-column>
                    <el-table-column prop="tid" label="运单编号"></el-table-column>
                    <el-table-column prop="assignedStatus" label="快递员分配状态">
                        <template v-slot="tt">
                            <span v-if="tt.row.assignedStatus == 1">未分配</span>
                            <span v-if="tt.row.assignedStatus == 2">已分配</span>
                            <span v-if="tt.row.assignedStatus == 3">待人工分配</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间"></el-table-column>
                    <el-table-column prop="status" label="作业状态">
                        <template v-slot="tt">
                            <span v-if="tt.row.status == 1">待提交</span>
                            <span v-if="tt.row.status == 3">在途</span>
                            <span v-if="tt.row.status == 4">已支付</span>
                            <span v-if="tt.row.status == 5">已取消</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="快递员姓名"></el-table-column>
                    <el-table-column prop="receiverName" label="收件人姓名"></el-table-column>
                    <el-table-column prop="receiverPhone" label="收件人电话"></el-table-column>
                    <el-table-column label="收件人地址">
                        <template v-slot="tt">
                            <span v-for="list in arealist" :key="list.senderProvinceId">
                                <span v-if="(tt.row.receiverProvinceId == list.id)">{{ list.name }}</span>
                                <span v-if="(tt.row.receiverCityId == list.id)">{{ list.name }}</span>
                                <span v-if="(tt.row.receiverCountyId == list.id)">{{ list.name }}</span>
                            </span>
                            <span>{{ tt.row.receiverAddress }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="estimatedStartTime" label="计划取件时间"></el-table-column>
                    <el-table-column prop="actualEndTime" label="完成时间"></el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page2"
                    :page-sizes="[2, 4, 6, 10]" :page-size="pageSize2" layout="total, sizes, prev, pager, next, jumper"
                    :total="total2">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-dialog title="分配快递员" :visible.sync="dialogVisible" width="50%">

            快递员：<el-select placeholder="请选择" v-model="courierid" style="width: 30%;margin-left: 8px;">
                <el-option v-for="(item, index) in querycourieridlist" :key="index" :label="item.name"
                    :value="item.id"></el-option>
            </el-select>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatecourierid(dialogVisible = false)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="分配快递员" :visible.sync="dialogVisible1" width="50%">

            快递员：<el-select placeholder="请选择" v-model="courierid" style="width: 30%;margin-left: 8px;">
                <el-option v-for="(item, index) in querycourieridlist" :key="index" :label="item.name"
                    :value="item.id"></el-option>
            </el-select>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="updatecourieridone(dialogVisible1 = false)">确 定</el-button>
            </div>
        </el-dialog>
    </el-tabs>
</template>

<script>
export default {
    data() {
        return {
            ids: [],
            total: 0,//总条数  
            tableData: [],
            page: 1,//当前页
            pageSize: 4,//每页的数据条数
            ids1: [],
            total1: 0,//总条数     
            tableData1: [],
            page1: 1,//当前页
            pageSize1: 4,//每页的数据条数  
            ids2: [],
            total2: 0,//总条数     
            tableData2: [],
            page2: 1,//当前页
            pageSize2: 4,//每页的数据条数  
            labelPosition: "left",
            arealist: [],
            sheng: [],
            shi: [],
            shilist: [],
            shoushilist: [],
            qu: [],
            qulist: [],
            shouqulist: [],
            PdTickupAndOrder: {
                tid: "",
                name: "",
                senderProvinceId: "",
                senderCityId: "",
                senderCountyId: "",
                receiverName: "",
                status: ""
            },
            PdTickupAndOrderpai: {
                tid: "",
                name: "",
                receiverProvinceId: "",
                receiverCityId: "",
                receiverCountyId: "",
                receiverName: "",
                status: ""
            },
            dialogVisible: false,
            dialogVisible1: false,
            querycourieridlist: [],
            courierid: ""
        }

    },

    methods: {
        shou() {
            if (this.ids.length > 0) {
                this.dialogVisible = true
            } else {
                alert("未选中订单")
            }
        },
        pai() {
            if (this.ids1.length > 0) {
                this.dialogVisible1 = true
            } else {
                alert("未选中订单")
            }
        },
        clearpai() {
            this.PdTickupAndOrderpai.tid = "";
            this.PdTickupAndOrderpai.name = "";
            this.PdTickupAndOrderpai.receiverProvinceId = "";
            this.PdTickupAndOrderpai.receiverCityId = "";
            this.PdTickupAndOrderpai.receiverCountyId = "";
            this.PdTickupAndOrderpai.receiverName = "";
            this.PdTickupAndOrderpai.status = "";
        },
        clear() {
            this.PdTickupAndOrder.tid = "";
            this.PdTickupAndOrder.name = "";
            this.PdTickupAndOrder.senderProvinceId = "";
            this.PdTickupAndOrder.senderCityId = "";
            this.PdTickupAndOrder.senderCountyId = "";
            this.PdTickupAndOrder.receiverName = "";
            this.PdTickupAndOrder.status = "";
        },
        updatecourieridone() {
            let agencyId = "";
            for (let j = 0; j < querycourieridlist.length; j++) {
                if (querycourieridlist[j].courierid == this.courierid) {
                    agencyId = querycourieridlist[j].agencyId
                }
            }
            if (this.ids1.length > 0) {
                if (this.courierid != null && this.courierid != "") {

                    for (let i = 0; i < this.ids1.length; i++) {
                        this.ids1[i].courierId = this.courierid;
                        this.ids1[i].agencyId = agencyId;
                        this.axios.post("/api/work/pd-task-pickup-dispatch/updatecourieridone", this.ids1[i]).then(res => {
                            if (res.data.code == 11051) {
                                this.$Message.error(res.data.msg);
                            } else {
                                alert("分配成功")
                            }
                        })
                    }
                    this.showpai();
                } else {
                    alert("快递员不能为空")

                }
            } else {
                alert("未选中订单")
            }
        },
        updatecourierid() {
            let agencyId = "";
            for (let j = 0; j < querycourieridlist.length; j++) {
                if (querycourieridlist[j].courierid == this.courierid) {
                    agencyId = querycourieridlist[j].agencyId
                }
            }
            if (this.ids.length > 0) {
                if (this.courierid != null && this.courierid != "") {

                    for (let i = 0; i < this.ids.length; i++) {
                        this.ids[i].courierId = this.courierid
                        this.ids[i].agencyId = agencyId;
                        this.axios.post("/api/work/pd-task-pickup-dispatch/updatecourierid", this.ids[i]).then(res => {
                            if (res.data.code == 11051) {
                                this.$Message.error(res.data.msg);
                            } else {
                                alert("分配成功")
                            }

                        })
                    }
                    this.show();
                } else {
                    alert("快递员不能为空")

                }
            } else {
                alert("未选中订单")
            }

        },
        querycourierid() {
            this.axios.post("/api/aggregation/pd-auth-user/querycourierid").then(res => {
                this.querycourieridlist = res.data;
            })

        },
        area() {
            this.axios.post("/api/aggregation/pd-area/findarea").then(res => {

                this.arealist = res.data;
                for (let index = 0; index < this.arealist.length; index++) {
                    if (this.arealist[index].pid == 0) {
                        this.sheng.push(this.arealist[index])
                        for (let index2 = 0; index2 < this.arealist.length; index2++) {
                            if (this.arealist[index2].pid == this.arealist[index].id) {
                                this.shi.push(this.arealist[index2])
                                for (let index3 = 0; index3 < this.arealist.length; index3++) {
                                    if (this.arealist[index3].pid == this.arealist[index2].id) {
                                        this.qu.push(this.arealist[index3])
                                    }

                                }

                            }

                        }
                    }

                }
            })
        },
        shishow() {
            this.shilist = []
            for (let i = 0; i < this.shi.length; i++) {
                if (this.PdOrder.senderProvinceId == this.shi[i].pid) {
                    this.shilist.push(this.shi[i])
                }
            }

        },
        qushow() {
            this.qulist = []
            for (let i = 0; i < this.qu.length; i++) {
                if (this.PdOrder.senderCityId == this.qu[i].pid) {
                    this.qulist.push(this.qu[i])
                }
            }

        },
        shoushishow() {
            this.shoushilist = []
            for (let i = 0; i < this.shi.length; i++) {
                if (this.PdOrder.receiverProvinceId == this.shi[i].pid) {
                    this.shoushilist.push(this.shi[i])
                }
            }

        },
        shouqushow() {
            this.shouqulist = []
            for (let i = 0; i < this.qu.length; i++) {
                if (this.PdOrder.receiverCityId == this.qu[i].pid) {
                    this.shouqulist.push(this.qu[i])
                }
            }

        },
        show() {
            this.axios.post("/api/aggregation/pd-task-pickup-dispatch/findTickupAndOrder", { pageNum: this.page, pageSize: this.pageSize, search: this.PdTickupAndOrder }).then(res => {
                if (res.data.code == 11051) {
                    this.$Message.error(res.data.msg);
                } else {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                }
            })
        },
        showpai() {
            this.axios.post("/api/aggregation/pd-task-pickup-dispatch/findTickupAndOrderpai", { pageNum: this.page, pageSize: this.pageSize, search: this.PdTickupAndOrderpai }).then(res => {
                if (res.data.code == 11051) {
                    this.$Message.error(res.data.msg);
                } else {
                    this.tableData1 = res.data.list;
                    this.total1 = res.data.total;
                }

            })
        },
        showquxiao() {
            this.axios.post("/api/aggregation/pd-task-pickup-dispatch/findTickupAndOrderquxiao", { pageNum: this.page, pageSize: this.pageSize }).then(res => {
                if (res.data.code == 11051) {
                    this.$Message.error(res.data.msg);
                } else {
                    this.tableData2 = res.data.list;
                    this.total2 = res.data.total;
                }

            })
        },
        handleSelectionChange(val) {
            this.ids = val;
            console.log(this.ids);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.show(this.page, this.pageSize);
        },
        handleCurrentChange(val) {
            this.page = val;
            this.show(this.page, this.pageSize);
        },
        handleSelectionChange1(val) {
            this.ids1 = val;
        },
        handleSizeChange1(val) {
            this.pageSize1 = val;
            this.show(this.page1, this.pageSize1);
        },
        handleCurrentChange1(val) {
            this.page1 = val;
            this.show(this.page1, this.pageSize1);
        },
        handleSelectionChange2(val) {
            this.ids2 = val;
        },
        handleSizeChange2(val) {
            this.pageSize2 = val;
            this.show(this.page2, this.pageSize2);
        },
        handleCurrentChange2(val) {
            this.page2 = val;
            this.show(this.page2, this.pageSize2);
        }
    },
    created() {
        this.show();
        this.showpai();
        this.area();
        this.querycourierid()
    }
}
</script>
    
<style>
.sousuo {

    margin-top: 20px;
    margin-bottom: 20px;
}
</style>