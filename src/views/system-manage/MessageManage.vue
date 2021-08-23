<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
      <!-- 查询栏 -->
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
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
        <el-table-column show-overflow-tooltip  label="消息内容" align="center" >
          <template slot-scope="scope">
          <el-input
            type="textarea"
            v-model="scope.row.message "
            disabled
            show-word-limit
          ></el-input>
          </template>
        </el-table-column>
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
        :page.sync="page.pageIndex"
        :limit.sync="page.pageSize"
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
  apiBackSendNews
} from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../../components/Pagination";
import { isMobile } from "@/assets/js/validate";
import mixSearch from "../../components/mixSearch";

export default {
  name: "Table",
  components: { Pagination,mixSearch },
  data() {
    return {
        //快捷选择时间 dialog
      pickerOptionsDialog: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        // title: null, //标题
        // adminName: null, //发布人姓名
        // newType: null, // 消息类型
        // startTime: null, //开始时间
        // endTime: null, //结束时间
        // pageIndex: 1, //页码 ,
        // pageSize: 10 //每页数据量大小 ,
      },
      searchFields: [
        { span: 2, prop: 'title', name: '标题', placeholder: '请输入' },
        {span: 2, prop: 'adminName', name:'发布人姓名', placeholder: '请输入'},
        {span: 6, type: 'pickerOptionsPicker', name:'发布时间', placeholder: '发布时间',prop:'dateTime'},
        { span: 2, prop: 'newType', name: '消息类型', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null},
                    { label: '私聊消息', value: 0 },
                    { label: '系统消息', value: 1 },
                    ]
        },
        {
          span: 2,
          type: 'reset',
          style:'warning',
          class:'resetName',
          label: '重置',
          options: [
            { label: '搜索', type: 'primary', click: this.onSubmit }
          ],
        },
      ],
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
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
        ],
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
    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {
    //发布消息和编辑消息
    InitapiBackSendNews(data) {
      apiBackSendNews(data)
        .then(res => {
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
      // this.listLoading = true;
      // // 获取审核数据列表接口
      // let data = this.listQuery;
      this.listLoading = true;
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.listQuery);
      this.upDateTime(searchData.dateTime,'startTime', 'endTime','dateTime',searchData);
      let data = { ...searchData,pageIndex,pageSize}
      apiGetNewsList(data)
        .then(res => {
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
    },
    // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         let data = {};
        
          let { title,message,linkUrl,giveOutTime,newType,userType } = this.dialogForm;
          data = { title,message,linkUrl,giveOutTime,newType,userType };
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
          data["type"] = 1;
          if (isCreate) {
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
