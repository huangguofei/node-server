const { Sequelize, Model } = require('sequelize');//重新命名一个 导入的属性或者方法 { name : newName}
const { sequelize } = require('../../core/db');
const { NotFound, AutoFailed }  = require('../../core/http-exception');

class Article extends Model{
    static async getArticle(id) {
        const article = await Article.findOne({
            where: {
                id,
            }
        });
        return article;
    }

    static async deleteArticle(articleId, uid) {
        const article = await Article.findOne({
            where: {
                id: articleId,
            }
        });
        if(!article) {
            throw new NotFound('该文章不存在！');
        }
        if(article.authorId != uid) {
            throw new AutoFailed('权限不足！');
        }

    }
}

Article.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //是否设置为主键
        allowNull: false, //不能为空
        autoIncrement: true, //是否自动增长
    },
    title: Sequelize.STRING(32),
    describe: Sequelize.STRING(64),
    content: Sequelize.STRING,
    favNum: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    authorId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },

}, {
    sequelize,
    tableName: 'article'
});

module.exports = {
    Article,
}
