<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always" v-show="couponList.flag  " v-if="UserManageDetailList.flag" >
      <mixSearch  v-model="searchUser"  :fields="searchFields" ref="form"  @reset="onReset"/>
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
          :resizable="false"
          show-overflow-tooltip
          sortable
          prop="id"
          label="ID"
          width="80"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="channelSource"
          label="渠道来源"
          width="100"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="userName"
          label="姓名"
          width="120"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="idCard"
          width="130"
          label="身份证号码"
          align="center"
        />
        <!-- 接口少了手机号 -->
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="account"
          width="120"
          label="手机号码"
          align="center"
        />
        <el-table-column :resizable="false" show-overflow-tooltip label="账号状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.accountState =='0'?'审核失败': scope.row.accountState =='1'?'审核通过': scope.row.accountState =='2'?'审核中': '未审核' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="balance"
          label="余额"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="areaName"
          label="认证城市"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="organizeName"
          width="90"
          label="公司名称"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          label="注册时间"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          label="最后登录时间"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.lastLoginTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" show-overflow-tooltip label="会员等级" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.accountState =='0'?'金卡VIP': scope.row.accountState =='1'?'银卡VIP':  '普通VIP' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          label="会员有效期"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="remark"
          label="备注"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          label="用户状态"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.userState =='0'?'冻结':'正常' }}</span> -->
            <el-switch
              class="switch"
              v-model="scope.row.userState"
              active-text="冻结"
              :active-value="0"
              active-color="#F04134"
              inactive-text="正常"
              :inactive-value="1"
              inactive-color="#00A854"
              @change="stateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column :resizable="false" label="操作" width="440" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row,'remark')">备注</el-button>
            <!-- <el-button type="danger" @click="viewMemo(scope.row.id)">查看备注</el-button> -->
            <el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row,'phone')">修改号码</el-button>
            <el-button type="danger" size="small" @click="resetForm(scope.$index,scope.row.id)">重置认证</el-button>
            <!-- <el-button type="danger" @click="freeze(scope.row.id)">解冻</el-button> -->
            <el-button type="danger" size="small" @click="viewCoupon(scope.row.id)">查看优惠券</el-button>
            <el-button type="primary" size="small" @click="viewUserManageDetail(scope.row.id)">详情</el-button>
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
        title="编辑"
        :visible.sync="formVisible"
        width="30%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="100px">
          <el-form-item label="备注：" prop="remark" v-if="dialogForm.isRemark">
            <el-input v-model="dialogForm.remark" />
          </el-form-item>
          <el-form-item label="手机号码：" prop="account" v-else>
            <el-input v-model="dialogForm.account" />
          </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-card>
    <Coupon v-show="!couponList.flag" :userId="couponList.id" @func="getMsgFormSon"></Coupon>
    <UserManageView v-show="!UserManageDetailList.flag" :userId="UserManageDetailList.id" @func="getMsgFormSonUser"></UserManageView>
  </div>
</template>

<script>
import {
  apiGetUserInfoList,
  apiUpdateUserInfo,
  apiResetCertification
} from "../../api/apilist"; //客户用户列表 更新用户列表 重置认证
import Pagination from "../../components/Pagination";
import Coupon from "../../components/Coupon"; //优惠券组件
// import UserManageDetail from "../../components/UserManageDetail"; //用户详情
import UserManageView from "../../components/UserManageView"; //用户详情
import mixSearch from "../../components/mixSearch";

