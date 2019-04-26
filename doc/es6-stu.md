# ES6 学习文档

## 搭建环境

#### 一、查看 ES6 环境的支持程度

```bash
$ npm install -g es-checker
$ es-checker
```

#### 二、安装 babel 转码器

```bash
$ npm install --save-dev @babel/core
```

#### 三、配置文件 .babellrc

使用转码规则

```bash
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react
```
#### 四、命令行转码

安装命令
```js
$ npm install --save-dev @babel/cli
```

基本用法
```bash
# 转码结果输出到标准输出
$ npx babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ npx babel example.js --out-file compiled.js
# 或者
$ npx babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ npx babel src --out-dir lib
# 或者
$ npx babel src -d lib

# -s 参数生成source map文件
$ npx babel src -d lib -s
```

#### 五、babel-node

提供一个支持 ES6 的 REPL 环境。支持 Node 的 REPL 环境的所有功能，可直接运行 ES6。

安装
```bash
$ npm install --save-dev @babel/node
```

执行 `babel-node` 就进入 REPL 环境。 

```bash
$ npx babel-node
> (x => x * 2)(1)
2

# 一下是直接运行 ES6 脚本
# es6.js 的代码
# console.log((x => x * 2)(1));
$ npx babel-node es6.js
2
```

#### 六、babel/register 模块

改写 `require` 命令，加上一个钩子。从此每当使用 `require` 加载`.js`、`.jsx`、`.es` 和 `.es6` 后缀名的文件，就会先用 Babel 进行转码。

安装
```bash
$ npm install --save-dev @babel/register
```

使用时，必须首先加载 `@babel/register`。然后就不需要手动对 `index.js` 转码了。

```bash
// index.js
require('@babel/register');
require('./es6.js');
```

## let 和 const 命令

### 一、let 命令

用来声明变量。用法类似于 `var`

但是 `let` 声明的变量，只在 `let` 命令所在的代码块内有效。

`for` 循环的计数器，就很适合用 `let` 命令。

只要块级作用域内存在 `let` 命令，所声明的变量就绑定在这个区域，不再受外部的影响。

有了上面那句话就存在暂时性死区(本人理解，不准确)

`let` 不允许在相同作用域内，重复声明同一个变量。因此不能在函数内部重新声明变量

### 二、块级作用域

#### 为什么需要块级作用域？

1、内层变量可能会覆盖外层变量

2、用来计数的循环变量会泄漏为全局变量

#### `ES6` 的块级作用域

1、外层代码块不受内层代码块的影响

2、运行块级作用域的任意嵌套

3、内层作用域可以定义外层作用域的同名变量

#### `ES6` 的块级作用域运行声明函数的规则：

只在使用大括号的情况下成立没有使用大括号就会报错

### 三、const 命令

`const` 声明一个只读常量。一旦声明常量的值就能改变。

#### 本质

并不是变量的值不能改动，而是变量指向的那个内存地址所保存的数据不得改动。

对于简单的数据类型来说，值就保存在变量指向的那个内存地址，等同于常量。

但对于复合型数据，变量指向的内存地址，保存的只是一个指向实际数据的指针

`const` 只能保证指针是固定的。

### 四、ES6 声明变量的6种方法

var、function、const、let、import、class

var、function :声明的变量属于顶层对象的属性

const、let、import、class：声明的变量不属于顶层对象的属性

## 变量的解构赋值

### 一、数组

模式匹配：

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3
```

当左边数量大时，解构不成功。

当右边数量大时，解构成功，但是不完全解构。

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
```

额外知识点：

可使用 set 结构赋值

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
```

默认值:

ES6 内部使用严格相等运算符 (===) 只有当一个数组成员严格等于 `undefined` 时，默认值才会生效。

```js
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

### 二、对象

可以不按顺序，变量名必须相同。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```

如果变量名不同：要使用下面的方式：

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
```

```js
let a = {};
let b = [];

({foo:a.porp ;bar:b[0]} = {foo:123,bar:true});
 console.log(a);    //{prop:123}
 console.log(b);    //{true}
```



### 三、字符串

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

字符串长度

```js
let {length : len} = 'hello';
len // 5
```

### 四、数值/布尔

当等号右边不是对象或者数组，都会优先转化成对象

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

由于 `undefined` 和 `null` 无法转化为对象，所以会报错。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```


### 五、函数

看一个神奇的操作

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

### 六、用途

#### 交换变量

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

简洁，清晰，易懂。

#### 从函数返回多个值

```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

