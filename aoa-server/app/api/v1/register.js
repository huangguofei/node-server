//注册路由
const router = require('koa-router')({prefix: '/v1'});
const { Success } = require('../../../core/http-exception');
const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');

router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx); //参数校验
    const user = {
        phone: v.get('body.phone'),
        nickName: v.get('body.nickName'),
        password: v.get('body.password'),
    };

    await User.create(user); //创建表,并返回一个promise对象
    throw new Success(); //抛出成功操作
});


module.exports = router;
