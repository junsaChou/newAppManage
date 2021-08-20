<template>
  <!-- <div class="table-classic-wrapper"> -->
  <!-- <Hints>
      <template slot="hintName">Table表格组件</template>
      <template slot="hintInfo">
        <p>element-Table：使用elementUI的Table组件，可用于展示多条结构类似的数据，并对其进行相关操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/TableClassic.vue#/zh-CN/component/table" target="_blank">element-Table</el-link></p>
      </template>
  </Hints>-->
  <el-card shadow="always">
    <div class="control-btns">
      <el-button
        type="primary"
        @click="sendMsg"
      >返回</el-button>
    </div>
    <div
      class="body"
      shadow="always"
    >
      <!-- <el-page-header
        @back="()=>goBack()"
        content="审核详情"
      ></el-page-header> -->
      <div class="app-content">
        <div class="details">
          <div class="left">
            <el-card header="个人信息:">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand demo-table-expand-head"
              >
                <template>
                  <el-form-item label="手机号:">
                    <span>'150****1212'</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="注册渠道:">
                    <span>'channel_lexf'</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="状态:">
                    <span>'启用'</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="注册时间:">
                    <span>'2021-09-08 54:09:03'</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="实名状态:">
                    <span>'已认证'</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="当前等级:">
                    <span>'心信息已认证'</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="有效期至:">
                    <span>'2021-09-08 54:09:03'</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="微信昵称:">
                    <span>'2021-09-08 54:09:03'</span>
                  </el-form-item>
                </template>
              </el-form>
            </el-card>
            <el-card header="身份信息:">
              <!-- 表格栏 -->
              <el-table
                ref="multipleTable"
                v-loading="listLoading"
                :data="userTableData"
                tooltip-effect="dark"
                style="width: 100%"
                size="medium"
              >
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="id"
                  label="优惠券编码"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="title"
                  label="优惠券名称"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  label="使用状态"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.state =='0'?'未使用': scope.row.state =='1'?'使用': '已过期' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="usedAmount"
                  label="面额"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="withAmount"
                  label="满减额度"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  label="发放时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime | formatDate }} </span>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="validStartTime"
                  label="使用时间"
                  width="200"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if=" scope.row.useTime!=null ">{{ scope.row.useTime | formatDate }}</span>
                  </template>
                </el-table-column>
              </el-table>
                  <!-- 分页栏 -->
              <Pagination
                :total="total"
                :page.sync="couponForm.pageIndex"
                :limit.sync="couponForm.pageSize"
                @pagination="PostFetchData"
              />
            </el-card>
            <el-card header="资质信息:">
                <!-- 表格栏 -->
              <el-table
                ref="multipleTable"
                v-loading="listLoading"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                size="medium"
              >
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="id"
                  label="优惠券编码"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="title"
                  label="优惠券名称"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  label="使用状态"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.state =='0'?'未使用': scope.row.state =='1'?'使用': '已过期' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="usedAmount"
                  label="面额"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="withAmount"
                  label="满减额度"
                  align="center"
                />
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  label="发放时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime | formatDate }} </span>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  show-overflow-tooltip
                  prop="validStartTime"
                  label="使用时间"
                  width="200"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if=" scope.row.useTime!=null ">{{ scope.row.useTime | formatDate }}</span>
                  </template>
                </el-table-column>
              </el-table>
                  <!-- 分页栏 -->
              <Pagination
                :total="total"
                :page.sync="couponForm.pageIndex"
                :limit.sync="couponForm.pageSize"
                @pagination="PostFetchData"
              />
            </el-card>
          </div>
        </div>
      </div>
    </div>


    <!-- 新增/编辑 弹出栏 -->
  </el-card>
  <!-- </div> -->
</template>

<script>
import { apiGetUserCouponList } from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../Pagination";
// import Hints from '../../components/Hints'

export default {
  name: "Coupon",
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  components: { Pagination },
  data() {
    return {
      msg: true, //控制子组件的显示与隐藏
      //快捷选择时间
      listLoading: true,
      // 查询列表参数对象
      couponForm: {
        startTime: null, //发放开始时间
        endTime: null, //发放结束时间
        useStartTime: null, //使用开始时间
        useEndTime: null, //使用结束时间
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据
        userId: null //所传id
      },
      usageTime: null, //使用时间
      Issue: null, //发放时间
      // 新增/编辑提交表单对象
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      userTableData:[],
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
      }
    };
  },
  watch: {
    userId: {
      handler: function(val, oldval) {
        this.couponForm.userId = val;
        this.PostFetchData();
        console.log(val);
      }
    }
  },
  methods: {
    sendMsg() {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      console.log('jj')
      this.$emit("func", this.msg);
    },
    //下拉框事件
    changePicker() {
      //点击确定时间
      if (this.Issue != null) {
        //发放时间
        this.couponForm.startTime = this.Issue[0];
        this.couponForm.endTime = this.Issue[1];
      } else {
        this.couponForm.startTime = null;
        this.couponForm.endTime = null;
      }
      if (this.usageTime != null) {
        //使用时间
        this.couponForm.useStartTime = this.usageTime[0];
        this.couponForm.useEndTime = this.usageTime[1];
      } else {
        this.couponForm.useStartTime = null;
        this.couponForm.useEndTime = null;
      }
    },
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      // return false;
      console.log(this.couponForm);
      let data = this.couponForm;
      apiGetUserCouponList(data)
        .then(res => {
          console.log(res);
          // const data = res.data;
          if (res.code == 200) {
            this.total = res.data.total;
            this.tableData = res.data.list;
            this.userTableData = res.data.list;
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
      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.couponForm).forEach(key => {
        that.couponForm[key] = null;
      });
      this.couponForm.pageIndex = 1;
      this.couponForm.pageSize = 10;
      this.couponForm.userId = this.userId;
      this.Issue = null; //发放时间
      this.usageTime = null; //使用时间
      this.PostFetchData();
    }
    // 新增/编辑表单确认提交
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
      width: 380px;
    }
    .footer-item {
      margin-top: 50px;
      text-align: right;
    }
  }
  .hints {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
}
@import "../../assets/less/uesr-manage";
</style>
