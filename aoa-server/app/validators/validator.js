const {LinValidator, Rule} = require('../../core/lin-validator');
const {User} = require('../models/user');
const {LoginType} = require('../../lib/enum');

class PositiveIntegerValidater extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '需要是正整数', {min: 1}),// 一个规则限制 ， 数组内为 同时满足
        ]
    }
}

//注册参数校验
class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.phone = [
            new Rule('isMobilePhone', '手机格式错误', 'zh-CN')
        ]
        this.nickName = [
            new Rule('isLength', '昵称长度不对', {
                min: 3,
                max: 8
            })
        ]
        this.password = [
            new Rule('isLength', '密码长度在6-32之间', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码格式错误', '^[0-9]'),
        ]
        this._password = this.password; //规则复用

    }

    validatePassword(vals) { //自定义验证
        const {password, _password} = vals.body;
        if (password !== _password) {
            throw new Error('两个密码不相同'); //抛出异常
        }
    }

    async validatePhone(vals) { //手机号唯一验证
        const {phone} = vals.body;
        const user = await User.findOne({ //查询phone
            where: {
                phone,
            }
        });
        if (user) {
            throw  new Error('手机号已经存在！');
        }
    }
}

//登录验证
class TokenValidator extends LinValidator {
    constructor() {
        super();
        this.account = [
            new Rule('isLength', '账号长度不正确', {
                min: 4,
                max: 32,
            }),
        ];
        this.secret = [
            new Rule('isOptional'), //可以为空，可以不为空（必须满足后面的规则）
            new Rule('isLength', '密码长度不正确', {
                min: 6,
                max: 128,
            }),
        ];
    }

    //登录类型判断
    validateLoginType(vals) {
        const {type} = vals.body;
        if (!type) {
            throw new Error('type不能为空！');
        }
        if (!LoginType.isThisType(type)) {
            throw new Error('type不正确！');
        }
    }
}

//token验证
class VerifyToken extends LinValidator {
    constructor() {
        super();
        this.token = [new Rule('isLength', 'token不能为空', {min: 1})]
    }
}

//添加文章参数验证
class AddArticleVerify extends LinValidator{
    constructor() {
        super();
        this.title = [new Rule('isLength', '标题字数在12个字以内', {
            min: 1,
            max: 12,
        })]
        this.describe = [new Rule('isLength', '描述字数在80个字以内', {
            min: 1,
            max: 80,
        })]
        this.content = [new Rule('isLength', '描述字数在500个字以内', {
            min: 1,
            max: 500,
        })]
    }

}

//点赞文章验证
class LikeArticleValidator extends LinValidator{
    constructor() {
        super();
        this.articleId = [
            new Rule('isInt', '需要是正整数', {min: 1}),
        ]
    }
}

//删除文章验证
class DeleteArticleValidator extends LikeArticleValidator{
    constructor() {
        super();
        this.articleId = [
            new Rule('isInt', '需要是正整数', {min: 1}),
        ]
    }
}


module.exports = {
    PositiveIntegerValidater,
    RegisterValidator,
    TokenValidator,
    VerifyToken,
    AddArticleVerify,
    LikeArticleValidator,
    DeleteArticleValidator,
}
