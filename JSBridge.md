
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

从而实现双向通信


-IOS

原理，通过iframe
