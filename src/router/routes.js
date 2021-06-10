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
    // {
    //     path: '/form-table',
    //     name: 'FormTable',
    //     component: Layout,
    //     redirect: '/form-table/table-classic',
    //     meta: {
    //         title: '表格&表单',
    //         icon: 'vue-dsn-icon-biaoge'
    //     },
    //     children: [{
    //             path: 'table-classic',
    //             name: 'TableClassic',
    //             component: () =>
    //                 import ('../views/form-table/TableClassic'),
    //             meta: {
    //                 title: '综合表格'
    //             }
    //         },
    //         {
    //             path: 'form-list',
    //             name: 'FormList',
    //             component: () =>
    //                 import ('../views/form-table/FormList'),
    //             meta: {
    //                 title: '表单列表'
    //             }
    //         },
    //         {
    //             path: 'table-inline-edit',
    //             name: 'TableInlineEdit',
    //             component: () =>
    //                 import ('../views/form-table/TableInlineEdit'),
    //             meta: {
    //                 title: '行内编辑表格'
    //             }
    //         }
    //     ]
    // },
    {
        path: '/homeLIst',
        name: 'HomeLIsts',
        component: Layout,
        redirect: '/homeLIst',
        meta: {
            title: '图表列表',
            icon: 'vue-dsn-icon-zujian' //el-icon-s-check
        },
        children: [{
            path: 'homeLIst',
            name: 'HomeLIst',
            component: () =>
                import ('../views/Home'),
            meta: {
                title: '图表管理'
            }
        }, ]
    },
    {
        path: '/identity-review',
        name: 'IdentityReview',
        component: Layout,
        redirect: '/identity-review/user-manage',
        meta: {
            title: '身份审核',
            icon: 'vue-dsn-icon-zujian' //el-icon-s-check
        },
        children: [{
            path: 'user-manage',
            name: 'UserManage',
            component: () =>
                import ('../views/identity-review/UserManage'),
            meta: {
                title: '身份管理'
            }
        }, ]
    },
    {
        path: '/user-manage',
        name: 'UserManage',
        component: Layout,
        redirect: '/user-manage/user-manage-list',
        meta: {
            title: '用户管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [{
            path: 'user-manage-list',
            name: 'UserManageList',
            component: () =>
                import ('../views/user-manage/UserManageList'),
            meta: {
                title: '用户管理'
            }
        }]
    },
    {
        path: '/order-list',
        name: 'OrderList',
        component: Layout,
        redirect: '/OrderList/order-list',
        meta: {
            title: '订单列表',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [{
            path: 'order-list',
            name: 'OrderList',
            component: () =>
                import ('../views/order-list/OrderList'),
            meta: {
                title: '订单列表'
            }
        }, ]
    },
    {
        path: '/charge-back',
        name: 'ChargeBack',
        component: Layout,
        redirect: '/charge-back/charge-back-list',
        meta: {
            title: '退单管理',
            icon: 'vue-dsn-icon-bianjiqi' //el-icon-s-check
        },
        children: [{
            path: 'charge-back-list',
            name: 'ChangeBackList',
            component: () =>
                import ('../views/charge-back/ChargeBackList'),
            meta: {
                title: '退单列表'
            }
        }]
    },
    {
        path: '/activity-manage',
        name: 'ActivityManage',
        component: Layout,
        redirect: '/activity-manage/activity-manage-list',
        meta: {
            title: '活动管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [{
            path: 'activity-manage-list',
            name: 'ActivityManageList',
            component: () =>
                import ('../views/activity-manage/ActivityManageList'),
            meta: {
                title: '活动专区'
            }
        }]
    },
    {
        path: '/banner-manage',
        name: 'BannerManage',
        component: Layout,
        redirect: '/banner-manage/banner-list',
        meta: {
            title: '广告管理',
            icon: 'vue-dsn-icon-tuichuquanping' //el-icon-s-check
        },
        children: [{
            path: 'banner-list',
            name: 'BannerList',
            component: () =>
                import ('../views/banner-manage/BannerList'),
            meta: {
                title: '广告管理列表'
            }
        }, ]
    },
    {
        path: '/coupon-manage',
        name: 'CouponManage',
        component: Layout,
        redirect: '/coupon-manage/coupon-manage-list',
        meta: {
            title: '优惠券管理',
            icon: 'vue-dsn-icon-excel' //el-icon-s-check
        },
        children: [{
            path: 'coupon-manage-list',
            name: 'CouponManage',
            component: () =>
                import ('../views/coupon-manage/CouponManage'),
            meta: {
                title: '优惠券列表'
            }
        }, ]
    },
    {
        path: '/coupon-issue',
        name: 'CouponIssue',
        component: Layout,
        redirect: '/coupon-issue/coupon-issue-list',
        meta: {
            title: '优惠券发放列表',
            icon: 'vue-dsn-icon-wendang' //el-icon-s-check
        },
        children: [{
            path: 'coupon-issue-list',
            name: 'CouponIssue',
            component: () =>
                import ('../views/coupon-issue/CouponIssue'),
            meta: {
                title: '优惠券发放列表'
            }
        }, ]
    },
    {
        path: '/coupon-use',
        name: 'CouponUse',
        component: Layout,
        redirect: '/coupon-use/coupon-use-list',
        meta: {
            title: '优惠券使用列表',
            icon: 'vue-dsn-icon-wendang' //el-icon-s-check
        },
        children: [{
            path: 'coupon-use-list',
            name: 'CouponUse',
            component: () =>
                import ('../views/coupon-use/CouponUse'),
            meta: {
                title: '优惠券使用列表'
            }
        }, ]
    },
    {
        path: '/bill-manage',
        name: 'BillManage',
        component: Layout,
        redirect: '/bill-manage/bill-manage-list',
        meta: {
            title: '账单管理',
            icon: 'vue-dsn-icon-wendang' //el-icon-s-check
        },
        children: [{
            path: 'bill-manage-list',
            name: 'BillManage',
            component: () =>
                import ('../views/bill-manage/BillManage'),
            meta: {
                title: '账单列表'
            }
        }, ]
    },
    {
        path: '/channel-manage',
        name: 'ChannelManage',
        component: Layout,
        redirect: '/channel-manage/channel-manage-list',
        meta: {
            title: '渠道管理',
            icon: 'vue-dsn-icon-wendang' //el-icon-s-check
        },
        children: [{
            path: 'channel-manage-list',
            name: 'ChannelManage',
            component: () =>
                import ('../views/channel-manage/ChannelManage'),
            meta: {
                title: '渠道列表'
            }
        }, ]
    },
    {
        path: '/channel-link-manage',
        name: 'ChannelLinkManage',
        component: Layout,
        redirect: '/channel-link-manage/channel-link-manage-list',
        meta: {
            title: '渠道链接管理',
            icon: 'vue-dsn-icon-wendang' //el-icon-s-check
        },
        children: [{
            path: 'channel-link-manage-list',
            name: 'ChannelLinkManage',
            component: () =>
                import ('../views/channel-link-manage/ChannelLinkManage'),
            meta: {
                title: '渠道链接列表'
            }
        }, ]
    },
    {
        path: '/account-manage',
        name: 'AccountManage',
        component: Layout,
        redirect: '/account-manage/account-manage-list',
        meta: {
            title: '账户管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [{
            path: 'account-manage-list',
            name: 'AccountManageList',
            component: () =>
                import ('../views/account-manage/AccountManageList'),
            meta: {
                title: '账户列表'
            }
        }, ]
    },
    {
        path: '/message-manage',
        name: 'MessageManage',
        component: Layout,
        redirect: '/message-manage/message-manage-list',
        meta: {
            title: '消息列表',
            icon: 'vue-dsn-icon-wendang' //el-icon-s-check
        },
        children: [{
            path: 'message-manage-list',
            name: 'MessageManage',
            component: () =>
                import ('../views/message-manage/MessageManage'),
            meta: {
                title: '消息管理'
            }
        }, ]
    },
    {
        path: '/recharge-manage',
        name: 'RechargeManage',
        component: Layout,
        redirect: '/recharge-manage/recharge-manage-list',
        meta: {
            title: '充值活动管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [{
            path: 'recharge-manage-list',
            name: 'RechargeManageList',
            component: () =>
                import ('../views/recharge-manage/RechargeManageList'),
            meta: {
                title: '充值列表'
            }
        }]
    },
    {
        path: '/invite-manage',
        name: 'InviteManage',
        component: Layout,
        redirect: '/invite-manage/invite-manage-list',
        meta: {
            title: '邀请活动管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [{
            path: 'invite-manage-list',
            name: 'InviteManageList',
            component: () =>
                import ('../views/invite-manage/InviteManageList'),
            meta: {
                title: '邀请列表'
            }
        }]
    },
    {
        path: '/integral-manage',
        name: 'IntegralManage',
        component: Layout,
        redirect: '/integral-manage/integral-manage-list',
        meta: {
            title: '积分管理',
            icon: 'vue-dsn-icon-biaoge' //el-icon-s-check
        },
        children: [{
            path: 'integral-manage-list',
            name: 'IntegralManageList',
            component: () =>
                import ('../views/integral-manage/IntegralManageList'),
            meta: {
                title: '积分列表'
            }
        }]
    },
    // {
    //     path: '/image',
    //     name: 'Image',
    //     component: Layout,
    //     redirect: '/image/image-cropper',
    //     meta: {
    //         title: '图片处理',
    //         icon: 'vue-dsn-icon-picture'
    //     },
    //     children: [{
    //             path: 'image-cropper',
    //             name: 'ImageCropper',
    //             component: () =>
    //                 import ('../views/image/ImageCropper'),
    //             meta: {
    //                 title: '图片裁剪'
    //             }
    //         },
    //         {
    //             path: 'image-compress',
    //             name: 'ImageCompress',
    //             component: () =>
    //                 import ('../views/image/ImageCompress'),
    //             meta: {
    //                 title: '图片压缩'
    //             }
    //         },
    //         {
    //             path: 'image-synthesizer',
    //             name: 'ImageSynthesizer',
    //             component: () =>
    //                 import ('../views/image/ImageSynthesizer'),
    //             meta: {
    //                 title: '图片合成'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/video',
    //     name: 'Video',
    //     component: Layout,
    //     redirect: '/video/video-player',
    //     meta: {
    //         title: '视频处理',
    //         icon: 'vue-dsn-icon-video'
    //     },
    //     children: [{
    //             path: 'video-player',
    //             name: 'VideoPlayer',
    //             component: () =>
    //                 import ('../views/video/VideoPlayer'),
    //             meta: {
    //                 title: '视频播放器'
    //             }
    //         },
    //         {
    //             path: 'video-mark',
    //             name: 'VideoMark',
    //             component: () =>
    //                 import ('../views/video/VideoMark'),
    //             meta: {
    //                 title: '视频水印'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/tools',
    //     name: 'Tools',
    //     component: Layout,
    //     redirect: '/tools/image-upload',
    //     meta: {
    //         title: '组件',
    //         icon: 'vue-dsn-icon-zujian'
    //     },
    //     children: [{
    //             path: 'image-upload',
    //             name: 'ImageUpload',
    //             component: () =>
    //                 import ('../views/tools/ImageUpload'),
    //             meta: {
    //                 title: '图片上传'
    //             }
    //         },
    //         {
    //             path: 'drag',
    //             name: 'Drag',
    //             component: () =>
    //                 import ('../views/tools/Drag'),
    //             redirect: '/tools/drag/drag-list',
    //             meta: {
    //                 title: '拖拽'
    //             },
    //             children: [{
    //                     path: 'drag-list',
    //                     name: 'DragList',
    //                     component: () =>
    //                         import ('../views/tools/Drag/DragList'),
    //                     meta: {
    //                         title: '列表拖拽'
    //                     }
    //                 },
    //                 {
    //                     path: 'vue-drr',
    //                     name: 'VueDrr',
    //                     component: () =>
    //                         import ('../views/tools/Drag/VueDrrTool'),
    //                     meta: {
    //                         title: '组件拖拽'
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'transfer',
    //             name: 'Transfer',
    //             component: () =>
    //                 import ('../views/tools/TransferPage'),
    //             meta: {
    //                 title: '穿梭框'
    //             }
    //         },
    //         {
    //             path: 'count-to',
    //             name: 'CountTo',
    //             component: () =>
    //                 import ('../views/tools/CountToPage'),
    //             meta: {
    //                 title: '数字滚动'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/editors',
    //     name: 'Editors',
    //     component: Layout,
    //     redirect: '/editors/markdown',
    //     meta: {
    //         title: '编辑器',
    //         icon: 'vue-dsn-icon-bianjiqi'
    //     },
    //     children: [{
    //             path: 'markdown',
    //             name: 'Markdown',
    //             component: () =>
    //                 import ('../views/editors/MarkdownEditor'),
    //             meta: {
    //                 title: 'Markdown编辑器'
    //             }
    //         },
    //         {
    //             path: 'rich-text',
    //             name: 'ImageRichText',
    //             component: () =>
    //                 import ('../views/editors/RichTextEditor'),
    //             meta: {
    //                 title: '富文本编辑器'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/tree',
    //     name: 'Tree',
    //     component: Layout,
    //     redirect: '/tree/org-tree',
    //     meta: {
    //         title: '树形结构',
    //         icon: 'vue-dsn-icon-shuxing'
    //     },
    //     children: [{
    //             path: 'org-tree',
    //             name: 'OrgTree',
    //             component: () =>
    //                 import ('../views/tree/OrgTree'),
    //             meta: {
    //                 title: '组织树'
    //             }
    //         },
    //         {
    //             path: 'ele-tree',
    //             name: 'EleTree',
    //             component: () =>
    //                 import ('../views/tree/EleTree'),
    //             meta: {
    //                 title: '控件树'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/graph-editors',
    //     name: 'GraphEditors',
    //     component: Layout,
    //     redirect: '/graph-editors/flow',
    //     meta: {
    //         title: '图形编辑器',
    //         icon: 'vue-dsn-icon-excel'
    //     },
    //     children: [{
    //             path: 'flow',
    //             name: 'Flow',
    //             component: () =>
    //                 import ('../views/graph-editors/FlowEditor'),
    //             meta: {
    //                 title: '流程图'
    //             }
    //         },
    //         {
    //             path: 'mind-editor',
    //             name: 'MindEditor',
    //             component: () =>
    //                 import ('../views/graph-editors/MindEditor'),
    //             meta: {
    //                 title: '思维导图'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/excel',
    //     name: 'Excel',
    //     component: Layout,
    //     redirect: '/excel/export-excel',
    //     meta: {
    //         title: 'Excel',
    //         icon: 'vue-dsn-icon-excel'
    //     },
    //     children: [{
    //             path: 'export-excel',
    //             name: 'ExportExcel',
    //             component: () =>
    //                 import ('../views/excel/ExportExcel'),
    //             meta: {
    //                 title: '导出Excel'
    //             }
    //         },
    //         {
    //             path: 'import-excel',
    //             name: 'ImportExcel',
    //             component: () =>
    //                 import ('../views/excel/ImportExcel'),
    //             meta: {
    //                 title: '导入Excel'
    //             }
    //         }
    //     ]
    // },
    {
        path: '/error-page',
        name: 'ErrorPage',
        component: Layout,
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