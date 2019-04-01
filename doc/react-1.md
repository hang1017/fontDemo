# react 入门学习教程

## 一、首次使用 react

首先需要在 https://www.bootcdn.cn/ 引入一些库

当然你可以直接 copy 我下面的代码：

```html
<script src="https://cdn.bootcss.com/react/16.8.4/umd/react.development.js"></script>

<script src="https://cdn.bootcss.com/react-dom/16.8.4/umd/react-dom.development.js"></script>

<script src="https://cdn.bootcss.com/babel-standalone/7.0.0-beta.3/babel.js"></script>
```
引入的第三个库 babel 是用来转换 react 语法的，一二连个库是与 react 相关的库

react 通过 js 代码来编写 html 脚本页面，下面为输出一个简单的 helloword 脚本：

```js
<script type="text/babel">
    ReactDOM.render(
        <h1>hello world</h1>,
        document.getElementById("app")
    )
</script>
```

在提高一点：通过react传递参数进行赋值：
```js
class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <ShoppingList name="hang" />,
    document.getElementById("app")
)
```

## 二、create-react-app

上面的内容是非常粗糙的讲解了一些 react 的实现。下面我们开始从零搭建项目

首先安装node.js

npm install -g create-react-app 全局安装 

create-react-app  hello-react  在某路径下创建一个 react 项目,命名为 hello-react

cd hello-react 进入该目录

yarn start  开启开发环境的服务器 默认3000 端口

yarn build  

yarn global add serve

通过上面两条代码生成线上的静态环境

serve -s build  启动 默认5000端口

线上环境和开发环境的不同：分别打开页面，打开页面源代码，线上的代码经过压缩

## 三、第一个组件

来新建我们的第一个组件 可以参考 一 的内容。

打开 app.js ，根据下面的代码做修改，react 组件都是有固定的写法

```js
class App extends Component {
  render() {
    return (
      // <h1>hello world</h1>
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>hello world</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

最下面的 export default 为把 App.js 暴露出来，使外部的 js 代码能够对其进行引用

## 四、创建多个组件

在 app.js 的同目录下创建自定义的组件包，命名一般为：components

在该组建包下创建你想要的组件，即 ~.js .如：Header.js,Home.js

将 app.js 下的代码 copy 到两个组件下，如：

```js
import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      // <h1>hello world</h1>
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>Header</h1>
          </div>
        </div>
      </div>
    );
  }
}
```
一定要把这个组件 export 出来，否则外部的 js 用不到这个组件

接下来到主页上调用该组件吧

```js
import Header from './components/Header';
import Home from './components/Home';
```

先导入两个组件的路径

接下来 <Header /> 即可引用到 Header 组件

## 五、输入动态数据，props传递数据

通过 {} 来输入动态数据，{} 中只能放一行代码。

### 父->子传递数据

如何通过父组件向子组件传递数据？

在父组件的代码中：

```js
<Home name={"max"} age={17} user={user_hang}/>
```

通过 {} 来转递数据，传递的对象，可以在 render 和 return 之间进行定义：

```js
const user_hang = {
    name:"hang",
    hobbies:["music","sports"],
}
```

通过上面的代码，我们就完成了父组件的编写

在子组件中，我们可以通过 console.log(this.props);查看是否已经传值过来

子组件中输出数据只需要：this.props.name....即可

来看看数据的输出格式：

```js
<h4>hobby:</h4>
    <ul>
        {this.props.user.hobbies.map((hobby,i) => <li key={i}>{hobby}</li>)}
    </ul>
</div>
```

### 控制数据传输的类型

我们还漏了一点：对于数据类型的判断

我们在接收方(Header.js)，引入下面的代码：

```js
import PropTypes from 'prop-types';
```

并在最下方：

```js
~.propTypes = {
  name:PropTypes.string,
  age:PropTypes.number,
  user:PropTypes.object,
  children:ProTypes.element.isRequired
}
```

就可以控制数据传输的类型，如果有错，会在控制台输出警告

### 传输父组件下的子节点元素

```js
<Home name={"max"} age={17} user={user_hang}>
    <p>I am children</p>
</Home>
```

子组件：this.props.children。

至此。我们已经学会了父->子组件进行数据传输

## 六、事件、state属性

### 设置事件：

```js
  constructor(props){
    super(props);   //很重要，请加上去
    this.age = this.props.age;
  }

  onMakeOlder(){
    this.age +=3;
    console.log(this);
  }

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.onMakeOlder.bind(this)}>click me</button>
          <button onClick={()=>this.onMakeOlder()}>click me</button>
        </div>
      </div>
    );
  }
