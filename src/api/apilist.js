import {get,getBlob, postParams, postBody,postBlob,postParamsBlob } from '../request'
//获取验证码 //GET //backstageUser/getImageCaptcha  获取用户信息
export const apiGetImageCaptcha = p => getBlob('/backstageUser/getImageCaptcha', p);
//GET /qd-admin/backstageUser/getUserInfo  获取用户信息
export const apiGetUserInfo = p => get('/backstageUser/getUserInfo', p); //GET /qd-admin/backstageUser/getUserInfo
//POST backstageUser/login
export const apiLogin = p => postParams('/backstageUser/login', p); //POST backstageUser/login 用户登录
// POST /qd-admin/backstageUser/getUserList  //用户列表
export const apiGetUserList = p => postBody('/backstageUser/getUserList', p); //用户账户列表
// POST /qd-admin/backstageUser/editUser//编辑用户列表
export const apiEditUser = p => postBody('/backstageUser/editUser', p); //编辑用户列表
// POST /qd-admin/backstageUser/createUser
export const apiCreateUser = p => postBody('/backstageUser/createUser', p); //创建用户列表
// POST /qd-admin/backstageUser/resetPassword
export const apiResetPassword = p => postParams('/backstageUser/resetPassword', p); //重置用户列表
// POST /qd-admin/backstageUser/deletUser
export const apiDeletUser = p => postParams('/backstageUser/deletUser', p); //删除用户列表
//POST /qd-admin/backstageUser/editUserPassword  修改账户密码
export const apiEditUserPassword = p => postParams('/backstageUser/editUserPassword', p);

// POST /qd-admin/auth/getAuthList
export const apiGetAuthList = p => postBody('/auth/getAuthList', p); //身份审核列表
// POST /qd-admin/auth/getAuthInfo
export const apiGetAuthInfo = p => postBody('/auth/getAuthInfo', p); //身份审核详情
//POST /qd-admin/auth/editAuth
export const apiEditAuth = p => postBody('/auth/editAuth', p); //编辑身份审核详情

export const apiGetUserAuditList = p => postBody('/useraudit/getUserAuditList', p); // useraudit/getUserAuditList 审核列表

// /order/getOrderList //订单列表
export const apiGetOrderList = p => postBody('/order/getOrderList', p); //order/getOrderList //订单列表


//POST /qd-admin/coupon/getUserCouponList
export const apiGetUserCouponList = p => postBody('/coupon/getUserCouponList', p); //order/getOrderList //优惠券列表

//客户用户api
//POST /qd-admin/user/getUserInfoLis
export const apiGetUserInfoList = p => postBody('/user/getUserInfoList', p); //user/getUserInfoLis //客户用户列表
// POST /qd-admin/user/updateUserInfo
export const apiUpdateUserInfo = p => postBody('/user/updateUserInfo', p); //user/updateUserInfo //更新客户列表的操作 备注，手机号
// POST /qd-admin/user/resetCertification
export const apiResetCertification = p => postBody('/user/resetCertification', p); //user/resetCertification //重置认证

//轮播图列表
//POST /qd-admin/banner/getBannerList
export const apiGetBannerList = p => postBody('/banner/getBannerList', p); //banner/getBannerList //轮播图列表
//POST /qd-admin/banner/editBanner
export const apiEditBanner = p => postBody('/banner/editBanner', p); //banner/editBanner //编辑轮播图列表
// POST /qd-admin/banner/deletBanne
export const apiDeletBanner = p => postParams('/banner/deletBanner', p); //banner/deletBanner //删除轮播图列表
// POST /qd-admin/banner/createBanner
export const apiCreateBanner = p => postBody('/banner/createBanner', p); //banner/createBanner //创建轮播图列表

//优惠券列表接口
// POST /qd-admin/coupon/getCouponList 获取优惠券列表
export const apiGetCouponList = p => postBody('/coupon/getCouponList', p); //coupon/getCouponList //获取优惠券列表
//POST /qd-admin/coupon/createUser 创建优惠券
export const apiCreateCoupon = p => postBody('/coupon/createUser', p);
//POST /qd-admin/coupon/editUser 编辑
export const apiEditCoupon = p => postBody('/coupon/editUser', p);
//POST /qd-admin/coupon/deleteCoupon 删除优惠券
export const apiDeleteCoupon = p => postBody('/coupon/deleteCoupon', p);
//POST /qd-admin/coupon/giveOutCoupon  发放优惠券
export const apiGiveOutCoupon = p => postBody('/coupon/giveOutCoupon', p);
//POST /qd-admin/giveoutrecord/getGiveOutRecordList 优惠券发放列表
export const apiGetGiveOutRecordList = p => postBody('/giveoutrecord/getGiveOutRecordList', p);

