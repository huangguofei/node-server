//重写error, 再新增各种错误类型class

class HttpException extends Error {
    constructor(msg = '服务器错误', errorCode = 10000, code = 400) {
        super();
        this.errorCode = errorCode;
        this.code = code;
        this.msg = msg;
    }
}

//参数错误类
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 10000;
    }
}

//资源未找到
class NotFound extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.code = 404;
        this.msg = msg || '资源未找到';
        this.errorCode = errorCode || 10000;
    }
}

//授权失败
class AutoFailed extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.code = 401;
        this.msg = msg || '授权失败';
        this.errorCode = errorCode || 10004;
    }
}

//禁止访问
class Forbbiden extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.code = 403;
        this.msg = msg || '禁止访问';
        this.errorCode = errorCode || 10006;
    }
}

//已点过赞
class LikeError extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || '您已经点过赞了';
        this.errorCode = errorCode || 60001;
    }
}

//已取消点赞
class DisLikeError extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || '您已经取消点赞了';
        this.errorCode = errorCode || 60002;
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 201;
        this.msg = msg || 'ok';
        this.errorCode = errorCode || 0;
    }

}

module.exports = {
    HttpException,
    ParameterException,
    NotFound,
    AutoFailed,
    Forbbiden,
    LikeError,
    DisLikeError,



    Success,
};
