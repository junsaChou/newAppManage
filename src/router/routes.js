import Layout from '../layout'

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

export const asyncRoutes = [
    {
        path: '/audit-manage',
        name: 'AuditManage',
        component: Layout,
        redirect: '/identity-review/user-manage',
        auth:false,
        hidden: true,
        meta: {
            title: '审核管理',
            icon: 'vue-dsn-icon-zujian' //el-icon-s-check
        },
        children: [
            {
                path: 'user-manage',
                name: 'IdentityReview',
                hidden: true,
                component: () =>
                    import ('../views/identity-review/UserManage'),
                meta: {
                    title: '身份管理',
                    icon: 'vue-dsn-icon-zujian' //el-icon-s-check
                }
            }, 
            {
                path: 'user-manage-list',
                name: 'UserManage',
                hidden: true,
                component: () =>
                    import ('../views/identity-review/UserManageList'),
                meta: {
                    title: '用户管理',
                    icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
                }
            },
            {
                path: 'order-list',
                name: 'OrderList',
                hidden: true,
                component: () =>
                    import ('../views/identity-review/OrderList'),
                meta: {
                    title: '订单列表',
                    icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
                }
            },
            {
                path: 'charge-back-list',
                name: 'ChargeBack',
                hidden: true,
                component: () =>
                    import ('../views/identity-review/ChargeBackList'),
                meta: {
                    title: '退单列表',
                    icon: 'vue-dsn-icon-bianjiqi' //el-icon-s-check
                }
            }
        ]

    },
    {
        path: '/operation-manage',
        name: 'OperationManage',
        component: Layout,
        redirect: '/operation-manage/banner-manage',
        auth:false,
        hidden: true,
        meta: {
            title: '运营管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [
            {
                path: 'banner-manage',
                name: 'BannerManage',
                hidden: true,
                component: () =>
                    import ('../views/operation-manage/BannerList'),
                meta: {
                    title: '广告管理列表',
                    icon: 'vue-dsn-icon-tuichuquanping' //el-icon-s-check
                }
            },
            {
                path: 'spa-banner-list',
                name: 'SpaBannerManage',
                // hidden: true,
                component: () =>
                    import ('../views/operation-manage/SpaBannerList'),
                meta: {
                    title: '首页活动管理',
                    icon: 'vue-dsn-icon-tuichuquanping' //el-icon-s-check
                }
            },
            {
                path: 'activity-manage-list',
                name: 'ActivityManage',
                hidden: true,
                component: () =>
                    import ('../views/operation-manage/ActivityManageList'),
                meta: {
                    title: '活动专区',
                    icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
                }
            },
            {
                path: 'prize-punish-list',
                name: 'PrizePunish',
                hidden: true,
                component: () =>
                    import ('../views/operation-manage/PrizePunishList'),
                meta: {
                    title: '奖惩列表',
                    icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
                }
            },
            {
                path: 'coupon-manage-list',
                name: 'CouponManage',
                hidden: true,
                component: () =>
                    import ('../views/operation-manage/CouponManage'),
                meta: {
                    title: '优惠券列表',
                    icon: 'vue-dsn-icon-excel' //el-icon-s-check
                }
            },
            {
                path: 'coupon-issue-list',
                name: 'CouponIssue',
                hidden: true,
                component: () =>
                    import ('../views/operation-manage/CouponIssue'),
                meta: {
                    title: '优惠券发放列表',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            },
            {
                path: 'coupon-use-list',
                name: 'CouponUse',
                hidden: true,
                component: () =>
                    import ('../views/operation-manage/CouponUse'),
                meta: {
                    title: '优惠券使用列表',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            }
        ]
    },
    {
        path: '/bill-manage-data',
        name: 'BillManageData',
        component: Layout,
        redirect: '/bill-manage/bill-manage-list',
        auth:false,
        hidden: true,
        meta: {
            title: '数据管理',
            icon: 'vue-dsn-icon-wendang' //el-icon-s-check
        },  
        children: [
            {
                path: 'report-list',
                name: 'ReportList',
                hidden: true,
                component: () =>
                    import ('../views/Home'),
                meta: {
                    title: '账单图表',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            }, 
            {
                path: 'bill-manage-list',
                name: 'BillManage',
                hidden: true,
                component: () =>
                    import ('../views/bill-manage/BillManage'),
                meta: {
                    title: '账单管理',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            }, 
            {
                path: 'manager-data',
                name: 'ManagerData',
                hidden: true,
                component: () =>
                    import ('../views/bill-manage/ManagerData'),
                meta: {
                    title: '经理数据总览统计',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            },
            {
                path: 'manager-adds-conversion',
                name: 'ManagerAddsConversion',
                hidden: true,
                component: () =>
                    import ('../views/bill-manage/ManagerAddsConversion'),
                meta: {
                    title: '经理新增转化统计',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            },
            {
                path: 'channel-manage-list',
                name: 'ChannelManage',
                hidden: true,
                component: () =>
                    import ('../views/bill-manage/ChannelManage'),
                meta: {
                    title: '渠道管理',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            },
            {
                path: 'channel-link-manage-list',
                name: 'ChannelLinkManage',
                hidden: true,
                component: () =>
                    import ('../views/bill-manage/ChannelLinkManage'),
                meta: {
                    title: '渠道链接详情',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            },
        ]
    },
    {
        path: '/system-manage',
        name: 'SystemManage',
        component: Layout,
        redirect: '/system-manage/account-manage-list',
        auth:false,
        hidden: true,
        meta: {
            title: '系统管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [
            {
                path: 'account-manage-list',
                name: 'AccountManage',
                hidden: true,
                component: () =>
                    import ('../views/system-manage/AccountManageList'),
                meta: {
                    title: '账户列表',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            },
            {
                path: 'message-manage-list',
                name: 'MessageManage',
                hidden: true,
                component: () =>
                    import ('../views/system-manage/MessageManage'),
                meta: {
                    title: '消息管理',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            }, 
            {
                path: 'system-log',
                name: 'SystemLog',
                hidden: true,
                component: () =>
                    import ('../views/system-manage/SystemLog'),
                meta: {
                    title: '系统日志',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            }, 
        ]
    },
    {
        path: '/recharge-manage',
        name: 'RechargeManageList',
        component: Layout,
        redirect: '/recharge-manage/recharge-manage-list',
        auth:false,
        hidden: true,
        meta: {
            title: '活动管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [
            {
                path: 'integral-manage-list',
                name: 'IntegralManage',
                hidden: true,
                component: () =>
                    import ('../views/recharge-manage/IntegralManageList'),
                meta: {
                    title: '积分管理',
                    icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
                }
            },
            {
                path: 'recharge-manage-list',
                name: 'RechargeManage',
                hidden: true,
                component: () =>
                    import ('../views/recharge-manage/RechargeManageList'),
                meta: {
                    title: '充值活动管理',
                    icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
                }
            },
            {
                path: 'invite-manage-list',
                name: 'InviteManage',
                hidden: true,
                component: () =>
                    import ('../views/recharge-manage/InviteManageList'),
                meta: {
                    title: '邀请活动管理',
                    icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
                }
            },
            {
                path: 'Invitation-manage',
                name: 'invitationManage',
                hidden: true,
                component: () =>
                    import ('../views/recharge-manage/invitationManage'),
                meta: {
                    title: '邀请管理',
                    icon: 'vue-dsn-icon-wendang' //el-icon-s-check
                }
            }
        ]
    },   
    {
        path: '/error-page',
        name: 'ErrorPage',
        component: Layout,
        hidden: true,
        redirect: '/error-page/page-401',
        meta: {
            title: '错误页面',
            icon: 'vue-dsn-icon-bug'
        },
        children: [{
                path: 'page-401',
                name: 'Page401',
                component: () =>
                    import ('../views/error-page/401'),
                meta: {
                    title: '401页面'
                }
            },
            {
                path: 'page-404',
                name: 'Page404',
                component: () =>
                    import ('../views/error-page/404'),
                meta: {
                    title: '404页面'
                }
            }
        ]
    }
]