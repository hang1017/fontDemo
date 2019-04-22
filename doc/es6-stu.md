# ES6 学习文档

## 搭建环境

#### 查看 ES6 环境的支持程度

```bash
$ npm install -g es-checker
$ es-checker
```

#### 安装 babel 转码器

```bash
$ npm install --save-dev @babel/core
```

#### 配置文件 .babellrc

使用转码规则

```bash
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react
```
#### 命令行转码

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

#### babel-node

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

#### babel/register 模块

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

### let 命令

用来声明变量。用法类似于 `var`

但是 `let` 声明的变量，只在 `let` 命令所在的代码块内有效。

`for` 循环的计数器，就很适合用 `let` 命令。

只要块级作用域内存在 `let` 命令，所声明的变量就绑定在这个区域，不再受外部的影响。

有了上面那句话就存在暂时性死区(本人理解，不准确)

`let` 不允许在相同作用域内，重复声明同一个变量。因此不能在函数内部重新声明变量

### 块级作用域

#### 为什么需要块级作用域？

1、内层变量可能会覆盖外层变量

2、用来计数的循环变量会泄漏为全局变量

#### `ES6` 的块级作用域

1、外层代码块不受内层代码块的影响

2、运行块级作用域的任意嵌套

3、内层作用域可以定义外层作用域的同名变量

#### `ES6` 的块级作用域运行声明函数的规则：

只在使用大括号的情况下成立没有使用大括号就会报错

### const 命令

`const` 声明一个只读常量。一旦声明常量的值就能改变。

#### 本质

并不是变量的值不能改动，而是变量指向的那个内存地址所保存的数据不得改动。

对于简单的数据类型来说，值就保存在变量指向的那个内存地址，等同于常量。

但对于复合型数据，变量指向的内存地址，保存的只是一个指向实际数据的指针

`const` 只能保证指针是固定的。

### ES6 声明变量的6种方法

var、function、const、let、import、class

var、function :声明的变量属于顶层对象的属性

const、let、import、class：声明的变量不属于顶层对象的属性

## 变量的解构赋值

### 数组

模式匹配：

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3
```


### 对象


### 字符串


### 数值/布尔


### 函数






