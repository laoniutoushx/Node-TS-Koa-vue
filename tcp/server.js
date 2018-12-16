
const net = require('net');
const fs = require('fs');

const server = net.createServer(() => {
    // 此函数 其实是 connection 绑定的函数
});

// 当有客户端连接的时候触发
server.on('connection', socket => {
    console.info('有人连接了');

    socket.on('data', data => {
        console.info('收到信息：' + data.toString());
        // socket.write('已收到');
        // 向客户端发送图片
        let file = fs.readFileSync('./serverImg/nodejs.png');
        console.info(file);
        socket.write(file);
        socket.end();   // 表示数据传输完毕
    })
});

// 监听地址及端口
server.listen(10032, '127.0.0.1');