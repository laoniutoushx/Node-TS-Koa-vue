const koa = require('koa'); // 包装过的 http
const koaStaticCache = require('koa-static-cache');     // 静态路由解析
const Router = require('koa-router');       // npm i koa-router
const Swig = require('koa-swig');   // 模板引擎  npm i koa-swig     引入 co 模块 npm i co
const co = require('co');


const router = new Router();

// 创建 http 服务器， 监听请求
const app = new koa();

let users = [
    {username: 'mt'},
    {username: 'reci'},
    {username: 'kimoo'},
    {username: 'zMouse'}
];


/**
 * koa-swig 模板引擎的使用
 * npm i koa-swig
 */
const render = Swig({
    root: __dirname + '/views',      // 模板文件目录
    autoescape: true,
    cache: false,
    ext: '.html'
});
app.context.render = co.wrap(render);

router.get('/list', async (ctx, next) => {
    ctx.body = await ctx.render('list.html', {
        users: users,
    });
});

// 将路由对象加载到 app 中
app.use(router.routes());

// 监听当前机器的地址，端口
app.listen(80);