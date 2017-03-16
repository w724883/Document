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
- Deferred原理(大概就是这样的)
```javascript
var events = require('events');
var fetch = require('fetch');
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

## 参数传递
- 按值传递

number,string,boolean等都是按值传递

```javascript
var a = 1;
function aa(a){
  a = 2;
  console.log(a);//a
}
aa(a);
console.log(a);//1
```
- 引用传递

object是按引用传递

```javascript
var a = {b: 1};
function aa(a){
  a.b = 2;
  console.log(a);//{b: 2}
}
aa(a);
console.log(a);//{b: 2}
```

- 实参和形参

```javascript
var a = 1;
function aa(a){
  //a是形参
  console.log(a);//undefined
  a = 3;
  arguments[0] = 2;//arguments是实参的集合
  console.log(a);//3
}
aa();//如果有参数，这个参数是实参
```

## 流程控制
- next()
```javascript
var express = require('express');
var app = express();

app.use(中间件1);
app.use(中间件2);
app.use(中间件3);

```
中间件注册并执行，通过next()将控制权交给下一个中间件执行
- async
串行
```javascript
async.serise([task1(callback),task2(callback)],function(error,res){
  console.log(res);//[callback1,callback2]
})
```

并行
```javascript
async.parallel([task1(callback),task2(callback)],function(error,res){
  console.log(res);//[callback1,callback2]
})
```
限制并行
```javascript
//最多并行执行两个任务
async.parallelLimit([task1(callback),task2(callback)],2,function(error,res){
  console.log(res);//[callback1,callback2]
})
```

依赖串行
```javascript
async.waterfall([task1(callback),task2(arg,callback)],function(error,res){
  console.log(res);//callback2
})
```

自动串行
```javascript
var dep = {
  task1:function(callback){},
  task2:function(callback){},
}
async.auto(dep);//以最佳顺序执行串行
```
- Bigpipe

```javascript
var Bigpipe = require('bigpipe');
var bigpipe = new Bigpipe(num,{
  refuse:true,//实时返回
  timeout:500//超时时间
});

bigpipe.push(task,callback) //推送任务
bigpipe.on('full',function(len){}) //任务超过num触发回调
```
## 内存

`node --prof a.js`V8执行时的性能分析数据

`linux-tick-processor v8.log`查看日志工具（linux-tick-processor在deps/v8/tools下）\

```
> process.memoryUsage() //查看进程内存的使用情况
{ rss: 9261056,//常驻内存
heapTotal: 10481664,//申请的内存总量
heapUsed: 7326336 }//目前使用的内存量
```
```
> os
{ hostname: [Function: getHostname],
  loadavg: [Function: getLoadAvg],
  uptime: [Function: getUptime],
  freemem: [Function: getFreeMem],
  totalmem: [Function: getTotalMem],
  cpus: [Function: getCPUs],
  type: [Function: getOSType],
  release: [Function: getOSRelease],
  networkInterfaces: [Function: getInterfaceAddresses],
  homedir: [Function: getHomeDirectory],
  userInfo: [Function: getUserInfo],
  arch: [Function],
  platform: [Function],
  tmpdir: [Function],
  tmpDir: [Function],
  getNetworkInterfaces: [Function: deprecated],
  EOL: '\r\n',
  endianness: [Function] }
  ```
作用域：全局，局部（function,with），es6的块作用域

垃圾回收：声明函数时会建立一个作用域，函数内声明变量会挂在该作用域下，函数执行结束后作用域销毁，局部变量失效，其引用对象将在下次垃圾回收时被释放，主动回收内存包括delete操作、给变量赋值null/undefined
- 内存泄漏
原因：缓存、队列处理不及时（堆积）、作用域未释放

解决：添加缓存限制策略，使用释放内存方法定期释放内存，建议不要将内存做为大量缓存的途径，进程无法共用内存可将缓存放在进程外如redis


## Buffer
Buffer的属性有
```
Buffer.__defineGetter__      Buffer.__defineSetter__
Buffer.__lookupGetter__      Buffer.__lookupSetter__
Buffer.__proto__             Buffer.constructor
Buffer.hasOwnProperty        Buffer.isPrototypeOf
Buffer.propertyIsEnumerable  Buffer.toLocaleString
Buffer.toString              Buffer.valueOf

Buffer.apply                 Buffer.arguments
Buffer.bind                  Buffer.call
Buffer.caller                Buffer.length
Buffer.name

Buffer.from                  Buffer.of
Buffer.prototype

Buffer.BYTES_PER_ELEMENT

