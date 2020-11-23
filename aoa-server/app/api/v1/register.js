const router = require('koa-router')({prefix: '/v1'});
const { HttpException, ParameterException } = require('../../../core/http-exception');
const { RegisterValidator } = require('../../validators/validator');

router.post('/register', async (ctx) => {
    const v = new RegisterValidator(ctx);


});
