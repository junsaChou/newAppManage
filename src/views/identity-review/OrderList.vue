<template>
  <div class="table-classic-wrapper">
    <el-card v-if="showDetail" shadow="always">
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
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
          prop="id"
          label="ID"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="orderNo"
          label="订单号"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="customerName"
          label="姓名"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="channel"
          label="渠道"
          align="center"
        />
        <!-- 接口少了手机号 -->
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="customerPhone"
          label="手机号"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="orderAmount"
          label="单价"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="loanAmount"
          label="贷款总额"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="cityName"
          label="所在城市"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="loanFor"
          label="贷款目的"
          align="center"
        />
        <!-- 贷款期限 后端字段无 -->
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="loanTime"
          label="贷款期限"
          align="center"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="loanTime"
          label="申请时间"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" show-overflow-tooltip label="订单状态" align="center">
          <!-- scope.row.orderState  =='0'?'待抢': '已抢' -->
          <template slot-scope="scope">
            <span>{{
               scope.row.chargebackState == 0 ? (scope.row.lendingState == 0 ? ( scope.row.discardState == 0 ? (  scope.row.orderState == 0 ? '待抢' : '已抢' ) : '弃置' ) :'放款' ): scope.row.chargebackState == 1 ? '拒绝退单' : scope.row.chargebackState == 2 ? '待审核' : scope.row.chargebackState == 3 ? '半价退' : '全款退' 
                }}</span>
          </template>
        </el-table-column>

        <el-table-column :resizable="false" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewInfo(scope.row)">查看详情</el-button>
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
    </el-card>
    <div class="body" shadow="always" v-else>
      <el-page-header @back="showDetail =!showDetail" content="订单详情"></el-page-header>
      <div class="app-content">
        <div class="details">
          <div class="left">
            <el-card header="基本资料:">
              <el-form label-position="left" inline class="demo-table-expand">
                <template>
                  <el-form-item label="订单编号:">
                    <span>{{ orderListInfo.orderNo   }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="用户名字:">
                    <span>{{ orderListInfo.customerName  }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="用户年龄:">
                    <span>{{ orderListInfo.customerAge }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="用户手机:">
                    <span>{{ orderListInfo.customerPhone }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="贷款金额:">
                    <span>{{ orderListInfo.loanAmount }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="贷款期限:">
                    <span>{{ orderListInfo.loanTime}}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="所在城市:">
                    <span>{{ orderListInfo.cityName}}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="户籍城市:"  >
                    <span>{{ orderListInfo.bornCityName  }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="是否特价:">
                    <span>{{ orderListInfo.discount == false ?'否':'是' }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="有无社保:">
                    <span>{{ orderListInfo.hasSocialSecurity == false ? '无' : orderListInfo.socialSecurity }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="保险情况:">
                    <span>{{ orderListInfo.hasInsurance == 0 ? '无':'有' }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="芝麻分:">
                    <span>{{ orderListInfo.hasSesame == false ? '无' : orderListInfo.sesameScore }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="住房情况:">
                    <span>{{ orderListInfo.hasHouse == 0 ?'没房' : orderListInfo.hasHouse == 1 ? '有房不抵押':'有房抵押'   }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="住房性质:">
                    <span>{{ orderListInfo.houseType }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="车情况:">
                    <span>{{ orderListInfo.hasCar  == 0 ?'没车' : orderListInfo.hasCar == 1 ? '有车不抵押':'有车抵押' }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="车价值:">
                    <span>{{ orderListInfo.carWorth }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="职业:">
                    <span>{{ orderListInfo.professional == 0 ?'上班族' : orderListInfo.professional == 1 ? '自由职业':'个体户' }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="有无公积金:">
                    <span>{{ orderListInfo.hasAccumulationFund == false ?'无' :orderListInfo.accumulationFund}}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="信用情况:">
                    <span>{{ orderListInfo.creditRecord }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="订单时间:">
                    <span>{{ orderListInfo.createTime | formatDate }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="信用卡:">
                    <span>{{ orderListInfo.creditCardAmount }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="文化程度:">
                    <span>{{ orderListInfo.education  }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="月收入:">
                    <span>{{ orderListInfo.monthlyIncome }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="发放形式:">
                    <span>{{ orderListInfo.monthlyIncomeType  == 0 ?'银行代发' : orderListInfo.payType == 1 ? '转账工资':'现金发放'  }}</span>
                  </el-form-item>
                </template>
                <template v-if=" orderListInfo.professional == 2">
                  <el-form-item label="年流水:">
                    <span>{{ orderListInfo.yearTurnover   }}</span>
                  </el-form-item>
                </template>
                <template v-if=" orderListInfo.professional == 2">
                  <el-form-item label="经营年限:">
                    <span>{{ orderListInfo.operYear  }}</span>
                  </el-form-item>
                </template>
                <template v-if=" orderListInfo.professional == 2">
                  <el-form-item label="营业执照:">
                    <span>{{ orderListInfo.businessLicense == false ?'否' :'有'  }}</span>
                  </el-form-item>
                </template>
              </el-form>
            </el-card>
            <el-card header="经理资料:">
              <el-form label-position="left" inline class="demo-table-expand">
                <template>
                  <el-form-item label="经理id:">
                    <span>{{ orderListInfo.userId }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="经理名字:">
                    <span>{{ orderListInfo.userName }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="经理手机:">
                    <span>{{ orderListInfo.phone }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="经理状态:">
                    <span>{{ orderListInfo.userState == 0 ? '冻结' : '正常' }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="经理余额:">
                    <span>{{ orderListInfo.balance }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="支付方式:">
                    <span>{{ orderListInfo.payType == 0 ?'支付宝' : orderListInfo.payType == 1 ? '微信':  orderListInfo.payType == 2 ?'账户':'' }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="支付时间:">
                    <span>{{ orderListInfo.createTime | formatDate}}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="原价:">
                    <span>{{ orderListInfo.discount ==0 ?  orderListInfo.orderAmount : orderListInfo.orderDiscountAmount   }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="成交价:">
                    <span>{{  orderListInfo.payAmount }}</span>
                  </el-form-item>
                </template>
              </el-form>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiGetOrderList } from "../../api/apilist"; //订单列表 数据
import Pagination from "../../components/Pagination";
import mixSearch from "../../components/mixSearch";

export default {
  name: "Table",
  components: { Pagination,mixSearch },
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        // orderNo : null, //订单号
        // channel: null, //来源渠道 ,
        // customerName: null, //姓名 ,
        // remark: null, //备注 ,
        // orderState: null, //'订单状态'
        // customerPhone: null, //手机号
        // userPhone: null, //经理手机号
        // startTime:null,//开始时间
        // endTime:null
      },
      searchFields: [
        { span: 2, prop: 'customerName', name: '姓名', placeholder: '请输入' },
        {span: 2, prop: 'customerPhone', name:'手机号', placeholder: '请输入',minlength:"11", maxlength:"11"},
        {span: 2, prop: 'channel', name:'来源渠道', placeholder: '请输入'},
        {span: 2, prop: 'userPhone', name:'经理手机号', placeholder: '请输入',minlength:"11", maxlength:"11"},
        { span: 2, prop: 'orderState', name: '订单状态', placeholder: '请选择', type: 'select',
           options: [
                    { label: '全部', value: null},
                    { label: '待抢', value: 0 },
                    { label: '已抢', value: 1 },
                    { label: '弃置', value: 2 },
                    { label: '已放款', value: 3 },
                    { label: '半价退单', value: 4 },
                    { label: '全款退单', value: 5 },
                    { label: '待审核', value: 6 },
                    { label: '拒绝退单', value: 7 }
                    ]
        },
        {span: 6, type: 'pickerOptionsPicker', name:'申请时间', placeholder: '申请时间',prop:'dateTime'},
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
      showDetail: true, //是否查看详情
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
      },
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      //查看详情的对象
      orderListInfo: {},
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      // 防止多次连续提交表
    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {
    viewInfo(data) {
      console.log(data);
      this.showDetail = false;
      this.orderListInfo = {}; //先清空里面的对象
      this.orderListInfo = data; //赋值查看详情列表
    },
    PostFetchData() {
      this.listLoading = true;
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.listQuery);
      this.upDateTime(searchData.createMap,'startTime', 'endTime','dateTime',searchData);
      let data = { ...searchData,pageIndex,pageSize}
      // return
      apiGetOrderList(data)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total;
            this.tableData = res.data.list;
            this.listLoading = false;
          }
        })
        .catch(error => {
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
      let that = this
      Object.keys(that.listQuery).forEach(key=>{
        that.listQuery[key]=null
        })
      that.onSubmit();
      // console.log(this.orderListForm)
      // this.dateTime = null;
      // this.PostFetchData();
    },
  }
};
</script>

<style lang="less">
.table-classic-wrapper {
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
    .el-page-header {
      padding: 5px 0;
    }
    .el-page-header__content {
      line-height: 24px;
    }
    .el-form-item__label {
      line-height: 32px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 100px;
      color: #99a9bf;
      overflow: hidden;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 33%;
    }
    .el-card {
      min-height: 340px;
    }
  }
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
</style>