取数组和对象的值就很方便了。

#### 能够提取 JSON 数据

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

#### 方便的对 MAP 集合进行遍历

```js
const map = new Map();
map.set('one','hang1');
map.set('two','hang2');

for(let [key,value] of map){
    console.log(key+":"+value);
}
```

#### 只想取键或只想取值

键和值

```js
for(let [key] of map){

}

for(let [,value] of map) {

}
```

#### 取模块

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 字符串的扩展

### 一、字符串的 遍历的方式

```js
for(let c of 'foo'){
  console.log(c);
}
//'f' //'o' //'o'
```

### 二、normalize()

`Ǒ`:(\u01D1) 由 `O`:(\u004F) 和 `ˇ`:(\u030C) 合成的。

JavaScript 上：

```js
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2
```

ES6:

```js
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```

`NFC`：默认参数，标准等价合成
`NFD`：标准等价分解
`NFKC`：兼容等价合成
`NFKD`：兼容等价分解

```js
'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2
```

### 三、JavaScript 提供的方法

#### includes

返回布尔值，表示是否找到了参数字符串

#### startsWith、endsWith

返回布尔值。表示参数字符串是否在头部或者尾部

```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

#### repeat()

返回一个新字符串，表示将源字符串重复N次

```js
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

#### padStart()、padEnd()

字符串补全长度的功能

若原字符串长度，等于或者大于最大长度，则不生效。

如果补全的字符串，两者长度之和超过了最大长度，会截去超出的部分

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

'abc'.padStart(10, '0123456789')  // '0123456abc'
```

#### trimStart()、trimEnd()

消除头部和尾部的空格

```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

### 四、模板字符串

直接看代码

```js
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

如果需要使用反引号，前面要用反斜杠转义

```js
let greeting = `\`Yo\` World!`;
```

使用了模板字符串，所有的空格和缩进都会保留在输出中

若不想要换行：

```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
```

### 五、标签模板

```js
alert`123`
// 等同于
alert(123)
```

## 正则的扩展

## 数值的扩展

### 一、二进制、八进制表示法

ES6 对于二进制、八进制的写法，分别用前缀 `0b`(`0B`) 、`0o`(`0O`) 表示

```js
0b111110111 === 503 // true
0o767 === 503 // true

Number('0b111')  // 7
Number('0o10')  // 8
```

### 二、方法

#### 1、Number.isFinite,Number.isNaN()

用来检查数值是否为有限的，或者判断是否是数值

```js
Number.isFinite('15'); // false
Number.isFinite(true); // false
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false

Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
```

与传统的全局方法 `isFinite()` 和 `isNaN()`

#### 2、Number.isInteger()

用来判断一个数值是否为整数

```js
Number.isInteger(25) // true
Number.isInteger(25.1) // false

Number.isInteger(25.0) // true
Number.isInteger(3.0000000000000002) // true
```

数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位(1个隐藏位52个有效位)

如果超过这个限度就会被遗弃，所以可能发生 **误判**

### 三、Math 对象的扩展

#### 1、Math.trunc()

用于去除一个数的小数部分，返回整数部分

对于非数值会先使用 `Number` 方法转化位数值，直接看代码：

```js
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
```

#### 2、Math.sign()

用来判断一个数是正、负、0、NaN.

返回五种值

- 参数为正数，返回 `+1`;
- 参数为负数，返回 `-1`;
- 参数为 0，返回 `0`;
- 参数为 -0，返回 `-0`;
- 参数为其他值，返回 `NaN`;

#### 3、其他的方法

Math.cbrt()：用于计算一个数的立方根

Math.imul()：用于计算两数相乘的结果

Math.fround()：返回一个数的32位单精度浮点数形式

Math.hypot():两数的平方和的平方根 (勾股定理)

指数运算符：

```js
2 ** 2 // 4
2 ** 3 // 8

// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

## 函数的扩展

### 一、传参问题，实例很好，值得一看

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}


// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

### 二、rest 参数

`...变量名` 用于获取函数的多余参数

## 数组的扩展

### 一、数组的方法

#### 1、keys()-对键名的遍历

```js
for(let index of ['a','b'].keys()) {
  console.log(index);
}
//0 //1
```

#### 2、values-对键值的遍历

```js
for(let index of ['a','b'].values()) {
  console.log(index);
}
//'a' //'b'
```

