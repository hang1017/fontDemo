# JavaScript 高级程序设计

## 第四章 变量、作用域和内存问题

### 一、变量

#### 1、复制变量值

当一个变量向另一个变量复制引用类型的值，也会将存储在变量对象中的值复制一份放到新变量分配的空间中

这个值实际时一个指针，两个变量共同指向存储在堆中的一个对象(堆内存)

修改一个变量，会影响到另一个变量

```js
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "hang";
alert(obj2.name);   //hang
```

#### 2、对象按值传递

再来看一个代码：

```js
function setName(obj){
    obj.name='hang1';
    obj = new Object();
    obj.name = "hang2";
}

var person = new Object();
setName(person);
alert(person.name);     "hang1"
```

证明对象是按值传递的。

函数内部修改了参数的值，但原始的引用仍然保持不变。

函数内部重写 obj，这个变量引用变成了一个局部对象，函数结束就被销毁了。

#### 3、检测类型

`instanceof` 可以用来检测引用对象的类型

### 二、执行环境

定义：变量或函数有权访问的其他数据，决定了它们各自的行为

每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中

### 三、作用域

作用：保证对执行环境有权访问的所有变量和函数的有序访问。

前端：始终都是当前执行的代码所在环境的变量对象。

如果这个环境是函数，则将其活动对下岗作为变量对象。

活动对象最开始只包含一个变量

作用域中的下一个变量对象来自包含环境，一个一个走到最后。

#### 延长作用域链

两种方法：

try-catch 语句的 catch 块

with 语句

#### 没有块级作用域

1、`if` 内声明的变量会将变量添加到当前的执行环境中。`for` 的 变量 `i` 也是。

2、如果没有用 `var` 声明，则默认添加到全局变量中。

3、查询标识符：从作用域链的前端开始，向上逐级查询。如果存在同名即停止。

### 四、垃圾收集

自动管理。找出不再使用的变量释放占用的内存。

垃圾收集器会按照固定的时间间隔，周期性的执行。

#### 标记清除

变量进入环境标记为 “进入变量”，离开时标记“离开变量”

垃圾收集器运行时会给存储在内存中变量加上标记。去掉环境中的变量和被环境中的变量引用的变量。

标记上的变量表示，环境已经无法访问，可被删除。

#### 引用计数

声明变量并引用+1，没赋值引用一次+1

原来的值被覆盖-1，若为0，则无法访问，可删除。

缺点：相互引用导致大量的内存不可回收。

#### 性能问题

IE：256变量、40696个对象(数组)、64KB的字符串。

如果一个脚本包含这么多变量，就会导致一直回收。

#### 管理内存

分配给 Web 浏览器的可用内存数量通常要比桌面应用程序的少。

防止浏览器运行 JavaScript 的网页耗尽全部系统内存导致系统崩溃。

优化内存占用的最佳方式：只保存必要的数据。一旦不再有用，置为 `null`，叫解除引用(脱离执行环境)。

## 第五章 引用类型

Object 类型就不说了，来看看 Array 类型

### Array 类型

```js
var s = new Array();
var s = new Array(3);
var s = new Array('a','b');
var s = ["a","b"];
var s = [1,2];
```

#### length 属性

`length` 不是只读的。可以设置属性添加和移除项。

若插入很大长度的数，中间就为 undefined.

#### 检测数组

```js
if(Array.isArray(value){
})
```

#### 转换方法

`toString` 返回数组中的每个值拼接而成的已一个逗号隔开。
`valueOf` 返回的还是数组，输出已逗号隔开

可以用过 `.join("||")` 来输出分割的数据

#### 栈方法

LIFO ：先进后出

通过 `push`、`pull` 方法

#### 队列

FIFO：先进先出

`shift` 取得第一项

#### 操作方法

`concat()` 末尾拼接

`slice()` 基于当前数组中的一个或者多个项创建新数组

只有一个参数的情况：从该项到末尾

两个：开始到结束

`splice()` 删除、插入、替换

删除(两个参数)：`spilce(0,2)` 删除前两项

插入(三个参数)：起始位置、0(要删除的项)、要插入的项

替换(三个参数)：用法和插入一样，只要把 0 改成。。

#### 迭代方法

1、every()；每项满足则返回 `true`

2、some(): 只要有一样为 `true` 则返回 `true`

3、forEach():无返回值

4、map()：每次调用的结果组成数组

5、filter():返回true的项组成数组

### Function() 类型

`函数是对象，函数名是指针`

#### Boolean 类型

```js
var a = new Boolean(false);
var b = false;

var c = a && true;
var d = b && true;

alert(c);   //true 
alert(d);   //false
```

布尔表达式中所有对象都会被转成 `true`

```js
alert(typeof a)     //object
alert(typeof b)     //boolean
```

`typeof` 操作符对基本类型返回的是 `boolean`,对引用类型返回的是 `object`

#### Number 类型

```js
var num = 10;
alert(num.toString(2)); //可以转成2进制。8 16进制类似

alert(num.toFixed(2));  //按照指定的小数返回类型的字符串
```

## 第六章 面向对象程序设计

### 对象属性

#### 数据属性：

`Configuation`:能否修改其属性的特性。默认 `true`

