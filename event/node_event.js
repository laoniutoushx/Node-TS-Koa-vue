// 引入 node 默认事件对象
const EventEmmitter = require('events');

function Person(name){
    EventEmmitter.call(this);
    this.name = name;
    this.age = 0;
    this.growup = function(){
        setInterval(() => {
            this.age++;
            this.emit('growup');    // 触发事件
        }, 1000);
    }
}

// Person.prototype = new EventEmmitter();
// Person.prototype.constructor = Person;
Person.prototype = Object(EventEmmitter.prototype);
Person.prototype.constructor = Person;

var p1 = new Person('haurhi');
p1.addListener('growup', function(){
    console.info('长大了一岁:' + this.age);
});

p1.growup();