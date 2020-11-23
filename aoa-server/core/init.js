const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
    static initCore (app) {
        InitManager.app = app; //存储app
        InitManager.InitLoadRouters(); //启动路由自动加载注册
        InitManager.LoadConfig(); //加载配置文件
    }
    static InitLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`; // 获取绝对路径
        //路由自动加载
        requireDirectory(module, apiDirectory, {visit: whenloadModule});

        function whenloadModule(obj) { //循环注册路由
            if(obj instanceof Router) {
                InitManager.app.use(obj.routes());
            }
        }
    }
    static LoadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js';
        const config = require(configPath);
        global.config = config;
    }
}
module.exports = InitManager;
