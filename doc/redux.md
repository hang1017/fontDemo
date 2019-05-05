# redux 官网学习文档

## 安装

安装稳定版

```bash
npm install --save redux
```

附加包:[react绑定库](https://github.com/reduxjs/react-redux)和[开发者工具](https://github.com/reduxjs/redux-devtools)

```bash
npm install --save react-redux
npm install --save-dev redux-devtools
```

和 Redux 不同，很多 Redux 生态下的包并不提供 UMD 文件，所以为了提升开发体验，我们建议像 [Webpack](http://webpack.github.io/) 和 [Browserify](http://browserify.org/) 这样的 CommonJS模块打包器。

## 要点

问题一：为什么要编写 `reducers`

应用中所有的 `state` 都以一个对象树的形式存储在一个单一的 `store` 中。

唯一改变 `state` 的办法就是触发 `action`，一个描述发生了什么的对象。

编写 `reducers` 来描述如何改变 `state` 树。看个代码(官网有代码，下面的是我稍作修改的，用 ES6 写的)：

```js
// 定义一个方法 注意传参
counter = (state = 0,action) => { 
    switch(action.type) {
        case 'INCREMENT':
            return state+1;
        case 'DECREMENT':
            return state-1;
        default:
            return state;
    }
}

// 创建 store 用来存放应用的状态
let store = createStore(this.counter);

// 写个订阅更新，查看变化
store.subscribe(() => {
    console.log(store.getState());
})

// 改变内部 state 唯一方法是 dispatch 一个 action
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
```

## 介绍

### 一、核心概念

不直接修改 state 是 Redux 的核心理念之一

对象存放在 `state` 里，跟之前的区别就是没有 `setter` 方法，因此其他的代码不能随意的修改它，造成不可复线的 `bug`

要想更新数据就需要发起一个 `action`,强制描述应用中到底发生了什么变化。`action` 就像描述发生什么变化的指示器。

`reducer`：就是把 `action` 和 `state` 串起来。

`reducer`: 接收 `state` 和 `action` ，并返回新的 `state` 的函数

## 基础

### 一、Action

action 是把数据从应用传到 `store` 的有效载荷。

#### 1、type 

```js
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

在 `action` 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。一般被定义成常量。应用规模大时，建议使用单独的模块或文件来存放 `action`.

```js
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

#### 2、index

`action index`:来表示用户完成任务的动作序列号

```js
{
  type: TOGGLE_TODO,
  index: 5
}
```

在实际项目中，一般会在新建数据的时候生成唯一的ID作为数据的引用标识。

相比于在 `action` 中传递数据，传递 `index` 会比较好。

#### 3、type / filter

表示当前的任务展示选项。

```js
{
  type: SET_VISIBILITY_FILTER,
  filter: SHOW_COMPLETED
}
```

#### 4、Action 创建函数

`action` 和 `action 创建函数` 概念不同，要区分。

`action 创建函数`：生成 `action` 的方法，只是简单的返回一个 action.

创建函数，返回一个 action:

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

dispatch(addTodo(text))
```

### 二、Reducer

`Reducers`：指定了应用状态的变化，如何响应 `action`，并发送到 `store` 的。

### 三、Store

回顾之前所学，`action`：用来描述发生了什么，`reducers`:根据 `action`更新 `state`的用法

`Store`:将他们联系到一起的对象。

有一下职责：

- 维持应用的 `state`;
- 提供 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 方法获取 state;
- 提供 [`dispatch(action)`](https://www.redux.org.cn/docs/basics/Store.html) 方法更新 state;
- 通过 `subscribe(listener)` 注册监听器;
- 通过 `subscribe(listener)` 返回的函数注销监听器;

`Redux` 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 [`reducer组合`](https://www.redux.org.cn/docs/basics/Reducers.html#splitting-reducers) 看下面代码：

```js
import { createStore } from 'redux';
import todoApp from './reducers';
let store = createStore(todoApp);
```

#### 发起 Actions 补充上面的代码

```js
import {
  addTodo,toggleTodo,setVisibilityFilter,VisibilityFilters
} from './actions'

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(toggleTodo(0))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe();
```

## 数据流

### 一、生命周期的四个步骤

#### 1、调用 `store.dispatch(action)`

`Action` 就是描述 '发生了什么' 的普通对象：

```js
{ type: 'LIKE_ARTICLE', articleId: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

可以在任何地方调用 `store.dispatch(action)`

#### 2、Redux store 调用传入的 reducer 函数

`store` 会把这两个参数传入 `reducer`：当前的 state树 和 action。看下面的代码：

```js
 // 当前应用的 state（todos 列表和选中的过滤器）
let previousState = {
  visibleTodoFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Read the docs.',
      complete: false
    }
  ]
}

// 将要执行的 action（添加一个 todo）
let action = {
  type: 'ADD_TODO',
  text: 'Understand the flow.'
}

 // reducer 返回处理后的应用状态
 let nextState = todoApp(previousState, action)
```

注意：reducer 是纯函数，仅仅用于计算下一个 state,是可预测的。

#### 3、根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树

Redux 原生提供 `conbineReducers()` 辅助函数：把 `根reducer` 拆分成多个函数。用于处理 state 树上的一个分支。

```js
function todos(state = [],action){
  ...
  return nextState;
}

function visibleTodoFilter(state = 'SHOW_ALL',action) {
  ...
  return nextState; 
}

let todoApp = combineReducers({
  todos,
  visibleTodoFilter,
})
```

触发 `action` 后，返回的 todoApp 会负责调用两个 `reducer`;

将两个结合成并成一个 `state`树：(看下面代码)

```js
return {
   todos: nextTodos,
   visibleTodoFilter: nextVisibleTodoFilter
}
```

#### 4、Redux store 保存了 根reducer 返回的完成 state树

新的树就是应用的下一个 state。所有订阅 `store.subscribr(listener)` 的监听器都将被调用，监听器里可以调用 `store.getState()` 获取当前的 state.

## 搭配 React

### 一、安装 React Redux

```bash
npm install --save react-redux
```

### 二、组件区别

|scope | 展示组件| 容器组件|
|  :-:  | :-:  | :-:  |
作用|描述如何展现（骨架、样式）|描述如何运行（数据获取、状态更新）
直接使用 Redux|否|是
数据来源|props|监听 Redux state
数据修改|从 props 调用回调函数|向 Redux 派发 actions
调用方式|手动|通常由 React Redux 生成

### 三、设计组件层级结构

#### 1、实现容器组件

从技术上讲，容器组件就是使用 `store.subscribe()` 从 Redux state 树中读取部分数据，通过 props 把这些数据提供给要渲染的组件。

建议使用 React Redux 库的 `connect()` 方法来生成的。这个方法做了性能优化来避免很多不必要的重复渲染。

在使用 `connect()` 前，需要先定义 `mapStateToProps` 这个函数来指定如何把当前的 Redux store props 映射到展示组件的 props 中。

## 异步 Action

### 一、Action

调用异步 API 时，有两个非常关键的时刻：发起请求的时刻，接收到响应的时刻。

每个 API 请求都需要 `dispatch` 至少三种 `action`：

- 通知 reducer 请求开始的 action;
- 通知 reducer 请求成功的 action;
- 通知 reducer 请求失败的 action;

两种方式来区分：

第一种：action 中添加一个专门 `status` 字段作为标记位：

```js
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }
```

第二种：定义不同的 `type`:

```js
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

### 二、同步 Action 创建函数 (Action Creator)

把 `REQUEST_POSTS` 和 `SELECT_SUBREDDIT` 或 `INVALIDATE_SUBREDDIT` 分开很重要

```js
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
```

### 三、设计 State 结构

1、分开存储 subreddit 信息，是为了缓存所有的 subreddit 时，可以立即更新，同时在需不要动额时候可以不请求数据。

2、每个帖子的 列表都需要使用 isFetching 来显示进度条

- `didInvalidate`：标记数据是否过期
- `lastUpdated`: 存放数据最后更新的时间
- `fetchedPageCount` 和 `nextPageUrl`:与分页相关
- `items`:存放列表信息本身

### 四、处理 Action

使用 ES6 计算属性语法，使用 `Object.assign()` 来简洁高效的更新 `state[action.subreddit]` ,看下面代码：

```js
return Object.assign({}, state, {
  [action.subreddit]: posts(state[action.subreddit], action)
})
```

我们提取出 `post(state,action)` 来管理指定帖子列表的 state.

## 异步数据流

默认情况下，`createStore()` 所创建的 Redux store 没有使用 middleware,所以只支持同步流。

可以使用 `applyMiddleware()` 来增强 `createStore()`

## Middleware

middleware:可以被嵌入在框架接收请求到产生响应过程之中的代码。

最优秀的特性：可以被链式组合。可以在一个项目中使用多个独立的第三方 middleware.

提供：位于 action 被发起之后，达到 reducer 之前的扩展点。可以用来进行日志记录、创建崩溃报告、调用异步接口或者路由等

### 一、手动记录日志

#### 1、手动记录

```js
let action = addTodo('Use Redux')

console.log('dispatching', action)
store.dispatch(action)
console.log('next state', store.getState())
```

#### 2、封装 Dispatch

```js
function dispatchAndLog(store, action) {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('next state', store.getState())
}
```

#### 3、Monkeypatching Dispatch

```js
let next  = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching',action);
  let result = next(action);
  console.log('',result);
  return result;
}

```

#### 省略很多，直接跳 最终方法

```js
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```

将他们引用到 Redux store 中：

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'

let todoApp = combineReducers(reducers)
let store = createStore(
  todoApp,
  // applyMiddleware() 告诉 createStore() 如何处理中间件
  applyMiddleware(logger, crashReporter)
)
```

#### 示例在官网-高级-Middleware-最下方 自行查找观看

## React Router (路由)

### 安装

```bash
npm install --save react-router
```

### 一、配置后备(fallback) URL

如果是用 `create-react-app` 来创建项目，会自动帮你配置好后备 URL

#### 1、配置 Express

如果你使用的是 Express 来返回 index.html 页面，可增加代码带你的页面中

```js
app.get('/*', (req,res) => {
  res.sendfile(path.join(__dirname, 'index.html'))
})
```
 
#### 2、配置 WebpackDevServer

如果你正在使用 webpackDevServer 来返回你的 index.html 页面，可在 `webpack.config.dev.js` 增加如下配置：

```js
devServer: {
  historyApiFallback: true,
}
```

### 二、连接 React Router 和 Redux 应用

#### 1、<Router />

导入需要用到的组件：

```js
import { Router, Route, browserHistory } from 'react-router';
```

通常我们会用 `<Router />` 包裹 `<Route />`

当 URL 变化的时候，`<Router />` 将会匹配到指定的路由，然后渲染路由绑定的组件

`<Route />` 显式把路由映射到应用的组件结构上。用 `path` 指定 URL，用 `component` 指定路由命中 URL 后需要渲染的那个组件。

```js
const Root = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>  
);
```

如果你的 URL 中有 `#` 出现，想将此移除，可以导入 `browserHistory` 来实现

```js
<Router history={browserHistory}>
  <Route path='/(:filter)' component={App} />   //有看到不懂得代码可以看下面
</Router>
```

#### 2、<Provider />

`<Provider />`是由 React Redux 提供的高阶组件，用来让你将 Redux 绑定到 React

导入：

```js
import { Provider } from 'react-redux';
```

我们将使用 `<Provider />` 包裹 `<Router />`，以便路由器可以访问 `store`

```js
const Root = ({ store }) => {
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>  
  </Provider>
}
```

当我们想从 URL 中读取参数 `(:filter)`:

```js
<Route path='/(:filter)' component={App} />
```

来一个完成得代码：components/Root.js

```js
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
```

### 三、通过 React Router 导航

React Router 提供了 `<Link />` 来实现导航功能

修改我们的容器组件 `<FilterLink />`,使用此来改变 URL。你可以通过 activeStyle 属性来指定激活状态的样式。

看代码：(containers/FilterLink.js)

```js
import { Link } from 'react-router';

const FilterLink = ({ filter,children }) => (
  <Link
    to={filter === 'all' ? '': filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </Link>
)

export default FilterLink;
```

使用如上组件的示例：(components/Footer.js)

```js
import FilterLink from '../containers/FilterLink'

const Footer = () => {
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="active">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="completed">
      Completed
    </FilterLink>
  </p>
}

export default Footer
```

## 迁移到 Redux 

### 步骤

- 1、 创建一个 `createFluxStore(reducer)` 函数，通过 reducer 函数适配你当前项目的 Flux Store。

dispatch 处理器应该根据不同的 action 来调用不同的 reducer.

保存新的 state并抛出更新事件。这个过程你的其他部分代码感知不到任何变化。

- 2、重写 Store 时，你会发现你应该避免一些明显违反 Flux 模式的是使用方法，如： Store 中请求API、或者在 Store 中触发 action。

- 3、当你所有的 Flux Store 全部基于 reducer 来实现时，你可以利用 `combineReducers(reducers)` 将多个 reducer 合并到一起。

- 4、使用 react-redux 或者类似的库来处理的你的 UI 部分。

- 5、最后，你可以使用一些 Redux 的特性，例如利用 middleware 来进一步简化异步的代码。

## 服务端渲染

如果需要用到 express 来做小型的 web 服务器，需要安装依赖库

```bash
npm install --save express react-redux
```

## 直接看 常见问题

### 何时使用redux

数据处于合理的变动之中、需要一个单一的数据源、在 React 顶层组件 state 中维护所有内容的办法已经无法满足需求。就需要用到了。

不是为了编写最短、最快的代码

为了解决：当有确定的状态发生改变时，数据从哪里来。

遵循特定的约定：应用的状态需要存储位纯数据的格式，用普通的对象描述状态的改变、用不可更新的纯函数式的方式来处理状态变化。

### 如何在 reducer 之间共享 state?

- 如果一个 reducer 想获取其它 state 层的数据，往往意味着 state 树需要重构，需要让单独的 reducer 处理更多的数据。



















