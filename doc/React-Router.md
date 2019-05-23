# React Router 路由

## 介绍

什么是 React Router?

这是一个基于 React 之上的强大路由库，它可以让你向应用中快速添加视图和数据流，同时保持页面与 URL 间的同步。

## 一、安装

```bash
$ npm install --save react-router
```

再页面中的使用

```js
// 使用 ES6 的转译器，如 babel
import { Router, Route, Link } from 'react-router'
```

## 二、路由配置

路由配置：是一组命令，用来告诉 router 如何匹配 URL，以及匹配后如何执行代码

### 1、例子

```js
import React from 'react'
import { Router, Route, Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)
```

### 2、添加首页

```js
<IndexRoute component={Dashboard} />
```

当 URL 为 `/` 时，页面会渲染 `Dashboard`.

### 3、兼容旧的 URL 或 错误的 URL

可以使用 `Redirect` 让 URL 重新工作

```js
import { Redirect } from 'react-router'

<Route path="inbox" component={Inbox}>
    <Route path="/messages/:id" component={Message} />

    {/* 跳转 /inbox/messages/:id 到 /messages/:id */}
    <Redirect from="messages/:id" to="/messages/:id" />
</Route>
```

### 4、进入和离开的 Hook

Route 可以定义 `onEnter` 和 `onLeave` 两个 Hook,这些 Hook 会在页面跳转时触发一次。

`onLeave`:会在将要离开的路由中触发，从最下面的子路由开始到最外层的父路由结束。

`onEnter`:会从最外层的父路由开始直到最下层的子路由结束。

举个官网例子：

如果从 `/messages/5` 跳转到 `/about`,下面这些 hook 的执行顺序：

- `/message/5:id` 的 `onLeave`
- `/inbox` 的 `onLeave`
- `/about` 的 `onEnter`

### 5、替换的配置方式

因为 `route` 一般被嵌套语法的结构来描述他们的关系非常方便。也可以使用原生的 `route` 数组对象。来看官网例子：

```js
const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: 'about', component: About },
      { path: 'inbox',
        component: Inbox,
        childRoutes: [
          { path: '/messages/:id', component: Message },
          { path: 'messages/:id',
            onEnter: function (nextState, replaceState) {
              replaceState(null, '/messages/' + nextState.params.id)
            }
          }
        ]
      }
    ]
  }
]

React.render(<Router routes={routeConfig} />, document.body)
```

## 三、路由配置原理

路由拥有三个属性来决定是否匹配 一个 URL：

- 1、嵌套关系
- 2、路径语法
- 3、优先级

来看一下 `嵌套语法`：

- 1、`:paramsName`:匹配一段位于 `/`、`?`、`#` 之后的 URL。命中的部分将被作为一个参数。
- 2、`()`:在它内部的内容被认为时可选的。
- 3、`*`:匹配任意字符，直到命中下一个字符或者整个 URL的末尾 并创建一个 `splat` 参数。

可以来看一下官网的例子：

```js
<Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael 和 /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
```

相对路径：完整的路径将由它的所有祖先节点的路径和自身指定的相对路径拼接而成。

绝对路径：可以使路由匹配行为忽略嵌套关系。

### 2、默认路由(IndexRoute):

```js
<IndexRoute component={Home}/>
```

## 四、History

一个 `history` 知道如何去监听浏览器地址栏的变化，并解析这个 URL 转化为 `location` 对象，然后 router 使用它匹配到路由。

常用的三种 `history` 的形式：

- browserHistory
- hashHistory
- createMemoryHistory

使用如下：

```js
import { browserHistory } from 'react-router';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)
```

### 1、browserHistory

react router 的应用推荐的 `history`.它使用浏览器中的 History API 用于处理 URL，创建一个像 `example.com/some/path` 这样真实的 URL。

### 2、hashHistory

使用 URL 中的 hash(`#`) 部分去创建 `example.com/#/some/path` 的路由。

## 高级用法

### 一、动态路由

路由是个非常适合做代码拆分的地方：它的责任就是配置好每个 `view`.

React router 里的路径匹配以及组件加载都是异步完成的，不仅允许你延迟加载组件，**而且可以延迟加载路由配置**。

在首次加载包中，你只需要有一个路由定义，路由就会自动解析剩下的路径。

Route 可以定义 `getChildRoutes`、`getIndexRoute`、`getComponents`。

上面这三个函数都是异步执行，并且只有在需要时才被调用。我们称这种方法为 '逐渐匹配'。会逐渐匹配 URL，并且只加载该 URL 对应页面所需的路径配置和组件。

