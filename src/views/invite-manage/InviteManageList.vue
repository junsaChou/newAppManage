<template>
  <div class="table-classic-wrapper">
    <el-card v-show="rewardListForm.flag">
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery" 
        label-width="100px"
        class="search-form"
      >
        <el-form-item label="累计发放金币">
          <el-input disabled  v-model="extendsMap.sumAmount" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="listQuery.type " placeholder="请填写">
            <el-option :value="1" label="本月排行" />
            <el-option :value="2" label="上月排行" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">添加账号</el-button>
        <el-button type="primary" @click="rewardListForm.flag = false">更改金额</el-button>
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
          label="排名"
          prop="id"
          align="center"
          width="90"
        />
        <el-table-column show-overflow-tooltip prop="account" label="登录账户" align="center" /> 
        <el-table-column show-overflow-tooltip prop="activitySorce" label="邀请获得" align="center" />
        <el-table-column show-overflow-tooltip prop="reward" label="奖励金额" align="center" />
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <!-- {{extendsMap.type}}{{scope.row.rewardState}} -->
            <el-button size="mini" v-if="(extendsMap.type == 2 & scope.row.rewardState == 0 & scope.row.userType  == 0   & scope.row.id  <= 10)" type="primary" @click="handleDispatch(scope.$index,scope.row)">发放奖励</el-button>
            <span v-else-if="(extendsMap.type == 2 & scope.row.rewardState == 1 )">已发放</span>
            <el-button size="mini" v-else-if="(extendsMap.type == 1 & scope.row.userType  == 1 )" type="primary" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
            <span v-else></span>
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
      <!-- 新增/编辑 弹出栏 -->
      <el-dialog
        :title="formVisibleList.title"
        :visible.sync="formVisibleList.formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules"  label-width="110px">
          <el-form-item label="用户名：" prop="account" maxlength="11" v-if="formVisibleList.isCreate"> 
            <el-input v-model="dialogForm.account" />
          </el-form-item>
          <el-form-item label="邀请获得：" prop="amount" maxlength="6">
            <el-input v-model="dialogForm.amount" />
          </el-form-item>
          <!-- <el-form-item label="活动链接：" prop="linkUrl">
            <el-input v-model="dialogForm.linkUrl" />
          </el-form-item> -->

          <div class="footer-item">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitForm('dialogForm',formVisibleList.isCreate)"
            >确 定</el-button>
            <!-- <el-button type="primary" v-else :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button> -->
          </div>
        </el-form>
      </el-dialog>
      <!-- <div class="upload-box">
          <span>选择文件：</span>
          <Upload :files-format="filesFormat">
            <i class="vue-dsn-icon-upload" />上传文件
          </Upload>
      </div>-->
      <!-- <div class="hints">TIP：请选择要导出数据的格式。</div>
        <span slot="footer">
          <el-button @click="cancleImport">取 消</el-button>
          <el-button type="primary" @click="confirmImport">确 定</el-button>
        </span>
      </el-dialog>-->
    </el-card>
      <RewardList v-if="!rewardListForm.flag"  :isActiviteId = "3"  @func="getMsgFormSon"></RewardList>
  </div>
</template>

