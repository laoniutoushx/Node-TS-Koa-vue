const Koa = require('koa');
const Router = require('koa-router');
const Swig = require('koa-swig');
const koaStaticCache = require('koa-static-cache');
const co = require('co');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

/**
 * 处理静态文件
 */
app.use(koaStaticCache('./static', {
    prefix: '/static',
    gzip: true
}));

/**
 * 处理 post 请求数据
 */
app.use(bodyParser({

}));

const router = new Router();

/**
 * 存储所有的任务数据
 */
let datas = {
    appName: 'TodoList',
    tasks: [
        {id: 1, title: '测试任务一', done: true},
        {id: 2, title: '学习 Koa', done: false},
        {id: 3, title: '学习 sequelize', done: false}
    ]
};

// 设置模板引擎
app.context.render = co.wrap(Swig({
    root: __dirname + '/views',
    autoescape: true,   // 是否解析 html 编码
    cache: false,       // cache: 'momory',
    ext: '.html'
}));

/**
 * 首页，用户展示任务列表
 */
router.get('/', async ctx => {
    ctx.body = await ctx.render('index.html', {
        title: 'haruhi',
        datas,
    });
});

/**
 * 添加新的任务
 */
router.get('/add', async ctx => {
    ctx.body = await ctx.render('add.html', {
        title: '添加吧',
    })
});
router.post('/addtask', async ctx => {
    let title_1 = ctx.query.title;
    let title = ctx.request.body.title;
    if(!title){
        ctx.body = await ctx.render('add.html', {
            title: '请输入任务标题',
        });
        return;
    }

    console.info(title);
    console.info(title_1);
    datas.tasks.push({
        id: datas.tasks.length + 1,
        title: title,
        done: false
    });
    console.info(JSON.stringify(datas.tasks));
    ctx.redirect('/');

});

/**
 * 改变，修改任务的状态
 */
router.get('/change/:id', ctx => {
    let id = ctx.params.id;
    console.info(id);
    datas.tasks.forEach(task => {
        if(task.id == id){
            task.done = !task.done;
        }
    });
    ctx.redirect('/');
    // ctx.body = '/change/' + ctx.params.id;
});

/**
 * 删除任务
 */
router.get('/remove/:id', ctx => {
    let id = ctx.params.id;
    console.info(id);
    datas.tasks = datas.tasks.filter(task => task.id != id);
    ctx.redirect('/');
    // ctx.body = '/remove/' + ctx.params.id;
});

app.use(router.routes());

app.listen(80);