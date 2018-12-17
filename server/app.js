// 后端入口文件
/**
 * web server
 *  提供 web 浏览器服务的工具
 */

 const http = require('http');

 const fs = require('fs');

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
    switch(req.url){
        case '/':
            staticSend(__dirname + '/static/index.html');
            break;
        case '/list':
            staticSend(__dirname + '/static/list.html');
            break;
        case '/view':
            staticSend(__dirname + '/static/view.html');
            break;
        case '/index.css':
            staticSend(__dirname + '/static/index.css', {
                'Content-Type': 'text/css;charset=utf-8'
            });
            break;
        default:
            staticSend(__dirname + '/static/404.html', {
                'Content-Type': 'text/html;charset=utf-8'
            }, 404);
            break;
    }

    function staticSend(filename, headers={'Content-Type': 'text/html;charset=utf-8'}, status = 200, ){
        resp.writeHead(status, http.STATUS_CODES[status], headers);
        content = fs.readFileSync(filename);
        resp.end(content);
    }
    
 });



 /**
  * 制定 app 监听端口以及网络
  */
 app.listen(80, '0.0.0.0', () => {
     console.info('服务器启动成功');
 });
