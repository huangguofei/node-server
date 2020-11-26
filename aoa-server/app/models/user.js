//用户注册 models
const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');//重新命名一个 导入的属性或者方法 { name : newName}
const { sequelize } = require('../../core/db');
const { NotFound, AutoFailed } = require('../../core/http-exception');

class User extends Model {
    static async verifyPhonePassword(phone, password) { //验证手机号和密码
        const user = await User.findOne({
            where: {
                phone,
            }
        });

        if(!user) {
            throw new NotFound('用户不存在');
        }
        const correct = bcrypt.compareSync(password, user.password);
        if(!correct) {
            throw new AutoFailed('密码不正确');
        }
        return user;
    }

    static async VerifyOpenid(openid){

    }

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
        // defaultValue: '123456'
        set(val) {
            const salt = bcrypt.genSaltSync(10); //位数（越大越严密，越耗时）
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue('password', psw);
        }
    },
    openid: {
        type: Sequelize.STRING(64), //最大字符 64
        unique: true, //是否唯一
    },
}, {
    sequelize,
    //tableName: 'user', //表名
}); //传递实例

module.exports = {
    User
};

