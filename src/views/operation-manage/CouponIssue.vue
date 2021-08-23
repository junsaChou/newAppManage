<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
      <!-- 查询栏 -->
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
      <!-- 操作栏 -->
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
          prop="id"
          label="优惠券编码"
          align="center"
          width="100"
        />
        <el-table-column show-overflow-tooltip prop="title" label="优惠券名称" align="center" />
        <el-table-column show-overflow-tooltip  label="发放用户" align="center" >
           <template
            slot-scope="scope"
          >{{ scope.row.userType  == '0'?'全体用户':'部分用户' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="发放时间" align="center" width="120">
          <template slot-scope="scope">
            <span>{{  scope.row.createTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="usedAmount" label="面额" align="center" />
        <el-table-column show-overflow-tooltip prop="withAmount" label="满减额度" align="center" />
        <el-table-column show-overflow-tooltip prop="operatorUser" label="发放人" align="center" />
        <el-table-column show-overflow-tooltip label="发放状态" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.state == '0'?'发放失败':'发放成功' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="成功/失败时间" align="center" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.createTime  | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="usedCount" label="使用人数" align="center" />
        <el-table-column show-overflow-tooltip prop="unusedCount" label="未使用人数" align="center" />
        <el-table-column show-overflow-tooltip prop="overdueCount" label="过期人数" align="center" />
        <el-table-column show-overflow-tooltip label="有效期" align="center" width="120">
          <template slot-scope="scope">
            <span>{{  scope.row.validStartTime | formatDate }}</span>-<span>{{  scope.row.validEndTime | formatDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="hobby" label="爱好" align="center" width="300" show-overflow-tooltip /> -->
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
//发放优惠券列表  
import {
  apiGetGiveOutRecordList,
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import Pagination from "../../components/Pagination";
import mixSearch from "../../components/mixSearch";

export default {
  name: "Table",
  components: { Pagination,mixSearch },
  data() {
    return {
      //   //快捷选择时间
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        // title:null,//优惠券标题
        // userType:null,//发放用户状态
        // startTime : null,//创建时间
        // endTime  : null,//结束时间
        // state: null, //发放状态
        // operatorUser: null, //发放人
        // pageIndex: 1, //页码 ,
        // pageSize: 10 //每页数据量大小 ,
      },
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
      },
      searchFields: [
        { span: 2, prop: 'title', name: '优惠券名称', placeholder: '请输入' },
        { span: 2, prop: 'userType', name: '发放用户', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null },
                    { label: '全体用户', value: 0 },
                    { label: '部分用户', value: 1 }
                    ]
        },
        {span: 6, type: 'pickerOptionsPicker', name:'发放时间', placeholder: '发放时间', prop: 'dateTime'},
        { span: 2, prop: 'state',name:'发放状态', placeholder: '请输入',  type: 'select',
          options: [
                    { label: '全部', value: null },
                    { label: '发放失败', value: 0 },
                    { label: '发放成功', value: 1 },
                    ]
        },
        { span: 2, prop: 'operatorUser', name: '发放人', placeholder: '请输入' },
        {
          span: 2,
          type: 'reset',
          style:'warning',
          class:'resetName',
          label: '重置',
          options: [
            { label: '搜索', type: 'primary', click: this.onSubmit },
            // { label: '重置', type: 'warning', click: this.onReset },
          ],
        },
      ],
      createMap:null,//创建日期map
      // 新增/编辑提交表单对象
      // 数据总条数
      total: 0,
      // 表格数据数组

      tableData: [],
    
      // 新增/编辑 弹出框显示/隐藏

      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        title: [
          { required: true, message: "请输入banner名称", trigger: "blur" },
          {
            validator: validatorForm.validateNumberAcCn,
            trigger: "blur"
          }
        ],
        bannerSort: [
          { required: true, message: "请输入最大为99的数字", trigger: "blur" },
          {
            validator: validatorForm.validateNumber,
            trigger: "blur"
          }
        ],
        bannerUrl: [
          { required: true, message: "请输入图片访问地址", trigger: "blur" },
          {
            validator: validatorForm.validateIsUrl,
            trigger: "blur"
          }
        ],
        startTime: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择用户账户状态：", trigger: "change" }
        ]
      },
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
      this.listLoading = true;
      // 获取审核数据列表接口
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.listQuery);
      this.upDateTime(searchData.dateTime,'startTime', 'endTime','dateTime',searchData);
      let data = { ...searchData,pageIndex,pageSize}
      apiGetGiveOutRecordList(data)
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
      this.onSubmit();
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
