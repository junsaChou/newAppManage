<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
      <!-- 查询栏 -->
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
      <!-- <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery"
        label-width="90px"
        class="search-form"
      >
        <el-form-item label="优惠券名称">
          <el-input v-model="listQuery.title" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="适用范围">
          <el-select v-model="listQuery.type ">
            <el-option value label="全部" />
            <el-option :value="0" label="充值" />
            <el-option :value="1" label="抵扣" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form> -->
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">新增优惠券</el-button>
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
          prop="id"
          label="序号"
          align="center"
          width="90"
          sortable
        />
        <el-table-column show-overflow-tooltip prop="title" label="优惠券名称" align="center" />
        <el-table-column show-overflow-tooltip prop="usedAmount" label="面额" align="center" />
        <el-table-column show-overflow-tooltip prop="withAmount" label="满减额度" align="center" />
        <el-table-column show-overflow-tooltip label="适用范围" align="center">
          <template slot-scope="scope">{{ scope.row.type == '0'?'充值':'抵扣' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="添加时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="有效期" align="center" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.validType == 0">{{ scope.row.validStartTime | formatDate }}-{{ scope.row.validEndTime | formatDate }}</span>
            <span v-else>{{ scope.row.validDays }}天</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="hobby" label="爱好" align="center" width="300" show-overflow-tooltip /> -->
        <el-table-column label="操作" fixed="right" align="center" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleGiveOutCoupon(scope.$index,scope.row.id)"
            >发放</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.id)">删除</el-button>
          </template>
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
      <el-dialog
        :title="formVisibleList.title"
        :visible.sync="formVisibleList.formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="110px">
          <el-form-item label="优惠券名称：" prop="title">
            <el-input v-model="dialogForm.title" />
          </el-form-item>
          <el-form-item label="优惠券面额：" prop="usedAmount">
            <el-input v-model="dialogForm.usedAmount" />
          </el-form-item>
          <el-form-item label="满减额度：" prop="withAmount">
            <el-input v-model="dialogForm.withAmount" />
          </el-form-item>
          <el-form-item label="优惠券有效期：">
            <el-switch
              v-model="dialogForm.validType "
              active-value="1"
              inactive-value="0"
              active-text="固定天数"
              inactive-text="日期范围"
            ></el-switch>
          </el-form-item>
          <el-form-item label="日期范围：" prop="dateTime" v-if="dialogForm.validType == 0 ">
            <el-date-picker
              type="datetimerange"
              v-model="dialogForm.dateTime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              @change="changePicker"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="固定天数：" prop="validDays" v-else>
            <el-input v-model="dialogForm.validDays" />
          </el-form-item>
          <!-- </el-form-item> -->
          <el-form-item label="适用范围：" prop="type">
            <el-radio-group v-model="dialogForm.type ">
              <el-radio :label="0">充值</el-radio>
              <el-radio :label="1">抵扣</el-radio>
            </el-radio-group>
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
      <!-- 优惠券规则 -->
      <el-dialog
        title="优惠券发放规则"
        :visible.sync="formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleCloseCoupon"
      >
        <el-form
          ref="dialogCouponForm"
          :model="dialogCouponForm"
          :rules="formRules"
          label-width="110px"
        >
          <el-form-item label="发放时间：" prop="giveOutTime">
            <el-date-picker
              type="datetime"
              v-model="dialogCouponForm.giveOutTime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              align="right"
              @change="changePicker"
            ></el-date-picker>
          </el-form-item>
          <!-- </el-form-item> -->
          <el-form-item label="发放用户：" prop="userType">
            <el-radio-group v-model="dialogCouponForm.userType ">
              <el-radio :label="0">全体用户</el-radio>
              <el-radio :label="1">部分用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="请输入经理手机号码："
            prop="userListPhone"
            v-if="dialogCouponForm.userType == 1"
          >
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="dialogCouponForm.userListPhone"
            ></el-input>
          </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleFormCoupon">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitFormCoupon('dialogCouponForm')"
            >确 定</el-button>
            <!-- <el-button type="primary" v-else :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button> -->
          </div>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//优惠券列表 2,编辑优惠券  3,发放优惠券 4 删除优惠券 5，创建优惠券列表
import {
  apiGetCouponList,
  apiEditCoupon,
  apiGiveOutCoupon,
  apiDeleteCoupon,
  apiCreateCoupon
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import Pagination from "../../components/Pagination";
import { isMobile } from "@/assets/js/validate";
import mixSearch from "../../components/mixSearch";

export default {
  name: "Table",
  components: { Pagination,mixSearch },
  data() {
    return {
      //快捷选择时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
      },
      searchFields: [
        { span: 2, prop: 'title', name: '优惠券名称', placeholder: '请填写' },
        { span: 2, prop: 'type', name: '适用范围', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null },
                    { label: '充值', value: 0 },
                    { label: '抵扣', value: 1 }
                    ]
        },
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
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        // title: null, //标题
        // type: null, //适用范围
        // pageIndex: 1, //页码 ,
        // pageSize: 10 //每页数据量大小 ,
      },
      // 新增/编辑提交表单对象
      dialogForm: {
        title: null, //优惠券标题
        usedAmount: null, //优惠券面额
        withAmount: null, //满减额度
        validDays: null, //固定天数
        validEndTime: "", //结束时间 ,
        validStartTime: "", //开始时间 ,
        validType: "0", //判断是否为日期范围 和 固定天数
        type: 0, //状态0 充值1抵扣 ,
        dateTime: null, //搜索表格绑定时间
        id: null
        // type: "" // 用户账户状态0未认证 1认证 2通用
      },
      dialogCouponForm: {
        couponId: null, // 优惠卷id ,
        giveOutTime: null, // 发放时间 ,
        id: null, // id ,
        userListId: null, // 用户id列表 ,
        userListPhone: null, // 用户手机列表 ,
        userType: 0 // 0全体用户 1部分用户
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
          { required: true, message: "请输入优惠券名称", trigger: "blur" },
          {
            validator: validatorForm.validateCouponTitle,
            trigger: "blur"
          }
        ],
        usedAmount: [
          { required: true, message: "请输入数字", trigger: "blur" },
          {
            validator: validatorForm.validateNumberMaxReg,
            trigger: "blur"
          }
        ],
        withAmount: [
          { required: true, message: "请输入数字", trigger: "blur" },
          {
            validator: validatorForm.validateWithAmount,
            trigger: "blur"
          }
        ],
        validDays: [
          { required: true, message: "请输入数字", trigger: "blur" },
          {
            validator: validatorForm.validateWithAmount,
            trigger: "blur"
          }
        ],
        dateTime: [
          {
            required: true,
            message: "请输入时间范围并不能是过去时间",
            trigger: "blur"
          }
        ],
        giveOutTime: [
          {
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ],
        userListPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
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
      //是否出现审核图片
    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {
    // 编辑数据
    handleEdit(index, row) {
      this.formVisibleList.title = "编辑";
      console.log(row)
      this.formVisibleList.isCreate = false;
      this.dialogForm.title = row.title; //优惠券标题this.dialogForm.
      this.dialogForm.usedAmount = row.usedAmount; //优惠券面额
      this.dialogForm.withAmount = row.withAmount; //满减额度
      this.dialogForm.validDays = row.validDays; //固定天数
      this.dialogForm.validType = String(row.validType); //判断是否为日期范围 和 固定天数
      console.log(this.dialogForm.validType)
      this.dialogForm.type = row.type; //状态0 充值1抵扣 ;
      this.dialogForm.id = row.id;
      if (row.validStartTime != null) {
        this.dialogForm.validEndTime = this.$options.filters["FormatDate"](
          //结束时间 ;
          row.validEndTime
        ); //调用全局的filters方法
         
        this.dialogForm.validStartTime = this.$options.filters["FormatDate"](
          //开始时间 ;
          row.validStartTime
        );
        this.dialogForm.dateTime = [];
        this.dialogForm.dateTime[0] = this.dialogForm.validStartTime;
        this.dialogForm.dateTime[1] = this.dialogForm.validEndTime;
      }
      console.log(this.dialogForm)
      this.formVisibleList.formVisible = true;
    },
    handleGiveOutCoupon(index, row) {
      this.formVisible = true;
      this.dialogCouponForm.couponId = row;
      console.log(row);
    },
    //发放优惠券api
    InitGiveOutCoupon(data) {
      console.log(data);
      apiGiveOutCoupon(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "优惠券发放成功！"
            });
            this.cancleFormCoupon();
            // this.PostFetchData(); //重新请求接口
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
          // apiDeleteCoupon();
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
      let data = { couponId : id };
      apiDeleteCoupon(data)
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

    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.cancleForm();
    },
    //修改优惠券规则
    handleCloseCoupon() {
      this.cancleFormCoupon();
    },
    handleCreate() {
      //创建banner 轮播图
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "创建";
      this.formVisibleList.isCreate = true;
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      // let data = this.listQuery;
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.listQuery);
      let data = { ...searchData,pageIndex,pageSize}
      // delete data.dateTime;
      apiGetCouponList(data)
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
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    //修改优惠券规则 提交
    submitFormCoupon(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {};
          if (this.dialogCouponForm.userType > 0) {
            //部分用户
            let userListPhone = this.dialogCouponForm.userListPhone.split(`\n`);
            userListPhone = [...new Set(userListPhone)];
            let flag = false;
            if(userListPhone.length>300){
               this.$message({
                  type: "warning",
                  message: "最多只能输入300位手机号！"
                });
                return false;
            }
            userListPhone.forEach(e => {
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
            this.dialogCouponForm.id =  userListPhone;
            data['userListPhone'] = this.dialogCouponForm.id;
          } else {
            this.dialogCouponForm.userListPhone = null;
            this.dialogCouponForm.id = null;
          }
          data["userType"] = this.dialogCouponForm.userType;
          data["couponId"] = this.dialogCouponForm.couponId;
          data["giveOutTime"] = this.dialogCouponForm.giveOutTime;
          // console.log(data)
          this.InitGiveOutCoupon(data);
        }
      });
    },
    // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (Number(this.dialogForm.withAmount ) < Number(this.dialogForm.usedAmount)) {
            this.$message({
              type: "warning",
              message: "满减金额须大于优惠券面额"
            });
            return false;
          }
          if (this.dialogForm.validType > 0) {
            //固定天数
            if (this.dialogForm.validDays > 365) {
              this.$message({
                type: "warning",
                message: "固定天数须小于365天"
              });
              return false;
            }
            this.dialogForm.validStartTime = null;
            this.dialogForm.validEndTime = null;
            this.dialogForm.dateTime = null;
          } else {
            this.dialogForm.validDays = null;
          }
          // return false;
          let data = {};
          data["title"] = this.dialogForm.title; //标题
          data["withAmount"] = this.dialogForm.withAmount;
          data["usedAmount"] = this.dialogForm.usedAmount;
          data["validType"] = this.dialogForm.validType;
          data["type"] = this.dialogForm.type;
          data["validDays"] = this.dialogForm.validDays;
          data["validStartTime"] = this.dialogForm.validStartTime;
          data["validEndTime"] = this.dialogForm.validEndTime;
          if (isCreate) {
            console.log(data);
            // return false;
            apiCreateCoupon(data) //创建
              .then(res => {
                console.log(res);
                if (res.code === 200) {
                  // this.$refs[formName].resetFields(); //清空表单
                  this.PostFetchData();
                  this.cancleForm();
                }
              })
              .catch(error => {
                console.log(error);
                this.listLoading = false;
              });
          } else {
            data["id"] = this.dialogForm.id;
            apiEditCoupon(data) //编辑
              .then(res => {
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm();
                }
              })
              .catch(error => {
                this.listLoading = false;
              });
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
    // 新增/编辑表单取消提交
    cancleForm() {
      Object.keys(this.dialogForm).forEach(key => {
        this.dialogForm[key] = null;
      });
      this.dialogForm.validType = "0"; //判断是否为日期范围 和 固定天数
      this.dialogForm.type = 0;
      this.formVisibleList.formVisible = false;
    },
    //修改优惠券的规格
    cancleFormCoupon() {
      Object.keys(this.dialogCouponForm).forEach(key => {
        this.dialogCouponForm[key] = null;
      });
      this.dialogCouponForm.userType = 0; //判断是否为全体或部分
      this.formVisible = false;
    },
    changePicker(val) {
      //点击确定时间
      if (val) {
        this.dialogForm.validStartTime = val[0]; //开始时间
        this.dialogForm.validEndTime = val[1]; //结束时间
      } else {
        this.dialogForm.validStartTime = null;
        this.dialogForm.validEndTime = null;
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
    .switch.el-switch .el-switch__core, .el-switch .el-switch__label {
        text-align: center;
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
