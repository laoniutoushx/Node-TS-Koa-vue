const EventEmitter = require('events');

// 用 ES6 定义类


class Person extends EventEmitter{
    constructor(name){
        super();
        
        this.name = name;
        this.age = 0;

        this.growup();
    }

    growup(){
        setInterval(() => {
            this.age++;
            this.emit('growup');         // trigger event
        }, 1000);
    }
}

const p1 = new Person('haruhi');

p1.addListener('growup', function(){
    console.info(this.name + ' grow up:' + this.age);
});