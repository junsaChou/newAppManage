<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
      <!-- 查询栏 -->
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">发放奖励</el-button>
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
        <el-table-column show-overflow-tooltip  label="奖励类型" align="center" >
          <template slot-scope="scope">
            <span>{{scope.row.rewardType  == 1 ? '积分' : '金币' }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="title" label="站内信标题" align="center" />
        <el-table-column show-overflow-tooltip prop="message" label="站内信内容" align="center" >
          <template slot-scope="scope">
              <el-input
                type="textarea"
                v-model="scope.row.message "
                disabled
                show-word-limit
              ></el-input>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip  label="发放用户" align="center">
            <template slot-scope="scope">{{ scope.row.userType == '0'?'全部用户':'部分用户' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="发放时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createDate | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="issueAmount" label="发放金额" align="center" />
        <el-table-column show-overflow-tooltip  label="发放方式" align="center" >
         <template slot-scope="scope">
            <span>{{scope.row.issueType == 1 ? '扣除' : '奖励' }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="adminName" label="发放人" align="center" />
        <el-table-column show-overflow-tooltip prop="remark" label="发放说明" align="center" />
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
        v-if="formVisibleList.formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="110px">
          <el-form-item label="发放方式：" prop="issueType">
            <el-radio-group v-model="dialogForm.issueType ">
              <el-radio :label="2">奖励</el-radio>
              <el-radio :label="1">扣除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="奖励类型：" prop="rewardType">
            <el-radio-group v-model="dialogForm.rewardType ">
              <el-radio :label="1">积分</el-radio>
              <el-radio :label="2">金币</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发放金额：" prop="issueAmount">
            <el-input v-model="dialogForm.issueAmount" />
          </el-form-item>
          <el-form-item label="站内信标题：" prop="title">
            <el-input v-model="dialogForm.title" />
          </el-form-item>
          <el-form-item label="站内信内容：" prop="message">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="dialogForm.message "
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="消息类型：" prop="newType">
            <el-radio-group v-model="dialogForm.newType ">
              <el-radio :label="0">私聊消息</el-radio>
              <el-radio :label="1">系统消息</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发放用户：" prop="userType">
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
          <el-form-item label="发放说明：" prop="remark">
            <el-input v-model="dialogForm.remark" />
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
import Pagination from "../../components/Pagination";
import { isMobile } from "@/assets/js/validate";
import validatorForm from "../../assets/js/validatorForm";
import mixSearch from "../../components/mixSearch";

export default {
  name: "Table",
  components: { Pagination,mixSearch },
  data() {
    return {
      //快捷选择时间
    
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        // rewardType :null,//奖励类型
        // userType: null, //发放类型
        // adminName: null, //发放人
        // startTime: null, //开始时间
        // endTime: null, //结束时间
        // pageIndex: 1, //页码 ,
        // pageSize: 10 //每页数据量大小 ,
      },
      searchFields: [
        { span: 2, prop: 'rewardType', name: '奖励类型', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null },
                    { label: '积分', value: 1 },
                    { label: '金币', value: 2 }
                    ]
        },
        { span: 2, prop: 'userType',name:'发放用户', placeholder: '请选择',  type: 'select',
          options: [
                    { label: '全部', value: null },
                    { label: '全体用户', value: 0 },
                    { label: '部分用户', value: 1 },
                    ]
        },
        { span: 6, type: 'pickerOptionsPicker', name:'发放时间', placeholder: '发放时间', prop: 'dateTime'},
        { span: 2, prop: 'adminName', name: '发放人', placeholder: '请填写' },
        {
          span: 2,
          type: 'reset',
          style:'primary',
          class:'resetName',
          label: '重置',
          options: [
            { label: '搜索', type: 'warning', click: this.onSubmit },
            // { label: '重置', type: 'warning', click: this.onReset },
          ],
        },
      ],
      dateTime: null, //搜索表格绑定时间
      // 新增/编辑提交表单对象
      dialogForm: {
        issueType:null, //发放方式
        title: null, //站内信标题
        rewardType :null,//奖励类型
        message :null, //内容
        remark: null,//发放说明
        issueAmount:null,//发放金额
        userType: null,//发放用户
        userPhoneList: null,//用户手机号的list
        newType:null,//消息类型
        // id: null,
        idPhoneArr:null//根据这个判断当前的是全部还是部分
      },
      // 数据总条数
      total: 0,
      // 表格数据数组
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
      },
      tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisibleList: {
        formVisible: false,
        title: "编辑",
        isCreate: false
      },
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        title: [
          { required: true, message: "请输入站内信标题", trigger: "blur" },
        ],
        message: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
        rewardType: [{ required: true, message: "请选择奖励类型", trigger: "blur" },
        ],
        issueType: [
          { required: true, message: "请选择发放方式", trigger: "blur" },
        ],
        remark:[
          { required: true, message: "请输入发放说明", trigger: "blur" },
        ],
        newType:[
          { required: true, message: "请选择消息类型", trigger: "blur" },
        ],
        issueAmount:[
          { required: true, message: "请输入发放金额", trigger: "blur" },
           {
            validator: validatorForm.validateNumberMaxReg,
            trigger: "blur"
          }
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
      this.formVisibleList.title = "发放奖励";
      this.formVisibleList.isCreate = true;
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.listQuery);
      this.upDateTime(searchData.dateTime,'startTime', 'endTime','dateTime',searchData);
      let data = { ...searchData,pageIndex,pageSize,type:2}
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
    onSubmit() {;
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
      // this.listQuery.pageIndex = 1;
      // this.listQuery.pageSize = 10;
      // this.dateTime = null;
      // this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         let data = {};
      
        let { issueType,title,rewardType,message,remark,userType,issueAmount,newType } = this.dialogForm;
        data = {issueType,title,rewardType,message,remark,userType,issueAmount,newType };
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
          data['type'] = 2;
          if (isCreate) {
            console.log(data);
            // return false;
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
      this.$refs.dialogForm.resetFields()
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
    .el-input,.el-textarea {
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
