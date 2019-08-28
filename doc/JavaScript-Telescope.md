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

## 第十章 DOM(文档对象类型)

### 一、Node类型

#### 1、操作节点

```js
var a = someNode.appendChild(newNode);          //向列表的末尾添加一个节点

var b = someNode.insertBefore(newNode,null);    //插入节点再特定的位置，null为最后一个节点
var b = someNode.insertBefore(newNode,someNode.firstChild);    //成为第一个节点
var b = someNode.insertBefore(newNode,someNode.lastChild);    //成为最后一个子节点的前一个节点

var c = someNode.replaceChild(newNode,someNode.firstChild);     //替换 someNode的第一个节点
```

#### 2、其他方法

`cloneNode(true/false)` 为克隆节点，`true` / `false` 为选择是否执行深复制

深复制：复制该节点和其整个子节点数

浅复制：只复制节点本身，会后的节点副本属于文档所有，因为并没有父节点，该节点成为一个孤儿。

### 二、Document 类型

#### 1、文档信息

```js
console.log(document.title);            //标题
console.log(document.childNodes);       //文档子节点
console.log(document.URL);              //完整的URL
console.log(document.domain);           //取得域名
console.log(document.referrer);         //原页面的URL

console.log(document.nodeType);         //9。这是代表文档类型
console.log(document.nodeName);         //"#document"
console.log(document.parentNode+document.nodeValue);    //都为null

console.log(element.nodeType);          //1。同上，这是代表文档类型
console.log(element.nodeName);          //元素的标签名
console.log(element.Value);             //null
console.log(element.parentNode);        //Document/Element

console.log(text.nodeType);             //3
console.log(text.nodeName);             //"#text"

console.log(comment.nodeType);          //8


```

#### 2、查找方法

```js
document.getElementById("");            //查ID
document.getElementByTagName("");       //查标签名  
document.getElementByName("");          //查name
document.anchors                        //查找所有带 name 属性的<a>标签
document.links                          //文档中所有的带href的<a>标签
document.forms                          //文档中的所有<form>元素
document.images                         //文档中所有的<img>元素
```

DOM 一致性检测

```js
var hasXmlDom = document.implementation.hasFeature("XML","1.0");    //返回boolean值
```

文档写入：

```js
document.write("<script type=\"text/javascript\"  src=\"file.js\"><\/script>");
```

延迟执行：

```js
widnow.onload = function(){
    document.write("hang");
}
```

#### 3、element 的特性操作

取得特性：

```js
var div = document.getElementById("myDiv");
console.log(div.getAttribute("id"));
console.log(div.getAttribute("title"));
```

除了 `getAttribute()`,还有 `setAttribute()`,`removeAttribute()` 都可以用来操作特性

设置特性(若已存在则替换，设置的特性名都会被变成小写)：

```js
div.setAttribute("id","cc");
div.setAttribute("class","mm");
```

**Element 是使用 attributes 属性的唯一一个节点**

#### 4、创建元素

```js
var div = document.createElement("div");

document.body.appendChild(div);
```

#### 5、Text 类型

有对 `text` 节点的操作，但包括增删改替换。具体在书中 `270` 页。

```js
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello World!");
element.appendChild(textNode);

document.body.appendChild(element);

var newNode = element.firstChild.spiltText(5);
console.log(element.firstChild.nodeValue);          //"Hello"
console.log(element.nodeValue);                     //"world!"
console.log(element.childNodes.length);             //2
```

### 三、DOM 操作技术

#### 1、动态脚本

1、表格的操作

```js
var table = document.createElement("table");
table.border = 1;
table.width = "100%";

var tbody = document.createElement("tbody");
table.appendChild(tbody);

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 1,2"));

document.body.appendChild(table);
```

## 第十一章 DOM 扩展

### 一、选择符 API

#### querySelector()

```js
var myDiv = document.querySelector("#myDiv");   //取得 ID 为 "myDiv" 的元素
```

#### querySelectorAll()

获取所有符合的元素

```js
var ems = document.getElementById("myDiv").querySelectorAll("em");  //返回一个nodeList实例
```

### 关于 `query系列` 和 `getElementBy系列` 的区别

`query`：选出来的元素和元素数组是静态的，不能随着文档的操作的改变而改变，但是用起来比较简便

`getElementBy`: 是动态选择元素和元素数组的。性能会比较好。

两个可以和着用，像上面的例子那样

### 二、焦点的判断

