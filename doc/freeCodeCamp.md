# HTML

## 一、img

    所有img元素都必须具有alt属性。alt属性内的文本用于屏幕阅读器以提高可访问性，并在图像无法加载时显示。    

    如果图像纯粹是装饰性的，则使用空alt属性是最佳做法。

## 二、a

    跳转到某个内部地方<a href="#id"></a>

## 三、radio

    <label for="indoor">
        <input id="indoor" type="radio" name="indoor-outdoor"> Indoor
    </label>

## 四、checkbox

    <label>
        <input type="checkbox" name="personality"> Energetic
    </label>

# CSS

## 一、font-family 设置字体样式:

    font-family: sans-serif;

## 二、导入谷歌字体：	

    	//放在style上面
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">

        font-family: FAMILY_NAME, GENERIC_NAME;	    //第二个为后背选项
        font-family:"Open Sans";    //如果选项中间有空格，应用“”起来

## 三、设置图像边框

    .thin-red-border {
        border-color: red;	//颜色
        border-width: 5px;	//宽度
        border-style: solid;	//样式
 	 	border-radius:10px or 50%;		//边角的弧度
    }

## 四、padding,margin

    padding:调整内边距    控制元素内容与其内容之间的空间量
    
    padding: 10px 20px 10px 20px	//上、右、下、左

    margin:调整外边距        其边框与周围元素之间的距离    可以设为负值    元素将变大

    margin: 10px 20px 10px 20px	//上、右、下、左

## 五、属性选择器设置边距

    [type='checkbox']{
        margin:10px 0px 15px 0px;
    }

## 六、em、rem、in、mm

    em和rem：相对单位，相对于父项
    in和mm：绝对单位，英寸，毫米，接近屏幕的实际测量值

## 七、！important

```
    .pink-text {
        color: pink !important; //最为重要，覆盖掉所有的声明
    }
```

## 八、创建和使用自定义变量
```
        --penguin-skin: gray;   //要创建变量，只需要在变量名前加--

        background: var(--penguin-skin);    //你可以在任何一个样式类里使用该变量  

        background: var(--penguin-skin，black); //可以设置颜色
```

## 九、text-algin:

    justify:除最后一行之外的所有文本行都与行框的左右相交
    center：使文本居中
    right:右对齐
    left:左对齐

## 十、字体加粗

    1、可以使用属性：font-weight: bold;
    2、可以是用strong标签

## 十一、字体下划线

    1、可以使用属性：text-decoration: underline
    2、可以使用u标签

## 十二、字体倾斜：

    1、可以使用属性：font-style: italic
    2、可以使用标签em

## 十三、删除线：

    1、可以使用属性font-style: italic
    2、可以使用s标签
## 十四、盒子阴影

    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    外阴影：box-shadow: X轴  Y轴  Rpx  color;

    属性说明（顺序依次对应）： 阴影的X轴(可以使用负值)    阴影的Y轴(可以使用负值)    阴影模糊值（大小）    阴影的颜色

    内阴影：box-shadow: X轴  Y轴  Rpx  color  inset;

    可以尝试一下下面的代码：
    box-shadow: 25px 10px 0 0 blue; 

## 十五、透明度

    opacity:~~

    值1是不透明的，根本不透明。
    值0.5是半透明的。
    值0完全透明。

## 十六、设置英文格式

    text-transform：~

    lowercase	小写
    uppercase	大写
    capitalize	不懂
    initial	    使用默认值
    inherit	    使用text-transform父元素中的值
    none	    默认值：使用原始文本

## 十七、段落行高

    line-height:~

## 十八、鼠标覆盖样式

    a:hover{~}

## 十九、position操作：

    static: HTML元素的默认定位方式

    absolute: 将对象从文档流中拖出，使用left，right，top，bottom等属性进行绝对定位。而其层叠通过z-index属性定义。绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>
    
    relative: 对象不可层叠，但将依据left，right，top，bottom等属性在正常文档流中偏移位置
    
    fixed: 元素的位置相对于浏览器窗口是固定位置, 即使窗口是滚动的它也不会移动

    口诀：

        绝对定位（absolute）位置是相对最近已经定位的父元素
        如果父元素本身没有使用position定位，则相对于文档（html）定位
    
        对定位使用通常是父级定义position:relative定位
        子级定义position:absolute绝对定位属性
        并且子级使用left或right和top或bottom进行绝对定位

## 20、改变重叠前后位置

    z-index：~

