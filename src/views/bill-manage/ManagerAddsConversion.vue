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
        <el-form-item label="时间">
          <el-date-picker
            v-model="createMap"
            type="datetimerange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="changePicker"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="渠道">
          <el-input v-model="listQuery.channel" placeholder="请填写" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
          <el-button type="success" @click="exportList">导出</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作栏 -->
      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium"
      >
        <el-table-column show-overflow-tooltip label="日期" align="center" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.date  | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="registerNum"  label="注册人数" align="center" />
        <el-table-column show-overflow-tooltip prop="approveNum" label="认证人数" align="center" />
        <el-table-column show-overflow-tooltip    label="认证转化率" align="center" >
          <template slot-scope="scope">
            <span>{{scope.row.approveRate.toFixed(2)*100}} %</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="firstPayNum" label="首次充值人数" align="center" width="120" />
        <el-table-column show-overflow-tooltip prop="firstBuyNum" label="首次抢单人数" align="center" width="120" />
        <el-table-column show-overflow-tooltip  label="首充转化率" align="center" >
          <template slot-scope="scope">
              <span>{{ scope.row.firstPayRate.toFixed(2)*100 }} %</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip  label="首次抢单转化率" align="center" width="120">
         <template slot-scope="scope">
              <span>{{scope.row.firstBuyRate.toFixed(2)*100 }} %</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="animateNum" label="活跃人数" align="center" />
        <el-table-column show-overflow-tooltip prop="dayKeep" label="次日留存" align="center" />
        <el-table-column show-overflow-tooltip prop="weekKeep" label="7日留存" align="center" />
        <el-table-column show-overflow-tooltip prop="monthKeep" label="30日留存" align="center" />
        <el-table-column show-overflow-tooltip prop="channel" label="渠道" align="center" />
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="PostFetchData"
      />
      <!-- 新增/编辑 弹出栏 -->
    </el-card>
  </div>
</template>

<script>
//优惠券使用列表  导出
import {
  apiUserConvertList,
  apiUserConvertExport
} from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../../components/Pagination";
import { excelList } from "../../assets/js/validate";//导出 excel 方法
// import Hints from '../../components/Hints'

export default {
  name: "ManagerAddsConversion",
  components: { Pagination },
  data() {
    return {
        //快捷选择时间
     pickerOptions: {
         // 设置不能选择的日期
        onPick: ({ maxDate, minDate }) => {
            this.choiceDate0 = minDate.getTime();
            if (maxDate) {
                this.choiceDate0 = '';
            }
        },
        disabledDate:
            (time) => {
                let choiceDateTime = new Date(this.choiceDate0).getTime();
                const minTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() - 1);
                const maxTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() + 1);
                const min = minTime;
                const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
                const max = newDate < maxTime ? newDate : maxTime;
            //如果已经选中一个日期 则 返回 该日期前后一个月时间可选
                if (this.choiceDate0) {
                    return time.getTime() < min || time.getTime() > max;
                }
            //若一个日期也没选中 则 返回 当前日期以前日期可选
                return time.getTime() > newDate;
            }
      },
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        startTime : null,//创建时间
        endTime  : null,//结束时间
        channel: null, //发放人
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
      },
      createMap:null,//创建日期map
      // 新增/编辑提交表单对象
      // 数据总条数
      total: 0,
      // 表格数据数组

      tableData: [],
    
      // 新增/编辑 弹出框显示/隐藏

      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
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
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      // delete data.dateTime;
      apiUserConvertList(data)
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
    changePicker() {
      //时间选择
      if (this.createMap != null) {
        this.listQuery.startTime = this.createMap[0];
        this.listQuery.endTime = this.createMap[1];
      } else {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      }
    },
       //渠道导出
    exportList(){
      let data = Object.assign({}, this.listQuery)
      delete data.pageSize;
      delete data.pageIndex;
      apiUserConvertExport(data) 
       .then(res => {
          excelList(res,'经理新增转换列表');
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
    // 查询数据
    onSubmit() {
      this.listQuery.pageIndex = 1;
      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.createMap = null;
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = 10;
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
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