```js
botton.focus();     //给一个 按钮加上焦点
alert(document.activeElement === botton);       // true 判断当前焦点是否是该按钮

alert(document.hasFocus());     // 通过检测文档是否获得焦点，可以知道用户是不是正在与页面进行交互
```

### 三、HTML5 新增的今个变化

getElementByClassName、classList、head属性、charset字符集属性

自定义数据属性：

`<div id='1' data-appId='aaa'></div>`

```js
var div = document.getElementById('myDiv');
var appId = div.dataset.appId;
div.dataset.appId = '';
```

### 四、专有扩展

`compareDocumentPOsition()`: 能够确定节点间的关系

|掩码|节点关系|
|--|--|
|1|无关|
|2|居前|
|4|居后|
|8|包含|
|16|被包含|

### 五、滚动

`scrollIntoView()`: 唯一一个所有浏览器都支持的方法。

`scrollByLines(num)`: 根据行来滚动

`scrollByPages(num)`: 根据页来滚动

`scrollIntoViewIfNeeded`: 只在当前元素在视口不可见的的情况下才滚动浏览器窗口让它可见。否则什么都不做。

### 二、HTML 5

#### classList 属性

`className` 的增删改操作起来比较麻烦

可以用 `classList` 替换

```js
<div class = "bd user disabled">...</div>

div.classList.remove("disbaled");
div.classList.add("disbaled");
div.classList.toggle("disbaled");
```

保证其他的类不受影响，极大的优化了操作的复杂性


#### HTMLDocument 的变化

1、readyState 属性

loading 正在加载文档

complete 已经加载完文档

```js
if(document.readyState == 'complete'){
    ...
}
```

`innerText` 和 `innerHTML` 区别：

这两个属性的用法为输出页面的值，不同的是：

`innerText`：输出标签内的文字

`innerHTML`: 输出整个标签，包括标签的内容。

## 第十三章 事件

### 1、dom 级别：

0级 dom： 标签内写点击事件 + onclick=function(){} 两个 0级 dom 会覆盖

2级 dom: 只有一种监听方法，不覆盖依次调用，addEventListener() 有三个参数：事件名，处理函数， true/false: 捕获阶段或冒泡阶段调用。

### 2、

`e.eventPhase` 属性来确定事件当前正位于哪个流。1：捕获阶段  2: 事件处理程序处于目标对象上  3: 冒泡阶段。尽管目标在冒泡阶段，但是仍然是2

`returnValue` 相当于是 `preventDefault()` 事件

`eventUtil`: 保证处理事件能在大多数浏览器下一致的运行，以下是四种新方法：

1、`getEvent()`: 返回 event 对象的引用

2、`getTarget(event)`: 返回事件的目标,检测 target 的属性

3、`preventDefault()`: 取消事件的默认行为

4、`stopPropagation()`: 阻止事件流

### 3、事件类型

1、`load`

当页面完全加载后就会触发 window 上面的 load 事件

```js
EventUtil.addHandler(window, "load", function(e) {});
```

或者在 body 中添加 `onload` 事件

2、`unload`: 同上

3、`resize`: 当浏览器窗口被调整高度或者宽度时触发事件。

4、`scroll`: 可以通过 `scrollLeft` 和 `scrollTop` 来监控这一变化


鼠标双击事件的触发顺序： mousedown、 mouseup、 click、 mousedown、 mouseup、click、 dblclick

鼠标修改键：点击事件传递 event,  event.shiftKey 、 ctrlKey、 altKey、 metaKey

## 十四章 表单脚本

### 1、属性

`enctype`: 请求的编码类型

`method`: 发送的 HTTP 请求的类型

### 2、提交表单

有三种： input、button、input(type='image') 或者下面的代码页可以 

```js
var form  = document.getElementById('');
EventUtil.addHandler(form, 'submit', function(event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
});

// 提交表单可以用如下的代码
form.submit();

// 获取表单中的字段，按顺序
var field1 = form.elements[0];
var field2 = form.elements['field2'];
```

### 3、选择文本

```js
// 选择文本
EventUtil.addHandler(textbox, 'focus', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget();
    target.select();
})

// 选择部分文本
textbox.value = '....';
textbox.setSelectionRange(0, textbox.value.length);

// 或者
selectText(textbox, 0, textbox.value.length);
```

### 4、过滤输入

```js
// 跨浏览器获取字符编码
var tar = EventUtil.getCharCode(event);
// 将字符编码转化成字符串，然后用正则进行判断
String.fromCharCode(tar)
```