## 21、渐变色

```css
background: linear-gradient(gradient_direction, color 1, color 2, color 3, ...);
```
```
第一个参数为颜色过渡开始的方向
```

```css
div{ 
    border-radius: 20px;
    width: 70%;
    height: 400px;
    margin:  50 auto;
    background: repeating-linear-gradient(
      45deg,
      yellow 0px,
      yellow 40px,
      black 40px,
      black 80px
    );
  }
```
```
上面引用的为重复指定渐变模式
首先从0px开始
在40px时混成第二种颜色
但是因为20px也是第三种颜色，因此立即变成第三种颜色
第三种颜色于第四种颜色混为红色
```
## 22、transform

改变元素的大小
transform:scale(1.5);

可以使用hover进行触碰改变

该属性能让元素沿着X/Y轴倾斜，正负都可以

transform:skewX(24deg); 

## 23、动画属性和@keyframes规则

```css
#anim {
  animation-name: colorful;
  animation-duration: 3s;
}
@keyframes colorful {
  0% {
    background-color: blue;
  }
  100% {
    background-color: yellow;
  }
}
```

1、animation-name:设置动画的名称

2、animation-duration:设置动画的时间长度

3、@keyframes:规则链接到具有名称的动画属性

4、animation-fill-mode:forwards;动画结束时运用于元素的样式

在使元素运动时：

可以在@keyframes上设置top,left,right,buttom,进行偏移

5、animation-iteration-count:3 or infinte; 使元素进行无限的运动，也可以跟次数

6、animation-timing-function:改变动画时间，下面为一些参数：

ease(默认值):开始缓慢，中间加速，最后缓慢

ease-in:开始缓慢，结束时加速

ease-out:开始时加速，结束时缓慢

linear:恒定的动画速度

可以通过贝塞尔曲线更好的控制动画播放的方式，于animation-timing-fnction一起使用

animation-timing-function: cubic-bezier(0.25,0.25,0.75,0.75);

我也看不懂

# image

## 1、alt

alt 在 img 标签中是必须品

若网页已经有给图片做说明的话，alt显得多余，但是最好不要省略，用空字符代替。

## 2、Article

Article 是一个分段元素，用于包装独立的自包含内容。该标记适用于博客条目，论坛帖子或新闻文章

## 3、audio 音视频播放器

```html
<audio id="meowClip" controls>
  <source src="audio/meow.mp3" type="audio/mpeg" />
  <source src="audio/meow.ogg" type="audio/ogg" />
</audio>
```
controls:显示了浏览器默认播放，暂停和其他控件，并支持键盘功能。

type="audio/mpeg"：表示类型，要记得加上去

## 4、figure、figcaption

```html
<figure>
  <img src="roundhouseDestruction.jpeg" alt="Photo">
  <br>
  <figcaption>
    text.
  </figcaption>
</figure>

```
两项一起使用，包含可视化表示，(图表和图像等)和标题等。

改善图表等访问性

## 5、for

把 for 属性用在 input 标签上，会使表单更具可读性

for 属性的值必须与表单的属性值相同

## 6、fieldset

将 fieldset 和 legend 用于 form 表单中的单选按钮效果很好

可参考如下代码：

```html
<form>
  <fieldset>
    <legend>Choose one of these three items:</legend>
    <input id="one" type="radio" name="items" value="one">
    <label for="one">Choice One</label><br>
    <input id="two" type="radio" name="items" value="two">
    <label for="two">Choice Two</label><br>
    <input id="three" type="radio" name="items" value="three">
    <label for="three">Choice Three</label>
  </fieldset>
</form>
```

## 7、accesskey

指定一个快捷键来激活或将焦点带到一个元素

```html
<button accesskey="b">Important Button</button>
```

# Responsive Web Design Principles 响应式WEB设计原则

## 1、@media 

```css
@media (max-height:800px){
    p{
      font-size:10px;
    }
  }
```
当高度低于 800px 时，变成该 CSS 样式

## 2、排版响应

vw:10vw 将是视口宽度的10%

vh:3vh 将是视口高度的3%

vmin:70vmin 将是视口较小尺寸（高度和宽度）的70%

vmax:100vmax 将是视口的更大尺寸（高度和宽度）的100%

# CSS Flexbox: Use display (CSS Flexbox 挑战简介)

## 一、flex-shrink 

用于设置块和块的比例，设值为1、2、3、4.。。

## 二、flex-grow

用法和上面一样把，一个是扩大一个是缩小

