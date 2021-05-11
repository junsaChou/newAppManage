<template>
  <div class="user-center-wrapper clear-fix">
    <el-card shadow="always" :body-style="{padding: '50px'}">
      <div class="user-avatar">
        <img src="../assets/img/avatar.png" alt="avatar">
      </div>
      <ul class="user-info">
        <li>
          <label>用户名：</label>
          <span>{{ userInfo.userName }}</span>
        </li>
        <li>
          <label>角色权限：</label>
          <span>{{ userInfo.roleName }}</span>
        </li>
        <li>
          <label>昵称：</label>
          <span>{{ userInfo.account }}</span>
        </li>
        <!-- <li>
          <label>电话号码：</label>
          <span>{{ userInfo.phone }}</span>
        </li> -->
        <!-- <li>
          <label>邮箱：</label>
          <span>{{ userInfo.email }}</span>
        </li> -->
        <li>
          <label>创建时间：</label>
          <span>{{ userInfo.createTime | formatDate }}</span>
        </li>
        <!-- <li>
          <label>更新时间：</label>
          <span>{{ userInfo.updatetime }}</span>
        </li> -->
      </ul>
    </el-card>
  </div>
</template>

<script>
// import {  mapMutations } from "vuex";
import { getUserInfoData } from '../utils/cookie'

export default {
  name: 'UserCenter',
  data() {
    return {
      userInfo: {},
      nameArray: [
        { label: "身份管理", authCode: "IdentityReview" },
        { label: "用户管理", authCode: "UserManage" },
        { label: "订单列表", authCode: "OrderList" },
        { label: "退单列表", authCode: "ChargeBack" },
        { label: "广告管理", authCode: "BannerManage" },
        { label: "消息管理", authCode: "MessageManage" },
        { label: "优惠券列表", authCode: "CouponManage" },
        { label: "优惠券发放列表", authCode: "CouponIssue"},
        { label: "账户列表", authCode: "AccountManage" },
        { label: "报表统计", authCode: "ReportList" },
        { label: "活动专区", authCode: "ActivityManage" },
        { label: "充值列表", authCode: "RechargeManage" },
      ],
    }
  },
  created() {
    if(getUserInfoData()){
      this.userInfo = JSON.parse(getUserInfoData())
      let roleArr = this.userInfo.role.split(',');
      let roleName = [];
      this.nameArray.map(j=>{
        if(roleArr.indexOf(j.authCode)!=-1 ){
          roleName.push(j.label)
        }
      })
      this.userInfo['roleName'] = roleName.join(',');
    }

  },
  mounted(){
    // console.log(getUserInfoData())
  },
  methods:{
  }
}
</script>

<style lang="less">
.user-center-wrapper {
  .user-avatar {
    float: left;
    width: 150px;
    height: 150px;
  }
  .user-info {
    float: left;
    width: 800px;
    margin-left: 50px;
    margin-bottom: 50px;
    li {
      // height: 34px;
      // line-height: 34px;
      display: flex;
      padding: 5px 0;
      span {
        flex: 1;
        display: inline-flex;
        vertical-align: middle;
      }
      label {
        display: inline-block;
        width: 80px;
        margin-right: 12px;
        text-align: right;
      }
    }
  }
}
</style>