#### 3、entries()-对键值对的遍历

```js
for(let [index,elem] of ['a','b'].entries()) {
  console.log(index,elem);
}
//0 'a'   //1 'b'
```

#### 4、手动遍历

```js
let letter = ['a','b','c'];
let entries = letter.entries();

console.log(entries.next().value);  //[0,'a']
console.log(entries.next().value);  //[1,'b']
console.log(entries.next().value);  //[2,'c']
```

#### 5、includes()

检查某个数组是否半酣给定的值

#### 6、Map 和 Set 的查找方法

Map:has 方法，用来查找键名

```js
Map.prototype.has(key);
```

Set:has 方法，是用来查找值的。

```js
Set.prototype.has(value);
```

#### 7、flat()、flatMap()

用于将嵌套的数组拉平

.flat()

默认情况下只会拉平一层，要是想拉平多层，可以参考一下的代码

.flat(3)

#### 8、空值

```js
0 in [undefined];   // true
```

判断第0 位是否存在值

map 和 forEach 的遍历情况

```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// map方法
[,'a'].map(x => 1) // [,1]
```

针对其他方法：

```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

还有其他方法：
```js
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```

## 对象的扩展

### 一、Generator 函数

#### 1、异步编程

异步编程方式 

```text
(1) 回调函数

(2) 事件监听

(3) 发布/订阅者

(4) Promise 对象
```

回调函数：第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数

回调函数的异步方式容易形成多重嵌套，多个异步操作形成强耦合。

`Promise` 可以解决 `callback hell`问题，`Promise` 对象允许回调函数的嵌套，改成链式调用。

#### 2、什么是 Generator?

语法上:`Generator` 函数是一个状态机，封装了多个内部状态

形式上：是一个普通函数

整个 `Generator` 函数就是一个封装的异步任务。异步操作需要暂停的地方用 `yield` 语句

Generator:

1、function 关键字和函数之间有一个 `*`，且内部使用 `yield` 表达式，定义不同的内部状态

### 二、方法的 name 属性

`.name` 用于返回函数名

如果用了取值函数(`getter`)和存值函数(`setter`) `.name` 属性不是用在该方法上面，而是用在 get 和 set 上面。

### 三、属性的遍历

```js
let r = { 
  name:'hang',
  age:12,
  addr: '国脉',
};
```

#### 1、for...in

```js
for(let i in r){
  console.log(r);
}
//输出为键名
```

#### 2、Object.keys(obj);

```js
let s = Object.keys(r);
console.log(s);   //以数组的显示键名
```

#### 3、Object.getOwnPropertyNames(obj)

```js
let t = Object.getOwnPropertyNames(r);
console.log(t);
```

### 四、扩展运算符

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

## 对象的新增方法

### 一、Object.assign()

用于对象的合并

```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

## Set 和 Map 的方法

### 一、Map
```js
let s = new Set();
s.add(1);
s.had(1); // true
s.delete(1);  
s.has(1); //false
```

将 `set` 转化为数组
```js
Array.from(items);
```

### 二、Set

```js
const m = new Map();
p.set(o,'hang');
p.get(o);
```

### 三、一些转化

#### 1、Map 转为数组

```js
const m = new Map().set(true,7).set({foo,3},['aa']);
[...m]
```
#### 2、数组转为 Map

将数组传入 Map 构造函数，就可以转为 Map;

```js
new Map([[true,7],[{foo:3},['aa']]]);
```

#### 3、Map 转为对象

```js
function strMapToObj(strMap){
  let obj = Object.create(null);
  for(let [k,v] of obj){
    obj[k] = v;
  }
  return obj;
}
```

#### 4、对象转为 Map

```js
function objToMap(obj) {
  let m = new Map();
  for(let k of Object.keys(obj)) {
    m.set(k,obj[k]);
  }
  return m;
}
```

#### 5、Map 转为 JSON

两种方法供参考：

1、如果键名都是字符串，可以考虑先转为对象，在转为 JSON

2、如果键名有非字符串，可以选择转为数组 JSON

```js
JSON.strinify(strMapToObj(m));

JSON.stringify([...map]);
```

#### 6、JSON 转 Map

1、2、参考上面的情况

```js
objToMap(JSON.parse(jsonStr));

new Map(JSON.parse(jsonStr));
```

## Reflect

### 一、概述

和 `Proxy` 对象一样，设计 `Reflect` 目的