## 三、flex-basis

在使用flex-shrink 进行调整之前，该属性指定项目的初始大小：flex-grow

可使用的单位：px,em,%

## 四、flex 的速记属性

flex:1 0 10px;  意思为：

flex-grow:1;

flex-shrink:0;

flex-basis:10px;

默认为：flex:0 1 auto;

## 五、order 属性：

```css
order:1 2 3 4 ...
```

按顺序排列 由大到小

## 六、aign-self 属性

可以单独调整每个项目的对齐方式

align-self ：center or flex-end

# CSS Grid(CSS 网格)

```css
display:grid;

display-template-columns:50px 50px 50px;

grid-template-rows:50px 50px;

grid-template-columns: auto 50px 10% 2fr 1fr;
```

解释一下上面第 四 行的代码：

共5列，第一列：自由，第二列：50 第三列：10%；最后分3份

```css
grid-column-gap: 10px;  //创建表格列的间隙

grid-row-gap:5px;   //创建表格行的间隙

grid-gap:10px 20px;     //更快的创建表格行和列的间隙

grid-column:1 / 3;  //从左侧网格第一个垂直线开始，跨越到第三行，消耗两列

grid-row:2/4;   //同上

justify-self:start center end;  //水平对齐内容在单元格的位置

align-self：同上;   //垂直对齐

 justify-items：同上;   //所有项目水平对齐

 align-items:同上;  //所有项目垂直对齐

 grid-area:footer;  //设置网格区域，如 footer 位置

 grid-area: horizontal line to start at / vertical line to start at / horizontal line to end at / vertical line to end at;  3/1/4/4

grid-template-rows: repeat(100, 50px);  //创建100列，每列50px;

grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));创建灵活的布局和限制每项的尺寸

grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
```

上面两者的区别：

当容器的大小超过所有项目组合的大小时

auto-fill:继续插入空行或列并将项目推到一边

auto-fit：折叠这些空行或列并拉伸项目以适合容器的大小

## 二、使用 @Media 创建灵活的布局

```css
grid-template-areas:
    "header header"
    "advert content"
    "footer footer";
```

# Basic JavaScript (基础JavaScript)

## 一、数组

```js
var a = ["hang",1];                 //数组
var b = [["hang2",2],["hang1",1]];  //数组嵌套数组
myArray.push(["dog",3]);            //插入数组
var c = myArray.pop();              //弹出数组的最后一个元素
var d = myArray.shift();            //弹出数组的第一个元素
myArray.unshift(["hang4",33]);      //将值插入到数组的第一个位置
```

## 二、比较运算符

```js
3 ==  '3'   //true
3 === '3'   //false
```

## 三、switch 运算符

```js
switch(a){
    case "a":
    case "b":
        qq = "a or b";
        break; 
    case "c":
    case "d":
        qq = "c or d";
        break;
    default:
        qq = "..";
}
```

## 四、对象进行查找

```js
var aa = {
    'alpha':'Adams',
    'bravo':'Boston',
}
result = aa[val];       //只能用括号表示法
```

## 五、测试对象的属性是否存在

```js
var aa = {
    a:"cc",
}
myObj.hasOwnProperty("a");
```

## 六、卡了很久的关卡------javaScript---Record Collection   

```js
function updateRecords(id, prop, value) {
  if (prop === "tracks" && value !== "") {
   if(collection[id][prop]) {
    collection[id][prop].push(value);
   }
   else {
    collection[id][prop]=[value];
   }
  } else if (value !== "") {
    collection[id][prop] = value;
  } else {
    delete collection[id][prop];
  }
  return collection;
}
```

## 七、使用随机数

1、生成 `0-1` 之间的分数

```js
Math.random()
```

2、生成随机的整数(如下为生成0~9之间的整数)

```js
Math.floor(Math.random()*10);
```

3、生成某个范围内的随机数

```js
Math.floor(Math.random() * (max - min + 1)) + min
```

## 八、将二进制数转化为十进制数

```js
parseInt(str,2);
```

## 九、多条件的三元运算符

```js
return (a === b) ? "a and b are equal" : (a > b) ? "a is greater" : "b is greater";
```

# ES6 语法

## 一、使用 const 声明一个数组

用 `const` 声明的数组，数组名是不能修改的

但是数组的值是可以改变的，请参照下面的代码

