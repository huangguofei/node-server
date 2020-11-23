
const Koa = require('koa'); //导入koa  --commonJS导入
const parser = require('koa-bodyparser');
const catchError = require('./middiewares/exception');
const InitManager = require('./core/init')

require('./app/models/user');

const app = new Koa();

app.use(catchError);
app.use(parser());

InitManager.initCore(app); //初始化开始构建（自动化路由）

app.listen(7000); //启动服务

console.log('app started at port 7000');


// async 和 await 是保证程序按照洋葱模型运行
// await: 1、对后面进行取值； 2、阻塞代码进程(得到后面返回值才运行后面）
// async: 带有该标记的函数 返回值会带有promise

// app.use(async (ctx, next) => { //ctx: 上下文  、 next: 下一个中间件函数  洋葱模型
//     ctx.body = {name: 'hgf'};
//     await next(); //next 返回的是一个promise对象  await 会对promise进行转换取值（求值）
// });

//版本号携带策略：1、路由上新增，2、路由参数上新增，3、http头部的method里面携带




