
const router = require('koa-router')({prefix: '/v1'});
const { HttpException, ParameterException } = require('../../../core/http-exception');
const { PositiveIntegerValidater } = require('../../validators/validator');
const { Auth } = require('../../../middiewares/auth');
const { AuthType } = require('../../../lib/enum');

router.get('/code', new Auth(AuthType.USER).m, async (ctx, next) => {
    ctx.body = ctx.auth.uid;
});

router.post('/:id/login', async (ctx, next) => {
    const path = ctx.param;
    const query = ctx.request.query;
    const headers = ctx.request.header;
    const body = ctx.request.body;
    const v = await new PositiveIntegerValidater().validate(ctx);

    ctx.body = {name: 'v1-login', path, query, headers, body};

    //异常监听处理
    // const error = new ParameterException('名称不能为空', 10001);
    // throw error;
});

module.exports = router;
