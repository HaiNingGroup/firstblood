# 前端高手(2020/12/22)

## 性能优化

#### script 标签：调整加载顺序提升渲染速度

由于浏览器的底层运行机制，渲染引擎在解析 HTML 时，若遇到 script 标签引用文件，则会暂停解析过程，同时通知网络线程加载文件，文件加载后会切换至 JavaScript 引擎来执行对应代码，代码执行完成之后切换至渲染引擎继续渲染页面。

在这一过程中可以看到，页面渲染过程中包含了请求文件以及执行文件的时间，但页面的首次渲染可能并不依赖这些文件，这些请求和执行文件的动作反而延长了用户看到页面的时间，从而降低了用户体验。

为了减少这些时间损耗，可以借助 script 标签的 3 个属性来实现。

- async 属性。立即请求文件，但不阻塞渲染引擎，而是文件加载完毕后阻塞渲染引擎并立即执行文件内容。

- defer 属性。立即请求文件，但不阻塞渲染引擎，等到解析完 HTML 之后再执行文件内容。

- HTML5 标准 type 属性，对应值为“module”。让浏览器按照 ECMA Script 6 标准将文件当作模块进行解析，默认阻塞效果同 defer，也可以配合 async 在请求完成后立即执行。

## 函数 Tail Call 尾调用
- 尾调用由于是在 return 语句中，并且是函数的最后一步操作，所以局部变量等信息不需要再用到，从而可以立即释放节省内存空间。

下面的示例代码通过递归实现了求斐波那契额数列第 n 个数的功能。函数 fibTail() 相对于函数 fib() 就同时使用了尾调用以及减少调用次数两种优化方式。

```
  function fib(n) {
    if (n < 3) return 1
    return fib(n-1) + fib(n-2)
  }
  function fibTail(n, a = 0, b = 1) {
    if (n === 0) return a
    return fibTail(n - 1, b, a + b)
  }

```

## TCP 
* 建立链接 传输数据 断开链接
* 在建立 TCP 连接之前，客户端和服务器之间会发送三次数据，以确认双方的接收和发送能力，这个过程称为三次握手（Three-way Handshake）

## 为什么建立连接只通信了三次，而断开连接却用了四次？

因为当服务端收到客户端的 FIN 报文后，发送的 ACK 报文只是用来应答的，并不表示服务端也希望立即关闭连接。

当只有服务端把所有的报文都发送完了，才会发送 FIN 报文，告诉客户端可以断开连接了，因此在断开连接时需要四次挥手。

## 请求跨域解决方案

#### 核心原因，为什么会有跨域
* 浏览器的同源策略 (Same Origin Policy)
Origin 是有 URL 中 协议、主域名和默认端口号443共同组成，当一个源访问另外一个源就会产生跨源，最常见的跨源场景是域名不同，即常说的跨域。
同源策略在保障安全的同时也带来不少问题，比如 iframe 中的 子页面 与父页面无法通信，浏览器与其他服务端无法交互数据

#### 请求跨域解决方案

1. 跨域资源共享(CORS  Cross-Origin Resource Sharing) 是浏览器为AJAX请求设置的一种跨域机制，让其在服务端允许的情况下进行跨域访问，主要
通过HTTP响应头来告诉浏览器 服务端是否允许当前域的脚本进行跨域访问。

CORS将AJAX请求分为两类，简单请求和非简单请求，其中简单请求符合下面两个特征。
  - 请求方法为 GET POST HEAD
  - 请求头只能使用以下字段： Accept Accept-language Content-Type: only text/plain、mulitpart/form-data application/x-www-form-urlencoded Content-Language Save-Data


 简单请求解决办法
  - 浏览器发出简单请求的时候，会在请求头部增加一个 Origin 字段，对应的值为当前请求的源信息
  - 服务端收到请求后，会根据请求字段 Origin 做出相应的判断后返回相应的内容
  - 浏览器收到相应报文 会根据响应头部字段 Access-Control-Allow-Origin 进行判断，

非简单请求解决办法
  - 浏览器会先发出一个 预检请求 (Prefight), 这个预检请求为 OPTIONS 方法，并会添加一个请求头部字段 Access-Control-Request-Method 值为跨域请求所使用的请求方法
  - 服务端收到预检测请求后，会返回 允许的 Origin还会添加允许的 Methods 并且会返回 204状态🐎


2. JSONP

JSONP(JSON with Padding) 的大概意思就是用 JSON数据来填充，以来 Script 标签跨域引用js文件不会收到浏览器同源策略的限制

存在问题
  1. 只能发送 GET 请求，限制了参数的大小和类型
  2. 请求过程无法终止，导致若网络下处理超时时比较麻烦
  3. 无法捕获服务端返回的异常信息

3. Websocket HTML5 提出的应用层全双工协议，适用于浏览器和服务器进行实时通信场景

4. 代理转发

  ```
    module.exports = {
    //...
    devServer: {
      proxy: {
        '/api': 'http://localhost:3000'
      }
    }
  };
  ```

  5. postMessage 

  `window.open()`


  6. 改域 iframe 子页面修改成和 父页面一样的域名 document.domain


  7. https 自认证 ： `https://devcenter.heroku.com/articles/ssl-certificate-self`

  

