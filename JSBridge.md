
[https://github.com/lzyzsd/JsBridge](https://github.com/lzyzsd/JsBridge)


- Andriod

原理，java中的方法`WebView.loadUrl("JavaScript:function()")`可以直接执行js


```java
public class JSBridgeWebChromeClient extends WebChromeClient {
    @Override
    public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
        result.confirm(JSBridge.callJava(view, message));
        return true;
    }
}

mWebView.setWebChromeClient(new JSBridgeWebChromeClient());
```
当页面调用`prompt()`时会触发onJsPrompt方法

另一种实现js调用客户端方法的途径是：

```java
public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        JavaScriptInterface JSInterface;
        WebView wv;
        wv = (WebView) findViewById(R.id.webView1);
        wv.getSettings().setJavaScriptEnabled(true); // 设置javascript 可用
        JSInterface = new JavaScriptInterface(this);
        wv.addJavascriptInterface(JSInterface, "JSInterface"); // 设置js接口  第一个参数事件接口实例，第二个是实例在js中的别名，这个在js中会用到
        wv.loadUrl("file:///android_asset/test.html");
    }
    public class JavaScriptInterface {
        Context mContext;
        JavaScriptInterface(Context c) {
            mContext = c;
        }
 
        @JavascriptInterface
        public void changeActivity() {
            Intent i = new Intent(MainActivity.this, NextActivity.class);
            startActivity(i);
            finish();
        }
    }
 
}
```
`JSInterface`是一个java代码实例用于实现客户端上的能力，`addJavascriptInterface`方法将JSInterface通过别名`"JSInterface"`的方式注入到webview中，即js环境能直接调用这个别名


从而实现双向通信


-IOS

UIWebView是iOS内置的浏览器控件，UIWebView用于在APP中嵌入网页（iOS8新增了一个WKWebView），有以下

属性：

loading：是否处于加载中

canGoBack：A Boolean value indicating whether the receiver can move backward. (只读)

canGoForward：A Boolean value indicating whether the receiver can move forward. (只读)

request：The URL request identifying the location of the content to load. (read-only)

方法：

loadData：Sets the main page contents, MIME type, content encoding, and base URL.

loadRequest：加载网络内容

loadHTMLString：加载本地HTML文件

stopLoading：停止加载

goBack：后退

goForward：前进

reload：重新加载

stringByEvaluatingJavaScriptFromString：执行一段js脚本，并且返回执行结果


native调用js代码

```swift
// Swift
webview.stringByEvaluatingJavaScriptFromString("Math.random()")
// OC
[webView stringByEvaluatingJavaScriptFromString:@"Math.random();"];
```

js调用native代码

在UIWebView内发起的所有网络请求，都可以通过delegate函数在Native层得到通知


```javascript
var url = 'jsbridge://doAction?title=分享标题&desc=分享描述&link=http%3A%2F%2Fwww.baidu.com';
var iframe = document.createElement('iframe');
iframe.style.width = '1px';
iframe.style.height = '1px';
iframe.style.display = 'none';
iframe.src = url;
document.body.appendChild(iframe);
setTimeout(function() {
    iframe.remove();
}, 10);
```

```swift
func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        print("shouldStartLoadWithRequest")
        let url = request.URL
        let scheme = url?.scheme
        let method = url?.host
        let query = url?.query

        if url != nil && scheme == "jsbridge" {
            print("scheme == \(scheme)")
            print("method == \(method)")
            print("query == \(query)")

            switch method! {
                case "getData":
                    self.getData()
                case "putData":
                    self.putData()
                case "gotoWebview":
                    self.gotoWebview()
                case "gotoNative":
                    self.gotoNative()
                case "doAction":
                    self.doAction()
                case "configNative":
                    self.configNative()
                default:
                    print("default")
            }

            return false
        } else {
            return true
        }
    }
```
从而实现双向通信
