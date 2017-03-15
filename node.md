## 模块机制

- require

```
require.__defineGetter__      require.__defineSetter__
require.__lookupGetter__      require.__lookupSetter__
require.__proto__             require.constructor
require.hasOwnProperty        require.isPrototypeOf
require.propertyIsEnumerable  require.toLocaleString
require.toString              require.valueOf

require.apply                 require.arguments
require.bind                  require.call
require.caller                require.length
require.name

require.cache                 require.extensions
require.main                  require.prototype
require.resolve
```

- module

```
module.__defineGetter__      module.__defineSetter__
module.__lookupGetter__      module.__lookupSetter__
module.__proto__             module.constructor
module.hasOwnProperty        module.isPrototypeOf
module.propertyIsEnumerable  module.toLocaleString
module.toString              module.valueOf

module._compile              module.load
module.require

module.children              module.exports
module.filename              module.id
module.loaded                module.parent
module.paths
```

## 队列

- setTimeout,setInterval 将callback放入事件队列中，在定时器条件下执行，但是有可能受到循环时间的影响（比如某次循环时间过长就会影响callback的执行）

- process.nextTick(callback) 将callback放入事件队列中，下次Tick循环时执行callbak，每次循环执行所有的callback

- setImmdiate(callback) 将callback放入事件队列，下次Tick循环时执行callback，callback执行优先级低于process.nextTick的callback，每次循环执行第一个callback然后直接进入下一次循环

## 事件

```javascript
var events = require('events');
var emitter = events.EventEmitter();

emitter.on('event',callback);
emitter.once('event',callback);
emitter.addListener('event',callback);
emitter.removeListener('event');
emitter.removeAllListeners('event');
emitter.emit('event','smg');

emitter.setMaxListeners(0); //去掉监听器超过10个的限制
```
- 雪崩问题
```javascript
var events = require('events');
var emitter = events.EventEmitter();

var status = 'ready';
var select = function(callback){
  emitter.once('selected',callback);
  if(status == 'ready'){
    db.select('SQL',function(res){
      emitter.emit('selected',res);
      status = 'ready';
    });
    status = 'padding';
  }
}
```
- Deferred原理
```javascript
var events = require('events');
var eventEmitter = events.EventEmitter();
//Promise继承eventEmitter
var Promise = function(){
  eventEmitter.call(this);
}
Promise.prototype.then = function(success,error){
  this.on('success',success);
  this.on('error',error);
}

var Deferred = function(task){
  this.count = 0;
  if(this.count == task.length){
    this.promise = new Promise();
  }
}
Deferred.prototype.resolve = function(res){
  this.count++;
  this.promise.emit('success',res);
}
Deferred.prototype.reject = function(error){
  this.promise.emit('error',error);
}

//使用Deferred
var dfd = new Deferred([
  fetch({
    url:'url',
    success:function(res){
      dfd.resolve(res);
    }
  }),
  fetch({
    url:'url',
    success:function(res){
      dfd.resolve(res);
    }
  })
]);

```
