import router from './index'
import { getToken, getUserInfo } from '../utils/cookie'
// 白名单列表
const whiteList = ['/login']
// 权限列表
var roleListArr = [];

function checked(authCode, data, newArr,parent) {
    data.map(item => {//遍历组成树结构的数据
    //   console.log(newArr);
      if (item.name == authCode) {//需要显示的如果有父元素的节点
        // console.log(parent)
        if(parent){
            parent.hidden = false;
        }
        // 当子节点数组为数组[]时用  item.childList.length==0  childList是子节点的数组名
        // 当子节点为空是后台传的为null时用  item.childList==null
        if (item.children == null) {
            
            item.hidden = false;
        }else{
            item.hidden = true;
        }
      } else {//需要显示的没有父元素的节点但是有子节点
        if (item.children != null) {
          checked(authCode, item.children, newArr,item)
         
        }
      }
      })
  };
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (getUserInfo()) {
            // let staticMap = router.options.routes.slice(0, 5);
            // let children = router.options.routes.slice(5);
            // let routerRole = JSON.parse(getUserInfo());
            // var isFlag = []; //判断变量
            // let routerMap = [];
            // console.log(router.options.routes)
        //     children.forEach((item, i) => {
        //         routerRole.forEach((j, k) => {

        //             if (item.name == j) {
        //                 isFlag.push(item.redirect)
        //                 routerMap.push(item);
        //             }
        //         });
        //     })
        //     router.options.routes = [...staticMap, ...routerMap]
        //     // console.log(router.options.routes)
        //     // console.log(to.matched);
        //     // console.log(routerMap)
        //     console.log(to.name)
        //     // let routerBox =  router.options.routes;
        //     // routerBox.forEach(k=>{
        //     //     console.log(k.name);
        //     //     if(k.name.indexOf(to.name) ==-1){

        //     //     }
        //     // })
        //     console.log(from)
        //     if (to.matched.length === 0) { //如果未匹配到路由
        //         from.path ? next({ path: from.path }) : next({ path: '401' }); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
        //     } else {
        //         next(); //如果匹配到正确跳转
        //     }
            let children = router.options.routes.slice(5);
            let routerRole = JSON.parse(getUserInfo());
            // console.log(routerRole)
            roleListArr = routerRole;
            let routerMap = []
            routerRole.forEach(item=>{
               
                checked(item,children,routerMap)
            })
          
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
            // if(to.name != 'Home'){
            //     if(roleListArr.includes(to.name)){
            //         next();
            //     }else{
            //         if( to.name === 'Page401'){
            //             next()
            //         }else{
            //             next({ path: '/error-page' }) //如果匹配到正确跳转
            //         }
            //         // 
            //     }
            // }
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