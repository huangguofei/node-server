//全局异常处理 ---中间件
const {HttpException} = require('../core/http-exception');

const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        //区分生产环境（无需打印异常信息）和开发环境（终端打印未知异常信息）, 并且已知错误不抛出
        const isHttpException = error instanceof HttpException;
        const isDev = global.config.environment == 'dev';

        if(!isHttpException && isDev) {
            throw error;
        }

        if (error instanceof HttpException) { //处理已知异常
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`,
            };
            ctx.status = error.code;
        } else { //处理未知异常
            ctx.body = {
                msg: '这个是一个未知错误',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`,
            }
            ctx.status = 500;
        }
    }
}

module.exports = catchError;
