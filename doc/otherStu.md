# 乱七八糟的学习

## 前端之巅-大部分教程不会告诉你的12个JS技巧-2019.04.14

### 一、过滤唯一值

```js
const array = [1,2,3,4,4,4,4,5,5,"hang","hang1","hang"];
const a = [...new Set(array)];
console.log(a);
```

`ES6` 的写法，该用法可以自动帮你过滤到重复值，但是如果数组包含对象，就不管用了。

### 二、在循环中缓存数组长度

```js
for(let i = 0,length = arr.length;i<length;i++){}
```

这样操作的话性能更优~

### 三、短路求值

三元运算符比较便捷，但有时候页比较复杂，我们可以使用 `&&` 和 `||` 来替代：

```js
let one = 1,two=2,thr = 3;
console.log(one && two && thr); //3
console.log(0 && one);          //0

console.log(one || two || thr); //1
console.log(0 || null);         //null
```

使用 `&&` 可以返回第一个 `false`。如果所有的操作数都是 `true`，将返回最后一个表达式

使用 `||` 可以返回第一个 `true`。如果所有的操作数都是 `false`，将返回最后一个表达式

例子：

```js
return (foo || []).length;
```

```js
return (this.state.data || 'Feching Data');
```

### 四、将 String 值转换成 int

```js
let i= "15";
let flag = true;
i = +i;         //转换成数字类型
flag = +flag;   //也转换成数字类型 ：1
```

### 五、快速幂运算

从 `ES7` 开始可以使用 `**` 进行幂运算

```js
console.log(2 ** 3);        //8

// 一下表达式是等效的
Math.pow(2,n);
2 << (n-1);
2**n;
```

### 六、快速取整

使用 `|` 运算符会更快，帮你去除小数部分

```js
console.log( 23.9 | 0);     //23
console.log(-23.9 | 0);     //-23
```

### 七、截取数组的两种方法

```js
let arr = [0,1,2,3,4,5,6,7];
arr.length = 4;             //操作更简洁
arr = arr.slice(0,4);       //速度更快
```

上面两种方法都可以，就看你注重效率还是简介

### 八、获取数组最后的元素

数组 `slice()` 可以接收负整数

```js
arr.slice(-1);      //输出数组的最后一个数
arr.slice(-2);      //输出数组的最后两个数
```


