const net = require('net');
const fs = require('fs');

const client = net.createConnection(10032, '127.0.0.1', function(){
    console.info('连接成功');
});

var img;

client.on('data', data => {
    //console.info('服务端返回信息：' + data);
    img += data;
});

client.on('end', data => {      // 数据传输完成触发
    console.info(img);
    fs.writeFile('./clientImg/nodejs.png', img, err => {
        if(err){
            throw err;
        }
        console.info('The file has bean saved!');
    });
});

client.write('Hello World!!!');