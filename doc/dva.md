# dva 文档

## 快速上手(最简结构在下面)

### 一、安装

```bash
$ npm install dva-cli -g
$ dva -v
dva-cli version 0.9.1
```

### 二、创建新应用

#### 1、创建新项目

```bash
$ dva new dva-quickstart
```

#### 2、启动开发服务器

```bash
$ cd dva-quickstart
$ npm start
```

#### 3、使用 antd

```bash
$ npm install antd babel-plugin-import --save
```

### 三、定义路由 及 代码架构功能

路由：可以想象成组成应用的不同页面

根据目录的分层我对此进行理解：

- `routers`:类似 `pages`,做页面的显示.

其格式大概就是：

```js
import React from 'react';

const ~(可以是你页面的名字)= (props) => {
  // 你页面的内容
}

export default ~;
```

完成以后记得到 `router.js` 里去添加路由信息到路由表中。

```js
<Route path="/products" exact component={Products} />
```

记得到 `index.js` 里载入它：

```js
app.model(require('./models/products').default);
```

- `models`:就像 `redux` 里的 `reducer`。

看一下基本的架构：

```js
export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
```

- `components`:封装出来的组件，代码格式和 `routers` 一样的。

### 四、来一个简单的项目

#### 1、初始化 state

通过 `/src/index.js` 下进行初始化代码：

```js
const app = dva({
  initialState: {
    products: [
      {name:'dva',id:1},
      {name:'antd',id:2},
    ]
  }
})
```

#### 2、传递 state 数据

来到 `router` 页面 定义主类改为：

```js
const Products = ({dispatch, products,~ }) =>{} //用 ES6 传递各种参数
```

修改 `export` 那一行的代码：

```js
import { connect } from 'dva';

export default connect(({ products }) => ({ products }))(Products);
```

#### 3、调用后台的方法

```js
dispatch({
  type:'',  // models:namespace/reducers 的方法
  payload:, //传递的参数
})
```

### 五、构建应用

```bash
$ npm run build
```

`build` 命令会打包所有的资源，你可以在 `dist/` 目录下找到这些文件。  

## Dva 概念

### 一、数据流向

数据的改变通常是用户交互行为或者浏览器行为(如路由跳转等)触发的。

此类行为通过 `dispatch` 发起一个 `action`

- 同步：直接通过 `Reducers` 改变 `State`
- 异步：先触发 `Effects` 流向 `Reducers` 最终改变 `State`

### 二、Route Components

在 dva 中， 通常需要 connect Model 的组件都是 Route Components,组织在 `/routes/` 目录下，而 `/components/` 目录下都是纯组件。

## 入门课(须看)


- Flux 单向数据流方案 以 redux 为例
- Reactive 响应式数据流方案 以Mobx 为例
- 其他 如：rxjs等

### 二、dva 应用的最简结构

```js
import dva from 'dva';
const App = () => <div>hello dva</div>;

// 创建应用
const app = dva(initialState:{});

// Model(可有可无)
app.model(require('./models/count').default);

// 注册视图
app.router(() => <APP />);  //这两种都可以
app.router(require('./router').default);  //如果你不在改页面上创建 App 的话就使用这种方案

// 启动应用
app.start('#root');
```

### 三、核心概念

- State:  一个对象，保存整个应用的状态
- View: React组件构成的视图层
- Action: 一个对象，描述事件
- connect:  一个函数，绑定 State 到 View
- dispatch: 一个函数，发送 Action 到 State

action: 描述已经发生的事件，告诉 store state哪些数据要更新

dispatch: 是一个函数方法，用来将 Action 发送给 State

![数据流图](gitImg\dva-1.jpg)

### 四、架构解释

#### 1、model 对象的属性

- `namespace`:当前 Model 的名称。整个应用的 state,由多个小的 Model 的 State 以 namespace 为 key 合成的。
- `state`:该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出。
- `reducers`:Action 处理器，处理同步动作，用来算出最新的 State
- `effects`:Action 处理器，处理异步动作

#### 2、Generator 函数

Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作(不管是同步还是异步的)。

#### 3、call 和 put

dva 提供多个 effect 函数内部的处理函数，比较常用的 `call` 和 `put`.

- `call`:执行异步函数
- `put`:发出一个 action ,类似于 dispatch

## 使用 dva 开发复杂 SPA

### 一、动态加载 model














