
## 可用的样式

```
"alignItems",
"alignSelf",
"backfaceVisibility", 
"backgroundColor", 
"borderBottomColor",
"borderBottomLeftRadius",
"borderBottomRightRadius",
"borderBottomWidth",
"borderColor",
"borderLeftColor",
"borderLeftWidth",
"borderRadius",
"borderRightColor", 
"borderRightWidth",
"borderStyle", 
"borderTopColor",
"borderTopLeftRadius",
"borderTopRightRadius", 
"borderTopWidth", 
"borderWidth", 
"bottom",
"color", 
"flex", 
"flexDirection",
"flexWrap",
"fontFamily",
"fontSize", 
"fontStyle", 
"fontWeight", 
"height", 
"justifyContent",
"left",
"letterSpacing",
"lineHeight",
"margin",
"marginBottom", 
"marginHorizontal",
"marginLeft", 
"marginRight",
"marginTop",
"marginVertical",
"opacity",
"overflow",
"padding", 
"paddingBottom", 
"paddingHorizontal",
"paddingLeft",
"paddingRight", 
"paddingTop",
"paddingVertical",
"position",
"resizeMode",
"right", 
"rotation", 
"scaleX",
"scaleY", 
"shadowColor", 
"shadowOffset",
"shadowOpacity", 
"shadowRadius", 
"textAlign", 
"textDecorationColor",
"textDecorationLine",
"textDecorationStyle",
"tintColor", "top", 
"transform", 
"transformMatrix",
"translateX",
"translateY", 
"width",
"writingDirection"
```

## 原理

RN需要一个JS的运行环境， 在IOS上直接使用内置的javascriptcore， 在Android 则使用webkit.org官方开源的jsc.so

RN 会把应用的JS代码编译成一个js文件（一般命名为index.android.js),  RN的整体框架目标就是为了解释运行这个js 脚本文件

RN和hybiry开发方式的区别在于，虽然两者都是通过jsbridge 实现双向通信的，但是RN实现了react的布局直接映射到native布局的机制（ja中virtual DOM数据结构，通过jsbridge 传递到native， 然后根据数据属性设置各个对应的真实native的View）

RN的事件机制：例如Android， RN是一个普通的安卓程序加上一堆事件响应， 事件来源主要是JS的命令。主要有二个线程，UI main thread, JS thread。 UI thread创建一个APP的事件循环后，就挂在looper等待事件 , 事件驱动各自的对象执行命令。 JS thread 运行的脚本相当于底层数据采集器， 不断上传数据，转化成UI 事件， 通过bridge转发到UI thread, 从而改变真实的View。 后面再深一层发现， UI main thread 跟 JS thread更像是CS 模型，JS thread更像服务端， UI main thread是客户端， UI main thread 不断询问JS thread并且请求数据，如果数据有变，则更新UI界面。


## 参考

[https://yq.aliyun.com/articles/2757#](https://yq.aliyun.com/articles/2757#)


## 性能优化

* StyleSheet.create中使用多个`position:"absolute",zIndex:1`会影响native渲染性能，比如在列表中使用zIndex可能会造成app崩溃`Unfortunately,app has stopped`，亲测
