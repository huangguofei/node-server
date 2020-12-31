//注册路由
const router = require('koa-router')({prefix: '/v1/article'});
const {Success} = require('../../../core/http-exception');
const {AddArticleVerify, LikeArticleValidator, DeleteArticleValidator} = require('../../validators/validator');
const {Article} = require('../../models/article');
const {Auth} = require('../../../middiewares/auth');
const {User} = require('../../models/user');
const {Favor} = require('../../models/favor');

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
    const v = await new LikeArticleValidator().validate(ctx, {
        id: 'articleId', //把articleId转为id验证
    });
    const type = v.get('query.type') || 0;

    if (!type) { //点赞操作
        console.log('点赞')
        await Favor.like(ctx.auth.uid, v.get('query.articleId'));
    } else { //取消点赞
        console.log('取消点赞')
        await Favor.dislike(ctx.auth.uid, v.get('query.articleId'));
    }
    throw new Success(); //抛出成功操作
});

//删除文章
router.get('/delete', new Auth().m, async ctx => {
    const v = await new DeleteArticleValidator().validate(ctx, {
        id: 'articleId', //把articleId转为id验证
    });
    await Article.deleteArticle(v.get('query.articleId'), ctx.auth.uid);
    throw new Success();
});

module.exports = router;
