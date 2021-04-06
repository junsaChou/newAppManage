<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery"
        label-width="90px"
        class="search-form"
      >
        <el-form-item label="优惠券名称">
          <el-input v-model="listQuery.title " placeholder="请填写" />
        </el-form-item>
        <el-form-item label="发放用户">
          <el-select v-model="listQuery.userType " placeholder="审核状态">
            <el-option value label="全部" />
            <el-option :value="0" label="全体用户" />
            <el-option :value="1" label="部分用户" />
          </el-select>
        </el-form-item>
            <el-form-item label="发放时间">
          <el-date-picker
            v-model="createMap"
            type="datetimerange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="changePicker"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="发放状态">
          <el-select v-model="listQuery.state">
            <el-option value label="全部" />
            <el-option :value="0" label="发放失败" />
            <el-option :value="1" label="发放成功" />
          </el-select>
        </el-form-item>
        <el-form-item label="发放人">
          <el-input v-model="listQuery.operatorUser" placeholder="请填写" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
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
          sortable
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
        <!-- <el-table-column prop="hobby" label="爱好" align="center" width="300" show-overflow-tooltip /> -->
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
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
  apiEditUser,
  apiDeletBanner,
  apiCreateBanner
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import Pagination from "../../components/Pagination";
import { validatAlphabetsNum } from "@/assets/js/validate";
// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination },
  data() {
    return {
        //快捷选择时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        title:null,//优惠券标题
        userType:null,//发放用户状态
        startTime : null,//创建时间
        endTime  : null,//结束时间
        state: null, //发放状态
        operatorUser: null, //发放人
        pageIndex: 1, //页码 ,
        pageSize: 10 //每页数据量大小 ,
      },
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
      importVisible: false
      //是否出现审核图片
    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {

    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteApi(row);
          // 此处可添加--删除接口
          // 删除成功调用fetchData方法更新列表
          apiDeletBanner();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteApi(id) {
      let data = { bannerId: id };
      apiDeletBanner(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.PostFetchData(); //重新请求接口
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      // delete data.dateTime;
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
    changePicker(val) {
      //时间选择
      if (val) {
        this.listQuery.startTime = val[0];
        this.listQuery.endTime = val[1];
      } else {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      }
      console.log(val);
    },
    // 查询数据
    onSubmit() {
      // this.listQuery.currentPage = 1;

      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.createMap = null;
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = 10;
      this.PostFetchData();
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
