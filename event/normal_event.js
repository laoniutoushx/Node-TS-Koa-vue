function Event(event, callback){
    this.event_list = {

    };

}

// node 事件

// 模拟一个事件

function Person(name){
    let event_list = {
        
    };


    this.name = name;
    this.age = 0;
    this.grow_up = function(){
        setInterval(() => {
            this.age++;
            event_list['growup'] && event_list['growup'].apply(this);
        }, 1000);
    }
    this.get_age = function(){
        return this.age;
    }

    this.addEventListener = function(event, callback){
        
        if(event === 'growup'){
            event_list[event] = callback;
        }
    }
}



var p = new Person('haruhi');
p.grow_up();

p.addEventListener('growup', function(){
    console.info(this.age);
});

