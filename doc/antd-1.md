# Ant Design 官网教程学习

## 安装

先创建一个 create-react-app 项目(可以使用 npx)

使用 npm 或 yarn 安装

```
$ npm install antd --save

$ yarn add antd
```

###  react-app-rewired

如果我们加载了全部的 antd 组件对前端性能可能是个隐患

这时我们可以[安装](https://github.com/timarney/react-app-rewired) `react-app-rewired` 对 `create-react-app` 的默认配置进行自定义

```
$ npm install react-app-rewired --save-dev
```

### customize-cra

引入 react-app-rewired 可以修改 `package.json` 里的启动配置。但是由于 `react-app-rewired@2.x ` 版本问题，你还需要[安装](https://github.com/arackaf/customize-cra) `customize-cra`

```
$ yarn add react-app-rewired customize-cra
```

### 修改 package.json 文件

找到根目录的 package.json 文件

找到一下内容并进行修改

```json
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

### 创建 config-overrides.js

还是在根目录下创建一个 `config-overrides.js` 文件

用于修改默认配置

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

### 安装并使用 babel-plugin-import

用于按需加载组件代码和样式的插件

我们现在[安装](https://github.com/ant-design/babel-plugin-import)它，并用于修改 `package.json`

```
npm install babel-plugin-import --save-dev
```

修改 `config-overrides.js` 文件

```js
const { override, fixBabelImports } = require('customize-cra');

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
    //  style: 'css',
      style:true,
   }),
```

### 尝试运行

给 App.js 插入一条数据

```html
<Button type="primary">Button</Button>
```

现在运行 npm 看看样式

如果你发现现在好看的样式还没出来的话不要着急

在 App.css 下加上：

```css
@import '~antd/dist/antd.css';
```

现在属于 antd 的样式就显示出来了，但是如果你用上面这条命令的话，前端页面会加载说有的数据，导致浏览器压力

所以我们可以注释掉上面那句话

在 APP.js 中加上：

```js
import { Button } from 'antd';
```

通过上面的代码及能做到 让 antd 组件按需加载

### 自定义主题

自定义主题需要用到 less 变量覆盖功能。

我们可以引入 customze-cra 中提供的 less 相关的函数 addLessLoader 来帮助加载 less 样式，同时修改 `config-overrides.js` 文件

```
npm i less
```

修改 `config-overrides.js` 文件

```js
- const { override, fixBabelImports } = require('customize-cra');
+ const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
-   style: 'css',
+   style: true,
  }),
+ addLessLoader({
+   javascriptEnabled: true,
+   modifyVars: { '@primary-color': '#1DA57A' },
+ }),
);
```

重启 npm 如果出现绿色的样式就说明成功了。


## 一些不懂的组件的学习

### 一、slide 控制栅格

先设置一个栅格，并且让它可以拖动

```html
<Slider min={0} max={10} />
```

在类内初始化一个空数组，

数组的作用：

控制滑块的选择数值，并且可以通过后期赋值

```js
gutters = {};
columns = {};
```

在类的初始化中，给上面的滑块长度附上内容

```js
this.state={
  gutterKey:1,    //初始默认滑块的选中位置
  colCountKey:2
};
[8,16,24,32,40,48].forEach((value,i)=>{this.gutters[i]=value;});
[2,3,4,6,8,12].forEach((value,i)=>{this.columns[i]=value});
```

来看最终滑块如何编写的：

```html
<Slider 
  min={0}
  max={Object.keys(this.gutters).length - 1}  //最大长度
  value={gutterKey}   //默认选中第几个
  onChange={this.onGutterChange}  //改变时修改 gutterKey 的值 
  step={null} 
  marks={this.gutters}  //设置滑块的内容
/>
```

附上上述 `onChange={this.onGutterChange}` 的代码

```js
onGutterChange = (gutterKey) =>{
  this.setState({gutterKey:gutterKey});
}
```

好了，那么现在滑块就能够读取到后台数据，并显示在页面上。

### 二、动态控制栅格数量

完成了上一步的通过后台数据操作 slide 滑块后

我们来尝试一下通过滑动滑块来改变栅格数量

先来看下代码，下面这段代码放在 render() 下

```js
const cols = [];
const colCount = this.columns[colCountKey];

