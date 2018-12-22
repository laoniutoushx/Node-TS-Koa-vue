const koa = require('koa'); // 包装过的 http
const koaStaticCache = require('koa-static-cache');     // 静态路由解析
const Router = require('koa-router');       // npm i koa-router
const Swig = require('koa-swig');   // 模板引擎  npm i koa-swig     引入 co 模块 npm i co
const co = require('co');


/**
 * 初始化项目  npm init
 * 导入 npm i koa 模块
 */

// 创建 http 服务器， 监听请求
const app = new koa();

let users = [
    {username: 'mt'},
    {username: 'reci'},
    {username: 'kimoo'},
    {username: 'zMouse'}
];

app.use(koaStaticCache(__dirname + '/static', {
    prefix: '/public',
}));

// 动态路由
const router = new Router();
const uesrRouter = new Router();    // 子路由

// get 方式
uesrRouter.get('/', (ctx, next) => {
    console.info('hello');
    ctx.body = '用户首页';
});

uesrRouter.get('/list', (ctx, next) => {
    ctx.body = '用户列表</br><ul><li>haruhi</li><li>nagato</li></ul>';
})

router.use('/user', uesrRouter.routes());   

/**
 * 路由前缀
 */
const itemRouter = new Router({
    prefix: '/goods'
});
  
itemRouter.get('/:id', (ctx, next) => {
    console.info('item');
    //          /list/1?order=desc
    console.info(Router.url('/list', {page:1}, {query: {order: 'desc'}}));
    ctx.body = '添加物品：' + ctx.params.id;
});

/***
 * 路由重新定
 */
router.redirect('/admin', '/user', 301);

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

router.get('/list', (ctx, next) => {
    ctx.body = ctx.render('list.html');
});

// 将路由对象加载到 app 中
app.use(router.routes());
app.use(itemRouter.routes());

// 监听当前机器的地址，端口
app.listen(80);