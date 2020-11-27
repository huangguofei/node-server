//注册路由
const router = require('koa-router')({prefix: '/v1/article'});
const { Success } = require('../../../core/http-exception');
const { AddArticleVerify, LikeArticleValidator, DeleteArticleValidator } = require('../../validators/validator');
const { Article } = require('../../models/article');
const { Auth } = require('../../../middiewares/auth');
const { User } = require('../../models/user');
const { Favor } = require('../../models/favor');

//获取最新文章
router.post('/new', new Auth().m, async (ctx) => {
    const article = await Article.findOne({
        order: [
            ['id', 'DESC']
        ]
    });

    const user = await User.getUser(article.authorId);

    article.setDataValue('author', user || '暂无作者信息');

    ctx.body = article;
});

//添加文章
router.post('/add', new Auth().m, async ctx => {
    const v = await new AddArticleVerify().validate(ctx);
    const article = {
        title: v.get('body.title'),
        describe: v.get('body.describe'),
        content: v.get('body.content'),
    }

    await Article.create(article);
    throw new Success(); //抛出成功操作
});

//点赞or取消点赞
router.get('/like', new Auth().m, async ctx => {
    const v = await new LikeArticleValidator().validate(ctx);
    const result = await Favor.like(ctx.auth.uid, v.get('query.articleId'));
    ctx.body = result;
});

//删除文章
router.get('/delete', new Auth().m, async ctx => {
    const v = await new DeleteArticleValidator().validate(ctx);


});

module.exports = router;
