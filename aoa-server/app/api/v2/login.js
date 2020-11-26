const router = require('koa-router')();

router.get('/logins', async (ctx, next) => {
    ctx.body = {name: 'hgf'}
});

module.export = router;