for(let i = 0;i<colCount;i++){
  cols.push(
    <Col span={24/colCount} key={i.toString()}>
      <div>column</div>
    </Col>
  )
}
```

先创建一个数组用来存放每个 `Column` 

通过 `this.columns[colCountKey]` 读取到选项的内容

遍历创建 `Col` 

写完上面的代码，我们还差一步就是引用它

```html
<Row gutter={this.gutters[gutterKey]} >{cols}</Row>
```

### 三、动态输出文字

让我们来动态输出网页中显示出来的格式

跟步骤二是一样的，我么也要通过上面的循环来建立文字数组

```js
const colText = [];

for(let i = 0;i<colCount;i++){
  colText.push(
    <Text>{`<Col span={`}{24/colCount}{`} />`}</Text>
  )
}
```

```html
<div>
  <Text>{`<Row gutter={`}{this.gutters[gutterKey]}{`}>`}</Text><br/>
  {colText}
  <Text>{`</Row>`}</Text>
</div>
```

好了一切都 OK 了

### 四、layout 布局 

请直接参考官网，太多了。

https://ant.design/components/layout-cn/

### 五、Affix 固钉

```js
import { Affix, Button } from 'antd';

<Affix offsetTop={this.state.top}>
  <Button
    type="primary"
    onClick={() => {
      this.setState({
        top: this.state.top + 10,
      });
    }}
  >
    Affix top
  </Button>
</Affix>
```

## Form 表单

先来看一些 div 中要怎么编写表单：

```js
const { getFieldDecorator } = this.props.form;  //这句话写在 render() 下

<Form {...formItemLayout}>    //自定义方法，下面会做解释
  <Form.Item
    label="E-mail"
  >
    {getFieldDecorator('email',{    
      rules:[{
        type:'email',message:'The input is not valid E-mail!' //这时 Email 的格式判断
      },{
        required:true,message:'Please input your E-mail!'
      }],
    })(
      <Input />
    )}
  </Form.Item>

  <Form.Item
    label="Password"
  >
    {getFieldDecorator('password', {
      rules: [{
        required: true, message: 'Please input your password!',
      }, {
        validator: this.validateToNextPassword, //自定义的方法，下面会编写
      }],
    })(
      <Input type="password" />
    )}
  </Form.Item>
  <Form.Item
    label="Comfirm Password"
  >
    {getFieldDecorator('confirm',{
      rules:[{
        required:true,message:'Please confirm your password!',
      },{
        validator: this.compareToFirstPassword, //自定义的方法，下面会编写
      }]
    })(
      <Input type="password"  />
    )}
  </Form.Item>
  <Form.Item
    label={(
      <span>
        Nickname&nbsp;
        <Tooltip title="What do you want others to call you?">
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    )}
  >
    {getFieldDecorator('confirm',{
      rules:[{
        required:true,message:'Please confirm your password!',
      }]
    })(
      <Input />
    )
    }
  </Form.Item>
</Form>
```

解释一下上面的代码：

formItemLayout：是表单的样式，也是自定义的方法，如果你修改格式的话会垂直排列。样式难看

getFieldDecorator：是antd的form的属性，能够对表单表单进行校验，并在点击确定时校验

rules:为校验的规则，通过上面的代码便能了解

如果你运行时发现 getFieldDecorator 报 undefined 错

说明你没将 Form 封装成高阶组件

如果你是 exports 可以在最后修改下面的代码：

```js
export default Form.create({name: 'register'})(App);
```

如果你是直接在本类上写的话：

```js
const WrappedRegistrationForm = Form.create({ name: 'register' })(App);
```

label:也可以加一些好看的标签，并通过标签给出提示。

因为量太多，就不再详细讲解，任何疑问请参考[官网](https://ant.design/components/form-cn/) 




















