# react 官方井字游戏教程文档

## 一、使用 create-react-app 做学习准备

使用 create-react-app 创建项目

删除项目 src 下的所有文件

并在 src 下创建 index.css 和 index.js 文件

并拷贝官网上的代码到 上面这两个文件中，并在 index.js 中新增几个头文件

在终端 输入：`npm start` 启动项目，你就会看到一个井字框架。

## 二、实现按序显示数字、点击显示 "X"

### 1、按序显示数字

board 组件中将每个 Square 的序号都传了过去，所以我们只需要设值即可

首先 board 下:

```js
renderSquare(i) {
      return <Square value={i} />;
}
```

square 下：

```js
<button className="square">
    {this.props.value}
</button>
```

如此，界面上将显示按序排列的数字

### 2、点击显示 "X"

在 square 组件下设置初始化的构造函数：

```js
constructor(){
        super();
        this.state = {
            value:""
        }
}
```

并且给 button 传递一个点击事件：

```js
<button className="square" onClick={()=>this.setState({
        value:'X'
    })}>
    {this.state.value}  //此处改成 state 状态下
</button>
``` 

## 三、将 square 组件的的自主控制权交给 board 组件

### 1、创建 board 构造函数，修改传值数据

在 board 组件中，我们需要又一个包含9个长度的数组来代表 square

```js
constructor(){
        super();
        this.state = {
            squares:Array(9).fill(null)
        }
}
```

有了数组，我们就要给 square 组件传递 数组里的数据了，而不是 i

修改给 square 传值的内容：

```js
renderSquare(i) {
      return <Square value={this.state.squares[i]} 
      onClick={()=>this.handleClick(i)} />;
}
```

可能小伙伴没看明白 上面那个点击事件是什么东西？

我们要把 square 的控制权一步一步的从它那里夺过来

所以也要把它的点击事件的控制权交由 board 组件

来看看这个 handleClick(i) 是什么？

在 board 组件上搭建一个方法：

```js
handleClick(i){
    const squares = this.state.squares.slice();
    squares[i]="x";
    this.setState({
        squares:squares
    })
}
```

解释一下上面的代码：

slice():浅拷贝，将数组数据浅拷贝到一个新的数组中，而不是去修改原数组

具体为什么可以查看教程中的：不可变性

给数组设值，并传给 square 组件，来看看 suqare 组件怎么编写：

```js
function Square(props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
```

解释上面的代码：

把所有的 `this.props` 改成 `props`

在没有构造方法和 只有 `render` 方法的组件提供一种更简便的定义方法

注意点击事件的传递写法，不加()

## 四、轮流落子

1、在 board 组件中设置一个判断标志,在初始化的构造函数中加上：

```js
xIsState:true
```

2、落子后修改 xIsState 状态和输出值：

```js
handleClick(i){
        const squares = this.state.squares.slice();
        squares[i]=this.state.xIsState?"X":"O";
        this.setState({
            squares:squares,
            xIsState:!this.state.xIsState
        })
    }
```

重点在上面的 2、5 行代码：

对 xIsState 的判断和 输出值的判断

3、井字格上的文字切换

在 board 组件的 render 下修改如下这两行代码：

```js
let status = "Next player:";
status += this.state.xIsState?'X':'O';
```
 
## 五、判断输赢：

我们需要在最外层写一个判断输赢的方法：

官方有给，小伙伴们可以看一下：

```js
function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0;i<lines.length;i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
  }
```

上面的判断方法：若有赢家，则把赢家的名字传递出来，若没有返回 Null

在点击事件调用此方法，若已经有值传递出来，则return

在 borad 组件里的 handleClick(i) 最前面补上下面的方法：

```js
const winner = calculateWinner(this.state.squares);
    if(winner){
        return;
    }
```

修改井字游戏上的文字:

在 board 组件里的 render 方法的最上方修改下面的代码：

```js
let status="";
    const winner = calculateWinner(this.state.squares)
    if(winner){
        status = "The winner : " +winner;
    }else{
        status += "Next player:";
        status += this.state.xIsState?'X':'O';
    }
  
```

## 六、将 board 组件的控制权转给 Game 组件

### 1、转移 constructor() 构造函数

不过我们需要稍作修改

```js
constructor(){
        super();
        this.state = {
            history:[{
                squares:Array(9).fill(null),
            }],
            xIsState:true,
        }
    }
```

解释上面的代码：

因为我们要记录每一步的步骤，所以需要一个数组来存放每一步的数组

并且第一步为空。

删除 board 组件的构造函数：因为我们已经把初始化的代码交给 game 

### 2、对1转移后做修改

handleClick 的方法我们先不去管他，因为他接下来也要被转移。

删除了board 组件的构造函数，会导致 render 方法下的定义出现异常

为了避免这些异常，直接删除这些定义即可，如果你害怕乱掉，你可以先注释掉

修改 renderSquare 方法的代码

