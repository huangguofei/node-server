const {LinValidator, Rule} = require('../../core/lin-validator');

class PositiveIntegerValidater extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '需要是正整数', {min: 1}),// 一个规则限制 ， 数组内为 同时满足
    ]
    }
}

class RegisterValidator extends LinValidator{
    constructor(props) {
        super(props);
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
        this._password = this.password;

    }

    validatePassword(vals) { //自定义验证
        const {password, _password} = vals.body;
        if(password !== _password) {
            throw new Error('两个密码不相同');
        }
    }

}


module.exports = {
    PositiveIntegerValidater,
    RegisterValidator,
}