`Enumberable`:能否通过 `for-in` 循环返回属性。默认 `true`

`Writable`:能否修改其属性其值。 默认 `true`

`Value`: 默认 `undefined`

来看下面的代码，演示：

```js
vae person = {};
Object.defineProperty(person,"name"{
    wirtable:false;
    value:'hang'
})
```

#### 访问器属性

`Configuation`:能否修改其属性的特性。默认 `true`
`Enumberable`:能否通过 `for-in` 循环返回属性。默认 `true`
`Get`:在读取属性时调用函数。默认 `undefined`
`Set`:在写入属性时调用函数。默认 `undefined`

### 创建对象

#### 工厂模式

```js
function createPerson(name,age){
    var o = new Object();
    o.name =name;
    o.age = age;
    o.sayName = function(){
        alert();
    }
    return o;
}
```

#### 构造函数

构造函数跟上面代码差不多。

#### 原型模型

到时再翻书

### 继承

这个也到时再翻书

## 第七章 函数表达式

### 闭包

闭包：有权访问另一个函数作用域中的变量的函数

#### 闭包与变量

闭包只能取得包含函数中任何变量的最后一个值。看下面的例子

```js
function createFunction(){
    var result = new Array();
    for(var  i = 0;i<10;i++){
        result[i] = function(){
            return i;
        }
    }
    return result;
}
```

每个函数都返回 `10`，每个函数的作用域链中都保存着 `createFunctions()` 函数的活动对象，所以引用的是同一个变量 `i`。

可以使用下面的代码，完成预期效果：

```js
function createFunction(){
    var result = new Array();
    for(var  i = 0;i<10;i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
```

这个版本中，定义了一个匿名函数，并将立即执行该匿名函数的结果赋值给数组

这里的匿名函数有一个参数 `num`,在调用函数时我们传入变量 `i`,由于函数参数时按值传递的。会将变量 `i`的当前值赋给参数 `num`,在这个匿名函数的内部，又创建了一个访问 `num` 的闭包。

这样 `result` 数组中的每个函数都有自己的 `num` 变量副本了。

#### this 对象

当定义一个同名的全局变量和局部变量时

调用 `this.变量` 会输出全局变量

每个函数被调用时都会自动获取两个特殊的变量：`this` 和 `arguments`

内部函数在搜索这两个变量时，只会搜索到其活动对象为止。

如果你希望 `this` 访问到局部变量，可以使用如下一行代码：

```js
var that = this;
```

```js
var name = "window";

var object = {
    name:"Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        }
    }
}
```
```js
var name = "window";

var object = {
    name:"Object",
    getNameFunc : function(){
        return this.name;
    }
}
```

#### 内存泄漏

当闭包的作用域中保存着一个 HTML 元素。意味着该元素无法被销毁。如下面代码：

```js
function a(){
    var e = document.getElementById("se");
    e.onclick = function (){
        alert(e.id);
    }
}
```

之傲匿名函数的存在，e 的引用就至少为一。占用的内存永远不会被回收。

稍微修改一下代码：

```js
function a(){
    var e = document.getElementById("se");
    var cc = e.id;
    e.onclick = function (){
        alert(cc);
    }
    e = null;
```

虽然还是不能解决内存泄漏，但是至少能够接触对 DOM 对象的引用。顺利减少其引用数。

闭包会引用包含函数的整个活动对象，其中包含 e.

### 模仿块级元素

匿名函数可以用来模仿块级作用域。

## 第八章 BOM (浏览器对象模型)

BOM 的核心对象：window

全局变量不能通过 `delete` 操作符删除，而直接在 `window` 对象上的定义的属性上可以，看下面的例子：

```js
var age = 19;
window.color = "red";

delete window.age;      //false;
delete window.color;    //true;

alert(window.age);      //29
alert(window.color);    //undefined
```

#### 窗口的位移:

```js
window.moveTo(0,0);     //将窗口移动到左上角
window.moveBy(0,100);   //将窗口向。。移动
```

#### 窗口大小：

`innerWidth`,`innerHeight`,`outerWidth`,`outerHeight`

`inner`:容器页面视图区的大小(减少边框)

`outer`：浏览器窗口本身的尺寸

#### 导航和打开窗口：

```js
window.open("http://www.baidu.com","topFrame");
<a href="" target = "topframe"/>    //两句可以画等号
```

#### 间歇调用、超时调用

超时时间

```js
var timeoutId = setTimeout(function(){      //设置超时时间
    alert("hello world");
},1000)

clearTimeout(timeoutId);                    //取消
```

间歇时间

```js
setInterval(function(){
    alert("hello world");
},1000)
```

来看常见使用间歇调用的例子：

```js
var min = 0;
var max = 10;
var intervalId = null;

function incrementNumber(){
    num++;

    if(num==max){
        clearInterval(intervalId);
    }
}

intervalId = setInterval(incrementNumber,500);
```

#### 系统对话框

确认框：可以用 `confirm("~")`;

提示输入框：`var res = prompt("~","~");` 第二个参数可带默认输入值

### history 对象

```js
history.go(-1);
history.go(1);
history.back();
history.forward();
```

## 第九章 客户端检测








