<template>
  <div class="table-classic-wrapper">
    <el-card >
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery" 
        label-width="100px"
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
        <el-form-item label="手机号">
          <el-input   v-model="listQuery.phone" placeholder="请输入邀请人/被邀请人" />
        </el-form-item>
        <el-form-item label="邀请进度">
          <el-select v-model="listQuery.authState " placeholder="请选择">
            <el-option value label="全部" />
            <el-option :value="1" label="注册" />
            <el-option :value="2" label="认证" />
            <el-option :value="3" label="充值" />
            
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
          <el-button type="success" @click="exportList">导出</el-button>
        </el-form-item>
      </el-form>
      <div class="control-btns">
        <div>
          <span class="left">邀请注册总人数:</span>
          <span>{{extendsMap.countPregister}}</span>
          <!-- <el-input  v-model="extendsMap.loginIntegral"  > -->
        </div>
        <div>
          <span class="left">邀请认证总人数:</span>
          <span>{{extendsMap.countApprove}}</span>
        </div>
        <div>
          <span class="left">首次充值总人数:</span>
          <span>{{extendsMap.countRecharge}}</span>
        </div>
         <div>
          <span class="left">首次抢单总人数:</span>
          <span>{{extendsMap.countBuy}}</span>
        </div>
        <div>
          <span class="left">充值总金额:</span>
          <span>{{extendsMap.sumAmount}}</span>
        </div>
        <div>
          <span class="left">抢单总数量:</span>
          <span>{{extendsMap.countOrder}}</span>
        </div>
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
          label="邀请人"
          prop="inviterAccount"
          align="center"
          width="90"
        />
        <el-table-column show-overflow-tooltip prop="inviteeAccount" label="被邀请人" align="center" /> 
        <el-table-column show-overflow-tooltip prop="inviterCount" label="邀请获得" align="center" />
        <el-table-column show-overflow-tooltip  label="注册" align="center" >
          <template slot-scope="scope">
            <span>{{scope.row.registerTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="认证" align="center" >
          <template slot-scope="scope">
            <span v-if="scope.row.approveTime != ''">{{scope.row.approveTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="goldIntegral" label="首次充值" align="center" >
          <template slot-scope="scope">
            <span v-if="scope.row.firstRecharge != ''">{{scope.row.firstRecharge | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="sumRecharge" label="充值金额" align="center" />
        <el-table-column show-overflow-tooltip prop="countBuy" label="抢单数量" align="center" />
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="PostFetchData"
      />
    </el-card>
  </div>
</template>

<script>
import {
  apiGetInvitationList,
  apiInvitationListExport
} from "../../api/apilist";
import { excelList } from "../../assets/js/validate"
import Pagination from "../../components/Pagination";
// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination},
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
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
      // 查询列表参数对象
      createMap:null,//创建日期map
      listQuery: {
        phone: null, //手机号
        authState: null, // 邀请进度
        startTime : null,//创建时间
        endTime  : null,//结束时间
        pageIndex: 1, //页码 ,
        pageSize: 10 //每页数据量大小 ,
      },
      extendsMap:{},//总积分数值
      // 数据总条数
      total: 0,
      // 表格数据数组
      pageIndex: 1, //页码 ,
      pageSize: 10, //每页数据量大小 ,
      tableData: [],
      // 新增/编辑 弹出框显示/隐藏
    };
  },
  created(){
    this.PostFetchData();
  },
  methods: {
        //渠道导出
    exportList(){
      let data = Object.assign({}, this.listQuery)
      delete data.pageSize;
      delete data.pageIndex;
      apiInvitationListExport(data) 
       .then(res => {
          excelList(res,'邀请管理')
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
    changePicker(val) {
      //时间选择
      if (val) {
        this.listQuery.startTime = val[0];
        this.listQuery.endTime = val[1];
      } else {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      }
      console.log(val);
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      // delete data.dateTime;
      apiGetInvitationList(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.total = res.data.total;
            this.tableData = res.data.list;
            this.extendsMap = res.data.extendsMap;
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
      // this.listQuery.authState = 1;
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = 10;
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
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
    display: flex;
    // padding-left: 20px;
    div{
      margin: 0 25px;
      color:rgb(217, 0, 27);
      span{
        font-size: 18px;
        font-weight: bold;
      }
    }
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