### 5、约束验证 HTML API

1、必填字段

```js
<input type="text" name="username" required />

// 检测是否是必填字段
var check = document.forms[0].elements['username'].required;
```

2、其他输入类型

`email` 和 `url` 

**注意** input 文本要设置 `required` 属性，否则空文本也会通过验证

而且，并不能阻止用户输入无效的值。

```js
// 用于检测字段的有效性
document.form[0].elements[0].checkValidity()

// 用于检测表单是否有效，只要一个无效就返回 false
document.form[0].checkValidity()
```

可以判断每个对象属性是否匹配，具体请参考书 430

3、禁用验证

```html
<!-- 对一整个表单进行不验证的操作 -->
<form method="post" novalidate ></form>

<!-- 该提交按钮不进行验证 -->
<input type='submit' formnovalidate />
```

```js
document.forms[0].noValidate = true;

document.forms[0].elements['btn'].formNoValidate = true;
```

### 6、选择框

1、选择选项

```js
// 缺点是只能是单选的，多选会被替换，只会返回选中的第一项
var selectedOption = selectbox.options[selectbox.selectedIndex];

// 可多选
selectbox.options[0].selected = true;
```

2、添加选项(3种方法)

```js
// 1
var newOption = document.createElement('option');
newOption.appendChild(document.createTextNode('Option text'));
newOption.setAttribute('value', 'Option value');

selectbox.appendChild(newOption);

// 2 这种方法除 IE 以为都能使用
var newOption = new Option("Option text", "Option value");
selectbox.appendChild(newOption);

// 3 
var newOption = new Option("Option text", "Option value");
selectbox.add(newOption, undefined);
```

3、移除选项(3种)

```js
// 1 
selectbox.removeChild(selectbox.options[0]);

// 2 
selectbox.remove(0);

// 3
selectbox.options[0] = null;
```

4、移动选项

```js
var op = selectbox.options[1];
selectbox.insertBefore(op, selectbox.options[op.index - 1]);
```

### 7、表单序列化

照抄一段 ajax 的源码

```js
function serialize(form) {
    var parts = [];
    var field = null;
    var option = null;
    var optValue = null;
    for(var i = 0; i < form.elements.length; i++) {
        field = form.elements[i];
        switch(field) {
            case 'select-one':
            case 'select-multiple':
                if(field.name.length) {
                    for(var j = 0; j < field.options.length; j++) {
                        option = field.options[j];
                        if(option.selected) {
                            optValue = '';
                            if(optValue.hasAttribute('value')) {
                                optValue = (option.hasAttribute('value') ? option.value : option.text);
                            } else {
                                // 查明是否已规定这个属性 IE走这列
                                optValue = (option.attributes['value'].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
                        }
                    }
                }
            case undefined: 
            case "file": 
            case 'submit': 
            case 'reset':
            case 'button':
                break;
            case 'radio':
            case 'checkbox':
                if(!filed.checked) { break; } 
                // 执行默认操作
            default: 
            if(filed.name.length) {
                parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
            }
        }
    }
    return parts.join('&');
}
```

## 第十五章: canvas 绘图

```js
var drawing = document.getElementById('drawing');
if(drawing.getContext) {
    // y要用这块画布，需要取得绘图上下文
    var context = drawing.getContext('2d');

    // 取得图像数据的URI, 导出<canvas>元素上的绘制的图像
    var imgURI = drawing.toDataURL('image/png');
    // 展示图像
    var image = document.createElement('img');
    image.src = imgURI;
    document.body.appendChild(image);
}
```

`fillStyle`: 填充

`strokeStyle`: 描边

### 1、绘制矩形

方法: `fillRect()`, `strokeRect()`, `clearRect()`

所带参数： x坐标， y坐标， 矩形宽度，矩形高度

（1）描边线条操作：

宽度： `lineWidth` 来决定

线条末端形状：`butt`, `round`, `square`

相交方式: `round`, `bevel`, `miter`

### 2、绘制路径

`arc(x, y, radius, startAngle, endAngle, counterclockwise)`: 以 xy 为圆心绘制一条弧线，半径为 radius, 可设置起始角度和结束角度，最后可设置 方向

`arcTo(x1, y1, x2, y2, radius)`: 从上一个节点出发，绘制一条弧线, 经过 x1y1，到达 x2y2,半径为 radius

