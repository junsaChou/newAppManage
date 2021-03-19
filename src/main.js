import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './router/auth'
import './assets/icon-fonts/iconfont.css'
import './assets/icon-fonts/iconfont'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small' })
    // Vue.config.devtools = false;
Vue.prototype.$axios = axios
Vue.config.devtools = true;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')