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
         type="index"
        align="center"
         label="排名"
      />
      <!-- <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="id"
        label="排名"
        align="center"
      /> -->
      <el-table-column
        :resizable="false"
        show-overflow-tooltip
        prop="value"
        label="奖励"
        align="center"
      />
       <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
           
            <el-button size="mini"  type="primary" @click="openValue(scope.$index,scope.row)">修改</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 新增/编辑 弹出栏 -->
  </el-card>
  <!-- </div> -->
</template>

<script>
//奖励列表 发放奖励
import { apiRewardList, apiEditreward} from "../../api/apilist";

// import Pagination from "../Pagination";


export default {
  name: "Coupon",
  props: {
    isActiviteId: {
      type: Number,
      required: true
    }
  },
  created(){

  },
  data() {
    return {
      msg: true, //控制子组件的显示与隐藏
      //快捷选择时间
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      // couponForm: {
      //   activiteId : 2, //活动id
      //   // endTime: null, //发放结束时间
      //   // useStartTime: null,//使用开始时间
      //   // useEndTime: null,//使用结束时间
      //   // pageIndex: 1, //页码 ,
      //   // pageSize: 10, //每页数据
      //   // userId: null //所传id
      // },
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
  created() {
    this.PostFetchData();
    
  },
  methods: {
    sendMsg() {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit("func", this.msg);
    },

    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      // return false;
      console.log(this.couponForm);
      let data = { activiteId: this.isActiviteId};
      apiRewardList(data)
        .then(res => {
          console.log(res);
          // const data = res.data;
          if (res.code == 200) {
            // this.total = res.data.total;
            this.tableData = res.data;
            this.listLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    //修改奖励金额
    openValue(index,row) {
      this.$prompt("请输入需要修改的奖励", "修改奖励", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]{1,6}$/,
        inputErrorMessage: "请输入6位数的奖励"
      })
        .then(({ value }) => {
          console.log(row,value)
          let data = { value :value, id:row.id}
          apiEditreward(data)
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                this.PostFetchData();
                this.$message({
                  type: "success",
                  message: "奖励修改成功"
                });
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
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
