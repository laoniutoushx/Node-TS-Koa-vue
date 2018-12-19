// 后端入口文件
/**
 * web server
 *  提供 web 浏览器服务的工具
 */

 const http = require('http');

 const fs = require('fs');
 const Mime = require('./libs/MIME');


console.info(Mime.getType('txt'));        // text/plain
console.info(Mime.getType('html'));       // text/html
console.info(Mime.getExtension('text/html')); // ['html', 'htm']


let users = [
    {
        name: 'haruhi',
        gender: '女',
        skills: ['产品', '设计', '程序', '运维', '客服', '前台', '行政']
    },
    {
        name: 'nagato',
        gender: '男',
        skills: ['烹饪', '门卫', '保安']
    },
    {
        name: 'lulu',
        gender: '男',
        skills: ['招财']
    }
]

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
    if(req.url.startsWith('/static')){
        staticSend(__dirname + req.url);
    }else{
        // 动态地址
        switch(req.url){
            case '/user':
                resp.setHeader('Content-type', 'application/json;charset=utf-8');

                let data = users.map(user => user.name);

                resp.end(JSON.stringify(data));
                break;
        }
    }


    // switch(req.url){
        
    //     default:
    //         staticSend(__dirname + '/static/404.html', {
    //             'Content-Type': 'text/html;charset=utf-8'
    //         }, 404);
    //         break;
    // }

    function staticSend(filename, headers={'Content-Type': 'text/html;charset=utf-8'}, status = 200, ){
        if(fs.existsSync(filename)){
            // 获取文件名后缀
            let ext = filename.substring(filename.lastIndexOf('.') + 1);

            headers["Content-Type"] = Mime.getType(ext);

            resp.writeHead(status, http.STATUS_CODES[status], headers);
            content = fs.readFileSync(filename);
            resp.end(content);
        }else{
            resp.writeHead(404, http.STATUS_CODES[404], headers);
            content = fs.readFileSync(__dirname + '/static/404.html');
            resp.end(content);
        }

        
    }
    
 });



 /**
  * 制定 app 监听端口以及网络
  */
 app.listen(80, '0.0.0.0', () => {
     console.info('服务器启动成功');
 });
