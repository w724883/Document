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


- 扩展
```javascript
function add(...values) {
  return values;
}
add(2, 5, 3) // [2, 5, 3]

// 报错
function f(a, ...b, c) {}
```
```javascript
console.log(1, ...[2, 3, 4], 5)// 1 2 3 4 5

function f(x, y, z) {
  console.log(x);//0
}
f(...[0, 1, 2]);
```

```javascript
Math.max(...[14, 3, 77]);//77

[1].push(...[2,3]);//[1,2,3]

[...[1], ...[2,3]];//[1,2,3]

const [first, ...rest] = [1, 2, 3, 4, 5];//rest = [2,3,4,5]
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错

[...'hello']// [ "h", "e", "l", "l", "o" ]


```
任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。


箭头函数有几个注意点

1.函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

2.不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

3.不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

4.不可以使用yield命令，因此箭头函数不能用作Generator函数。

call(this的指向,arguments) 立即执行
apply(this的指向,[]) 立即执行

bind(this的指向,arguments) 返回原函数，不立即执行

es7
```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

let log = ::console.log;
// 等同于
var log = console.log.bind(console);

```

## 对象

object.hasOwnProperty(property) 自身是否某属性

function.prototype.isPrototypeOf(object) 判断function的原型链是否在object上

Object.defineProperty/Object.defineProperties  将属性添加到对象，或修改现有属性的特性
```javascript
Object.defineProperty(obj, "property", {
     writable:       true,   //设置属性是否可写，默认为true
     configurable:   false,  //设置属性是否可以配置，默认为true。当设置为false时不能用delete删除
     enumerable:     false,  //设置属性是否可以枚举，默认为true.即for-in循环对象的时候可以输出属性
     value:          0,      //默认值
     get:            function(){},
     set:             funcction(){}
});
```
Object.getOwnPropertyDescriptor(obj, property) 获取obj的属性列表，如Object.defineProperty定义的属性

Object.getOwnPropertyNames(obj) 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组

Object.observe(obj,callback) 为对象指定监视时调用的回调函数，只能浅度监听

Object.unobserve(obj,callback) 移除监视时调用的回调函数

Object.deliverChangeRecords(callback) 通过回调函数对对象值进行修改

Object.getNotifier 获取Notifier对象

Object.freeze(obj) 冻结对象，引用地址和值都不能改变

Object.isFrozen(object) 如果无法在对象中修改现有属性的特性和值，且无法向对象添加新属性，则返回 true。

Object.isSealed(object) 如果无法在对象中修改现有属性的特性，且无法向对象添加新属性，则返回 true。

Object.isExtensible(obj) 判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

Object.create(prototype, descriptors) 创建一个拥有指定原型链和若干个指定属性的对象。prototype是对象，descriptors中的某个值与Object.defineProperty的第二个参数一样

Object.getOwnPropertySymbols(obj) 可以获取指定对象的所有Symbol属性名
```javascript
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

Object.getPrototypeOf(object) 返回对象的原型。

Object.setPrototypeOf(object, proto) 设置对象的原型。

obj.propertyIsEnumerable('name') 判断对象obj上的name是否可以被枚举


```javascript
var o = {
  method() {
    return "Hello!";
  }
};
// 等同于
var o = {
  method: function() {
    return "Hello!";
  }
};
```
```javascript
let obj = {
  ['a'+'b']: true
};
// 等同于
let obj = {
  ab: true
};
//表达式放在[]中
```

```javascript
var age = 18;
var test = {
    get age (){
        console.log(1);
    },
    set age (value){
        console.log(2);
    }
};

test.age;//1
test.age = 20;//2
```

Object.is(v1,v2) 用来比较两个值是否严格相等
```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

Object.assign(targetobj,obj) 用于对象的合并(浅拷贝)，将源对象（source）的所有可枚举属性，复制到目标对象
```javascript
typeof Object.assign(2) // "object"

Object.assign(undefined) // 报错
Object.assign(null) // 报错

Object.assign(obj) === obj // true
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```
Object.keys() 
```javascript
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

Object.values() 
```javascript
var obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```

Object.entries()
```javascript
var obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

遍历

1.for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。

2.Object.keys(obj)
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。

3.Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

4.Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。

5.Reflect.ownKeys(obj)
Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

扩展运算符

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

let { x, y, ...z } = null; // 运行时错误
let { x, y, ...z } = undefined; // 运行时错误

let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误

let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2

let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```
传导符

```javascript
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
  //等同于
  const firstName = message?.body?.user?.firstName || 'default';
```

## Symbol

js的七种数据类型
Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）、Symbol

Symbol不能实例化，接受字符串参数作为描述
```javascript
var s1 = Symbol('foo');
s1 // Symbol(foo)
s1.toString() // "Symbol(foo)"
```
参数为非字符串时，先转化为字符串
```javascript
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```
Symbol不参与运算，否则报错，但是可以转化为布尔、字符串

Symbol.for() 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值
```javascript
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2 // true
```

Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
```javascript
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
Symbol.hasInstance 指向一个内部方法。其他对象使用instanceof运算符，会调用这个方法。
```javascript
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
[1, 2, 3] instanceof new MyClass() // true
```

