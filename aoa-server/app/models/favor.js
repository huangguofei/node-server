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
        //事务
        return sequelize.transaction( async t => {
            const article = await Article.getArticle(articleId); //获取对应的文章信息
            await Favor.create({
                uid,
                articleId
            }, { transaction: t});

            //增1  by: 增加多少
            await article.increment('favNum', {by: 1, transaction: t});
        });

    }
    //取消点赞
    static async dislike(uid, articleId) {
        //查询是否存在
        const favor = await Favor.findOne({
            where: {
                uid,
                articleId,
            }
        });

        if(!favor) {
            throw new DisLikeError();
        }
        const article = await Article.getArticle(articleId); //获取对应的文章信息
        return sequelize.transaction( async t => { //数据库事务处理
            await favor.destroy({
                force: true, //false是软删除(数据依旧在，只是detele_time会显示时间)， true 是物理删除
                transaction: t, // 事务处理
            });
            await article.decrement('favNum', {by: 1, transaction: t});
        });
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
