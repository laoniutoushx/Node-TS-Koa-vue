const koa = require('koa'); // 包装过的 http

// 创建 http 服务器， 监听请求
const app = new koa();

// 监听当前机器的地址，端口
app.listen(80);

// 注册中间件
// app.use((ctx, next) => {
//     ctx.body = '<strong>Hello Koa';
//     next();
// });

// // 支持异步调用
// app.use(async (ctx, next) => {
//     console.info(2);
//     ctx.body += ' Nagato</strong>'

//     // await db.findTitle();   
// });

app.use((ctx, next) => {

    // throw new Error();

    let n = Math.random();
    // ctx.n = n;      // 不推荐
    ctx.state.n = n;    // 自定义对象存在 state
    ctx.throw(404, '页面没了');
    next();
});

app.use((ctx, next) => {

    console.info(ctx.state.n);
    

});

app.on('error', err => {
    console.info('错了', err);
});