Symbol.isConcatSpreadable 等于一个布尔值（默认false），表示该对象使用Array.prototype.concat()时，是否可以展开。true或undefined可展开。
```javascript
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined
```

Symbol.species 指向当前对象的构造函数。
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

mapped instanceof MyArray // false
mapped instanceof Array // true
```

Symbol.match 指向一个函数，执行str.match(myObject)时，会调用它，返回该方法的返回值。
```javascript
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```

Symbol.replace 指向一个方法，该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
```javascript
const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]
```

Symbol.search 指向一个方法，该对象被String.prototype.search，会返回该方法的返回值。
```javascript
class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
```

Symbol.split 指向一个方法，该对象被String.prototype.split，会返回该方法的返回值。
```javascript
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    var index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo'))
// ['', 'bar']
```

对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

对象的Symbol.iterator属性，指向该对象的默认遍历器方法。

对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
```javascript
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。
```javascript

({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"


class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
var x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
```javascript
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }
```

## Set 

new Set(数组或类似数组的对象)

类似于数组，但是成员的值都是唯一的，没有重复的值。类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。

Set.prototype.constructor：构造函数，默认就是Set函数。

Set.prototype.size：返回Set实例的成员总数。

add(value)：添加某个值，返回Set结构本身。

delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

has(value)：返回一个布尔值，表示该值是否为Set的成员。

clear()：清除所有成员，没有返回值。

```javascript
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

Array.from方法可以将Set结构转为数组。

```javascript
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);
```

遍历(Set的遍历顺序就是插入顺序)

keys()：返回键名的遍历器

values()：返回键值的遍历器

entries()：返回键值对的遍历器

forEach()：使用回调函数遍历每个成员

for...of

map和filter
```javascript
// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
```
```javascript
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']
```

## WeakSet (不重复的值的集合)

new WeakSet(对象数组);

WeakSet的成员只能是对象，而不能是其他类型的值。

WeakSet是不可遍历的，没有size。WeakSet中的对象都是弱引用，垃圾回收机制会自动回收该对象所占用的内存

WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。

WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。

WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在WeakSet实例之中。


## Map

类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

如果读取一个未知的键，则返回undefined。

只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。

```javascript
var m = new Map();
var o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false


var map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

```

size属性返回Map结构的成员总数。

set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。

get方法读取key对应的键值，如果找不到key，返回undefined。

has方法返回一个布尔值，表示某个键是否在Map数据结构中。

delete方法删除某个键，返回true。如果删除失败，返回false。

clear方法清除所有成员，没有返回值。

遍历

keys()：返回键名的遍历器。

values()：返回键值的遍历器。

entries()：返回所有成员的遍历器。

forEach()：遍历Map的所有成员。

for...in

map和filter

```javascript
let map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
```
## WeakMap

它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。

没有遍历操作

没有size属性

无法清空

方法：get()、set()、has()、delete()。

## Proxy 

new Proxy(target, handler) 第一个参数是所要代理的目标对象，第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。
```
handler = {
  get(target, propKey, receiver){}//拦截对象属性的读取
  set(target, propKey, value, receiver)//拦截对象属性的设置
  has(target, propKey)//拦截propKey in proxy的操作，返回一个布尔值。
  deleteProperty(target, propKey)//拦截delete proxy[propKey]的操作，返回一个布尔值。
  ownKeys(target)//拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  getOwnPropertyDescriptor(target, propKey)//拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  defineProperty(target, propKey, propDesc)//拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  preventExtensions(target)//拦截Object.preventExtensions(proxy)，返回一个布尔值。
  getPrototypeOf(target)//拦截Object.getPrototypeOf(proxy)，返回一个对象。
  isExtensible(target)//拦截Object.isExtensible(proxy)，返回一个布尔值。
  setPrototypeOf(target, proto)//拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
  apply(target, object, args)//拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
  construct(target, args)//拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
  
}

```
```javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

Proxy.revocable() Proxy.revocable方法返回一个可取消的 Proxy 实例。
```javascript
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```



## Reflect

Reflect.get(target, name, receiver)
查找并返回target对象的name属性，如果没有该属性，则返回undefined。

Reflect.set(target, name, value, receiver)
设置target对象的name属性等于value。

Reflect.has(obj, name)
对应name in obj里面的in运算符。

Reflect.deleteProperty(obj, name)
等同于delete obj[name]，用于删除对象的属性。

Reflect.construct(target, args) 
等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。

Reflect.getPrototypeOf(obj)
用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

Reflect.setPrototypeOf(obj, newProto)
用于设置对象的__proto__属性，返回第一个参数对象，对应Object.setPrototypeOf(obj, newProto)。

Reflect.apply(func, thisArg, args)
等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。

Reflect.defineProperty(target, propertyKey, attributes)
基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。

Reflect.getOwnPropertyDescriptor(target, propertyKey)
基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。

Reflect.isExtensible (target)
对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。

Reflect.preventExtensions(target)
Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

Reflect.ownKeys (target)
用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。

## Promise

Promise.prototype.then()

Promise.prototype.catch方法是.then(null, rejection)的别名

Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。接受一个数组作为参数。

Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。参数与Promise.all方法一样

Promise.resolve 将现有对象转为Promise对象。
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
如果参数是Promise实例，那么Promise.resolve将不做任何修改返回这个实例。

参数是一个thenable对象，会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。
```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```
参数不是具有then方法的对象，或根本就不是对象
```javascript
var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```
不带有任何参数
```javascript
var p = Promise.resolve();