如果需要看代码，请看[官网](http://react-guide.github.io/react-router-cn/docs/guides/advanced/DynamicRouting.html);

### 二、跳转前确认

React Router 提供一个 `routerWillLeave` 生命周期钩子。这使得组件可以拦截正在发生的跳转，或在离开 `route` 前提示用户。

两种返回值：

- 1、`return false`:取消此次跳转
- 2、`return`:返回提示信息，在离开 route 前提示用户进行确认。

```js
import { Lifecycle } from 'react-router';

const Home = React.createClass {

  // 假设 Home 是一个 route 组件，它可能会使用 Lifecycle mixin 去获取 routerWillLeave 的方法
  mixins:[ Lifecycle ],

  routerWillLeave(nextLocation) {
    if(!this.state.isSaved) {
      return '你的 work 将不会被保存，你确定嘛？';
    }
  }
}
```

深层嵌套的组件中使用 `routerWillLeave` 钩子，只需在 route 组件中引入 `RouteContext` mixin,这样就会把 `route` 放到 context 中。

```js
import { Lifecycle, RouteContext } from 'react-router'

const Home = React.createClass({
  
  // route 会被放到 Home 和它子组件还有子孙组件中去
  // 这样在层级 Home 以及所有子孙组件都可以拿到 route
  mixins:[ RouteContext ],
  reder(){
    return <NestedForm />
  }
})

const NestedForm = React.createClass({

  // 后代组件使用 Lifecycle mixin 获得
  // 一个 routerWillLeave 的方法。
  mixins:[ Lifecycle ];
  routeWillLeave(nextLocation) {
    if(!this.state.isSaved) {
      return '你的 work 将不会被保存，你确定嘛？';
    }
  }
})
```

### 三、服务端渲染

为什么要服务端渲染：

- 1、发生错误时发送一个 `500` 的响应
- 2、需要重定向时发送一个 `30x` 的响应
- 3、在渲染之前获得数据(用 `router` 帮你完成)


怎么用：

- 1、使用 `match` 在渲染之前根据 `location` 匹配 `router`
- 2、使用 `RoutingContext` 同步渲染 `router` 组件

```js
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '.routes'; 

serve((req,res) => {
  // 注意！！ 这里的 req.url 应该时从初始请求中获得的
  // 完整的 URL 路径，包括查询字符串
  match({ routes, location: req.url },(error, redirectLocation, renderProps) => {
    if(error) {
      res.send(500,error.message);
    }else if(redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }else if(renderProps) {
      res.send(200, renderToString(<RoutingContext {...renderProps} />));
    } else {
      res.send(404, 'Not found')
    }
  })
})
```

### 四、组件生命周期

路由切换时，组件生命周期的变化情况

```js
<Route path="/" component={App}>
  <IndexRoute component={Home}/>
  <Route path="invoices/:invoiceId" component={Invoice}/>
  <Route path="accounts/:accountId" component={Account}/>
</Route>
```

#### 1、当用户打开 '/' 页面

|组件|生命周期|
|:--|:--|
|App|componentDidMount|
|Home|componentDidMount|
|Invoice|NA|
|Account|NA|

#### 2、从 '/' 跳转到 '/invoice/123'

|组件|生命周期|
|:--|:--|
|App|componentWillReceiveProps、componentDidUpdate|
|Home|componentWillUnmount|
|Invoice|componentDidMount|
|Account|NA|

#### 3、从 `/invoice/123` 跳转到 `/invoice/789`

|组件|生命周期|
|:--|:--|
|App|componentWillReceiveProps、componentDidUpdate|
|Home|NA|
|Invoice|componentWillReceiveProps、componentDidUpdate|
|Account|NA|

 #### 4、从 `/invoice/789` 到 `/accounts/123`

|组件|生命周期|
|:--|:--|
|App|componentWillReceiveProps、componentDidUpdate|
|Home|NA|
|Invoice|componentWillUnmount|
|Account|componentDidMount|

#### 5、获取数据

```js
let Invoice = React.createClass({
  getInitialState() {
    return {
      invoice:null,
    }
  }

  componentDidMount() {
    // 初始化数据
    this.fetchInvoice();
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.invoiceId;
    let newId = this.props.params.invoiceId;
    if(oldId !== newId) {
      this.fetchInvoice();
    }
  }

  componentWillUnmount() {
    this.ignoreLastFetch = true;
  }

  // 这个是获取数据的方法
  fetchInvoice(){     
  let url = '/api/invoices/${this.props.params.invoiceId}';
  this.request = fetch(url,(err,data) => {
    if(!this.ignoreLastFetch) {       // 这个判断在上面
      this.setState({
        invoice:data.invoice,
      })
    }
  })

render () {
    return <InvoiceView invoice={this.state.invoice}/>
  }
})

```










