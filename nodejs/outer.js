
// 导入模块为文件夹时，引入文件夹模块，自动找文件夹下 名为 index.js 的文件

let m1 = require('./m1')

console.info(m1);


// 如果导入模块为 node_modules 下模块， 有另外的规则
// let m2 = require('./node_modules/m2');
let m2 = require('m2');
console.info(m2);       // 直接引用  node_modules 下的模块包

let fs = require("fs");
