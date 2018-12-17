// 后端入口文件
/**
 * web server
 *  提供 web 浏览器服务的工具
 */

 const http = require('http');

 /**
  * 创建 http 服务器
  */
 const app = http.createServer((req, resp) => {
     // 用户请求时触发的函数
     console.info('有人请求了');

    //  console.log(req.httpVersion);
    //  console.log(req.method);
    //  console.log(req.headers);
    //  console.log(req.url);

    // 向客户端发送数据
    // console.log(req.url);

    /**
     * 设置并写入头信息
     * resp.writeHead(状态码，状态描述码，头信息)
     * 设置头信息
     * resp.setHeader();
     * 
     * 头信息设置的时候需要注意的问题
     */

    
    resp.writeHead(200, http.STATUS_CODES[200], {
        'Content-Type': 'text/html;charset=utf-8'
    });
    switch(req.url){
        case '/':
            resp.end(`
<html>
    <head>
        <link rel="stylesheet" href="/index.css" />
    </head>
    <body>
        <h1>首页</h1>
    </body>
</html>
            `);
            break;
        case '/list':
            resp.end('列表页面');
            break;
        case '/index.css':
            resp.writeHead(404, http.STATUS_CODES[404], {
                'Content-Type': 'text/css;charset=utf-8'
            });
            resp.end('body { color: red}');
            break;
        case '/view':
            resp.end('内容页面');
            break;
        default:
            resp.writeHead(404, http.STATUS_CODES[404], {
                'Content-Type': 'text/html;charset=utf-8'
            });
            resp.end('页面不存在');
    }

    
 });



 /**
  * 制定 app 监听端口以及网络
  */
 app.listen(80, '0.0.0.0', () => {
     console.info('服务器启动成功');
 });