p.then(function () {
  // ...
});
```


Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
```javascript
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

done(onFulfilled, onRejected) 方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

finally(callback) 方法用于指定不管Promise对象最后状态如何，都会执行的操作。

async 
```javascript
const f = () => console.log('now');
(async () => f())();
console.log('next');
// now
// next

const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now
// next

Promise.try(database.users.get({id: userId}))
  .then(...)
  .catch(...)
```

## Iterator

next函数必选，return可选

凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。


```javascript
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++]} :
        {done: true};
    }
  };
}

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
```
```javascript
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
```
对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。

扩展运算符（...）也会调用默认的iterator接口。

yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
```javascript
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

Iterator接口与Generator函数 
```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// hello
// world

```
for...in和for...of
```javascript
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```


## Generator 

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
```javascript
//yield语句如果用在一个表达式之中，必须放在圆括号里面。
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
//yield语句用作函数参数或放在赋值表达式的右边，可以不加括号。
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

Generator.prototype.throw()
Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。

Generator.prototype.return()
Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

yield* 语句
如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
```javascript
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法。

```javascript
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```

```javascript
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();
```

```javascript
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

## async 
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

async 函数有多种使用形式
```javascript
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

async函数内部return语句返回的值，会成为then方法回调函数的参数。
```javascript
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

await 命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。

只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。

await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。

异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象。
```javascript
asyncIterator
  .next()
  .then(
    ({ value, done }) => {}/* ... */
  );
```
for await...of循环，则是用于遍历异步的 Iterator 接口。
```javascript
async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])) {
    console.log(x);
  }
}
// a
// b
```

异步Generator函数
```javascript
async function* readLines(path) {
  let file = await fileOpen(path);

  try {
    while (!file.EOF) {
      yield await file.readLine();
    }
  } finally {
    await file.close();
  }
}
```

## Class
类的内部所有定义的方法，都是不可枚举的

Class不存在变量提升

类的方法都定义在类的prototype对象上面，constructor里的属性定义在自身

类的属性名，可以采用表达式。
```javascript
let methodName = "getArea";
class Square{
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

类也可以使用表达式的形式定义。
```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
}
MyClass.name;//Me
```
如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
```javascript
const MyClass = class { /* ... */ };

let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // "张三"
```

- 私有方法
```javascript
const bar = Symbol('bar');
export default class myClass{
  // 公有方法
  foo(baz) {
    
  }
  // 私有方法
  [bar](baz) {
    
  }
};

class Widget {
  foo (baz) {
    bar.call(this, baz);
  }
}

function bar(baz) {
  return this.snaf = baz;
}
```

- 继承
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```
es5继承实现
```javascript
function Parent(){
  this.a = 'a';
}
Parent.prototype.aa = 'aa';

function Child(){
  Parent.call(this);
  this.b = 'b';
}

function F(){};
F.prototype = Parent.prototype;
Child.prototype = new F();
Child.prototype.constructor = Child;

Child.prototype.bb = 'bb';
var child = new Child();

```
es6继承实现
```javascript
class A {
}

class B {
}

// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
const b = new B();

// B的实例继承A的静态属性
Object.setPrototypeOf(B, A);
const b = new B();
```
super关键字

作为函数调用时，代表父类的构造函数，super()相当于A.prototype.constructor.call(this)。

作为对象调用时，指向父类的原型对象。

super内部的this指子类，即this指向调用者

通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错

原型链
```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。
```javascript
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```


Object.getPrototypeOf方法可以用来从子类上获取父类。

原生构造函数的this无法绑定，导致拿不到内部属性。

ES6允许继承原生构造函数定义子类，es5不行因为原生构造函数会忽略apply方法传入的this
```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取。存值函数和取值函数是设置在属性的descriptor对象上
```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```


静态方法，父类的静态方法，可以被子类继承。
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

类的实例属性
```javascript
class MyClass {
  myProp = 42;

  constructor() {
    console.log(this.myProp); // 42
  }
}
```

类的静态属性
```javascript
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}

// 老写法
class Foo {
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

类的私有属性，类之外是读取不到这个属性
```javascript
class Point {
  #x;

  constructor(x = 0) {
    #x = +x;
  }

  get x() { return #x }
  set x(value) { #x = +value }
}
```

new.target属性，返回new命令作用于的那个构造函数

如果构造函数不是通过new命令调用的，new.target会返回undefined
```javascript
class Point {
  #x;

  constructor(x = 0) {
    #x = +x;
  }

  get x() { return #x }
  set x(value) { #x = +value }
}
```

Mixin模式的实现
```javascript
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class DistributedEdit extends mix(Loggable, Serializable) {

}
```

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