```

讲解一下上面的代码：

constructor：是一个初始化的函数

super：执行父类构造函数的方法

bind(this):这个 this 为一个对象，把对象传递给方法

第二种用法也可以。

那么通过查案控制台的 console，就能够查看到 age 的变化，因为页面时静态的，所以我们还没办法查看到页面的变动，但是不用急，我们能够在接下来的教程中，解决它。

### state 状态

可以通过 this.state 在构造函数中指定来定义初始状态

```js
  constructor(props){
    super(props);
    this.state = {
      age : props.age,
    }
  }

  onMakeOlder(){
    this.steState({
      age:this.state.age+3
    })
  }

  render() {
    return (
      <div className="container">
        <div>
          my age is:{this.state.age}
        </div>
        <div>
          <button onClick={this.onMakeOlder.bind(this)}>click me</button>
        </div>
      </div>
    );
  }
```
在 state 状态中设置初始值

修改输出值为 this.state.age

在点击事件中修该state状态下的 age 值

### 更新虚拟 DOM

针对静态页面的数据改变。

react 会通过算法自行修改有变动的地方，而不是全部重新加载

这就非常的高效。

我们可以按 F12 打开调试，右上角有三个点的按钮，点击，选择：

more tools-->Rendering-->勾上Paint flashing

当你勾上该选项，页面上有变动的地方就会被用绿色的框框圈起来

我们能够很清楚的看到，哪些地方有进行变动

我们可以在初始化的地方写一个定时器：

```js
setTimeout(() => {
      this.setState({
        status:this.state.status+1
      })
    }, 2000);
```
## 七、无状态组件

有状态组件：有相同的输入，输出却是不同的。

无状态组件(函数式组件)：

不需要声明类，可以避免大量的譬如 extends 或者 contructor 这样的代码

不需要显示声明 this 关键字，在 ES6 的类申明中往往需要将函数的this 关键字绑定到当前的作用域，而因为函数式声明的特性，我们不需要强制绑定

## 八、子->父组件传值

### 父向子传递方法

首先我们需要一个方法来触发子->父传递数据

所以先写一个父->子传递的方法:onGreet()。

在父组件中写一个带alert()的方法

将方法传递给 Home 子组件 greet={this.onGreet}

在子组件中设置按钮 onClick={this.props.greet}即可完成父->子传递方法。

### 子向父传递数据

在子组件中写一个方法

```js
handleGreet(){
    this.props.greet(this.state.age)
  }
```

在按钮中绑定上面的方法，将数据传输回去：

```js
<button onClick={this.handleGreet.bind(this)} >for father</button>
```

回到父组件的方法中，加上传回来的参数，alert()出来即可。

## 九、兄弟组件间的传值

我们在 Home 组件定义一个参数，把参数传递给 Header 组件

会有点绕，我先用文字叙述一遍：

兄弟间的传值需要又：Home->父(app.js)->header

### 子->父传值 

子->父传值 需要先由父给子一个方法，子才能将数据传递给父亲

来看代码：

1、由 app.js 创建一个带参数方法(onTranform(linkName))，内容就 console 这个参数

2、将该方法 onTranform 传递给子组件 Home

```js
<Home tranform={this.onTranform}
>
```

3、在子组件中创建一个按钮 来接收父组件的传来的方法

```js
<button onClick={this.tranform} >brother</button>
```

4、由于我们需要将子组件的数据回传给父组件：

我们需要在子组件中添加一个方法来接收父组件的方法，并回传数据

```js
  hangleTranform(){
    this.props.tranform(this.state.link)
  }
```
5、有了这个方法，第三步的按钮就需要修改一下了。

```js
<button onClick={this.hangleTranform.bind(this)} >brother</button>
```

有了bind(this)，第四步的this参数才能使用

这时，我们就把子组件的数据传递给父组件

7、我们需要把传递来的参数设置成父组件自己的参数

所以我们需要在第一步创建的方法onTranform中加上setState代码：

```js
 onTranform(linkName){
    console.log(linkName);
    this.setState({
      link:linkName
    })
  }
```

如果你现在运行代码，就会发现报错了。为什么？

因为这个 this 没有绑定，

我们去到第二步，将传递的方法进行 this 绑定

```js
<Home tranform={this.onTranform.bind(this)}>
```

8、接下来，只需要把 link 参数传递给 Headr 就行拉

```js
<Header link={this.state.link} />
```

现在只要点击 home 组件的按钮，参数就已经传递到 Header 组件上了

但是，我们并没办法查看到该数据

我们在 Header 组件下写个输出 link 的方法就能查看到了

{this.props.link}

具体写法请参照六步骤，记得要绑定 this 哦！

## 十、双向数据绑定

在 Home 组件中设置一个输入框，当输入框改变时，Header也跟着改变

```js
changeInput(event){
    this.setState({
      link:event.target.value
    })
  }


<input type="text" value={this.state.link} onChange={(event) => this.changeInput(event)}/>
```


















