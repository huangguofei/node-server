//数据库操作

const Sequelize = require('sequelize');
const { dbName, host, port, user, password } = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true, //是否打印显示sql操作
    timezone: '+08:00', //时间操作默认为北京时间
    define: {
        timestamps: true, //表中是否自动加入create_time\update_time\delete_time 三个字段
        paranoid: true, // 软删除
        createdAt: 'created_at', // 把系统默认的created_time 重命名
        updatedAt: 'updated_at', // 把系统默认的updated_time 重命名
        deletedAt: 'deleted_at', // 把系统默认的deleted_time 重命名
        underscored: false, //
    }
});

sequelize.sync({ //异步 对数据库进行操作，创建表（已存在则不操作）
    force: true, //true: 创建表，已存在则先删除
});

module.exports = {
    sequelize
}