`bezierCurveTo(c1x, c1y, c2x, c2y, x, y)`: 从上一个节点出发，绘制一条曲线，到 xy 结束。并且以(c1x, c1y), (c2x, c2y) 为控制点

`lineTo(x, y)`: 从上一点开始绘制一条直线，到 xy 结束

`moveTo(x ,y)`: 将绘图游标移动到 xy, 不画线

`rect(x, y, width, height)`: 从点 xy 开始绘制一条矩形。

`closePath()`: 可绘制一条链接到路径起点的线条

`clip()`: 可以在路径上创建一个裁剪区域。

`isPointInPath()`: 接收 xy 参数，用于路径被关闭之前确认画布上的某一点是否位于路径上。

### 3、绘制文本

`fillText()` or `strokeText()`: (文本字符串，x, y, 最大像素宽度)

属性有三: `font`, `textAlign`, `textBaseline`

### 4、变换

`rotate(angle)`: 围绕原点旋转图像 angle 弧度。 

`scale(x, y)`: 缩放图像。 

`translate(x, y)`: 将坐标原点移动到 xy.

### 5、阴影+渐变+模式+合成

`shadowColor`: 代表阴影颜色，默认黑色，如：`rgba(0, 0, 0, 0.5 )`

`shadowOffsetX`: x轴方向上的偏移量，默认为 0 如：5

`shadowOffsetY`: y轴方向上的偏移量，默认为 0 如：5

`shadowBlur`: 模糊的像素度，默认为0 即不模糊 如：4

```js
// 渐变的代码
var gradient = context.createLinearGradient(30, 30, 70, 70);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'black');

context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);
```

```js
// 模式的代码
var image = document.images[0];
pattern = context.createPattern(image, 'repeat');

context.fillStyle = pattern;
context.fillRect(10, 10, 150, 150);
```

关于合成的内容请直接参考书中 462页

## 第十六章 HTML5 脚本编程

### 1、跨文档传递消息，即向 `iframe` 传递信息

```js
var iframe = document.getElementById('mf').contentWindow;
// 第二个参数代表传递的地址必须为该 url，如果不是则什么都不做
iframe.postMessage('aa', 'http://www.baidu.com');
```

接收数据

```js
EventUtil.addHandler(window, 'message', function(event) {
    // 确保发送的消息是已知域
    if(window.origin === 'http://www.badi.com') {
        // 处理接收到的消息
        processMessage(event.data);

        // 可选: 向来源窗口发送回执
        event.source,postMessage('received!', "http://localhost:8000/~~~");
    }
})
```

**通过 `postMessage` 传递的数据最好都是以字符串的形式，结构化的数据最好有用 ``JSON.stringify` 传递**

### 2、原生拖放

拖动元素会触发以下事件: `dragstart`, `drag`, `dragend`

当元素被拖动到有效的放置目标上时会触发以下事件: `dragenter`, `dragover`, `dragleave或drag`, 类似下面的例子

```js
var dt = document.getelementById('dropTarget')
EventUtil.addHandler(dt, 'drag', function(e) {
    EventUtil.preventDefault(e);

    // 设置和接收数据
    e.dataTransfer.setData('text', 'some text');
    var text = e.dataTransfet.getData('text');
});
```

###  3、音频，视频请看书 486页

## ajax 下面的一些呢绒内容来 freecodecamp

1、异步获取外部的 API

```js
req = new XMLHttpRequest();
req.open('GET', '/json/cats.json', true);
req.send();
req.onload = function() {
  json = JSON.parse(req.responseText);
  document.getElementsByClassName('message')[0].innerHTML = JOSN.stringify(json);
}
```

2、使用 XMLHttpRequest 发布数据

```js
req = new XMLHttpRequest();
req.open('POST', url, true);
req.setRequestHeader('Content-Type', 'text-plain');
req.onreadystatenge = function() {
  if(req.readyState === 4 && req.status === 200) {
    document.getElementsByClassName('message')[0].innerHTML=req.responseText;
  }
}
req.send(userName);
```

`setRequestHeader`: 请求标头的值，包含相关发件人和请求信息 

`onreadystatechange`: 事情侦听器请求状态的更改

`readyState`: 值为4， 表示操作完成

`status`: 值为 200 表示操作成功


----------

`responseText`: 作为相应主体被返回的文本

`status`: 响应的 HTTP 状态

`statusText`: HTTP状态说明

关于 `readyState` 值的说明

- `0`: 未初始化，尚未调用 open() 方法
- `1`: 启动，但尚未调用 send() 方法
- `2`: 发送，已经调用 send() 方法，未接收到响应
- `3`: 接收，已接收部分数据
- `4`: 完成，接收全部响应数据，而且已经可以在客户端使用了。

### 1、GET 请求

可以将字符串参数追加到 url 末尾，以便将信息发送给服务器

但是字符串中的每个键和值都需要经过正确的编码：`encodeURIComponent()` 进行编码，如： 

```js
xhr.open('get', 'example.do?name1=value1&name2=value2', true);

