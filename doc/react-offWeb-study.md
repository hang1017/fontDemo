# react 官网学习

## Context

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


