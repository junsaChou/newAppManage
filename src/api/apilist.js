import {get, postParams, postBody } from '../request'

export const apiLogin = p => postParams('/api/backstageUser/login', p); //POST backstageUser/login 用户登录

export const apiGetUserAuditList = p => postBody('/useraudit/getUserAuditList', p); //POST /useraudit/getUserAuditList 审核列表
// /qd-admin/useraudit/getUserAuditList
export const apiLogout = p => post('/api/auth/logout', p); //auth/logout 用户退出

export const apiRigister = p => post('/api/auth/register', p); //注册接口

export const apiSignOut = p => post('/api/auth/signOut', p); //登出接口/recovery