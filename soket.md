
- websocket客户端与服务端建立连接的过程：

```
先用js创建一个WebSocket实例，使用ws协议建立服务器连接，ws://localhost:8088

ws开头是普通的websocket连接，wss是安全的websocket连接，类似于https。

客户端与服务端建立握手，发送如下信息：

 

GET /echo HTTP/1.1
Upgrade: WebSocket
Connection: Upgrade
Host: http://localhost:8088
Origin: http://localhost.com

可以看到使用了http来完成握手的

服务端会发回如下：

HTTP/1.1 101 Web Socket Protocol Handshake
Upgrade: WebSocket
Connection: Upgrade
WebSocket-Origin: http://localhost
WebSocket-Location: ws://localhost:8088/echo

使用http握手完成后，协议升级为websoket了，接下来的通信都是用wx协议
```


- WebSocket对象一共支持四个消息 onopen, onmessage, onclose, onerror和send方法

```javascript


// 创建一个Socket实例
var socket = new WebSocket('ws://localhost:8080'); 

// 打开Socket 
socket.onopen = function(event) { 

  // 发送一个初始化消息
  socket.send('I am the client and I\'m listening!'); 

  // 监听消息
  socket.onmessage = function(event) { 
    console.log('Client received a message',event); 
  }; 

  // 监听Socket的关闭
  socket.onclose = function(event) { 
    console.log('Client notified socket has closed',event); 
  }; 

  // 关闭Socket.... 
  //socket.close() 
};

```
