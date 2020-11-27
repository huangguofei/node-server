const { Sequelize, Model } = require('sequelize');//重新命名一个 导入的属性或者方法 { name : newName}
const { sequelize } = require('../../core/db');
const { LikeError, DisLikeError } = require('../../core/http-exception');
const { Article } = require('./article');

class Favor extends Model{
    //点赞
    static async like(uid, articleId) {
        //查询是否存在
        const favor = await Favor.findOne({
            where: {
                uid,
                articleId,
            }
        });
        if(favor) {
            throw new LikeError();
        }
        sequelize.transaction( async t => {
            const article = await Article.getArticle(articleId); //获取对应的文章信息
            await Favor.create({
                uid,
                articleId
            }, { transaction: t});

            await article.increment('favNum', {by: 1, transaction: t});
        });

    }
    //取消点赞
    static async dislike(uid, articleId) {

    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    articleId: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'favor',
});


module.exports = {
    Favor,
}
