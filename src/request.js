import axois from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from './utils/cookie'
// import QS from 'qs'

// 创建axios实例
const service = axois.create({
    // baseURL: 'http://test.future-better.com/qd-admin',
    // baseURL: 'http://192.168.0.129:8703/qd-admin',
    // baseURL: 'https://www.jinniuzhanye.com/qd-admin', // api 的 base_url process.env.VUE_APP_BASE_API //http://test.future-better.com/qd-admin/  
    timeout: 120000 // 请求超时时间
})

// request拦截器设置
service.interceptors.request.use(
    config => {
        if (getToken()) {
            // config.headers['Authorization'] =  getToken() // 请求头设置自带 token
            config.headers['token'] = getToken() // 请求头设置自带 token
        }
        // if (config.method === 'post') {
        //     config.data = QS.stringify(config.data);
        // }
        config.headers['Content-Type'] = 'application/json;charset=UTF-8' // 请求的数据格式为 json
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// response 拦截器设置
service.interceptors.response.use(
        response => {
            let res = {}
            res.data = response.data
            res.code = response.code
            res.message = response.message
            if (res.data.code == 403) {
                removeToken()
                this.$router.push('/login');
                location.reload()
            }
            // if (res.code === 0) {
            //     return data.data
            // } else {
            //     Message({
            //         type: 'error',
            //         message
            //     })
            //     return Promise.reject('error')
            // }
            return res
        },
        error => {
            const code = error.response.data.code
            if (!code) {
                Message({
                    type: 'error',
                    message: '接口请求失败'
                })
            }
            return Promise.reject(error)
        }
    )
    //定义接口
export function get(url, params) { //get 请求  
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
export function postParams(url, params) { //post 请求 parmas
    return new Promise((resolve, reject) => {
        service.post(url, null, { params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function postBody(url, data) { //post 请求 parmas
    return new Promise((resolve, reject) => {
        // console.log(data)
        service.post(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}