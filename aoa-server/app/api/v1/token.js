const router = require('koa-router')({prefix: '/v1'});
const {TokenValidator, VerifyToken} = require('../../validators/validator');
const {LoginType} = require('../../../lib/enum');
const {Success, ParameterException} = require('../../../core/http-exception');
const { generateToken } = require('../../../core/util');
const { User } = require('../../models/user');
const { AuthType } = require('../../../lib/enum');
const { Auth } = require('../../../middiewares/auth');

router.post('/token', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    const account = v.get('body.account');
    const secret = v.get('body.secret');
    const type = parseInt(v.get('body.type'));
    let token;
    switch (type) {
        case LoginType.USER_PHONE:
            token = await phoneLogin(account, secret, 1);
            break;
        case LoginType.USER_EMAIL:
            break;
        default:
            throw new ParameterException('没有相应操作函数')
    }
    ctx.body = token;
    // throw new Success();
});

router.post('/verify', async ctx => {
    const v = await new VerifyToken().validate(ctx);
    const result = Auth.verifyToken(v.get('body.token'));
    ctx.body = {
        result
    }
});

//手机登录
async function phoneLogin(account, secret) {
    const user = await User.verifyPhonePassword(account, secret);
    return generateToken(user.id, AuthType.USER);
}

module.exports = router;
