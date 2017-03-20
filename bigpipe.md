index.html
```html
<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>zchq88-bigpipe</title>
</head>
<body>
<div id="test1">loading......</div>
<div id="test2">loading......</div>
<script>
  var Bigpipe=function(){
      this.callbacks={};
  }

  Bigpipe.prototype.ready=function(key,callback){
      if(!this.callbacks[key]){
          this.callbacks[key]=[];
      }
      this.callbacks[key].push(callback);
  }

  Bigpipe.prototype.set=function(key,data){
      var callbacks=this.callbacks[key]||[];
      for(var i=0;i<callbacks.length;i++){
          callbacks[i].call(this,data);
      }
  }
</script>
<script>
    var bigpipe=new Bigpipe();
    bigpipe.ready('pagelet1',function(data){
        $("#test1").html("test1 ready");
    })
    bigpipe.ready('pagelet2',function(data){
        $("#test2").html("test2 ready");
    })
</script>
</body>
</html>
```
服务端app.js

```javascript
var express = require('express');
var path = require('path');
var http = require('http');
var ejs = require('ejs');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.get('/index.html', function (req, res) {
    res.render('index', { title: "测试" }, function (err, str) {
        res.write(str)
    })
    var Pagelets_list ={
        pagelet1:false,
        pagelet2:false
    }
    var data = {is: "true"};
    function is_end(Pagelets) {
        Pagelets_list[Pagelets]=true;
        for (x in Pagelets_list) {
            if(!Pagelets_list[x]){
                return;
            }
        }
        res.end();
        return;
    }

    function Pagelets(Pagelets) {
        res.write('<script>bigpipe.set("' + Pagelets + '",' + JSON.stringify(data) + ');</script>');
        is_end(Pagelets)
    }
    setTimeout(function(){Pagelets("pagelet1");},1000);
    setTimeout(function(){Pagelets("pagelet2");},3000);
});

http.createServer(app).listen(3000);
```
