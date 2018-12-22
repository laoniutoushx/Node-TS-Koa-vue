const koa = require('koa'); // 包装过的 http
const koaStaticCache = require('koa-static-cache');     // 静态路由解析

/**
 * 初始化项目  npm init
 * 导入 npm i koa 模块
 */

// 创建 http 服务器， 监听请求
const app = new koa();

// 监听当前机器的地址，端口
app.listen(80);

/***
 * 静态资源路由
 * 安装 koa-static-cache
 * npm i koa-static-cache
 */

app.use( koaStaticCache(__dirname + '/static', {
    //root: __dirname + '/static',    // 服务器上存放静态资源的目录
    prefix: '/public',                // 请求的前缀
}) );    // 主要请求通过 koaStaticCahce 来处理

app.use((ctx, next) => {
    // 其他业务逻辑
});