```js
renderSquare(i) {
      return <Square value={this.props.squares[i]} 
      onClick={()=>this.props.onClick(i)} />;
    }
```

还记得这个方法嘛？

这个方法是给每个各格子传递数据的。

现在需要进行以上的修改。因为我们要把 handleClick 方法移出去

所以就提前先把他改一下。

### 3、在 render 方法下进行定义

```js
const history = this.state.history;
const current = history[history.length-1];
const xIsState = this.state.xIsState;

const winner = calculateWinner(current.squares);
        
let status;
if(winner){
    status = "winner : "+winner;
}else{
    status = "Next player: "+ (this.state.xIsState?"X":"O");
}
```

我们要给组件传递 squares 所以要将他从初始化中拿出来。

并且对判断的文字这块放到 Game 组件下来。在 Game 组件中显示文字

### 4、传递数据

现在我们已经完成过半了。将数据和点击事件传递给 Board 组件

```js
<Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
```

### 5、编写 Game 组件中的 handleClick 方法

```js
handleClick(i){
        const history = this.state.history;
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i]=this.state.xIsState?"X":"O";
        this.setState({
            history:history.concat([{
                squares:squares,
            }]),
            xIsState:!this.state.xIsState,
        })
}
```

对我来说有些混乱

来梳理一下这个方法：

将之前的每格的数据浅拷贝->放上现在的格子数据->返回格子数据和判断的状态回去

由于我们在 Game 组件里已经定义了 history 要保存每一步的数据

就不能直接去修改 squares ，而是将新的 squares 新增到 histtory 中

返回 整个 history

## 七、展示每步历史记录链接

在 Game 组件里 render 方法下：

```js
const moves = history.map((step,move)=>{
    const desc = move ? 'move #'+move:'Game Start';
    return (
        <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
    )
})
```

## 八、实现时间旅行

在 Game 构造方法中设置一个参数 stepNumber:

编写 jumpTo 的方法：

```js
jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
```

在 handleClick 方法中对 stepNumber 进行更新，添加 stepNumber

并保证 history.length 每走一步，stepNumber 会跟着改变

```js
const history = this.state.history.slice(0, this.state.stepNumber + 1);
```

```js
stepNumber: history.length,
```

在 render 方法中根据当前棋步获取对应的棋局状态。

```js
const current = history[this.state.stepNumber];
```

结束！ 成功！

# 官网文档学习

## 一、componentWillMount 和 componentDidMount 的区别

1、

will:将要装载，在 render 之前调用

Did:装载完成，在 render 之前调用

2、

will：每一个组件 render 之前立即调用

Did:render 之后不会立即调用，而是所有子组件都 render 完之后才可以调用

3、

will:可以在服务端被调用，也可以在浏览器被调用

Did:只能在浏览器端被调用，在服务器短使用 react 的时候不会被调用

## 二、定时器：

初始化一个 new Date();

```js
constructor(){
        super();
        this.state={
            timeText:""
        }
    }
```

定义一个方法用来修改时间：

```js
    tick(){
        this.setState({
            timeText:new Date().toLocaleTimeString()
        })
    }
```

调用 componentDidMount() 生命周期函数，设置定时器

```js
componentDidMount(){
        this.timeID = setInterval(()=>(this.tick(),1000));
    }
```

最后调用 componentWillUnmount 函数当组件被移除时，定时器也要被清除

```js
componentWillUnmount(){
        clearInterval(this.timeID);
    }
```

## 三、状态更新可能时异步

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

## 四、状态的更新合并

当初始化有数组时，如下：

```js
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

进行浅合并

```js
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
## 五、事件处理


当事件需要更新状态时，最最简单的方法是在 初始化上绑定：

```js
this.handleClick = this.handleClick.bind(this);
```

如果你觉得上面的方法还是麻烦的话，可以采用下面的方法：

```js
handleClick = () => {
    console.log('this is:', this);
  }
```

若你需要向事件传递参数的话：

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

如果通过 bind 进行传参的话，需要注意 e 的存放位置：

```js
deleteRow(id,e){
    e.preventDefault();
}
```

## 六、关于表达式的写法

```js
{unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
```

之所以能这样做，是因为在 JavaScript 中

true && expression 总是返回 expression，

而 false && expression 总是返回 false。

因此，如果条件是 true，&& 右侧的元素就会被渲染，

如果是 false，React 会忽略并跳过它。

## 七、三目运算符

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

## 八、列表、数组遍历

对数组进行遍历：

```js
const doubled = numbers.map((number) => number * 2);
```

最好每个元素在列表中都拥有独一无二的key:

```js
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当元素没有确定的 key ，你可以使用它的序列号index 作为 key

```js
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

可以查看[深度解析 key 的必要性](https://react.docschina.org/docs/reconciliation.html#%E9%80%92%E5%BD%92%E5%AD%90%E8%8A%82%E7%82%B9)

也可以来一些骚操作

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```

















