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

# 转码结果输出到标准输出

$ babel example.js

# 转码结果写入一个文件

# --out-file 或 -o 参数指定输出文件

$ babel example.js --out-file compiled.js

# 或者

$ babel example.js -o compiled.js

# 整个目录转码

# --out-dir 或 -d 参数指定输出目录

$ babel src --out-dir lib

# 或者

$ babel src -d lib

# -s 参数生成source map文件

$ babel src -d lib -s

let的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
