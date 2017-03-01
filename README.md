#程序员的学习之路（附Markdown 语法速查表）

# 这是 H1 <一级标题>

## 这是 H2 <二级标题>

###### 这是 H6 <六级标题>

**这是文字粗体格式**

*这是文字斜体格式*

~~在文字上添
加删除线~~

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
```javascript
function a(){}
a.prototype.b = {b:1}
Object.create(a.prototype,{b:1}) //相当于new a()
```
如果浏览器不兼容，以下是JavaScript写法：
```javascript
Object.create = function (o) {
         var F = function () {};
         F.prototype = o;
         return new F();
     };
var b=Object.create(a);
```

#移动端的touch时间
当手指触碰屏幕是事件的发生顺序touchstart,touchmove,touchend,touchcancel,click

监听事件可以获取event对象，包含pageX,pageY等属性，

clientX：触摸目标在视口中的x坐标。

clientY：触摸目标在视口中的y坐标。

identifier：标识触摸的唯一ID。

pageX：触摸目标在页面中的x坐标。

pageY：触摸目标在页面中的y坐标。

screenX：触摸目标在屏幕中的x坐标。

screenY：触摸目标在屏幕中的y坐标。

target：触目的DOM节点目标。

并且可以阻止冒泡event.preventDefault()

touchcancel实在系统发生cancel时触发，比如触摸的过程中唤出电话界面

event有三个属性：

touches是在屏幕上的所有手指列表，

targetTouches是当前DOM上的手指列表，

changedTouches是当手指移开触发touchend事件当前屏幕上的手指列表，并且touchend时没有targetTouches列表

#flex布局
父元素设为Flex布局以后，子元素的float、clear和vertical-align属性将失效
```css
//块元素
.box{
  display: flex;
}
//行内元素
.box{
  display: inline-flex;
}
```
以下为父元素设置的属性：

1.flex-direction属性决定主轴的方向（即项目的排列方向）
```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
row（默认值）：主轴为水平方向，起点在左端。

row-reverse：主轴为水平方向，起点在右端。

column：主轴为垂直方向，起点在上沿。

column-reverse：主轴为垂直方向，起点在下沿。

![flxe-direction](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

2.flex-wrap属性定义，默认情况下，项目都排在一条线，如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

nowrap（默认）：不换行。

wrap：换行，第一行在上方。

wrap-reverse：换行，第一行在下方。

3.flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

4.justify-content属性定义了项目在主轴上（水平）的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

flex-start（默认值）：左对齐

flex-end：右对齐

center： 居中

space-between：两端对齐，项目之间的间隔都相等。

space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

5.align-items属性定义项目在交叉轴（垂直）上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

flex-start：交叉轴的起点对齐。

flex-end：交叉轴的终点对齐。

center：交叉轴的中点对齐。

baseline: 项目的第一行文字的基线对齐。

stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

6.align-content属性定义了多根轴线的对齐方式（垂直多行）。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

flex-start：与交叉轴的起点对齐。

flex-end：与交叉轴的终点对齐。

center：与交叉轴的中点对齐。

space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。

space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

stretch（默认值）：轴线占满整个交叉轴。

以下属性设置在项目上

1.order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

2.flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

3.flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值对该属性无效。

4.flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

5.flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

6.align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
auto:默认行为。

flex-start：交叉轴的起点对齐。

flex-end：交叉轴的终点对齐。

center：交叉轴的中点对齐。

baseline: 项目的第一行文字的基线对齐。

stretch：如果项目未设置高度或设为auto，将占满整个容器的高度。

（来自：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool）

#Array数组
`isArray:`
```javascript
function isArray(arr){
  if(Array.isArray){
    return Array.isArray(arr);
  }
  return Object.prototype.toString.call(arr) == '[object Array]';
}
```
```javascript
var arr = [1,2,3];
function isArray( arg ) {
  if ( typeof arg === "object" && 
     ( "join" in arg && typeof arg.join === "function" ) &&
     ( "length" in arg && typeof arg.length === "number" ) ) {
        return true;
  }
  return false;
}
```
push()该方法是向数组末尾添加一个或者多个元素，并返回新的长度。

pop()方法删除数组的最后一个元素，把数组的长度减1，并且返回它被删除元素的值，如果数组变为空，则该方法不改变数组，返回undefine值。

unshift()方法是向数组的开头添加一个或多个元素，并且返回新的长度。

unshift()方法用于把数组的第一个元素从其中删除，并返回被删除的值。如果数组是空的，方法将不进行任何操作，返回undefined的值。

sort()方法对数组的元素做原地的排序，并返回这个数组。
```javascript
function ascSort (a, b) {  // a和b是数组中相邻的两个数组项
    return a - b; 
    // 如果 return -1, 表示a小于b，a排列在b的前面
    // 如果 return 1, 表示a大于b,a排列在b的后面
    // 如果 return 0, 表示a等于b,a和b的位置保持不变
}
function desSort (a, b) { // a和b是数组中相邻的两个数组项
    return b - a;
    // 如果 return -1, 表示b小于a，b排列在a的前面
    // 如果 return 1, 表示b大于a, b排列在a的后面
    // 如果 return 0, 表示 b等于a, b和a的位置保持不变
}
```
随机排序
```javascript
var randomArray = [9,0,23,8,3,5];

function randomSort(a, b) {
    return Math.random() - 0.5;
}

