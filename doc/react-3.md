# React 学习理论篇

## 一、react 必须在作用域中

下面两个导入都是必须的，尽管 React 和 CustomButton 都没有在代码中被直接调用。

```js
import React from 'react';
import CustomButton from './CustomButton';
```

## 二、展开属性

如果传递的是整个对象，并且这个对象已经展开，你可以像下面 App2 那样传递

```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

## 三、使用 PropTypes 进行类型检查

```js
import PropTypes from 'prop-types';

~.propTypes = {
  // 你可以将属性声明为以下 JS 原生类型
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、子元素或数组）。
  optionalNode: PropTypes.node,

  // 一个 React 元素
  optionalElement: PropTypes.element,
};
```

更多详细内容请参照[官网](https://react.docschina.org/docs/typechecking-with-proptypes.html)

## 四、defaultProps设置默认值

```js
~.defaultProps = {
  name: 'Stranger'
};
```

## 五、静态类型检查

### Flow

在项目中添加 Flow

yarn:

```
yarn add --dev flow-bin
yarn run flow init
```

npm:

```
npm install --save-dev flow-bin
npm run flow init
```

最后在你的 package.json 中会加上 flow

**如果你是用的是 create-react-app 的话，就忽略上面的内容**


## 六、API

### 1、React.Component

React.Component 是 React 组件的基类

### 2、关于 ref 的简单用法

```js
//构造器
this.inputRef = React.createRef();

//render方法
render() {
    return <input type="text" ref={this.inputRef} />;
}

//焦点方法
componentDidMount() {
    this.inputRef.current.focus();
}

```









