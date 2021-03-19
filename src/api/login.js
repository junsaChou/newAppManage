import request from '../request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getUserInfo(params) {
    return request({
        url: '/user/info',
        method: 'get',
        params
    })
}
export function getImageCaptcha(params) { //图形验证码
    return request({
        url: '/backstageUser/getImageCaptch',
        method: 'get',
        params
    })
}