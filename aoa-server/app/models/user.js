//用户注册
const { Sequelize, Model} = require('sequelize');//重新命名一个 导入的属性或者方法 { name : newName}
const { sequelize } = require('../../core/db');

class User extends Model {

}

User.init({
    id: { //主键, 自动增长ID
        type: Sequelize.INTEGER,
        primaryKey: true, //是否设置为主键
        allowNull: false, //不能为空
        autoIncrement: true, //是否自动增长
    },
    nickName: Sequelize.STRING, //定义数据库中字段类型,mysql 的一种类型
    phone: {
        type: Sequelize.STRING(64), //最大字符 64
        unique: true, //是否唯一
    },
    password: {
        type: Sequelize.STRING,
        defaultValue: '123456'
    },
    openid: {
        type: Sequelize.STRING(64), //最大字符 64
        unique: true, //是否唯一
    },
}, {
    sequelize,
    tableName: 'user'
}); //传递实例

module.exports = {
    User
};

