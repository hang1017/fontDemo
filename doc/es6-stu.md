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










