

const dgram = require('dgram');

// 创建 socket 类
const server = dgram.createSocket('udp4');  // 对应 ipv4

server.on('listening', () => {
    console.info('服务器开启成功，等待数据：');
});

server.on('message', data => {
    console.info(data.toString());
});

// 监听 ip 段偶 port
server.bind(10032, '127.0.0.1');

console.info('server start')
