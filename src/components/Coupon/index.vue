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
      <el-button type="primary" @click="sendMsg">返回</el-button>
    </div>
    <el-form
      ref="searchForm"
      :inline="true"
      size="small"
      :model="couponForm"
      label-width="90px"
      class="search-form"
    >
      <el-form-item prop="state" label="使用状态">
        <!-- userState (string, optional): 用户状态0冻结 1正常 -->
        <el-select clearable v-model="couponForm.state ">
          <el-option label="全部" value></el-option>
          <el-option label="未使用" value="0"></el-option>
          <el-option label="使用" value="1"></el-option>
          <el-option label="已过期" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发放时间">
        <el-date-picker
          v-model="Issue"
          type="datetimerange"
          @change="changePicker"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="使用时间">
        <el-date-picker
          v-model="usageTime"
          type="datetimerange"
          @change="changePicker"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="success" @click="getDataUser">搜索</el-button> -->
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
      <el-table-column :resizable="false" show-overflow-tooltip label="使用状态" align="center">
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
        width= "200"
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
      couponForm: {
        startTime: null, //发放开始时间
        endTime: null, //发放结束时间
        useStartTime: null,//使用开始时间
        useEndTime: null,//使用结束时间
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
</style>
