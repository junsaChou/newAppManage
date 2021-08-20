import Cookies from 'js-cookie'
const state = {
    visitedViews: [],
    token: '', //判断是否有 token
    userInfoList: '', //路由信息
    userInfoData: {} //用户详情
}

const getters = {
    visitedViews: (state, getters) => state.visitedViews,
    getUserInfoData() {
        return  JSON.parse(Cookies.get('userInfoData'));
    }
}

const mutations = {
    addVisitedView(state, payload) {
        if (state.visitedViews.some(item => item.path === payload.path)) return
        state.visitedViews.push(
            Object.assign({}, payload, {
                title: payload.meta.title || 'no-title'
            })
        )
    },
    delVisitedView(state, payload) {
        const index = state.visitedViews.findIndex(item => {
            return item.path === payload.path
        })
        state.visitedViews.splice(index, 1)
    },
    delAllVisitedView(state, payload) {
        const fixedTags = state.visitedViews.filter(item => item.meta.fixed)
        state.visitedViews = fixedTags
    },
    delOthersVisitedView(state, payload) {
        state.visitedViews = state.visitedViews.filter(item => {
            return item.meta.fixed || item.path === payload.path
        })
    },
    setToken(state, token) {
        state.token = token
        Cookies.set('token', token, { expires: 1 })
    },
    removeToken(state, token) {
        state.token = token
        Cookies.remove('token', token)
    },
    getToken() {
        return Cookies.get('token')
            // Cookies.remove('token', token)
    },
    setUserInfo(state, userInfoList) {
        state.userInfoList = userInfoList
        Cookies.set('userInfoList', userInfoList, { expires: 1 })
    },
    setUserInfoData(state, userInfoData) {
        state.userInfoData = userInfoData
        Cookies.set('userInfoData', JSON.stringify(userInfoData), { expires: 1 })
    },
    getUserInfo() {
        return Cookies.get('userInfoList')
            // Cookies.remove('token', token)
    },
    removeUserInfoData(state, userInfoData) {
        state.userInfoData = null;
        Cookies.remove('userInfoData', userInfoData)
    },
    removeUserInfo(state, userInfoList) {
        state.userInfoList = null;
        Cookies.remove('userInfoList', userInfoList)
    },
}

export default {
    namespace: true,
    state,
    getters,
    mutations
}