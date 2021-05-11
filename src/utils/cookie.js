import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserInfoList = 'userInfoList'
const UserInfoData = 'userInfoData'
export function getToken() {
    return Cookies.get(TokenKey)
}
export function getUserInfo() {
    return Cookies.get(UserInfoList)
}
export function getUserInfoData() {
    return Cookies.get(UserInfoData)
}
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function removeUserInfo() {
    return Cookies.remove(userInfoList)
}
export function removeUserInfoData() {
    return Cookies.remove(UserInfoData)
}