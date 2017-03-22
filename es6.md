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

如果一个数组成员不严格等于undefined，默认值是不会生效的。
数组解构赋值

对象解构赋值

字符串解构赋值

数字，布尔解构赋值

函数参数解构赋值

赋值语句的非模式部分可以使用圆括号，其他都不可以使用

## 字符串

charAt(offset) 返回字符串指定位置的字符

codePointAt 返回32位的UTF-16字符的码点，需要四个字节储存

charCodeAt 返回两个字节储存的常规字符的码点

at() 返回32位的UTF-16字符串指定位置的字符

String.fromCharCode 返回常规字符码点对应字符

String.fromCodePoint() 返回32位的UTF-16字符码点对应字符

`for...of`可以遍历不同编码的字符串

string.normalize() 参数NFC、NFD、NFKC、NFKD，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。

includes(string,offset)：返回布尔值，表示是否找到了参数字符串。

startsWith(string,offset)：返回布尔值，表示参数字符串是否在源字符串的头部。

endsWith(string,offset)：返回布尔值，表示参数字符串是否在源字符串的尾部。

string.repeat(n) 返回一个新字符串，表示将原字符串重复n次

string.padStart(len,str) 将str用于头部补全达到长度为len,如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串，如果省略第二个参数，默认使用空格补全长度。

string.padEnd(len,str) 将str用于尾部补全达到长度为len

模板字符串 将变量名表达式写在${}，

tag\`Hello ${ a + b } world ${ a * b}\`; 相当于 tag(['Hello ', ' world ', ''], 15, 50)

String.raw 将模板字符串还原为正常的字符串

## 正则
## 数值

Number.isFinite()用来检查一个数值是否为有限的

Number.isNaN()用来检查一个值是否为NaN。

Number.parseInt(), Number.parseFloat() 

Number.isInteger()用来判断一个值是否为整数。

Number.EPSILON 极小的常量，浮点数计算不精确，如果这个误差能够小于Number.EPSILON，我们就可以认为得到了正确结果。

Number.MAX_SAFE_INTEGER 表示的整数范围小于2^53（不含端点），超过这个范围，无法精确表示这个值。

Number.MIN_SAFE_INTEGER 表示的整数范围大于-2^53（不含端点），超过这个范围，无法精确表示这个值。

Number.isSafeInteger() 是否是安全整数，整数范围在-2^53到2^53之间（不含两个端点）。

Math.trunc() 去除一个数的小数部分，返回整数部分。

Math.sign() 判断一个数到底是正数、负数、还是零,参数为正数返回+1,参数为负数返回-1,参数为0返回0,参数为-0返回-0,其他值返回NaN。

Math.cbrt() 计算一个数的立方根。

Math.clz32() 返回一个数的32位无符号整数形式

Math.imul() 返回两个数以32位带符号整数形式相乘的结果。

Math.fround 返回一个数的单精度浮点数形式

Math.hypot 所有参数的平方和的平方根。

Math.expm1(x) 返回ex - 1，即Math.exp(x) - 1。

Math.log1p(x) 返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。

Math.log10(x) 返回以10为底的x的对数。如果x小于0，则返回NaN。

Math.log2(x) 返回以2为底的x的对数。如果x小于0，则返回NaN。

Math.sinh(x) 返回x的双曲正弦

Math.cosh(x) 返回x的双曲余弦

Math.tanh(x) 返回x的双曲正切

Math.asinh(x) 返回x的反双曲正弦

Math.acosh(x) 返回x的反双曲余弦

Math.atanh(x) 返回x的反双曲正切

Math.sign()用来判断一个值的正负，但是如果参数是-0，它会返回-0。

\*\* 指数运算符 `2 ** 3 // 8`

## 数组

Array.from 用于将两类对象转为真正的数组：类似数组的对象、可遍历（iterable）的对象。如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

```javascript
function a(){
  console.log([...arguments]);
}
a(1,2,3)
```
```javascript
function a(...b){
  console.log(b);
}
a(1,2,3);
```
```javascript
Array.from({ length: 3 }); // [ undefined, undefined, undefined ]
Array.from('str');//['s','t','r']


Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
```

Array.of方法用于将一组值，转换为数组。

copyWithin(target, start = 0, end = this.length) 将指定位置的成员复制到其他位置,target复制的目标位置，start开始复制的位置，end结束复制的位置


find(callback) 找出第一个符合条件的数组成员,如果没有符合条件的成员则返回undefined
```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

findIndex(callback) 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

fill(target,start,end) 使用给定值，填充一个数组,接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

includes(target,start = 0) 返回一个布尔值，表示某个数组是否包含给定的值,第二个参数表示搜索的起始位置，默认为0

## 函数


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
