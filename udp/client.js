const dgram = require('dgram');

const client = dgram.createSocket('udp4');

client.send('hello world!', 10032, '127.0.0.1');