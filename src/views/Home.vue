<template>
  <div class="home-wrapper">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    <div class="date-row">
    
      <div v-for="(item, index) in cardInfoData" :key="index" class="data-col">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="date-block">
            <i :class="[ item.icon ]" :style="{ background: item.color }" class="icon-box" />
            <div class="date-cont">
              <CountTo class="count" :start-val="0" :end-val="item.count" :duration="3000" />
              <p class="title">{{ item.title }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-row class="date-box" :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie title="账户总充值" type="pie" :data="chartsPieData.slice(0,2)" class="data-desc" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie title="抢单总消费" type="ring" :data="chartsPieData.slice(2,4)" class="data-desc" />
        </el-card>
      </el-col>
      <!-- <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="data-desc data-lang-box">
            <div class="data-lang-title">项目语言构成</div>
            <div v-for="(item, index) in langsData" :key="index" class="data-lang-item">
              <label>{{ item.name }}</label>
              <el-progress :percentage="item.value" :stroke-width="16" :color="item.color" />
            </div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie title="充值账户总数" type="pie" :data="chartsPieData.slice(4,6)" class="data-desc" />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="date-box" v-for="(item,index) in 3 " :key="index" :gutter="20">
      <el-col :span="12" v-if="echartsList.length >0">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsBar :title="chartsPieDatalist[index*2]" :data="echartsList.slice(index*2,index*2+1)[0]" class="data-chart" />
        </el-card>
      </el-col>
      <el-col :span="12" v-if="echartsList.length >0">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsLine :title="chartsPieDatalist[index*2 + 1]" :data="echartsList.slice(index*2+1,index*2+2)[0]" class="data-chart" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import ChartsPie from '../components/Charts/ChartsPie'
import ChartsBar from '../components/Charts/ChartsBar'
import ChartsLine from '../components/Charts/ChartsLine'
// 账单图表
import { apiGetBillCount } from "../api/apilist";
export default {
  name: 'Home',
  components: { CountTo, ChartsPie, ChartsBar, ChartsLine },
  data() {
    return {
      text: '',
      title: '近七天用户访问量条形图',
      // langsData: [
      //   { name: 'VUE', value: 45, color: '#2d8cf0' },
      //   { name: 'ES6', value: 32, color: '#19be6b' },
      //   { name: 'TS', value: 4, color: '#ff9900' },
      //   { name: 'LESS', value: 13, color: '#e46cbb' },
      //   { name: 'HTML', value: 6, color: '#9a66e4' }
      // ],
      cardInfoData: [
        { title: '账户总充值', icon: 'vue-dsn-icon-dianji', count: 682, color: '#2d8cf0' },
        { title: '账户总消费', icon: 'vue-dsn-icon-xinzeng', count: 259, color: '#19be6b' },
        { title: '充值账户总数', icon: 'vue-dsn-icon-xinfeng', count: 1262, color: '#ff9900' },
        { title: '抢单总消费', icon: 'vue-dsn-icon-dianzan', count: 508, color: '#e46cbb' },
        { title: '抢单总人数', icon: 'vue-dsn-icon-heart', count: 379, color: '#9a66e4' },
        { title: '退款总值', icon: 'vue-dsn-icon-xinfeng', count: 1262, color: '#ff9900' },
        { title: '退单总人数', icon: 'vue-dsn-icon-dianzan', count: 508, color: '#e46cbb' },
        { title: '退单总数', icon: 'vue-dsn-icon-heart', count: 379, color: '#9a66e4' }
      ],
      chartsPieData: [
        { value: 1920, name: '账户未消费' },
        { value: 1169, name: '账户总消费' },
        { value: 986, name: '未退款总值' },
        { value: 621, name: '退款总值' },
        { value: 3256, name: '未抢单总人数' },
        { value: 3256, name: '抢单总人数' }
      ],
      chartsPieDatalist:[
        '账户总充值','账户总消费','抢单总消费','退款总值','充值账户总数','抢单总人数'
      ],
      commonChartsData: {
        // Mon: 782,
        // Tue: 925,
        // Wed: 1196,
        // Thu: 812,
        // Fri: 328,
        // Sat: 222,
        // Sun: 1080
      },
      echartsList:[
      ],
      listQuery: {
        startTime : null,//创建时间
        endTime  : null//结束时间
      },
      createMap:null,//创建日期map
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
    }
  },
  mounted(){
    this.PostFetchData();
  },
  // created(){
  //   this.PostFetchData();
  // },
  methods:{
       // 查询数据
    onSubmit() {
      this.PostFetchData();
    },
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.createMap = null;
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
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
    },
     // 获取数据列表
    PostFetchData() {
      // 获取审核数据列表接口
      let data = this.listQuery;
      // delete data.dateTime;
      apiGetBillCount(data)
        .then(res => {
          if (res.code === 200) {
            let { accountRecharge,accountConsumption,rechargeNum,buyConsumption,consumptionNum,refundAmount,refundNum,refundCountNum } = res.data.extendsMap;
            this.cardInfoData[0].count = accountRecharge;
            this.cardInfoData[1].count = accountConsumption;
            this.cardInfoData[2].count = rechargeNum;
            this.cardInfoData[3].count = buyConsumption;
            this.cardInfoData[4].count = consumptionNum;
            this.cardInfoData[5].count = refundAmount;
            this.cardInfoData[6].count = refundNum;
            this.cardInfoData[7].count = refundCountNum;
            //饼状图  
            this.chartsPieData[0].value =  accountRecharge - accountConsumption   ;
            this.chartsPieData[1].value = accountConsumption;
            this.chartsPieData[2].value = buyConsumption - refundAmount;
            this.chartsPieData[3].value = refundAmount; 
            this.chartsPieData[4].value = rechargeNum - consumptionNum ;
            this.chartsPieData[5].value = consumptionNum;
            let chartLine = res.data.list[0];
            // 折线图
            let accountConsumptionList = chartLine.accountConsumptionList;//账单总消费
            let accountRechargeList = chartLine.accountRechargeList; //账单总充值
            let buyConsumptionList = chartLine.buyConsumptionList;//抢单总消费
            let consumptionNumList = chartLine.consumptionNum;//抢单总人数
            let refundAmountList = chartLine.refundAmountList;//退款金额
            let rechargeNumList = chartLine.rechargeNumList;//充值列表
            let accountConsumptionListJson = {};
            let accountRechargeListJson = {};
            let buyConsumptionListJson = {};
            let consumptionNumJson = {};
            let refundAmountListJson = {};
            let rechargeNumListJson = {};
            // // 通过遍历拿到数组对象中的每个对象（item）
            this.forEachArr(accountConsumptionListJson,accountConsumptionList);
            this.forEachArr(accountRechargeListJson,accountRechargeList);
            this.forEachArr(buyConsumptionListJson,buyConsumptionList);
            this.forEachArr(consumptionNumJson,consumptionNumList);
            this.forEachArr(refundAmountListJson,refundAmountList);
            this.forEachArr(rechargeNumListJson,rechargeNumList);
          
            this.echartsList = [ accountRechargeListJson,accountConsumptionListJson,buyConsumptionListJson,refundAmountListJson,rechargeNumListJson,consumptionNumJson ]

          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    forEachArr(startArr,oldArr){
       oldArr.forEach(item=>{startArr[item.day]=item.accountConsumption})
    },
  }
}
</script>

<style lang="less">
@import "../assets/less/home";
</style>
