import {get, postParams, postBody } from '../request'

//GET /qd-admin/backstageUser/getUserInfo  获取用户信息
export const apiGetUserInfo = p => get('/api/backstageUser/getUserInfo', p); //GET /qd-admin/backstageUser/getUserInfo
//POST backstageUser/login
export const apiLogin = p => postParams('/api/backstageUser/login', p); //POST backstageUser/login 用户登录
// POST /qd-admin/backstageUser/getUserList  //用户列表
export const apiGetUserList = p => postBody('/api/backstageUser/getUserList', p); //用户账户列表
// POST /qd-admin/backstageUser/editUser//编辑用户列表
export const apiEditUser = p => postBody('/api/backstageUser/editUser', p); //编辑用户列表
// POST /qd-admin/backstageUser/createUser
export const apiCreateUser = p => postBody('/api/backstageUser/createUser', p); //创建用户列表
// POST /qd-admin/backstageUser/resetPassword
export const apiResetPassword = p => postParams('/api/backstageUser/resetPassword', p); //重置用户列表
// POST /qd-admin/backstageUser/deletUser
export const apiDeletUser = p => postParams('/api/backstageUser/deletUser', p); //删除用户列表
//POST /qd-admin/backstageUser/editUserPassword  修改账户密码
export const apiEditUserPassword = p => postParams('/api/backstageUser/editUserPassword', p);

// POST /qd-admin/auth/getAuthList
export const apiGetAuthList = p => postBody('/api/auth/getAuthList', p); //身份审核列表
// POST /qd-admin/auth/getAuthInfo
export const apiGetAuthInfo = p => postBody('/api/auth/getAuthInfo', p); //身份审核详情
//POST /qd-admin/auth/editAuth
export const apiEditAuth = p => postBody('/api/auth/editAuth', p); //编辑身份审核详情

export const apiGetUserAuditList = p => postBody('/api/useraudit/getUserAuditList', p); // useraudit/getUserAuditList 审核列表

// /order/getOrderList //订单列表
export const apiGetOrderList = p => postBody('/api/order/getOrderList', p); //order/getOrderList //订单列表


//POST /qd-admin/coupon/getUserCouponList
export const apiGetUserCouponList = p => postBody('/api/coupon/getUserCouponList', p); //order/getOrderList //优惠券列表

//客户用户api
//POST /qd-admin/user/getUserInfoLis
export const apiGetUserInfoList = p => postBody('/api/user/getUserInfoList', p); //user/getUserInfoLis //客户用户列表
// POST /qd-admin/user/updateUserInfo
export const apiUpdateUserInfo = p => postBody('/api/user/updateUserInfo', p); //user/updateUserInfo //更新客户列表的操作 备注，手机号
// POST /qd-admin/user/resetCertification
export const apiResetCertification = p => postBody('/api/user/resetCertification', p); //user/resetCertification //重置认证

//轮播图列表
//POST /qd-admin/banner/getBannerList
export const apiGetBannerList = p => postBody('/api/banner/getBannerList', p); //banner/getBannerList //轮播图列表
//POST /qd-admin/banner/editBanner
export const apiEditBanner = p => postBody('/api/banner/editBanner', p); //banner/editBanner //编辑轮播图列表
// POST /qd-admin/banner/deletBanne
export const apiDeletBanner = p => postParams('/api/banner/deletBanner', p); //banner/deletBanner //删除轮播图列表
// POST /qd-admin/banner/createBanner
export const apiCreateBanner = p => postBody('/api/banner/createBanner', p); //banner/createBanner //创建轮播图列表

//优惠券列表接口
// POST /qd-admin/coupon/getCouponList 获取优惠券列表
export const apiGetCouponList = p => postBody('/api/coupon/getCouponList', p); //coupon/getCouponList //获取优惠券列表
//POST /qd-admin/coupon/createUser 创建优惠券
export const apiCreateCoupon = p => postBody('/api/coupon/createUser', p);
//POST /qd-admin/coupon/editUser 编辑
export const apiEditCoupon = p => postBody('/api/coupon/editUser', p);
//POST /qd-admin/coupon/deleteCoupon 删除优惠券
export const apiDeleteCoupon = p => postBody('/api/coupon/deleteCoupon', p);
//POST /qd-admin/coupon/giveOutCoupon  发放优惠券
export const apiGiveOutCoupon = p => postBody('/api/coupon/giveOutCoupon', p);
//POST /qd-admin/giveoutrecord/getGiveOutRecordList 优惠券发放列表
export const apiGetGiveOutRecordList = p => postBody('/api/giveoutrecord/getGiveOutRecordList', p);

//退单管理
//POST /qd-api/chargeback/chargebackList
export const apiChargebackList = p => postBody('/api/chargeback/chargebackList', p); //退单列表
//POST /qd-api/chargeback/updateChargeback  
export const apiUpdateChargeback = p => postParams('/api/chargeback/updateChargeback', p);
//POST /qd-admin/chargeback/getChargebackInfo  
export const apiGetChargebackInfo = p => postParams('/api/chargeback/getChargebackInfo', p);

//POST /qd-api/cos/getCosToken 请求cors  访问图片的接口
export const apiGetCosToken = p => postParams('/api/cos/getCosToken', p);

//POST /qd-admin/news/getNewsList  后台获取消息列表
export const apiGetNewsList = p => postBody('/api/news/getNewsList', p);
//POST /qd-admin/news/backSendNews
export const apiBackSendNews = p => postBody('/api/news/backSendNews', p);
//POST /qd-admin/activity/activityList 活动专区
export const apiActivityLists = p => postBody('/api/activity/activityList', p);  
//POST /qd-admin/activity/addActivity  添加活动
export const apiAddActivity = p => postBody('/api/activity/addActivity', p);  
//POST/qd-admin/activity/editActivity  编辑活动
export const apiEditActivity = p => postBody('/api/activity/editActivity', p);  

// POST /qd-admin/activity/payActivityList  充值活动列表
export const apiPayActivityList = p => postParams('/api/activity/payActivityList', p);
// POST /qd-admin/activity/addVirtualAccount  添加虚拟账户
export const apiAddVirtualAccount = p => postParams('/api/activity/addVirtualAccount', p);
// POST /qd-admin/activity/editVirtualAccount  添加虚拟账户金额
export const apiEditVirtualAccount = p => postParams('/api/activity/editVirtualAccount', p);
// POST /qd-admin/activity/distributeBenefit  发放奖励
export const apiDistributeBenefit = p => postParams('/api/activity/distributeBenefit', p);

// POST /qd-admin/reward/rewardList  活动奖励列表
export const apiRewardList = p => postBody('/api/reward/rewardList', p);
// POST /qd-admin/reward/editreward  修改活动奖励
export const apiEditreward = p => postBody('/api/reward/editreward', p);

//POST /qd-admin/coupon/getUserIntegralInfoList 用户积分列表详情
export const apiGetUserIntegralInfoList = p => postBody('/api/coupon/getUserIntegralInfoList', p);
// POST /qd-admin/coupon/getUserIntegralList 用户积分列表
export const apiGetUserIntegralList = p => postParams('/api/coupon/getUserIntegralList', p);