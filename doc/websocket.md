# websocket 学习笔记

## 问题与解答

### 1、websocket 与 http

websocket 是 H5 出得协议，和 http 没有关系，只是为了兼容浏览器的握手规范，算是 http 的一种补充。

有交集但是不是全部。

### 2、websocket 是什么样的协议，具有什么优点

(1)、http 协议

HTTP 的生命周期是通过 request 来界定的，一个 request对应一个 response。那么这次的请求就结束了。

在 1.1 中做了改造，可以发送多个 request, 接受多个 response 。一个 request = 一个 response， 而且 response 是被动的，不能主动发起。

(2)、websocket

```js
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket                          // 核心，告诉服务器我发起的是 websocket 协议
Connection: Upgrade                         // 核心，告诉服务器我发起的是 websocket 协议
Sce-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==  // 浏览器随机生成， 验证是否是真的 websokcet
Sec-WebSocket-Protocol: chat, superchat      // 用户定义的 websocket 的名称
Sec-WebSocket-Version: 13                    
Origin: http://example.com
```

服务器的返回

```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

### 3、websocket 的作用

`ajax轮询`: 浏览器每隔几秒发送一次请求。缺点：需要更快的速度

`long poll`: 客户端发起连接，如果未收到消息就不返回给客户端。 缺点：需要更多的 `电话`

### 4、 websokcet 的特点

- 建立在 TCP 协议之上，服务端的实现比较容易
- 与 HTTP 协议有很好的兼容性
- 数据格式比较轻量，性能开销小，通信高效
- 可以发送文本，也可以发送二进制数据
- 没有同源限制，客户端可以与任意服务器通信
  