```js
"use strict";
const s = [5, 6, 7];
s = [1, 2, 3]; // throws error, trying to assign a const
s[2] = 45; // works just as it would with an array declared with var or let
console.log(s); // returns [5, 6, 45]
```

## 二、控制 const 声明的对象属性不被修改

`Object.freeze(~)`：可以冻结整个对象，使属性无法被增删改

```js
let obj = {
  name:"FreeCodeCamp",
  review:"Awesome"
};
Object.freeze(obj);
obj.review = "bad"; //will be ignored. Mutation not allowed
obj.newProp = "Test"; // will be ignored. Mutation not allowed
console.log(obj); 
// { name: "FreeCodeCamp", review:"Awesome"}
```

## 三、高阶函数--filter()、map()

`filter`: 用来检查每个元素--arr.filter((num) =>~)

`map`:用来遍历数组的每个元素--arr.map( num => {~})

```js
const arr = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];
const squaredIntegers = arr.filter( (num) => num > 0 && num % parseInt(num) === 0 ).map( (num) => Math.pow(num, 2) );
```

## 四、解构函数

```js
const AVG_TEMPERATURES = {
  today: 77.5,
  tomorrow: 79
};
const { today, tomorrow } = avgTemperatures;
```

## 五、解构嵌套函数：

```js
const a = {
  start: { x: 5, y: 6},
  end: { x: 6, y: -9 }
};
const { start : { x: startX, y: startY }} = a;
console.log(startX, startY); // 5, 6
```

## 六、解构数组

```js
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c); // 1, 2, 5

// 用 ES6 的方法截取数组
const [a,b,...arr] = list; 
```

## 七、将对象作为函数的参数传递

箭头函数的括号，直接放上对象属性

```js
const profileUpdate =（profileData）=> { 
  const {name，age，nationality，location} = profileData; 
  //用这些变量做一些事情
}

// 可以改成下面的代码
const profileUpdate =（{name，age，nationality，location}）=> { 
  / *对这些字段执行某些操作* / 
}
```

## 八、import 和 require 的不同

`require()`：导入外部文件和模块中的函数和代码。全部导入可能会占内存

`import()`:可以选择加载给定文件中的模块或文件中的哪些部分。

## 九、使用 * 导出文件所有内容

```js
import * as str from "~";
```

**注意**：引用文件要用 `""`,不能用 `'`,会报错。

# 正则表达式

## 一、忽略大小写

`i`:能够忽略大小写

```js
let myString = "freeCodeCamp";
let fccRegex = /freecodecamp/i; // Change this line
let result = fccRegex.test(myString);
```

## 二、获取重复的字符

`g`:多次搜索或提取模式

```js
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /Twinkle/ig; // Change this line
let result = twinkleStar.match(starRegex); // Change this line
```

## 三、匹配全字符

`.`:通配全部字符。

```js
let exampleStr = "Let's have fun with regular expressions!";
let unRegex = /.un/; // Change this line
let result = unRegex.test(exampleStr);
```

## 四、灵活性匹配

```js
let quoteSample = "Beware of bugs in the above code; I have only proved it correct, not tried it.";
let vowelRegex = /[aeiou]/ig; // Change this line
let result = quoteSample.match(vowelRegex); // Change this line
console.log(result);
```

## 五、遍历匹配

```js
let quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/ig; // Change this line
let result = quoteSample.match(alphabetRegex); // Change this line
```

## 六、匹配不想要

`^`:

```js
let quoteSample = "3 blind mice.";
let myRegex = /^0-9aeiou/ig; // Change this line
let result = quoteSample.match(myRegex); // Change this line
```

## 七、多次出现

`+`:匹配多次出现。

```js
let difficultSpelling = "Mississipspi";
let myRegex = /s+/ig; // Change this line
let result = difficultSpelling.match(myRegex);
console.log(result);

/// ss,ss,s
```

## 八、出现零次后多次的字符

`*`:匹配出现 0 次或多次的字符

```js
let chewieQuote = "Aaaaaaaaaaaaaaaarrrgh!";
let chewieRegex = /ar*/ig; // Change this line
let result = chewieQuote.match(chewieRegex);
console.log(result);
```

## 九、\w

` \w`:可以简化匹配数字字母 = `[A-Za-z0-9_]`

`\W`:可以匹配字符串中的非字符串和数字

## 十、\d

`\d`:快捷版的匹配数字 = `[0-9]`

`\D`:匹配非数字

## 十一、限制个数

`{3,}`:逗号前位最少几位，逗号后位最多几位。

