import Cookies from 'js-cookie'
const state = {
    visitedViews: [],
    token: '' //判断是否有 token
}

const getters = {
    visitedViews: (state, getters) => state.visitedViews
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
}

export default {
    namespace: true,
    state,
    getters,
    mutations
}