console.log(randomArray.sort(randomSort));
```
对象排序
```javascript
function objectSort(property, desc) {
    //降序排列
    if (desc) {
        return function (a, b) {
            return (a[property] >  b[property]) ? -1 : (a[property] <  b[property]) ? 1 : 0;
        }   
    }
    return function (a, b) {
        return (a[property] <  b[property]) ? -1 : (a[property] >  b[property]) ? 1 : 0;
    }
}
var myArray = [
  { "name": "John Doe", "age": 29 }, 
  { "name": "Anna Smith", "age": 24 }, 
  { "name": "Peter Jones", "age": 39 }
]

console.log(myArray.sort(objectSort('name',true))); // 按object中的name的降序排列
```

reverse()方法相对而言要简单得多，它就是用来颠倒数组中元素的位置，并返回该数组的引用。

concat()方法可以简单的将其理解为合并数组。基于当前数组中的所有项创建一个新数组。

slice()方法它基于当前数组创建一个新数组，而且对原数组也并不会有任何影响。接受一个或两个参数，即要返回项的起始和结束位置。当只给slice()传递一个参数时，该方法返回从该参数指定位置开始到当前数组末尾的所有项。

splice()方法始终会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）。第一个参数删除（替换）的起始点，第二个参数是删除（替换的长度），第三个参数列表为可选值，表示替换掉删除的部分。

indexOf()方法从数组的开头（位置为0）开始向后查询。indexOf()方法返回指定数组项在数组中找到的第一索引值。如果通过indexOf()查找指定的数组项在数组中不存在，那么返回的值会是-1。第二个参数表示从该索引部分开始查找，如果为负值则查找到倒数值为止。

lastIndexOf()方法从一个数组中末尾向前查找数组项，并且返回数组项在数组中的索引值，如果不存在，则返回的值是-1。

常用的数组算法
```javascript
//数组去重
//产生新数组
function unique (arr) {
  var result = []; 
  for (var i = 0; i < arr.length; i++)
  {
    if (result.indexOf(arr[i]) == -1) result.push(arr[i]);
  }
  return result;
}

function unique (arr)
{
    var hash = {},result = []; 
    for(var i = 0; i < arr.length; i++)
    {
        if (!hash[arr[i]]) 
        {
            hash[arr[i]] = true; 
            result.push(arr[i]); 
        }
    }
    return result;
}
function unique (arr) {
    arr.sort();
    var result=[arr[0]];
    for(var i = 1; i < arr.length; i++){
        if( arr[i] !== arr[i-1]) {
            result.push(arr[i]);
        }
    }
    return result;
}
```
```javascript
//随机顺序
function randomSort(arr) {
  arr.sort(function(a,b){
    return Math.random() - 0.5;
  });
  return arr;
}
function shuffle(array) {
    var copy = [],
        n = array.length,
        i;
    // 如果还剩有元素。。
    while (n) {
        // 随机选取一个元素
        i = Math.floor(Math.random() * n--);
        // 移动到新数组中
        copy.push(array.splice(i, 1)[0]);
    }
    return copy;
}
```
```javascript
//数组求交集
//利用filter和数组自带的indexOf方法
array1.filter(function(n) {
    return array2.indexOf(n) != -1
});
```
```javascript
//数组求并集
function arrayUnique(array1,array2) {
    var arr = array1.concat(array2);
    return unique(arr);
};
```

```javascript
//数组求差集
//Array.prototype.diff = function(a) {
//    return this.filter(function(i) {return a.indexOf(i) < 0;});
//};
```
#delete操作符
delete是普通运算符，会返回true或false。规则为：当被delete的对象的属性存在并且拥有DontDelete时 
返回false，否则返回true。 这里的一个特点就是，对象属性不存在时也返回true，所以返回值并非完全等同于删除成功与否。

通过 eval 执行的代码中，通过var声明的变量虽然与正常的var声明变量 同属于Global对象，但它们不具有DontDelete特性，能被删除。
```javascript
eval("var x = 36;");
x;     // 42
delete x;
x;     // undefined
```

eval的代码中的函数内通过var定义的变量具有DontDelete，不能被删除。
```javascript
eval("(function() { var x = 42; delete x; return x; })();");// 返回 42
```

delete无法通过_prototype_寻找属性删除。
```javascript
function C() { this.x = 42; }
C.prototype.x = 12;
var o = new C();
o.x;     // 42, 构造函数中定义的o.x
delete o.x;
o.x;     // 12
delete o.x;
o.x;     // 12
```

```javascript
function C() { this.x = 42; }
C.prototype.y = 12;
var o = new C();
delete o.x; // true
o.x;        // undefined   o.x存在并且没有DontDelete，返回true
delete o.y; // true
o.y;        // 12
// o自身没有o.y属性，所以返回true
delete o;   // false   Global.o拥有DontDelete特性所以返回false
delete undefinedProperty;  // true   Global没有名为undefinedProperty的属性因此返回true
delete 42;  // true   42不是属性所以返回true。有的实现会抛出异常（违反ECMAScript标准）
var x = 24;
delete x++;  // true   被删除的是x++的返回值(24)，不是属性，所以返回true
x;           // 25
```
#一些方法
`addClass`
`getElementsByClass`
`a_bc_def => aBcDef`
`a(1,2) == a(1)(2) == 3`
`http&https$xss`
