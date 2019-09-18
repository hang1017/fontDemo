# react 官网学习

## 一、Context

提供了一个无需为每层组件手动添加 props, 就能在组件树间进行数据传递的方法，直接看代码事例：

```js
const ThemeContext = React.createContext('light');

// 中间的组件也不必指明往下传递的 theme 了
<ThemeContext.Provider value='dark'>
  <Toolbar/>
</ThemeContext.Provider>

static contextType = ThemeContext;
return <Button theme={this.context} />
```

解释上面最后两行代码的意思：

- 指定 contextType 读取当前的 theme context
- React 会往上找到最近的 theme Provider 然后使用它的值

## 二、render props

(1)、什么是 render props

在 react 组件之间使用一个值为函数的 props 在 react 的组件间共享代码的简单技术

我的理解：一个组件通过 render 函数将里面的数据传递出来给另一个组件使用。

```js
// 在 Mouse 组件中提供可变数据源
render(){
  return (
    <div>{this.props.render(this.state)}</div>
  )
}

// 通过 render 函数将数据传递给 cat 组件
<Mouse render={mouse => {
  <Cat mouse={mouse} />
}}/>
```

## 三、Hook

组件不要变成复杂的容器，组件最佳写法是函数，而不是类，否则该组件会变得很重。大型组件难拆分和重构，也很难测试。

最早支持的纯函数不能包含状态，也不支持生命周期，因此无法取代类。

组件尽量写成纯函数，如果需要外部功能，就用钩子将外部代码钩进来。

### 1、useState()

`const  [buttonText, setButtonText] =  useState("Click me,   please");`

### 2、useContext()

```js
const AppContext = React.createContext({});

<AppContext.Provider value={{
  username: '111'
}}>
...
</AppContext.Provider>
```

```js
const { username } = React.useContext();
```

### 3、useReducer()

```js
const [state, dispatch] = useReducer(myReducer, { count: 0 })
```

### 4、useEffect()

用来引入