```js
let username = "RegexGuru";
let userCheck = /[a-zA-Z]{2,}\d*$/; // Change this line
let result = userCheck.test(username);
console.log(result);
```

## 十二、匹配空格

`\s`：可以用来匹配空格、回车符、换页符、换行符

`\S`:用来不匹配这些

```js
let sample = "Whitespace is important in separating words";
let countNonWhiteSpace = /\S/g; // Change this line
let result = sample.match(countNonWhiteSpace);
```

## 十三、判断都有或全无

`?``:检查前一个元素中的零个或者一个。可以将此符号视为前一个元素是可选的。

```js
let american = "color";
let british = "colour";
let rainbowRegex= /colou?r/;
rainbowRegex.test(american); // Returns true
rainbowRegex.test(british); // Returns true
```

## 十四、正面前瞻、负面前瞻

`(?=...)`:确保搜索模式中的元素存在。

`(?!...)`:确保搜索模式中额元素不存在。

不太懂。直接看代码：

```js
let quit = "qu";
let noquit = "qt";
let quRegex= /q(?=u)/;
let qRegex = /q(?!u)/;
quit.match(quRegex); // Returns ["q"]
noquit.match(qRegex); // Returns ["q"]
```

```js
let password = "abc123";
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password); // Returns true
```

## 十五、重用匹配

`\1`:可以用来匹第一组的模式。

但是下面这个 `^` 我真不太懂什么意思啊。

```js
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/; // Change this line
let result = repeatNum.match(reRegex);
console.log(result);
```

## 十六、对符合模式的样式进行替换

代码样式：`错误模式`.replace(`正则表达式`,`替换的字符`);

```js
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue");
// Returns "The sky is blue."
```

也可以进行位置的替换：

使用 `$` 代替符合位置的字符。

```js
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
// Returns "Camp Code"
```

## 十七、取消空格

```js
let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g; // Change this line
let result = hello.replace(wsRegex,''); // Change this line
console.log(result);
```

# 调试(Debugging)

使用 `console.clear()`(不带参数)，可以清除打印的消息。

使用 `typeof` 可以检查变量或常量的类型。

# 基本数据结构挑战 (the Basic Data Structure)

关于 `splice()` 删除和替换

`arr.splice(索引数,个数)`：删除

`arr.splice(索引数,个数,替换内容)`:替换，替换内容不限个数

关于 `slice()` 复制数组项

`slice(开始的索引数(有包括),结束的索引数(不包括))`:提取、复制


--------------------

# REDUX

## Provider: 

```js
const Provider = ReactRedux.Provider;

<Provider store = {store}> 
  <App /> 
</Provider>
```

允许在整个组件树中访问 Redux 的 `store` 和 `dispatch`  函数

## mapStateToProps()

此函数应state作为参数，返回该状态映射到特定属性名称的对象。

```js
const mapStateToProps = (state) => {
  return {messages: state}
};
```

## mapDispatchToProps()

传递 `dispatch` 进去。`return` 返回一个可传递参数进去的方法，然后 `dispatch`

在函数中如何使用 `mapDispatchToProps` ?

`this.props.方法` 即可 。

```js
const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};
```

## connect

```js
const connect = ReactRedux.connect;  
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational);
```

可以当成组件来饮用。

使用全局对象中的connect方法将此组件连接到Redux ReactRedux

# D3

## data()

用于选择DOM 元素，以将数据附加到这些元素上

动态生成使用这些数据 `.text((d) => d)`

## enter()

常见的工作流模式，在文档中为集合中的每个元素创建一个新元素

## Scales 和 scaleLinear()

Scales: 告诉程序如何将一组原始数据点映射到 svg 画布的像素上的函数

scaleLinear(): 更改线性关系

```js
const scales = d3.scalelinear();
const output = cale(50);
```

```js
// 代表你输入的数字如果在这个区间的话，会自动映射 range() 的数值出来
// 如果数据不在这个区间的话，也会根据 range 进行映射
scales.domain([0, 40]) 
scales.range([100, 400])
```

# JOSN and ajax

## 异步获取外部的 API

```js
req = new XMLHttpRequest();
req.open('GET', '/json/cats.json', true);
req.send();
req.onload = function() {
  json = JSON.parse(req.responseText);
  document.getElementsByClassName('message')[0].innerHTML = JOSN.stringify(json);
}
```

## 获取地理位置

```js
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  })
}

```

## 使用 XMLHttpRequest 发布数据

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










