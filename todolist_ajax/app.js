// npm i koa koa-static-cache koa-bodyparser koa-router co
//  npm install supervisor -g
const koa = require('koa');
const staticCache = require('koa-static-cache');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const co = require('co');

const app = new koa();

// body 解析
app.use(bodyparser({

}));

let datas = {
    todos: [
        {id: 1, title: '学习 node', done: true},
        {id: 2, title: '学习 koa', done: false},
        {id: 3, title: '学习 数据库', done: false}
    ]
};

// 静态文件托管
app.use(staticCache(__dirname + '/static', {
    prefix: '/static',
    gzip: true,
}));

const router = new Router();
router.get('/', async ctx => {
    ctx.body = 'hello';
});

router.get('/todos', ctx => {
    ctx.body = datas.todos;
});

router.post('/add', async ctx => {
    let title = ctx.request.body.title;
    let todo = {
        id: datas.todos.length + 1,
        title,
        done: false
    };
    datas.todos.push(todo);
    ctx.body = todo;
});

router.post('/toggle', async ctx => {
    let id = ctx.request.body.id || 0;

    if(!id){
        throw new Error('一场');
        return;
    }

    let todo = datas.todos.find(todo => todo.id == id);
    todo.done = !todo.done;

    ctx.body = todo;
});

router.post('/remove', async ctx => {
    let id = ctx.request.body.id || 0;

    if(!id){
        throw new Error('一场');
        return;
    }

    let result = datas.todos.find(todo => todo.id == id);
    datas.todos = datas.todos.filter(todo => todo.id != id);
    ctx.body = result;
});

app.use(router.routes());
app.listen(80);