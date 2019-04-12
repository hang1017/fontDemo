# 通过动图来展示 CSS 的相关知识点

## 一、负边距

左右边距表现效果不一致

左、上为负：左、上移

右、下为负：右、下移,将后面的元素向后或者向下推

## 二、形状的外在表现

弄不好

## 三、flex 不为人知的特性

1、父控件下的：`margin:auto`

2、`flex-grow<1`:只能按比例分配部分剩余空间，而不是全部


## 四、input 宽度

并不是给元素设置 `display:block` 就会自动填充父元素宽度，input 就是个例外。其默认宽度取决于 `size` 特性

## 五、position 定位特效

同级元素中，要想有谁显示在前的样式，要给每个元素都附上 `position:relative` 

然后通过 `z-index` 调整谁先谁后

## 六、粘性定位

对要使用粘性定位的元素上加上 `position:sticky` 属性

位置的控制：`top`、`button`  单位：`vh`

## 七、相邻兄弟选择器

不会说直接看代码

```html
<div className="o7">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
</div>
```
```css
.o7>ul{
    list-style: none;
    text-align: center;
    padding-left: 0;
    /* padding-top: 0; */
}

.o7>ul>li+li{
    border-top: 1px dashed red;
}
```
## 八、css 绘制三角形

```css
.o8-1{
    border: 100px solid;
    border-color: red yellow transparent gray;
}
```

可以直接看 css

边框的的宽度设置的大一些即可

## 九、display 的 table 布局

`display:table` 可以实现多列等高布局

父元素定义为：`display:table` 

子元素定义为：`display:table-cell`

如果有需要缩进的话在父元素补上： `border-spacing: 30px 10px;`

## 十、动画效果

可以参考 freeCodeCamp :CSS->23

使用动画:

```css
animation: move 2s linear infinite;
```

如果需要改变运用方向的话，可以使用 `animation-direction:`

并且需要使用 `@keyframes` 来设置动画效果,下面为参考代码：

```css
@keyframes move{
    0%{
        background-color: red;
    }
    100%{
        transform: translate(400%,0);
    }
}
```

## 十一、渐变色

直接参考 freeCodeCamp CSS=>21

## 十二、隐藏文字的两种方法：

1、设置文字大小：

```css
font-size:0px;
```

2、设置偏移：

```css
text-indent:-1000px;
```

## 十三、角度渐变

```css
background: conic-gradient(red 0 30%,green 40% 70%,blue 70% 100%);
```

## 十四、background-repeat

两个新属性：round、space

前者：凑个整

后者：留点缝

## 十五、指定背景如何附在容器上

`background-attachment:`

注意其属性 `local` 和 `fixed`的使用

## 十六、 outline

用 `outline` 来描边，不占地方，也可以在里面

代码一看便知：

```css
outline: 5px solid green;
outline-offset: -10px;
```

## 十七、table-size

浏览器默认为8个空格，table-size可以指定空格长度

```css
table-size:2,4,5,6...
```

## 十八、 暂停动画

动画一开始设置 `@keyframes`

```css
@keyframes rotate {
    100%{
        transform:rotate(1turn);
    }
}
```

设置覆盖时暂停：

```css
.o14-1{
    width: 100px;
    height: 100px;
    background-color: skyblue;
    animation: rotate 3s linear infinite;
    animation-play-state: running;
}

.o14-1:hover{
    animation-play-state:paused
}
```