1、将 `Object` 对象的一些明显属于语言内部的方法放到 `Reflect` 上。未来的新方法只部署在 `Reflect` 对象上。

2、修改某些 `Object` 方法的返回结果，让其变得更合理。

看代码：

```js
// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

3、让 `Object` 操作都变成函数行为。

```js
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

### 二、静态方法

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver) 
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

#### 1、Reflect.get(target, name, receiver)

查找并返回 `targer` 对象的 `name` 属性

```js
Reflect.get(myObject, 'foo') 
```

#### 2、Reflect.set(target,name,value,receiver)

设值

```js
Reflect.set(myObject, 'foo', 2);
```

#### 3、Reflect.has(obj,name)

```js
Reflect.has(myObject,'foo')
```

#### 4、Reflect.deleteProperty(obj,name)

删除对象的属性

```js
Reflect.deleteProperty(myObj, 'foo');
```

#### 5、Reflect.construct(target,args)

构造函数，不使用 `new`

```js
const instance = Reflect.construct(Greeting, ['张三']);
```

#### 6、Reflect.getPrototypeOf(obj)

读取对象的 `_proto_` 属性

```js
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
```

#### 7、Reflect.setPrototypeOf 

设值目标对象的原型

### 三、使用proxy 实现观察者模式

一旦数据发生变化，函数就会执行

```js
const person = observable({
  name: 'hang',
  age:20
})

function print(){
  // console.log();
}

observe(print);
```

## Promise 的含义

异步编程

`Promise` 对象有两个特点：

1、对象的状态不受外界影响。`Promise` 对象代表一个异步操作，有三种状态：`pending`(进行中)、`fulfilled`(已成功)、`rejected`(已失败).

2、一旦状态改变，不会在变，任何时候都可以得到这个结果。状态改变只有两种可能：进行->成功、进行->失败

## Iterator 和 for...of 循环

### Iterator 的作用

1、为各种数据结构，提供一个统一的、便捷的访问接口

2、使得数据结构的成员能够按某种次序排列

3、创造了一种新的命令循环

### 遍历的过程

1、创建一个指针对象，指向当前数据结构的起始位置。遍历器对象，本身就是一个指针对象。

2、第一次调用指针对象的 `next` 方法，可以将指针指向数据结构的第一个成员

3、不断调用阵阵对象的 `next` 方法，直到它指向数据结构的结束位置。

### in of 区别

```js
var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}
```

in: 遍历的是索引

of:遍历的是内容

## Generator 函数的语法和异步应用

### 嵌套的回调函数

```js
fs.readFile(fileA, 'utf-8', function (err, data) {
  fs.readFile(fileB, 'utf-8', function (err, data) {
    // ...
  });
});
```

回调函数地狱。强耦合

链式调用

```js
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});
```

## Module 的语法

### 概述

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// ES6模块
import { stat, exists, readFile } from 'fs';
```

### 一、export 命令

```js
export var firstName = 'Michael';
export {firstName, lastName, year};

function v1() { ... }
function v2() { ... }

// 输出函数，可以重命名
export {
  v1 as streamV1,
  v2 as streamLatestVersion
};
```

### 二、import 命令

```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

### 三、浏览器加载

浏览器允许脚本异步加载

```js
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

`defer`:要等到整个页面在内存中正常渲染结束，才会执行(渲染完就执行)，多个脚本按照页面出现的顺序加载

`async`:一旦下载完，渲染引擎就会终端渲染，执行这个脚本以后再继续渲染。(下载完才执行)，不能保证加载顺序

加载规则：

浏览器加载 ES6 模块，也使用 `<script>` 标签，但是也要加入 `type='module'` 属性

```js
<script type="module" src="./foo.js"></script>  //都是异步加载
```

`import` 的函数用上 es6 模块，输入的变量是活的，看下面的代码

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

### 四、ES6 加载 CommJS 模块

```js
// a.js
module.exports = {  //CommJs
  foo: 'hello',
  bar: 'world'
};

// 等同于
export default {  //ES6
  foo: 'hello',
  bar: 'world'
};
```

三种写法：

```js
// 写法一
import baz from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法二
import {default as baz} from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法三
import * as baz from './a';

// 不正确
import { readFile } from 'fs';  //c格式只有运行时才能确定接口，import 命令要求编译时就确定这个接口
```

### 五、CommonJS 模块加载 ES6模块

