// POST /qd-admin/giveoutrecord/getUserCouponList 优惠卷使用列表
export const apiGetUserCouponListUse = p => postBody('/giveoutrecord/getUserCouponList', p);
// POST /qd-admin/giveoutrecord/userCouponListExport 优惠卷使用列表导出
export const apiUserCouponListExport = p => postBlob('/giveoutrecord/userCouponListExport', p);

//退单管理
//POST /qd-api/chargeback/chargebackList
export const apiChargebackList = p => postBody('/chargeback/chargebackList', p); //退单列表
//POST /qd-api/chargeback/updateChargeback  
export const apiUpdateChargeback = p => postParams('/chargeback/updateChargeback', p);
//POST /qd-admin/chargeback/getChargebackInfo  
export const apiGetChargebackInfo = p => postParams('/chargeback/getChargebackInfo', p);

//POST /qd-api/cos/getCosToken 请求cors  访问图片的接口
export const apiGetCosToken = p => postParams('/cos/getCosToken', p);

//POST /qd-admin/news/getNewsList  后台获取消息列表
export const apiGetNewsList = p => postBody('/news/getNewsList', p);
//POST /qd-admin/news/backSendNews
export const apiBackSendNews = p => postBody('/news/backSendNews', p);
//POST /qd-admin/activity/activityList 活动专区
export const apiActivityLists = p => postBody('/activity/activityList', p);  
//POST /qd-admin/activity/addActivity  添加活动
export const apiAddActivity = p => postBody('/activity/addActivity', p);  
//POST/qd-admin/activity/editActivity  编辑活动
export const apiEditActivity = p => postBody('/activity/editActivity', p);  

// POST /qd-admin/activity/payActivityList  充值活动列表
export const apiPayActivityList = p => postParams('/activity/payActivityList', p);
// POST /qd-admin/activity/addVirtualAccount  添加虚拟账户
export const apiAddVirtualAccount = p => postParams('/activity/addVirtualAccount', p);
// POST /qd-admin/activity/editVirtualAccount  添加虚拟账户金额
export const apiEditVirtualAccount = p => postParams('/activity/editVirtualAccount', p);
// POST /qd-admin/activity/distributeBenefit  发放奖励
export const apiDistributeBenefit = p => postParams('/activity/distributeBenefit', p);

// POST /qd-admin/reward/rewardList  活动奖励列表
export const apiRewardList = p => postBody('/reward/rewardList', p);
// POST /qd-admin/reward/editreward  修改活动奖励
export const apiEditreward = p => postBody('/reward/editreward', p);

//POST /qd-admin/coupon/getUserIntegralInfoList 用户积分列表详情
export const apiGetUserIntegralInfoList = p => postBody('/coupon/getUserIntegralInfoList', p);
// POST /qd-admin/coupon/getUserIntegralList 用户积分列表
export const apiGetUserIntegralList = p => postParams('/coupon/getUserIntegralList', p);
// /qd-admin/coupon/userIntegralsExport 积分导出
export const apiUserIntegralsExport = p => postParamsBlob('/coupon/userIntegralsExport', p);


// POST /qd-admin/order-data/selectChannelDetails渠道数据页面查询
export const apiSelectChannelDetails = p => postBody('/order-data/selectChannelDetails', p);
// POST /qd-admin/order-data/selectChannelData首页数据
export const apiSelectChannelData = p => postBody('/order-data/selectChannelData', p);
// POST /qd-admin/order-data/channelDetailsDataExport 导出
export const apiChannelDetailsDataExport = p => postBlob('/order-data/channelDetailsDataExport', p);
// /qd-admin/order-data/channelDataExport // 首页导出
export const apiChannelDataExport = p => postBlob('/order-data/channelDataExport', p);

// POST /qd-api/payrecord/getPayRecordList  账单列表
export const apiGetPayRecordList = p => postBody('/payrecord/getPayRecordList', p);
// POST /qd-admin/payrecord/payRecordExport 账单导出
export const apiPayRecordExport = p => postBlob('/payrecord/payRecordExport', p);

// POST /qd-api/channellinks/linksList渠道链接列表
export const apiLinksList = p => postBody('/channellinks/linksList', p);
// POST /qd-api/channellinks/insertLinks 新增渠道链接
export const apiInsertLinks = p => postBody('/channellinks/insertLinks', p);
// POST /qd-api/channellinks/editLinks 修改渠道链接
export const apiEditLinks = p => postBody('/channellinks/editLinks', p);
// /qd-api/channellinks/deleteLinks 删除渠道链接
export const apiDeleteLinks = p => postBody('/channellinks/deleteLinks', p);
// POST /qd-admin/channellinks/channellinksExport 渠道链接导出
export const apiChannellinksExport = p => postBlob('/channellinks/channellinksExport', p);