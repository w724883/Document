`Markdown 语法速查表`

# 这是 H1 <一级标题>

## 这是 H2 <二级标题>

###### 这是 H6 <六级标题>

**这是文字粗体格式**

*这是文字斜体格式*

~~在文字上添加删除线~~

无序列表

* 项目1
* 项目2
* 项目3

有序列表

1. 项目1
2. 项目2
3. 项目3
   * 项目1
   * 项目2

图片
![图片名称](https://www.baidu.com/img/baidu_jgylogo3.gif)

链接
[链接名称](https://www.baidu.com)

引用

> 第一行引用文字
> 第二行引用文字

水平线
***

高亮
`<hello world>`

代码块高亮
```javascript
    function a(){
        var _a = 1;
    }
```

#闭包
理解：1.在function内var一个变量，function外部是无法访问到该变量，闭包搭建了一个桥梁，让函数外能够访问内部变量。2.闭包访问的变量会保存在内存之中。3.同个声明的两个闭包之间没有关联。
```javascript
function f1(){
    var n=999;
    nAdd=function(){
        n+=1;
    }
    function f2(){
        alert(n);
    }
    return f2;
}
var result = f1();
result(); // 999
nAdd();
result(); // 1000
```
在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。
为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
这段代码中另一个值得注意的地方，就是nAdd=function(){n+=1}这一行，首先在nAdd前面没有使用var关键字，因此 nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个
匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

#原型
一、函数创建过程

function A() {};

当我们在代码里面声明这么一个空函数：

1、创建一个对象（有constructor属性及[[Prototype]]属性），根据ECMA，其中[[Prototype]]属性不可见、不可枚举

2、创建一个函数（有name、prototype属性），再通过prototype属性 引用刚才创建的对象

3、创建变量A，同时把函数的引用赋值给变量A

![函数创建过程](http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance.jpg)

二、构造函数

构造函数是用来新建同时初始化一个新对象的函数。

所以，结论是：任何一个函数都可以是构造函数。

三、原型

根据前面空函数的创建图示，我们知道每个函数在创建的时候都自动添加了prototype属性，这就是函数的原型，从图中可知其实质就是对一个对象的引用（这个对象暂且取名原型对象）。
围绕刚才创建的空函数，这次给空函数增加一些代码：
```javascript
function A() {

 this.width = 10;
 
 this.data = [1,2,3];
 
 this.key = "this is A";
 
 }
 
 A._objectNum = 0;
 //定义A的属性

 A.prototype.say = function(){
//给A的原型对象添加属性

 alert("hello world")
 
 }
```

根据“函数创建”过程，图解如下：

![函数创建过程](http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance2.jpg)

简单说原型就是函数的一个属性，在函数的创建过程中由js编译器自动添加。

先了解下new运算符，如下：

var a1 = new A;

var a2 = new A;


这是通过构造函数来创建对象的方式，那么创建对象为什么要这样创建而不是直接var a1 = {};呢？这就涉及new的具体步骤了，这里的new操作可以分成三步(以a1的创建为例)：

1、新建一个对象并赋值给变量a1：var a1 = {};

2、把这个对象的[[Prototype]]属性指向函数A的原型对象：a1.[[Prototype]] = A.prototype

3、调用函数A，同时把this指向1中创建的对象a1，对对象进行初始化：A.apply(a1,arguments)

其结构图示如下：

![函数创建过程](http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance3.jpg)

从图中看到，无论是对象a1还是a2，都有一个属性保存了对函数A的原型对象的引用，对于这些对象来说，一些公用的方法可以在函数的原型中找到，节省了内存空间。

四、原型链
了解了new运算符以及原型的作用之后，一起来看看什么是[[Prototype]]？以及对象如何沿着这个引用来进行属性的查找？

在js的世界里，每个对象默认都有一个[[Prototype]]属性，其保存着的地址就构成了对象的原型链，它是由js编译器在对象被创建的时候自动添加的，其取值由new运算符的右侧参数决定：当我们var object1 = {};的时候，object1的[[Prototype]]就指向Object构造函数的原型对象，因为var object1 = {};实质上等于var object = new Object();（原因可参照上述对new A的分析过程）。
对象在查找某个属性的时候，会首先遍历自身的属性，如果没有则会继续查找[[Prototype]]引用的对象，如果再没有则继续查找[[Prototype]].[[Prototype]]引用的对象，依次类推，直到[[Prototype]].….[[Prototype]]为undefined（Object的[[Prototype]]就是undefined）

//我们想要获取a1.fGetName
  alert(a1.fGetName);
//输出undefined

//1、遍历a1对象本身
//结果a1对象本身没有fGetName属性

//2、找到a1的[[Prototype]]，也就是其对应的对象A.prototype，同时进行遍历
//结果A.prototype也没有这个属性

//3、找到A.prototype对象的[[Prototype]]，指向其对应的对象Object.prototype
//结果Object.prototype也没有fGetName

//4、试图寻找Object.prototype的[[Prototype]]属性，结果返回undefined，这就是a1.fGetName的值

简单说就是通过对象的[[Prototype]]保存对另一个对象的引用，通过这个引用往上进行属性的查找，这就是原型链。

五、继承

function B() {};

这个时候产生了B的原型B.prototype

原型本身就是一个Object对象，我们可以看看里面放着哪些数据

B.prototype 实际上就是 {constructor : B , [[Prototype]] : Object.prototype}

因为prototype本身是一个Object对象的实例，所以其原型链指向的是Object的原型

B.prototype = A.prototype;

//相当于把B的prototype指向了A的prototype；这样只是继承了A的prototype方法，A中的自定义方法则不继承

  B.prototype.thisisb = "this is constructor B";
  
//这样也会改变a的prototype

但是我们只想把B的原型链指向A，如何实现？

第一种是通过改变原型链引用地址

B.prototype.__proto__ = A.prototype;

ECMA中并没有__proto__这个方法，这个是ff、chrome等js解释器添加的，等同于EMCA的[[Prototype]]，这不是标准方法，那么如何运用标准方法呢？

我们知道new操作的时候，实际上只是把实例对象的原型链指向了构造函数的prototype地址块，那么我们可以这样操作

B.prototype = new A();

这样产生的结果是：

产生一个A的实例，同时赋值给B的原型，也即B.prototype 相当于对象 {width :10 , data : [1,2,3] , key : "this is A" , [[Prototype]] : A.prototype}

这样就把A的原型通过B.prototype.[[Prototype]]这个对象属性保存起来，构成了原型的链接

但是注意，这样B产生的对象的构造函数发生了改变，因为在B中没有constructor属性，只能从原型链找到A.prototype，读出constructor:A

```javascript
var b = new B;

console.log(b.constructor);
//output A

所以我们还要人为设回B本身
B.prototype.constructor = B;

//现在B的原型就变成了{width :10 , data : [1,2,3] , key : "this is A" , [[Prototype]] : A.prototype , constructor : B}

console.log(b.constructor);
//output B

//同时B直接通过原型继承了A的自定义属性width和name

console.log(b.data);
//output [1,2,3]

//这样的坏处就是

  b.data.push(4);
  
//直接改变了prototype的data数组（引用）

  var c = new B;
  
  alert(c.data);
  
//output [1,2,3,4]

//其实我们想要的只是原型链，A的自定义属性我们想在B中进行定义（而不是在prototype）

//既然我们不想要A中自定义的属性，那么可以想办法把其过滤掉

//可以新建一个空函数

  function F(){}
  
//把空函数的原型指向构造函数A的原型

  F.prototype = A.prototype;
  
//这个时候再通过new操作把B.prototype的原型链指向F的原型

  B.prototype = new F();
  
//这个时候B的原型变成了{[[Prototype]] : F.prototype}

//这里F.prototype其实只是一个地址的引用

//但是由B创建的实例其constructor指向了A，所以这里要显示设置一下B.prototype的constructor属性

  B.prototype.constructor = B;
  
//这个时候B的原型变成了{constructor : B , [[Prototype]] : F.prototype}

//这样就实现了B对A的原型继承
```

图示如下，其中红色部分代表原型链：
![函数创建过程](http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance4.jpg)

(出自：http://blog.jobbole.com/19795/)

#跨域

###JSONP

利用在页面中创建script节点的方法向不同域提交HTTP请求的方法称为JSONP，这项技术可以解决跨域提交Ajax请求的问题。JSONP的工作原理如下所述

假设在http://example1.com/index.php这个页面中向http://example2.com/getinfo.php提交GET请求，我们可以将下面的JavaScript代码放在http://example1.com/index.php这个页面中来实现：
```javascript
var eleScript= document.createElement("script");

eleScript.type = "text/javascript";

eleScript.src = "http://example2.com/getinfo.php";

document.getElementsByTagName("head")[0].appendChild(eleScript);
```
当GET请求从http://example2.com/getinfo.php返回时，可以返回一段JavaScript代码，这段代码会自动执行，可以用来负责调用http://example1.com/index.php页面中的一个callback函数。

JSONP的优点是：它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；并且在请求完毕后可以通过调用callback的方式回传结果。

JSONP的缺点则是：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。

Jsonp的执行过程如下：

首先在客户端注册一个callback (如:'jsoncallback'), 然后把callback的名字(如:jsonp1236827957501)传给服务器。注意：服务端得到callback的数值后，要用jsonp1236827957501(......)把将要输出的json内容包括起来，此时，服务器生成 json 数据才能被客户端正确接收。

然后以 javascript 语法的方式，生成一个function， function 名字就是传递上来的参数 'jsoncallback'的值 jsonp1236827957501 .

最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。

客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时javascript文档数据，作为参数， 传入到了客户端预先定义好的 callback 函数(如上例中jquery $.ajax()方法封装的的success: function (json))里。

###postMessage
```html
<!DOCTYPE html>
<html>
<head>
    <title>Post Message</title>
</head>
<body>
    <div style="width:200px; float:left; margin-right:200px;border:solid 1px #333;">
        <div id="color">Frame Color</div>
    </div>
    <div>
        <iframe id="child" src="http://lsLib.com/lsLib.html"></iframe>
    </div>

    <script type="text/javascript">

        window.onload=function(){
            window.frames[0].postMessage('getcolor','http://lslib.com');
        }

        window.addEventListener('message',function(e){
            var color=e.data;
            document.getElementById('color').style.backgroundColor=color;
        },false);
    </script>
</body>
</html>
```

http://lslib.com/lslib.html
```javascript
<!doctype html>
<html>
    <head>
        <style type="text/css">
            html,body{
                height:100%;
                margin:0px;
            }
        </style>
    </head>
    <body style="height:100%;">
        <div id="container" onclick="changeColor();" style="widht:100%; height:100%; background-color:rgb(204, 102, 0);">
            click to change color
        </div>
        <script type="text/javascript">
            var container=document.getElementById('container');

            window.addEventListener('message',function(e){
                if(e.source!=window.parent) return;
                var color=container.style.backgroundColor;
                window.parent.postMessage(color,'*');
            },false);

            function changeColor () {            
                var color=container.style.backgroundColor;
                if(color=='rgb(204, 102, 0)'){
                    color='rgb(204, 204, 0)';
                }else{
                    color='rgb(204,102,0)';
                }
                container.style.backgroundColor=color;
                window.parent.postMessage(color,'*');
            }
        </script>
    </body>
</html>
```
（来自：http://www.cnblogs.com/dolphinX/p/3464056.html）

###iframe
![iframe跨域](http://files.jb51.net/file_images/article/201302/2013020117295679.png)
要实现域a.com的request.html请求域b.com的process.php，可以将请求的参数通过URL传给response.html，由response.html向process.php发出真正的ajax请求（response.html与process.php都属于域b.com），然后将返回的结果通过URL传给proxy.html，最后由于proxy.html与request.html是在同一域下，所以可以在proxy.html利用window.top将结果返回给request.html完成跨域通信。

整个流程的思路其实非常清晰，真正的ajax请求并不是发生在域a.com，而是发生在域b.com；而域a.com是做了两件事，第一件事是由request.html完成，向域b.com发送传入参数；第二件事由proxy.html完成，把域b.com的响应数据递回给request.html。
![跨域访问流程图](http://files.jb51.net/file_images/article/201302/2013020117295680.png)

先看文档结构：
http://a.com/
request.html
proxy.html
http://b.com/
response.html
process.php

1、先来看request.html
```html
<!DOCTYPE html> 
<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<title>该页面的路径是：http://a.com/request.html</title> 
</head> 
<body> 
<p id="result">这里将会填上响应的结果</p> 
<a id="sendBtn" href="javascript:void(0)">点击，发送跨域请求</a> 
<iframe id="serverIf"></iframe> 
<script type="text/javascript"> 
document.getElementById("sendBtn").onclick = function() { 
var url = "http://b.com/response.html"; 
var fn = "GetPerson";//这是定义在response.html的方法 
var reqdata = '{"id" : 24}';//这是请求的参数 
var callback = "CallBack";//这是请求全过程完成后执行的回调函数，执行最后的动作 
CrossRequest(url, fn, reqdata, callback);//发送请求 
} 
function CrossRequest(url, fn, reqdata, callback) { 
var server = document.getElementById("serverIf"); 
server.src = url + "?fn=" + encodeURIComponent(fn) + "&data=" + encodeURIComponent(reqdata) + "&callback=" + encodeURIComponent(callback);//这里由request.html向response.html发送的请求其实就是通过iframe的src将参数与回调方法传给response.html 
} 
function CallBack(data) {//回调函数 
var str = "My name is " + data.name + ". I am a " + data.sex + ". I am " + data.age + " years old."; 
document.getElementById("result").innerHTML = str; 
} 
</script> 
</body> 
</html>
```
看代码和注释相信都很容易理解，这个页面其实就是要告诉response.html：我要让你执行你定义好的方法GetPerson，并且要用我给你的参数'{"id" : 24}'。可能感到模糊的就是为什么要把CallBack函数传给response.html，这是定义在本页面上的方法，response.html也不能执行它；看接下来的代码就会知道：response.html纯粹是负责将CallBack这个方法名传递给下一位仁兄proxy.html，而proxy.html拿到了CallBack这个方法名就可以执行了，因为proxy.html和request.html是同域的。

2、response.html的代码：
```html
<!DOCTYPE html> 
<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<title>该页面的路径是：http://b.com/response.html</title> 
</head> 
<body> 
<iframe id="proxy"></iframe> 
<script type="text/javascript"> 
function _request(reqdata, url, callback) {//通用方法，ajax请求 
var xmlhttp; 
if (window.XMLHttpRequest) { 
xmlhttp = new XMLHttpRequest(); 
} 
else { 
xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
} 
xmlhttp.onreadystatechange = function () { 
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
var data = xmlhttp.responseText; 
callback(data); 
} 
} 
xmlhttp.open("POST", url); 
xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8"); 
xmlhttp.send(reqdata); 
} 
function _getQuery(key) {//通用方法，获取url参数 
var query = location.href.split("?")[1]; 
var value = decodeURIComponent(query.split(key + "=")[1].split("&")[0]); 
return value; 
} 
function GetPerson(reqdata, callback) {//向process.php发送ajax请求 
var url = "process.php"; 
var fn = function(data) { 
var proxy = document.getElementById("proxy"); 
proxy.src = "http://b.com/Proxy.html?data=" + encodeURIComponent(data) + "&callback=" + encodeURIComponent(callback); 
} 
_request(reqdata, url, fn); 
} 
(function() { 
var fn = _getQuery("fn"); 
var reqdata = _getQuery("data"); 
var callback = _getQuery("callback"); 
eval(fn + "('" + reqdata +"', '" + callback + "')"); 
})(); 
</script> 
</body> 
</html>
```
这里其实就是接收来自request.html的请求得到请求参数和方法后向服务器process.php发出真正的ajax请求，然后将从服务器返回的数据以及从request.html传过来的回调函数名传递给proxy.html。

3、下process.php的代码：
```php
<?php 
$data = json_decode(file_get_contents("php://input")); 
header("Content-Type: application/json; charset=utf-8"); 
echo ('{"id" : ' . $data->id . ', "age" : 24, "sex" : "boy", "name" : "huangxueming"}'); 
?>
```
4、proxy.html：
```html
<!DOCTYPE html> 
<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<title>该页面的路径是：http://a.com/proxy.html</title> 
</head> 
<body> 
<script type="text/javascript"> 
function _getUrl(key) {//通用方法，获取URL参数 
var query = location.href.split("?")[1]; 
var value = decodeURIComponent(query.split(key + "=")[1].split("&")[0]); 
return value; 
} 
(function() { 
var callback = _getUrl("callback"); 
var data = _getUrl("data"); 
eval("window.top." + decodeURIComponent(callback) + "(" + decodeURIComponent(data) + ")"); 
})() 
</script> 
</body> 
</html>
这里也是最后一步了，proxy终于拿到了request.html透过response.html传过来的回调函数名以及从response.html直接传过来的响应数据，利用window.top执行request.html里定义的回调函数。
实际应用中，proxy.html基本上可以是一个通用的代理，无需改动，如果需要用到很多跨域方法，这些方法都可以在域a.com里面加上，而域b.com就相当于定义一些接口供a.com调用，如GetPerson，当然这并不是真正的接口，只是方便理解，打个比方；另外，当然就是要把iframe隐藏起来。
```
###domain
1、document.domain+iframe的设置
对于主域相同而子域不同的例子，可以通过设置document.domain的办法来解决。具体的做法是可以在http://www.a.com/a.html和http://script.a.com/b.html两个文件中分别加上document.domain = ‘a.com’；然后通过a.html文件中创建一个iframe，去控制iframe的contentDocument，这样两个js文件之间就可以“交互”了。当然这种办法只能解决主域相同而二级域名不同的情况，如果你异想天开的把script.a.com的domian设为alibaba.com那显然是会报错地！代码如下：

www.a.com上的a.html
```javascript
document.domain = 'a.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://script.a.com/b.html';
ifr.style.display = 'none';
document.body.appendChild(ifr);
ifr.onload = function(){
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    // 在这里操纵b.html
    alert(doc.getElementsByTagName("h1")[0].childNodes[0].nodeValue);
};
```
script.a.com上的b.html
```javascript
document.domain = 'a.com';
```
这种方式适用于{www.kuqin.com, kuqin.com, script.kuqin.com, css.kuqin.com}中的任何页面相互通信。

备注：某一页面的domain默认等于window.location.hostname。主域名是不带www的域名，例如a.com，主域名前面带前缀的通常都为二级域名或多级域名，例如www.a.com其实是二级域名。 domain只能设置为主域名，不可以在b.a.com中将domain设置为c.a.com。

问题：
1、安全性，当一个站点（b.a.com）被攻击后，另一个站点（c.a.com）会引起安全漏洞。
2、如果一个页面中引入多个iframe，要想能够操作所有iframe，必须都得设置相同domain。
（来自：http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html）

#Object.create()

Object.create(prototype [, propertiesObject ])
prototype是要创建对象的原型，如果不是子函数则设为null
propertiesObject是要创建对象的属性描述
如：
Object.create

```javascript
Object.create = function (o) {
         var F = function () {};
         F.prototype = o;
         return new F();
     };
var b=Object.create(a);
```