<script>
//充值活动列表  添加虚拟账户 添加虚拟账户金额  发放奖励
import {
  apiPayActivityList,
  apiAddVirtualAccount,
  apiEditVirtualAccount,
  apiDistributeBenefit
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import Pagination from "../../components/Pagination";
import { validatAlphabetsNum } from "@/assets/js/validate";
import RewardList from "../../components/RewardList"; //优惠券组件
// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination, RewardList},
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      rewardListForm: { //充值奖励列表
        flag: true,
      },
      // 查询列表参数对象
      listQuery: {
        type: 1,
        activityType:2
      },
      extendsMap: {
        type: 2,  //类型
        sumAmount: 0 //发放奖励
      },
      // 新增/编辑提交表单对象
      dialogForm: {
        account: null, //账户 ,
        amount: null, //充值金额
        userId:null, //用户id
        // activityEndTime : "", //结束时间 ,
        // id: "", // id ,
        // linkUrl: "", //活动链接 ,
        // activityStartTime : "", //开始时间 ,
        // state: '1', //状态0禁用1启用 ,
        // title: "", // 活动名称 ,
        // type: null // 用户账户状态0未认证 1认证 2通用
      },
      imgUrl: null, //图片展示的路径
      imgFile: "", // 上传文件对象
      fileName: "", //文件名字
      dateTime: null, //搜索表格绑定时间
      // 数据总条数
      total: 0,
      // 表格数据数组
      pageIndex: 1, //页码 ,
      pageSize: 10, //每页数据量大小 ,
      tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      formVisibleList: {
        formVisible: false,
        title: "编辑",
        isCreate: false
      },
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        account: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          {
            validator: validatorForm.validatePhone,
            trigger: "blur"
          }
        ],
        amount: [
          { required: true, message: "请输入1-999999的数值", trigger: "blur" },
          {
            validator: validatorForm.validateRechargeReg,//validatePhone
            trigger: "blur"
          }
        ],
        bannerUrl: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ],
        activityStartTime: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        activityEndTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择用户账户状态：", trigger: "blur" }
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
    // 编辑数据
    handleEdit(index, row) {
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "修改邀请获得";
      this.formVisibleList.isCreate = false;
      // this.dialogForm.endTime = row
      this.dialogForm.userId = row.userId;
      this.dialogForm.amount = row.amount;
      // this.dialogForm.activitySort = row.activitySort; //排序
  
    },
    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.cancleForm();
    },
    handleCreate() {
      //创建banner 轮播图
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "添加账户";
      this.formVisibleList.isCreate = true;
      
    },
    getMsgFormSon(data) {
      this.rewardListForm.flag = data;
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      data["pageIndex"] = this.pageIndex;
      data["pageSize"] = this.pageSize;
      // delete data.dateTime;
      apiPayActivityList(data)
        .then(res => {
          console.log(res);
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
      // this.listQuery.currentPage = 1;

      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.listQuery.type = 1;
      this.listQuery.activityType = 2;
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         
          let params = this.dialogForm;
          params['activityType'] = this.listQuery.activityType;
          if (isCreate) {
            params["userId"] = null;
            apiAddVirtualAccount(params) //创建
              .then(res => {
                console.log(res);
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm();
                }else{
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
          } else {
            this.apiUpdateActivityInit(params);//编辑
          }

          // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
          // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
          // this.formVisibleList.formVisible = false;
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
      // 发放奖励
    handleDispatch(index, row) {
      this.$confirm("确定发放本次邀请活动奖励", "发放奖励", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {userId: row.userId,activityType:this.listQuery.activityType};
          this.apiDispatch(params);
          // 此处可添加--删除接口
          // 删除成功调用fetchData方法更新列表
          // apiDeletUser();
          this.$message({
            type: "success",
            message: "发放成功!"
          });
          this.PostFetchData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发放"
          });
        });
    },
    apiUpdateActivityInit(params){
        apiEditVirtualAccount(params) //编辑
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.PostFetchData();
            this.cancleForm(); //清空表单
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    apiDispatch(params){
        apiDistributeBenefit(params) //发放奖励
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.PostFetchData();
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    // 新增/编辑表单取消提交
    cancleForm() {
      let that = this;
      Object.keys(that.dialogForm).forEach(key => {
        that.dialogForm[key] = null;
      });
      this.formVisibleList.formVisible = false;
    },
    //点击审核按钮
    views() {
      console.log("hh");
      this.isAbc = true;
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
  .is-disabled {
   .el-input__inner{
      color: #000;
      font-weight: 500;
      font-size: 32px;
      border: none;
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
