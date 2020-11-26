// 令牌权限检查中间件
const BasicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { Forbbiden } = require('../core/http-exception');

class Auth {
    constructor(level) { //level: api级别
        this.level = level || 1;
    }
    get m() { //获取token(token通过header、body传递）
        return async (ctx, next) => {
            const token = BasicAuth(ctx.req);
            let errMsg = 'token不合法';

            if(!token || !token.name) {
                throw new Forbbiden(errMsg);
            }
            try{
                var decode = jwt.verify(token.name, global.config.security.secretKey); //校验token的合法性
            } catch (error) {
                //token过期或者token不合法
                if(error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期';
                }
                throw new Forbbiden(errMsg); //抛出异常
            }

            if(decode.scope < this.level) {
                throw new Forbbiden('权限不足');
            }

            //共享uid和scope
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next();
        }
    }
    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey);
            return true
        } catch (e) {
            return false;
        }
    }
}

module.exports = {
    Auth
};