Buffer.alloc                 Buffer.allocUnsafe
Buffer.allocUnsafeSlow       Buffer.byteLength
Buffer.compare               Buffer.concat
Buffer.isBuffer              Buffer.isEncoding
Buffer.poolSize
```
Buffer.prototype原型链上有
```
Buffer {
  asciiSlice: [Function: asciiSlice],
  base64Slice: [Function: base64Slice],
  binarySlice: [Function: binarySlice],
  hexSlice: [Function: hexSlice],
  ucs2Slice: [Function: ucs2Slice],
  utf8Slice: [Function: utf8Slice],
  asciiWrite: [Function: asciiWrite],
  base64Write: [Function: base64Write],
  binaryWrite: [Function: binaryWrite],
  hexWrite: [Function: hexWrite],
  ucs2Write: [Function: ucs2Write],
  utf8Write: [Function: utf8Write],
  copy: [Function: copy],
  swap16: [Function: swap16],
  swap32: [Function: swap32],
  parent: [Getter],
  offset: [Getter],
  toString: [Function],
  equals: [Function: equals],
  inspect: [Function: inspect],
  compare: [Function: compare],
  indexOf: [Function: indexOf],
  lastIndexOf: [Function: lastIndexOf],
  includes: [Function: includes],
  fill: [Function: fill],
  write: [Function],
  toJSON: [Function],
  slice: [Function: slice],
  readUIntLE: [Function],
  readUIntBE: [Function],
  readUInt8: [Function],
  readUInt16LE: [Function],
  readUInt16BE: [Function],
  readUInt32LE: [Function],
  readUInt32BE: [Function],
  readIntLE: [Function],
  readIntBE: [Function],
  readInt8: [Function],
  readInt16LE: [Function],
  readInt16BE: [Function],
  readInt32LE: [Function],
  readInt32BE: [Function],
  readFloatLE: [Function: readFloatLE],
  readFloatBE: [Function: readFloatBE],
  readDoubleLE: [Function: readDoubleLE],
  readDoubleBE: [Function: readDoubleBE],
  writeUIntLE: [Function],
  writeUIntBE: [Function],
  writeUInt8: [Function],
  writeUInt16LE: [Function],
  writeUInt16BE: [Function],
  writeUInt32LE: [Function],
  writeUInt32BE: [Function],
  writeIntLE: [Function],
  writeIntBE: [Function],
  writeInt8: [Function],
  writeInt16LE: [Function],
  writeInt16BE: [Function],
  writeInt32LE: [Function],
  writeInt32BE: [Function],
  writeFloatLE: [Function: writeFloatLE],
  writeFloatBE: [Function: writeFloatBE],
  writeDoubleLE: [Function: writeDoubleLE],
  writeDoubleBE: [Function: writeDoubleBE] }
```
每个汉字占三个buffer元素，每个元素是0-255的数值，用16进制表示，buffer支持编码类型ascii,utf-8,utf16le/ucs-2,base64,binary,hex

给某个元素赋值时，如果是小数小数部分会被舍弃，如果小于0会被不断加上256知道位于0-255为止，如果大于255会被不断减去256直到位于0-255为止

Buffer占的内存不在v8堆内存中，就是说不在process.memoryUsage().heapTotal里，而是由c++实现内存申请

`buffer.write(str,offset,length,encoding)` 操作buffer

`buffer.copy(buf,pos)` 将buffer复制到buf，buf下标pos处开始复制

`buffer.toString(encoding,start,end)` buffer转字符串

`isEncoding` 判断编码类型是否支持转换buffer

buffer拼接
```javascript
var chunks = [];
var count = 0;
respont.on('data',function(chunk){
  chunks.push(chunk);
  count += chunk.length;
})
respont.on('end',function(){
  var buffer = Buffer.concat(chunks,count);
  console.log(buffer);
})
```
Buffer.concat的机制
```javascript
Buffer.concat = function(array,len){
  if(!Array.isArray(array)){
    throw new Error('error');
    return false;
  }
  if(array.length === 0){
    return new Buffer(0);
  }
  if(array.length === 1){
    return array[0];
  }
  if(typeof len !== 'number'){
    len = 0;
    for(var i = 0; i < array.length; i++){
      len += array[i].length;
    }
  }
  var buffer = new Buffer(len);
  var pos = 0;
  for(var i = 0; i < array.length; i++){
    array[i].copy(buffer,pos);
    pos += array.length;
  }
  return buffer;
}
```
网络传输通过Buffer传输性能更加，测试ab -c 10 -n 10 http://www.baidu.com/
- stream
```javascript
var fs = require('fs');
fs.createReadStream(path,{
  flags:'r',
  encoding:null,
  fd:null,
  mode:0666,
  start:0,//开始读取行数
  end:10,//结束读取行数
  highWaterMark:10//限制读取Buffer的长度为10
})
```

`stream.setEncoding(encoding)` 设置可读流的编码，setEncoding内部由decoder实现
```javascript
var stringDecoder = require('string_decoder').stringDecoder;
var decoder = new stringDecoder('utf-8');
decoder.write(buffer);
//decoder会对宽字节截断问题做处理，被截断的宽字节会保留在decoder对象中，与下一段buffer拼接
```

## http

```javascript
var http = require('http');
http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text-plan'});
  res.end('hi');
}).listen(3000);
```
http.request(options,connect) 生成一个请求

request.end() 本次请求发送结束


response.setHead() 设置响应头

response.writeHead() 写入响应头

报头在报文体发送前发送出去的

response.write() 发送响应报文体

response.end() 告知服务器本次响应结束

- 事件

connection建立连接时

request解析http请求报文头后触发

server.close(callback) 当已有的连接都断开时触发

checkContinue 请求发送带有 Expect:100-continue时触发，与request事件互斥

connect 发起connect请求时触发，如果不监听事件，连接会被关闭

upgrade 请求头带有 Upgrade 字段时触发，如果不监听事件，连接会被关闭

clientError 连接的客户端发生错误时会传到服务端时触发
