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
        <el-form-item label="标题">
          <el-input v-model="listQuery.title" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="listQuery.adminName" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            @change="upDate"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="消息类型">
          <el-select v-model="listQuery.newType  ">
            <el-option value label="全部" />
            <el-option :value="0" label="私聊消息" />
            <el-option :value="1" label="系统消息 " />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">发布消息</el-button>
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
          prop="newUuid"
          label="ID"
          align="center"
          width="90"
          sortable
        />
        <el-table-column show-overflow-tooltip prop="title" label="消息标题" align="center" />
        <el-table-column show-overflow-tooltip prop="message" label="消息内容" align="center" />
        <el-table-column show-overflow-tooltip prop="linkUrl" label="详情链接" align="center" />
        <el-table-column show-overflow-tooltip prop="newType" label="消息类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.newType == 0 ? '私聊消息' : '系统消息' }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="发布时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createDate | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="发布用户" align="center">
          <template slot-scope="scope">{{ scope.row.userType == '0'?'全部用户':'部分用户' }}</template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="发布人"
          align="center"
          width="90"
          prop="adminName"
        />
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
      <el-dialog
        :title="formVisibleList.title"
        :visible.sync="formVisibleList.formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="110px">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="dialogForm.title" />
          </el-form-item>
          <el-form-item label="内容：" prop="message">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="dialogForm.message "
              maxlength="40"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="详情链接：" prop="linkUrl">
            <el-input v-model="dialogForm.linkUrl" />
          </el-form-item>
          <el-form-item label="发布时间：" prop="giveOutTime" >
            <el-date-picker v-model="dialogForm.giveOutTime"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :picker-options =" pickerOptionsDialog"  placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="消息类型：" prop="newType">
            <el-radio-group v-model="dialogForm.newType ">
              <el-radio :label="0">私聊消息</el-radio>
              <el-radio :label="1">系统消息</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布用户：" prop="userType">
            <el-radio-group v-model="dialogForm.userType ">
              <el-radio :label="0">全部用户</el-radio>
              <el-radio :label="1">部分用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="请输入经理手机号码："
            prop="userPhoneList"
            v-if="dialogForm.userType == 1"
          >
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="dialogForm.userPhoneList"
            ></el-input>
          </el-form-item>
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
    </el-card>
  </div>
</template>

<script>
//消息列表 2,编辑发布 消息  
import {
  apiGetNewsList,
  apiBackSendNews,
  apiDeletBanner,
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import Pagination from "../../components/Pagination";
import { validatAlphabetsNum } from "@/assets/js/validate";
import { isMobile } from "@/assets/js/validate";
// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination },
  data() {
    return {
      //快捷选择时间
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
        //快捷选择时间
      pickerOptionsDialog: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        title: null, //标题
        adminName: null, //发布人姓名
        newType: null, // 消息类型
        startTime: null, //开始时间
        endTime: null, //结束时间
        pageIndex: 1, //页码 ,
        pageSize: 10 //每页数据量大小 ,
      },
      dateTime: null, //搜索表格绑定时间
      // 新增/编辑提交表单对象
      dialogForm: {
        title: null, //标题
        message :null, //内容
        linkUrl: null,//链接
        giveOutTime: null,//发布时间
        newType : null,//消息类型
        userType: null,//发布用户
        userPhoneList: null,//用户手机号的list
        id: null,
        idPhoneArr:null//根据这个判断当前的是全部还是部分
        // type: "" // 用户账户状态0未认证 1认证 2通用
      },
      // 数据总条数
      total: 0,
      // 表格数据数组

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
        title: [
          { required: true, message: "请输入标题内容", trigger: "blur" },
          // {
          //   validator: validatorForm.validateCouponTitle,
          //   trigger: "blur"
          // }
        ],
         message: [
          { required: true, message: "请输入内容", trigger: "blur" },
          // {
          //   validator: validatorForm.validateCn,
          //   trigger: "blur"
          // }
        ],
        // linkUrl: [
        //   { required: true, message: "请输入详情链接", trigger: "blur" },
        // ],
        giveOutTime: [
          { required: true, message: "请选择发布时间", trigger: "blur" },
        ],
        newType: [
          { required: true, message: "请选择消息类型", trigger: "blur" },
        ],
        userType: [
          { required: true, message: "请选择发布用户类型", trigger: "blur" },
        ],
        userPhoneList: [
          { required: true, message: "请输入用户手机码", trigger: "blur" },
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
    //发布消息和编辑消息
    InitapiBackSendNews(data) {
      console.log(data);
      apiBackSendNews(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "消息发布成功"
            });
            this.cancleForm();
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
    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.cancleForm();
    },
    handleCreate() {
      //创建消息
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "发布新消息";
      this.formVisibleList.isCreate = true;
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      // delete data.dateTime;
      apiGetNewsList(data)
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
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = 10;
      this.dateTime = null;
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         let data = {};
          if (this.dialogForm.userType > 0) {
            //部分用户
            let userPhoneList = this.dialogForm.userPhoneList.split(`\n`);
            userPhoneList = [...new Set(userPhoneList)];
            let flag = false;
            userPhoneList.forEach(e => {
            if (!isMobile(e)) {
                this.$message({
                  type: "warning",
                  message: "请输入正确的手机号码"
                });
                flag = true;
              }
            });
            if(flag){
              return false;
            }
            this.dialogForm.idPhoneArr =  userPhoneList;
            data['userPhoneList'] = this.dialogForm.idPhoneArr;

          } else {
            this.dialogForm.userPhoneList = null;
            this.dialogForm.idPhoneArr = null;
          }
          data["title"] = this.dialogForm.title //标题
          data["message"] = this.dialogForm.message  //内容
          data["linkUrl"] = this.dialogForm.linkUrl //链接
          data["giveOutTime"] = this.dialogForm.giveOutTime //发布时间
          data["newType"] = this.dialogForm.newType; //消息类型
          data["userType"] = this.dialogForm.userType//发布用户
          data["giveOutTime"] = this.dialogForm.giveOutTime;
         
          if (isCreate) {
            console.log(data);
            this.InitapiBackSendNews(data);
          }
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
    // 新增/编辑表单取消提交
    cancleForm() {
      Object.keys(this.dialogForm).forEach(key => {
        this.dialogForm[key] = null;
      });
      // this.dialogForm.validType = "0"; //判断是否为日期范围 和 固定天数
      // this.dialogForm.type = 0;
      this.formVisibleList.formVisible = false;
    },
    upDate(val) {
      //时间选择
      if (val) {
        this.listQuery.startTime = val[0];
        this.listQuery.endTime = val[1];
      } else {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      }
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
