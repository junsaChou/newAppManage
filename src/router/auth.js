import router from './index'
import { getToken, getUserInfo } from '../utils/cookie'
// 白名单列表
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (getUserInfo()) {
            let staticMap = router.options.routes.slice(0, 5);
            let children = router.options.routes.slice(5);
            let routerRole = JSON.parse(getUserInfo());
            let routerMap = [];
            console.log(children)
            children.forEach((item, i) => {
                routerRole.forEach((j, k) => {
                    if (item.name == j) {
                        routerMap.push(item);
                    }
                });
            })
            router.options.routes = [...staticMap, ...routerMap]
        }
        // 已登录且要跳转的是登录页
        if (to.path === '/login') {
            next({ path: '/' })
        } else {

            next()
        }
    } else {
        // return false;
        // 在免登录白名单，直接进入
        if (whiteList.includes(to.path)) {
            next()
        } else {
            // 否则重定向到登录页
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})