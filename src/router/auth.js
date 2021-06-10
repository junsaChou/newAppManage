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
            var isFlag = []; //判断变量
            let routerMap = [];
            children.forEach((item, i) => {
                routerRole.forEach((j, k) => {

                    if (item.name == j) {
                        isFlag.push(item.redirect)
                        routerMap.push(item);
                    }
                });
            })
            router.options.routes = [...staticMap, ...routerMap]
            // console.log(router.options.routes)
            // console.log(to.matched);
            // console.log(routerMap)
            console.log(to.name)
            // let routerBox =  router.options.routes;
            // routerBox.forEach(k=>{
            //     console.log(k.name);
            //     if(k.name.indexOf(to.name) ==-1){

            //     }
            // })
            console.log(from)
            if (to.matched.length === 0) { //如果未匹配到路由
                from.path ? next({ path: from.path }) : next({ path: '401' }); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
            } else {
                next(); //如果匹配到正确跳转
            }
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