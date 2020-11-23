
const router = require('koa-router')({prefix: '/v1'});
const { HttpException, ParameterException } = require('../../../core/http-exception');
const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');

router.post('/register', async (ctx) => {
    const v = new RegisterValidator().validate(ctx);
    const user = {
        phone: v.get('body.phone'),
        nickName: v.get('body.nickName'),
        password: v.get('body.nickName'),
    }
    User.create(user);

});


module.exports = router;
