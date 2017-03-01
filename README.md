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
