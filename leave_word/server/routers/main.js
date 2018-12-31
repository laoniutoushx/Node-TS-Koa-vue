const Router = require('koa-router');
const Models = require('../models');

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

module.exports = router;