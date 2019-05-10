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

应用启动时不需要全部启动 model,如果每个页面的功能是通过路由来切换的话。互相之间没有关系，通常会使用 `webpack` 下的 `require.ensure` 来做代码模块的懒加载。具体代码如下：

```js
function RounterConfig({ history, app }) {
  const routes = [
    {
      path:'/users',
      name:'Users',
      getComponent(nextState,cb) {
        require.ensure([],(require) => {
          registerModel(app,require('./models/users'));
          cb(null,require('./routes/Users'));
        })
      }
    }
  ]
  return <Router history={history} routes={routes} />;
}
```

### 二、使用 model 共享全局信息

有些场景是可以做到全局 model 的。

如：路由进退，model 可以用于路由间的数据共享。例子：列表页和详情页

如果当前应用需要加载不止一个 model,`effects` 里的 `select` 操作可以获取别的 model 里的 `state`.如：

```js
*foo(action,payload) {
  const { a, b } = yield select();
}
```

作用：将数据存在对应的 model 中，分别通过不同的 `effect` 去更新，在获取的地方组合，提高 model 的复用性。

### 三、动态扩展 model

共享需求存在这样一种情况：业务视图差不多，但存在少量的差别。所以需要进行 model 扩展

- 新增一些东西
- 覆盖一些原有东西
- 根据条件动态创建一些东西

借助 dva 社区 `dva-model-extend` 库来做这件事

或者通过函数工厂来生成 model,如：

```js
function createModel(options) {
  const { namespace, param } = options;
  return (
    namespace:'',
    states:{},
    reducers:{},
    effects:{
      *foo(){
        yield call()
      }
    },
  )
}

const modelA = createModel({ namespace:'A', param:{ type: 'A' } });
const modelB = createModel({ namespace:'A', param:{ type: 'B' } });
```

### 四、多次调用

在一个 `effect` 中，可以使用多个 `put` 来分别调用 `reducer` 来更新状态。

在一个 `effect` 中，可以存在多个 `call` 操作。

### 五、多任务调度

- 并行。若干任务之间不存在依赖关系，并且后续操作对他们的结果无依赖
- 竞争。只有一个完成，就进入下一个环节
- 子任务。若干任务，并行执行，全部做完之后，才能执行下一个环节。

#### 并行

```js
const [ result1,result2 ] = yield [
  call(service1,param1),
  call(service2,param2),
]
```

#### 竞争

```js
const { result1, result2 } = yield race({
  result1: call(service, 'aa'),
  result2: call(delay, 1000),
});

if(result1) {
  put({ type:'~',result1 });
}else if(result2){
  put({ type:'~s' })
}
```


#### 子任务

可以参照上面 `四、多任务调度` 的方法












