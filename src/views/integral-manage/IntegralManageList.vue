<template>
  <div class="table-classic-wrapper">
    <el-card v-show="IntegraListForm.flag">
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery" 
        label-width="100px"
        class="search-form"
      >
        <el-form-item label="登录账户">
          <el-input   v-model="listQuery.account" placeholder="请填写" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
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
          label="用户ID"
          prop="id"
          align="center"
          width="90"
        />
        <el-table-column show-overflow-tooltip prop="account" label="登录账户" align="center" /> 
        <el-table-column show-overflow-tooltip prop="integral" label="总积分" align="center" />
        <el-table-column show-overflow-tooltip prop="integralCount" label="本月积分" align="center" />
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="view(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="pageIndex"
        :limit.sync="pageSize"
        @pagination="PostFetchData"
      />
    </el-card>
      <IntegraList v-if="!IntegraListForm.flag" :userId = IntegraListForm.id   @func="getMsgFormSon"></IntegraList>
  </div>
</template>

<script>
//用户积分列表  添加虚拟账户 添加虚拟账户金额  发放奖励
import {
  apiGetUserIntegralList,
} from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../../components/Pagination";
import IntegraList from "../../components/Integral"; //优惠券组件
// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination, IntegraList},
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      IntegraListForm: { //充值奖励列表
        flag: true,
        id:null,
      },
      // 查询列表参数对象
      listQuery: {
        account: null,
      },
      // 数据总条数
      total: 0,
      // 表格数据数组
      pageIndex: 1, //页码 ,
      pageSize: 10, //每页数据量大小 ,
      tableData: [],
      // 新增/编辑 弹出框显示/隐藏
    };
  },
  created(){
    this.PostFetchData();
  },
  methods: {
    getMsgFormSon(data) {
      this.IntegraListForm.flag = data;
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      if(this.listQuery.account == ''){
        this.listQuery.account = null;
      }
      data["pageIndex"] = this.pageIndex;
      data["pageSize"] = this.pageSize;
      // delete data.dateTime;
      apiGetUserIntegralList(data)
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
      // this.listQuery.currentPage = 1;

      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    //查看
    view(index, row) {
      console.log(row);
      this.IntegraListForm.flag = false;
      this.IntegraListForm.id = row.id;
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
  // .is-disabled {
  //  .el-input__inner{
  //     color: #000;
  //     font-weight: 500;
  //     font-size: 32px;
  //     border: none;
  //   }
  // }
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
/* switch按钮样式 */
.switch .el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
}
/*打开时文字位置设置*/
.switch .el-switch__label--right {
  z-index: 1;
}
/* 调整打开时文字的显示位子 */
.switch .el-switch__label--right span {
  margin-right: 9px;
}
/*关闭时文字位置设置*/
.switch .el-switch__label--left {
  z-index: 1;
}
/* 调整关闭时文字的显示位子 */
.switch .el-switch__label--left span {
  margin-left: 9px;
}
/*显示文字*/
.switch .el-switch__label.is-active {
  display: block;
}
/* 调整按钮的宽度 */
.switch.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 70px !important;
  margin: 0;
}
</style>
