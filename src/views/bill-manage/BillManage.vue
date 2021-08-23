<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always" >
      <!-- 查询栏 -->
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium"
      >
        <el-table-column
          show-overflow-tooltip
          prop="account"
          label="交易账户"
          align="center"
        />
        <el-table-column show-overflow-tooltip  label="类型" align="center" >
              <template slot-scope="scope">{{ scope.row.payType == '1'?'消费':scope.row.payType == '2'?'充值':scope.row.payType == '3'?'退单':'活动' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="orderAmount" label="金额" align="center" />
        <el-table-column show-overflow-tooltip prop="balanceBefore" label="账户余额" align="center" />
        <el-table-column show-overflow-tooltip  label="交易时间" align="center" > 
         <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="views(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="page.pageIndex"
        :limit.sync="page.pageSize"
        @pagination="PostFetchData"
      />
      <!-- 新增/编辑 弹出栏 -->
    </el-card>
  </div>
</template>

<script>
//账单管理列表   导出
import {
  apiGetPayRecordList,
  apiPayRecordExport
} from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../../components/Pagination";
import { excelList } from "../../assets/js/validate";//导出 excel 方法
import mixSearch from "../../components/mixSearch";
export default {
  name: "Table",
  components: { Pagination,mixSearch },
  data() {
    return {
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        // payType :null,//交易类型 记录类型 1 充值 2消费 ,
        // account:null,//优惠券标题
        // startTime : null,//创建时间
        // endTime  : null,//结束时间
        // pageIndex: 1, //页码 ,
        // pageSize: 10 //每页数据量大小 ,
      },
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10 //每页数据量大小 ,
      },
      searchFields: [
        { span: 6, type: 'pickerOptionsOld', name:'时间', placeholder: '时间', prop: 'dateTime'},
        { span: 2, prop: 'account', name: '交易账号', placeholder: '请填写' },
        { span: 2, prop: 'payType', name: '交易类型', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null },
                    { label: '消费', value: 1 },
                    { label: '充值', value: 2 },
                    { label: '退单', value: 3 },
                    { label: '活动', value: 4 }
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
      // 新增/编辑提交表单对象
      // 数据总条数
      total: 0,
      // 表格数据数组

      tableData: [],
    
      // 新增/编辑 弹出框显示/隐藏

      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      // 防止多次连续提交表单
      isSubmit: false,
      // 导入数据 弹出框显示/隐藏
      //是否出现审核图片
    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {
    //渠道导出
    exportList(){
      let  {account,endTime,startTime,payType } = this.listQuery;
      let data = { account,endTime,startTime,payType };
      apiPayRecordExport(data) 
       .then(res => {
          console.log(res);
          excelList(res,'账单列表')
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
      let { pageIndex,pageSize } = this.page;
      // 获取审核数据列表接口
      let searchData = Object.assign({}, this.listQuery);
      this.upDateTime(searchData.dateTime,'startTime', 'endTime','dateTime',searchData);
      let data = { ...searchData,pageIndex,pageSize }
      apiGetPayRecordList(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.total = res.data.total;
            this.tableData = res.data.list;
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
      that.onSubmit();
      // this.createMap = null;
      // this.listQuery.pageIndex = 1;
      // this.listQuery.pageSize = 10;
      // this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    }
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
