## let const

1.块作用域，存在引用将形成闭包
```javascript
function a(){
  let b=1;
  return function(){
    return b;
  }
}
a()();//1
```
2.没有变量提升

在es6浏览器中函数声明类似var，es5浏览器中函数声明类似let



3.暂时性死区

使用变量前，必须先声明，否则报错

重复声明将报错


4.do表达式
```javascript
let x = do {
  let t = f();
  t * t + 1;
};
```


5.const保证内存地址指向不改变
```javascript
const foo = {};
foo.prop = 123;
foo.prop // 123
foo = {}; // TypeError: "foo" is read-only
```

声明后必须初始化
```javascript
const foo;
// SyntaxError: Missing initializer in const declaration
```

对象冻结，应该使用Object.freeze
```javascript
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

6.全局变量
```javascript
var a = 1;
// 在Node环境，可以写成global.a
// 通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```


## 解构
只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

## Babel
Babel是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

安装babel:npm install --global babel-cli

Babel的配置文件是.babelrc

```javascript
  {
    //设置转码规则
    "presets": [
      "es2015"
    ],
    //设置转码插件
    "plugins": []
  }
```
babel基本命令

转码结果输出到标准输出

`$ babel example.js`

转码结果写入一个文件

--out-file 或 -o 参数指定输出文件

`$ babel example.js --out-file compiled.js`

或者

`$ babel example.js -o compiled.js`

 整个目录转码

`--out-dir 或 -d 参数指定输出目录`

`$ babel src --out-dir lib`

或者

`$ babel src -d lib`

-s 参数生成source map文件

`$ babel src -d lib -s`

let的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

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
#变量
`let const`遇到作用域结束时立即销毁
