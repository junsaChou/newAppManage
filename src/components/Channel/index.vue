<template>
  <!-- <div class="table-classic-wrapper"> -->
  <el-card shadow="always">
    <div class="control-btns">
      <el-button type="primary" @click="sendMsg">返回</el-button>
       <el-button type="success" style="margin-left:80px" @click="exportList">导出</el-button>
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
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        align="center"
        label="时间"
        prop="orderData"
      />
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="registerNum"
        label="注册数"
        align="center"
      />
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="validByRegister"
        label="注册转化率"
        align="center"
      />
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="orderNum"
        label="订单数"
        align="center"
      />
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="orderValidNum"
        label="有效订单数"
        align="center"
      />
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="orderBuyNum"
        label="被抢单数量"
        align="center"
      />
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="buyByValid"
        label="订单被抢率"
        align="center"
      />
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      :page.sync="couponForm.pageIndex"
      :limit.sync="couponForm.pageSize"
      @pagination="PostFetchData"
    />
  </el-card>
  <!-- </div> -->
</template>

<script>
//详情 导出
import { apiSelectChannelDetails,apiChannelDetailsDataExport} from "../../api/apilist";
import { excelList } from "../../assets/js/validate";//导出 excel 方法
import Pagination from "../Pagination";


export default {
  name: "Coupon",
  props: {
    isActiviteId: {
      type: String,
      required: true
    }
  },
  components: { Pagination },
  data() {
    return {
      msg: true, //控制子组件的显示与隐藏
      //快捷选择时间
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      couponForm: {
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据
        channel: null//渠道
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
    };
  },
  created() {
    this.couponForm.channel = this.isActiviteId
    this.PostFetchData();
  },
  methods: {
    sendMsg() {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit("func", this.msg);
    },
    exportList(){
      let data = {'channel':this.couponForm.channel};
      console.log(data);
      apiChannelDetailsDataExport(data) 
       .then(res => {
          console.log(res);
          excelList(res,'渠道详情')
          this.timer = setTimeout(()=>{
              this.$message.success('导出成功');
          }, 3000)
        })
        .catch(error => {
          this.$message({
                type: "error",
                message: '导出失败'
          });
          this.listLoading = false;
        });
    },
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
   
      let data = this.couponForm;
      apiSelectChannelDetails(data)
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
