const router = require('koa-router')();

router.get('/logins', (ctx, next) => {
    ctx.body = {name: 'hgf'}
});

module.export = router;
