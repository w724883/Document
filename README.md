#闭包
理解：1.在function内var一个变量，function外部是无法访问到该变量，闭包搭建了一个桥梁，让函数外能够访问内部变量。2.闭包访问的变量会保存在内存之中。3.同个声明的两个闭包之间没有关联。

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

var result=f1();

result(); // 999

nAdd();

result(); // 1000

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

http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance.jpg

二、构造函数

构造函数是用来新建同时初始化一个新对象的函数。

所以，结论是：任何一个函数都可以是构造函数。

三、原型

根据前面空函数的创建图示，我们知道每个函数在创建的时候都自动添加了prototype属性，这就是函数的原型，从图中可知其实质就是对一个对象的引用（这个对象暂且取名原型对象）。
围绕刚才创建的空函数，这次给空函数增加一些代码：

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
 
根据“函数创建”过程，图解如下：

http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance2.jpg

简单说原型就是函数的一个属性，在函数的创建过程中由js编译器自动添加。

先了解下new运算符，如下：

var a1 = new A;

var a2 = new A;


这是通过构造函数来创建对象的方式，那么创建对象为什么要这样创建而不是直接var a1 = {};呢？这就涉及new的具体步骤了，这里的new操作可以分成三步(以a1的创建为例)：

1、新建一个对象并赋值给变量a1：var a1 = {};

2、把这个对象的[[Prototype]]属性指向函数A的原型对象：a1.[[Prototype]] = A.prototype

3、调用函数A，同时把this指向1中创建的对象a1，对对象进行初始化：A.apply(a1,arguments)

其结构图示如下：

http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance3.jpg

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

图示如下，其中红色部分代表原型链：

http://jbcdn2.b0.upaiyun.com/2012/05/JavaScript-prototypes-and-inheritance4.jpg

(出自：http://blog.jobbole.com/19795/)

#跨域
一.JSONP
