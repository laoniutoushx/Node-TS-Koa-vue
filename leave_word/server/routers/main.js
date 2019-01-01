const Router = require('koa-router');
const Models = require('../models');
const md5 = require('md5');
const router = new Router();

router.get('/', async ctx => {

    // let data = await Models.Users.findAll();
    // let data = await Models.Users.findById(1, {
    //     include: {
    //         model: Models.Contents
    //     }
    // })
    let curPage = +(ctx.query.curPage || 1);
    let pageCount = +(ctx.query.pageCount || 3);

    let offset = (curPage - 1) * pageCount;
    let limit = pageCount;

    let data = await Models.Contents.findAndCountAll({
        limit: limit,
        offset: offset,
        include: {
            model: Models.Users
        }
    });

    let count = data.count;

    data = data.rows.map(d => {
        return {
            id: d.id,
            title: d.title,
            user_id: d.user_id,
            username: d.User.username,
            createdAt: d.createdAt,
            like_count: d.like_count,
            comment_count: d.comment_count,
        };
    });

    ctx.body = {
        code: true,
        data: data,
        count: count,
    };
});

router.post('/register', async ctx => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let repassword = ctx.request.body.repassword;

    console.info(ctx.request.body);

    if(!username || !password || !repassword){
        return ctx.body = {
            code: false,
            data: '用户名和密码异常'
        };
    }
    if(password != repassword){
        return ctx.body = {
            code: false,
            data: '密码不一致'
        }
    }

    let user = await Models.Users.findOne({
        where: {
            username
        }
    });

    console.info(JSON.stringify(user));

    if(user){
        return ctx.body = {
            code: false,
            data: '用户已存在'
        };
    }

    console.info(JSON.stringify(user));

    user = await Models.Users.build({
        username,
        password: md5(password),
    }).save();

    ctx.body = {
        code: true,
        data: user,
    };
});

router.post('/login', async ctx => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    console.info(ctx.request.body);

    if(!username || !password){
        return ctx.body = {
            code: false,
            data: '用户名和密码异常'
        };
    }

    let user = await Models.Users.findOne({
        where: {
            username,
            password: md5(password)
        }
    });

    console.info(JSON.stringify(user));

    if(user){
        // 设置 cookie
        ctx.cookies.set('uid', user.get('id'));
        return ctx.body = {
            code: true,
            data: user
        };
    } else {
        return ctx.body = {
            code: false,
            data: '登录失败'
        };
    }
})

module.exports = router;