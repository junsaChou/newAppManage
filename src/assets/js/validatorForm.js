// 数字
// const numberReg = /^\d+$|^\d+[.]?\d{0,2}$/
const numberReg = /^[0-9]{1,2}$/
    //满减金额验证
const numberMaxReg = /^[0-9]{1,5}$/
    //充值金额验证
const numberCzMaxReg = /^[0-9]{1,6}$/
    // 中文
const cnReg = /^[\u4e00-\u9fa5]+$/
    //userNamr
const userName = /^[\u4e00-\u9fa5]{2,10}$/
    //couponTitle 优惠券名称
const couponTitle = /^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/
    //用户账号  英文数字
const NumbetAcReg = /^[A-Za-z0-9]{2,16}$/
    //中文数字字母大小写
const cnNumberAcReg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
    //
    //合法url 验证
const urlrReg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    // 邮箱
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    // 手机号
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    //isurl
const isurl = /^(?:[\w-\.]{0,255})(?:(?:\/?[^\s]{0,255}){0,255})/g //^http[s]?:\/\/.*/

export default {
    // 数字验证
    validateNumber: function(rule, value, callback) {
        if (!numberReg.test(value)) {
            callback(new Error('请输入数字'))
        } else {
            callback()
        }
    },
    //numberMaxReg
    validateNumberMaxReg: function(rule, value, callback) {
        if (!numberMaxReg.test(value)) {
            callback(new Error('请输入最大五位数字'))
        } else {
            callback()
        }
    },
    //WithAmount //满减额度
    validateWithAmount: function(rule, value, callback) {
        if (!numberMaxReg.test(value)) {
            callback(new Error('请输入最大五位数字'))
        } else {
            callback()
        }
    },
    //充值金额
    validateNumberCzMaxReg: function(rule, value, callback) {
        if (!numberCzMaxReg.test(value)) {
            callback(new Error('请输入最大6位数字'))
        } else {
            callback()
        }
    },
    //英文数字  用户验证
    validateNumbetAcReg: function(rule, value, callback) {
        if (!NumbetAcReg.test(value)) {
            callback(new Error('请输入英文与数字的格式'))
        } else {
            callback()
        }
    },
    //姓名验证 10位数
    validateUserName: function(rule, value, callback) {
        if (!userName.test(value)) {
            callback(new Error("请输入中文"));
        } else {
            callback()
        }
    },
    //优惠券名称验证 16位数
    validateCouponTitle: function(rule, value, callback) {
        if (!couponTitle.test(value)) {
            callback(new Error("请输入16位以内标题"));
        } else {
            callback()
        }
    },
    // 中文验证
    validateCn: function(rule, value, callback) {
        if (!cnReg.test(value)) {
            callback(new Error("请输入中文"));
        } else {
            callback()
        }
    },
    // 邮箱验证
    validateEmail: function(rule, value, callback) {
        if (!emailReg.test(value)) {
            callback(new Error('请输入正确的邮箱'))
        } else {
            callback()
        }
    },
    // 电话验证
    validatePhone: function(rule, value, callback) {
        if (!phoneReg.test(value)) {
            callback(new Error('请输入正确的手机号码'))
        } else {
            callback()
        }
    },
    //合法url验证
    validateUrl: function(rule, value, callback) {
        if (!urlrReg.test(value)) {
            callback(new Error('请输入正确url格式'))
        } else {
            callback()
        }
    },
    //url验证
    validateIsUrl: function(rule, value, callback) {
        if (!cnNumberAcReg.test(value)) {
            callback(new Error('请输入正确url格式'))
        } else {
            callback()
        }
    },
    //中文数字字母组合
    validateNumberAcCn: function(rule, value, callback) {
        if (!cnNumberAcReg.test(value)) {
            callback(new Error('请输入中文数字字母的格式'))
        } else {
            callback()
        }
    },
    // n*70 70取余
    validateDivide70: function(rule, value, callback) {
        if (value % 70 != 0) {
            callback(new Error('请输入70的倍数'))
        } else {
            callback()
        }
    }
}