export default {
  name: "Table",
  components: { Pagination, Coupon,UserManageView,mixSearch },
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      searchFields: [
        { span: 2, prop: 'realName', name: '姓名', placeholder: '请输入' },
        { span: 2, prop: 'account', name: '手机号', placeholder: '请输入' },
        { span: 2, prop: 'idCard', name: '身份证号', placeholder: '请输入' },
        { span: 2, prop: 'channelSource', name: '来源渠道', placeholder: '请输入' },
        { span: 2, prop: 'accountState', name: '审核状态', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null},
                    { label: '审核失败', value: 0 },
                    { label: '审核通过', value: 1 },
                    { label: '审核中', value: 2 },
                    { label: '未审核', value: 3 }
                    ]
        },
        {span: 2, prop: 'organizeName', name:'公司名称', placeholder: '请输入'},
        {span: 2, prop: 'areaName', name:'认证城市', placeholder: '请输入' },
        // {span: 2, prop: 'operatorUser', name: '发放人', placeholder: '请输入' },
        {span: 6, type: 'pickerOptionsPicker', name:'日期范围', placeholder: '日期范围',prop:'dateTime'},
        { span: 2, prop: 'userState', name: '用户状态', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null},
                    { label: '冻结', value: 0 },
                    { label: '正常', value: 1 }
                    ]
        },
        {span: 2, prop: 'remark', name: '备注', placeholder: '请输入' },
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
      searchUser: {
        // memberShip:null,//会员等级
        // account: null, //登陆账户 ,
        // accountState: null, //账户状态0审核未通 1审核通过 2审核中 3未审核 ,
        // areaName: null, //地区名称 ,
        // channelSource: null, //来源渠道 ,
        // pageIndex: 1, //页码 ,
        // pageSize: 10, //每页数据
        // // id: "", //id ,
        // idCard: null, //身份证号 ,
        // organizeName: null, //组织名称 ,
        // realName: null, //姓名 ,
        // remark: null, //备注 ,
        // userState: null, //用户状态0冻结 1正常
        // startTime: null, //开始时间
        // endTime: null //节省时间
      },
      // dateTime: [], //日期范围
      // 新增/编辑提交表单对象
      dialogForm: {
        id: "", //传入的id
        remark: null, //备注
        account: null, //号码
        isRemark: true //判断是否是备注
      },
      couponList: {
        flag: true,
        id: "" //所传的id
      },
      UserManageDetailList: {
        flag: true,
        id: "" //所传的id
      },
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      },
      // 防止多次连续提交表单
      isSubmit: false
    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {
    // 重置认证
    resetForm(index, row) {
      this.$confirm("此操作将重置认证, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 此处可添加--删除接口
          // 删除成功调用fetchData方法更新列表
          this.resetApi(row);
          this.$message({
            type: "success",
            message: "重置成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },
    //重置认证api
    resetApi(id) {
      let data = { id: id };
      apiResetCertification(data)
        .then(res => {
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
          this.listLoading = false;
        });
    },
    //查看优惠券
    viewCoupon(id) {
      this.couponList.id = String(id);
      this.couponList.flag = false;
    },
    viewUserManageDetail(id){
      this.UserManageDetailList.id = String(id);
      this.UserManageDetailList.flag = false;
    },
    getMsgFormSon(data) {
      this.couponList.flag = data;
    },
    getMsgFormSonUser(data){
      this.UserManageDetailList.flag = data;
    },
    //修改备注等操作
    handleEdit(index, row, val) {
      if (val != "remark") {
        this.dialogForm.isRemark = false;
        this.dialogForm.account = row.account; //手机号码
        this.dialogForm.remark = null; //备注
      } else {
        this.dialogForm.isRemark = true;
        this.dialogForm.account = null; //手机号码
        this.dialogForm.remark = row.remark; //备注
      }
      this.dialogForm.id = row.id;
      this.formVisible = true;
      // this.dialogForm.married = row.married
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
          // 此处可添加--删除接口
          // 删除成功调用PostFetchData方法更新列表
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
    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.formVisible = false;
      this.$refs.dialogForm.resetFields();
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.searchUser);
      this.upDateTime(searchData.dateTime,'startTime', 'endTime','dateTime',searchData);
      let data = { ...searchData,pageIndex,pageSize}
      apiGetUserInfoList(data)
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
    apiUpdateUserInfoInit(data) {
      //update 的更新接口
      // let data = this.searchUser;
      // return false
      apiUpdateUserInfo(data)
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
    // 查询数据
    onSubmit() {
      this.page.pageIndex = 1;
      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.searchUser).forEach(key => {
        that.searchUser[key] = null;
      });
      that.onSubmit();
      // this.PostFetchData();
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 此处添加 新增/编辑数据的接口 新增成功后调用PostFetchData方法更新列表
          // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
          let data = this.dialogForm;
          delete data.isRemark;
          // return false;
          this.apiUpdateUserInfoInit(data);
          // this.dialogForm.remark = undefined;
          // this.dialogForm.account = undefined;
          this.formVisible = false;
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
    stateChange(state) {
      //动态切换状态
      let data = {};
      data["id"] = state.id; //id
      data["userState"] = state.userState; //当前的状态
      this.apiUpdateUserInfoInit(data);
    },
    // 新增/编辑表单取消提交
    cancleForm() {
      this.$refs.dialogForm.resetFields();
      this.formVisible = false;
    }
  }
};
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    min-height: 656px;
  }
  .control-btns {
    margin-bottom: 20px;
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
