- aodio/video

- requestAnimationFrame 

一般浏览器的显示频率是16.7ms，大于这个值会掉帧，requestAnimationFrame(callback)在下次显示频率前执行callback

- postmessage/worker

1.主线程和子线程之间通信

```html
 <html> 
 <head> 
 <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"> 
 <title>Test Web worker</title> 
 <script type="text/JavaScript"> 
	 function init(){ 
		 var worker = new Worker('compute.js'); 
		 //event 参数中有 data 属性，就是子线程中返回的结果数据
		 worker.onmessage= function (event) { 
			 // 把子线程返回的结果添加到 div 上
			 document.getElementById("result").innerHTML += 
			    event.data+"<br/>"; 
		 }; 
	 } 
 </script> 
 </head> 
 <body onload="init()"> 
 <div id="result"></div> 
 </body> 
 </html>
```

```javascript
 var sum=0; 


 postMessage("Before computing,"+new Date()); 
 postMessage(sum); 
 postMessage("After computing,"+new Date());
```

2.窗体之间跨域通信

```html
 <html> 
 <head> 
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
 <title>Test Cross-domain communication using HTML5</title> 
 <script type="text/JavaScript"> 
	 function sendIt(){ 
		 // 通过 postMessage 向子窗口发送数据
		 document.getElementById("otherPage").contentWindow 
			 .postMessage( 
				 document.getElementById("message").value, 
				"http://child.com:8080"
			 ); 
	 } 
 </script> 
 </head> 
 <body> 
	 <!-- 通过 iframe 嵌入子页面 --> 
	 <iframe src="http://child.com:8080/TestHTML5/other-domain.html" 
				 id="otherPage"></iframe> 
	 <br/><br/> 
	 <input type="text" id="message"><input type="button" 
			 value="Send to child.com" onclick="sendIt()" /> 
 </body> 
 </html>
```

```html
 <html> 
 <head> 
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
 <title>Web page from child.com</title> 
 <script type="text/JavaScript"> 
	 //event 参数中有 data 属性，就是父窗口发送过来的数据
	 window.addEventListener("message", function( event ) { 
		 // 把父窗口发送过来的数据显示在子窗口中
	   document.getElementById("content").innerHTML+=event.data+"<br/>"; 
	 }, false ); 

 </script> 
 </head> 
 <body> 
	 Web page from http://child.com:8080 
	 <div id="content"></div> 
 </body> 
 </html>
```
所以，我们可以通过iframe来进行跨域请求

- localStorage/sessionStorage



- WebSocket 

- canvas
