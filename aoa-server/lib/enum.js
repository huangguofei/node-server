//常量

function isThisType(val) { //是否满足LoginType
    for(let key in this) {
        if(this[key] == val) {
            return true;
        }
    }
}

const LoginType = {
    USER_PHONE: 100, // 手机登录
    USER_EMAIL: 101, //邮箱登录
    ADMIN_EMAIL: 102,// 管理员邮件登录
    isThisType,
}

//权限类型
const AuthType = {
    USER: 8, //普通用户
    ADMIN: 16, //管理者
    SUPER_ADMIN: 32, //超级管理员
}

module.exports = {
    LoginType,
    AuthType
}
