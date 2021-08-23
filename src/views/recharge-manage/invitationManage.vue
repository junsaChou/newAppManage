<template>
  <div class="table-classic-wrapper">
    <el-card >
      <!-- 查询栏 -->
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
      <div class="control-btns">
        <div>
          <span class="left">邀请注册总人数:</span>
          <span>{{extendsMap.countPregister}}</span>
          <!-- <el-input  v-model="extendsMap.loginIntegral"  > -->
        </div>
        <div>
          <span class="left">邀请认证总人数:</span>
          <span>{{extendsMap.countApprove}}</span>
        </div>
        <div>
          <span class="left">首次充值总人数:</span>
          <span>{{extendsMap.countRecharge}}</span>
        </div>
         <div>
          <span class="left">首次抢单总人数:</span>
          <span>{{extendsMap.countBuy}}</span>
        </div>
        <div>
          <span class="left">充值总金额:</span>
          <span>{{extendsMap.sumAmount}}</span>
        </div>
        <div>
          <span class="left">抢单总数量:</span>
          <span>{{extendsMap.countOrder}}</span>
        </div>
      </div>
      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium"
      >
        <!-- <el-table-column type="selection" width="60" /> -->
        <el-table-column
          show-overflow-tooltip
          label="邀请人"
          prop="inviterAccount"
          align="center"
          width="90"
        />
        <el-table-column show-overflow-tooltip prop="inviteeAccount" label="被邀请人" align="center" /> 
        <el-table-column show-overflow-tooltip prop="inviterCount" label="邀请获得" align="center" />
        <el-table-column show-overflow-tooltip  label="注册" align="center" >
          <template slot-scope="scope">
            <span>{{scope.row.registerTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="认证" align="center" >
          <template slot-scope="scope">
            <span v-if="scope.row.approveTime != ''">{{scope.row.approveTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="goldIntegral" label="首次充值" align="center" >
          <template slot-scope="scope">
            <span v-if="scope.row.firstRecharge != ''">{{scope.row.firstRecharge | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="sumRecharge" label="充值金额" align="center" />
        <el-table-column show-overflow-tooltip prop="countBuy" label="抢单数量" align="center" />
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="page.pageIndex"
        :limit.sync="page.pageSize"
        @pagination="PostFetchData"
      />
    </el-card>
  </div>
</template>

<script>
import {
  apiGetInvitationList,
  apiInvitationListExport
} from "../../api/apilist";
import { excelList } from "../../assets/js/validate"
import Pagination from "../../components/Pagination";
import mixSearch from "../../components/mixSearch";

export default {
  name: "Table",
  components: { Pagination,mixSearch},
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      createMap:null,//创建日期map
      listQuery: {
        // phone: null, //手机号
        // authState: null, // 邀请进度
        // startTime : null,//创建时间
        // endTime  : null,//结束时间
        // pageIndex: 1, //页码 ,
        // pageSize: 10 //每页数据量大小 ,
      },
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10 //每页数据量大小 
      },
      searchFields: [
        { span: 6, type: 'pickerOptionsOld', name:'时间', placeholder: '时间', prop: 'dateTime',pickerOptions: this.pickerOptions},
        { span: 2, prop: 'phone', name: '手机号', placeholder: '请填写' },
        { span: 2, prop: 'authState', name: '邀请进度', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null },
                    { label: '注册', value: 1 },
                    { label: '认证', value: 2 },
                    { label: '充值', value: 3 }
                    ]
        },
        {
          span: 2,
          type: 'reset',
          style:'primary',
          class:'resetName',
          label: '重置',
          options: [
            { label: '搜索', type: 'warning', click: this.onSubmit },
            { label: '导出', type: 'success', click: this.exportList },
          ],
        },
      ],
      extendsMap:{},//总积分数值
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      // 新增/编辑 弹出框显示/隐藏
    };
  },
  created(){
    this.PostFetchData();
  },
  methods: {
        //渠道导出
    exportList(){
      let data = Object.assign({}, this.listQuery)
      apiInvitationListExport(data) 
       .then(res => {
          excelList(res,'邀请管理')
          this.timer = setTimeout(()=>{
              this.$message.success('导出成功');
          }, 3000)
        })
        .catch(error => {
           this.$message({
                type: "error",
                message: '导出失败'
            });
          this.listLoading = false;
        });
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      // let data = this.listQuery;
      let { pageIndex,pageSize } = this.page;
      // 获取审核数据列表接口
      let searchData = Object.assign({}, this.listQuery);
      this.upDateTime(searchData.dateTime,'startTime', 'endTime','dateTime',searchData);
      let data = { ...searchData,pageIndex,pageSize }
      apiGetInvitationList(data)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total;
            this.tableData = res.data.list;
            this.extendsMap = res.data.extendsMap;
            this.listLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    // 查询数据
    onSubmit() {
      this.page.pageIndex = 1;
      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.onSubmit();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
  }
};
</script>

<style lang="less">

.table-classic-wrapper {
  .el-card {
    min-height: 656px;
    .body {
      // display: grid;
      // grid-template-rows: 60px auto 60px;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-direction: column;
      overflow: hidden;
      &.active {
        grid-template-rows: 60px auto;
        overflow: hidden;
      }
    }
  }
  .control-btns {
    margin-bottom: 8px;
    display: flex;
    // padding-left: 20px;
    div{
      margin: 0 25px;
      color:rgb(217, 0, 27);
      span{
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .search-form {
    padding-top: 18px;
    margin-bottom: 15px;
    background-color: #f7f8fb;
  }
  .el-table thead {
    font-weight: 600;
    th {
      background-color: #f2f3f7;
    }
  }
  .dialog-form {
    .el-form-item__label {
      padding: 0;
    }
    .el-input {
      max-width: 380px;
    }
    .footer-item {
      margin-top: 50px;
      text-align: right;
    }
  }
  .upload-box,
  .export-data {
    width: 300px;
    margin: 0 auto 30px;
  }
  .upload-box {
    width: 156px;
    .files-upload {
      color: #20a0ff;
    }
  }
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
  .hints {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
}
</style>
