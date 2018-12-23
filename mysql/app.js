(async function(){
    const Koa = require('koa');
    const Static = require('koa-static-cache');
    const Router = require('koa-router');
    const mysql = require('mysql2/promise');
    const bodyparser = require('koa-bodyparser');

    const app = new Koa();
    const router = new Router();
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '2012',
        database: 'test',
    });

    app.use(bodyparser({

    }));

    app.use(Static({
        dir: __dirname + '/static',
        prefix: '/static',
        gzip: true,
    }));

    router.get('/todos', async ctx => {
        // ctx.body = [
        //     {id: 1, title: '学习 node', done: true},
        //     {id: 2, title: '学习 koa', done: false},
        //     {id: 3, title: '学习 数据库', done: false}
        // ];
        const [data] = await connection.query('SELECT id, title, done FROM TODOS');
        ctx.body = data;
    });

    router.post('/add', async ctx => {
        let title = ctx.request.body.title;
        console.info(title);
        const [rs] = await connection.query('INSERT INTO todos(title, done) VALUES(\'' + title + '\', 0)');
        if(rs.affectedRows > 0){
            console.info('success');
        }
        const [data] = await connection.query('SELECT id, title, done FROM TODOS');
        ctx.body = data;
    });

    router.post('/remove', async ctx => {
        let id = ctx.request.body.id;
        console.info(id);
        await connection.query('DELETE FROM TODOS WHERE id = ' + id);
        const [data] = await connection.query('SELECT id, title, done FROM TODOS');
        ctx.body = data;
    });

    app.use(router.routes());
    app.listen(80);
})();