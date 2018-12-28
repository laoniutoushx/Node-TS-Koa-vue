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
        let curPage = ctx.query.curPage || 1;       // ?haruhi=lsdjf&lj=12
        let curPageSize = ctx.query.curPageSize || 3;
        let type = ctx.query.type;
        let sql = ` FROM TODOS  `;
        let sql_where = '';
        if(type !== ''){
            sql_where = ' WHERE done = \'' + type + '\' ';
            sql += sql_where;
        }
        sql += ' ORDER BY id DESC ';

        console.info('SELECT id, title, done ' + sql +  ` LIMIT ${curPageSize} OFFSET ${(curPage-1)*curPageSize} `);
        const [data] = await connection.query(
            'SELECT id, title, done ' + sql +  ` LIMIT ${curPageSize} OFFSET ${(curPage-1)*curPageSize} `);

        // 查询总记录数
        const [dataAll] = (await connection.query('SELECT id, title, done ' + sql));

        let pages = Math.ceil(dataAll.length / curPageSize);

        ctx.body = {
            data,
            curPage,
            curPageSize,
            pages,
        };
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

    router.post('/update', async ctx => {
        let id = ctx.request.body.id;
        let done = ctx.request.body.done;
        if(done){
            done = '1';
        }else{
            done = '0';
        }
        console.info(id);
        await connection.query('UPDATE TODOS SET ??=? WHERE ??=?', ['done', done, 'id', id]);
        ctx.body = {code: '0000'};
    });

    app.use(router.routes());
    app.listen(80);
})();