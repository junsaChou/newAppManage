<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
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
        <!-- <el-table-column type="selection" width="60" /> -->
        <el-table-column
          show-overflow-tooltip
          prop="account"
          label="使用用户"
          align="center"
          width="100"
          sortable
        />
         <el-table-column show-overflow-tooltip prop="orderNo" label="使用订单号" align="center" />
        <el-table-column show-overflow-tooltip  prop="title"  label="券名称" align="center" />
        <el-table-column show-overflow-tooltip prop="usedAmount" label="面额" align="center" />
        <el-table-column show-overflow-tooltip prop="withAmount" label="满减额度" align="center" />
        <el-table-column show-overflow-tooltip prop="operatorUser" label="发放人" align="center" />
        <!-- <el-table-column show-overflow-tooltip label="发放状态" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.state == '0'?'发放失败':'发放成功' }}</template>
        </el-table-column> -->
        <el-table-column show-overflow-tooltip label="发放时间" align="center" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.createTime  | formatDate}}</span>
          </template>
        </el-table-column>
         <el-table-column show-overflow-tooltip label="使用时间" align="center" width="120">
          <template slot-scope="scope" >
            <span v-if="scope.row.useTime!=''">{{scope.row.useTime  | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="过期时间" align="center" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.validEndTime  | formatDate}}</span>
          </template>
        </el-table-column>
         <el-table-column show-overflow-tooltip label="状态" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.userCouponState == '0'?'未使用': scope.row.userCouponState == '1'? '已使用':'已过期' }}</template>
        </el-table-column>
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
//优惠券使用列表  导出
import {
  apiGetUserCouponListUse,
  apiUserCouponListExport
} from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../../components/Pagination";
import { excelList } from "../../assets/js/validate";//导出 excel 方法
import mixSearch from "../../components/mixSearch";

export default {
  name: "useTable",
  components: { Pagination,mixSearch },
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
      },
      searchFields: [
        { span: 2, prop: 'title', name: '优惠券名称', placeholder: '请输入' },
        { span: 2, prop: 'useState', name: '券状态', placeholder: '请选择', type: 'select',
           options: [
                    { label: '已使用', value: 1 },
                    { label: '已过期', value: 2 }
                    ]
        },
        {span: 6, type: 'pickerOptionsDate', name:'发放时间', placeholder: '发放时间', prop: 'createMap'},
        {span: 6, type: 'pickerOptionsDate', name:'使用时间', placeholder: '使用时间', prop: 'updateMAp'},
        { span: 2, prop: 'operatorUser', name: '发放人', placeholder: '请输入' },
        {
          span: 2,
          type: 'reset',
          style:'warning',
          class:'resetName',
          label: '重置',
          options: [
            { label: '搜索', type: 'primary', click: this.onSubmit },
            { label: '导出', type: 'success', click: this.exportList },
          ],
        },
      ],
      listQuery: {
        // title:null,//优惠券标题
        // useState: 1,//券状态
        // type :null,
        // startTime : null,//创建时间
        // endTime  : null,//结束时间
        // state: null, //发放状态
        // operatorUser: null, //发放人
        // pageIndex: 1, //页码 ,
        // pageSize: 10, //每页数据量大小 ,
        // useEndTime: null, // 跟新结束时间 ,
        // useStartTime: null // 跟新开始时间
      },
      // createMap:null,//创建日期map
      // updateMAp: null, //更新时间储存
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
    // 获取数据列表
    PostFetchData() {
      // this.listLoading = true;
      // 获取审核数据列表接口
      // let data = this.listQuery;
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.listQuery);
      this.upDateTime(searchData.createMap,'startTime', 'endTime','createMap',searchData);
      this.upDateTime(searchData.updateMAp,'useStartTime', 'useEndTime','updateMAp',searchData);
      let data = { ...searchData,pageIndex,pageSize}
      apiGetUserCouponListUse(data)
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
       //渠道导出
    exportList(){
      let data = Object.assign({}, this.listQuery)
      // delete data.pageSize;
      // delete data.pageIndex;
      apiUserCouponListExport(data) 
       .then(res => {
          console.log(res);
          excelList(res,'优惠券使用列表');
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
      that.listQuery.useState = 1,//券状态
      that.onSubmit();
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