// 该函数辅助添加字符串参数
function addURLParam(url, name, value) {
    url += (url.indexOf('?') === -1 ? '?' : '&');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}
```

### 2、FormData

为序列化表单以及创建与表单格式相同的数据提供了便利，直接看代码

```js
xhr.open(···);
var form = document.getElementById('form..')
xhr.send(new FormData(form));
```

### 3、超时设定

```js
xhr.timeout = 1000;
xhr.ontimeout = function() {
    alert();
}
```

## 第二十二章 高级技巧

1、关于惰性函数

第一种方法: 在 `if` 判断后给变量赋值函数，接下来将不再需要判断，直接执行

第二种方法： 在声明函数时，就指定适当的函数，和第一种差不多。

优点： 只在执行分支代码时牺牲一点儿性能

2、防篡改对象

```js
var person = {};
// 设置不再给对象添加属性和方法
Object.preventExtensions();

// 判断对象是否还能修改
alert(Object.isExtensible(person)); // false
```

3、密封对象

密封对象不可扩展，也不能删除属性和方法,但是可以修改属性s

```js
Object.seal(person);
alert(Object.isSealed(person)); // true
```

4、冻结对象

不可扩展。切密封，还不能修改

```js
Object.freeze(person);
alert(isFrozen(person)); // true
```

5、定时器

JavaScript 是运行于单线程的环境中，定时器仅仅是计划代码在未来的某个特定时间执行

定时器不是线程

JavaScript 中没有任何代码是立刻执行的，一旦进程空闲则立刻执行。

定时器不代表时间一到就执行代码，而是时间一到，把代码添加到队列中，如果有空闲的进程则执行。

6、拖放

最简单的拖放界面的代码

```js
var dragDrop = function() {
    var dragging = null;
    function handleEvent(event) {
        event = EventUtil.getEvent(event);
        var target = Event.getTarget(event);
        switch(target) {
            case 'mousedown': 
                if(target.className.indexOf('draggable') > -1) {
                    dragging = target;
                }
                break;
            case 'mousemove':
                if(dragging !== null) {
                    dragging.style.left = event.slientX + 'px';
                    dragging.style.top = event.slientY + 'px';
                } 
                break;
            case 'mouseup':
                dragging = null;
                break; 
        }
    }
}
```

## 第二十三章


### cookie: 

限制： 长度小于 4096b，超过会被丢弃

构成：

1: 名称：不区分大小写，名称必须经过 URL 编码

2: 值：存储在 cookie 中的字符串值，必须别 URL 编码

3: 域： cookie 对于哪个域是有效的，所有向该域发送请求中都会包含这个 cookie 信息

4: 路径：对于指定域中的路径，应该向服务器发送 cookie

5: 失效时间：何时被删除的时间戳，会话结束时删除，也可以自己设定删除时间

6: 安全标志：指定后，只有在使用 ssl 连接的时候才发送到服务器

如： 

```js
Set-Cookie: name=value; domain=.wrox.com; path:/; secure; expiress...
```

对于 cookie 的思考

所有的 cookie 都会由浏览器作为请求头发送，所以 cookie 中存储大量信息会影响到特定域的请求性能。

cookie 信息越大， 完成对服务器请求的时间就越长。虽然浏览器对cookie设置了大小，但是还是少将数据存储在 cookie 中

### web 存储机制

提供了在 cookie 之外存储会话数据的途径

储存大量可以跨会话存在的数据的机制

#### storage 类型

#### sessionStorage

sessionStorage 对象存储特定于某个会话的数据，只保持到浏览器关闭，可跨页面刷新而存在

如果浏览器支持的话，浏览器崩溃重启后还能使用，有些浏览器可以，有些不支持

#### globalStorage

可以指定哪些域名有权限访问该数据

#### localStorage

不能给 localStorage 指定任何访问规则，要访问同一个 localStorage localStorage对象，页面必须来自同一个域名上，使用同一种协议，在同一个端口上。









