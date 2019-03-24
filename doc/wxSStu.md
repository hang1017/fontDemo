# 零基础完成微信小程序豆瓣评分教程文档

## 搭建框架

    1、最外层建一个images文件夹用来存放图片
    2、在page下建一个public-tpl用来存放模板文件
    3、安利一波自动创建文件夹和页面所需的文件：
        打开utils下的app.json
        看到pages的json字符串的命名了吗？
        你想加一个什么包，就按着里面的格式写上去
        如："pages/test/test"
        按下保存你就会发现目录上多了test的文件夹
        且里面帮你建好了所需要的文件，连内容都帮你写好了。

## 星星评分

### 一、搭建公用来表示星星和评分的模板

    1、在page/public/tpl下,新建两个文件
        命名随意，后缀为wxml和wxss,下面举个例子讲解一下：

        stars.wxml:该文件类似于html文件，可以用来编写页面内容
        stars.wxss:该文件类似于css文件，用来编写stars.wxml样式的文件

### 二、编写stars.wxml文件

```
    <!-- 声明模板的名称 -->
<template name="starsTpl">
  <view class='starsAndNum'>
    <view class='rankStars'>
      <image src='/images/star-full.png'></image>
      <image src='/images/star-full.png'></image>
      <image src='/images/star-full.png'></image>
      <image src='/images/star-half.png'></image>
      <image src='/images/star-no.png'></image>
    </view>
    <text class='rankNum'>7.5</text>
  </view>
</template>
```
    
    我来解释一下该wxml文件的内容(以下为我的理解，未必正确)：

    1、<template>:声明这里面的东西使一个模板

    2、<view>:你可以把它理解为一个div

    3、剩余的都和html差不多，不难理解，上面的内容就是5个星星+评分

### 三、编写stars.wxss文件

```
    .starsAndNum{
        display: flex;
        flex-direction: row;
    }
    .rankStars{
        display: flex;
        flex-direction: row;
        margin-top: 7rpx;
    }

    .rankStars image{
        width: 30rpx;
        height: 30rpx;
    }
    .rankNum{
        color: #4A6141;
    }
```
    上面的代码就是对wxml文件的样式进行修饰
    对于不懂flex的小伙伴们，可以看下面的链接进行学习
    https://www.yuque.com/hanghanghanghang/xgm0ua/baw5va

### 四、引用模板

    1、引用模板前，一定要先声明，及在你要引入的页面最上方添加下一下的代码：

```
    <import src="../public/tpl/stars.wxml" />
```

    2、引用模板：

        在你需要用到模板的地方加上下面的代码，如在index.wxml下
```
    <template is="starsTpl"></template>
```

    除了引用wxml的模板以外，我们不能忘记stars.wxss的文件引用
    找到index.wxss文件，打开它，在最上面加上以下这行代码：

```
    @import "../public/tpl/stars.wxss" ;
```

    很好，这时候只要你打开真机调试就能看到非常nice的效果了。

### 五、后台传输数据：

    1、以上是固定好的静态页面，我们需要的是能通过后台数据进行星星评分的模板。
    所以我们需要修改stars.wxml的内容
```
    <block wx:for="{{starArr}}" wx:for-item="item">
      <image wx:if="{{item == 0}}" src='/images/star-no.png'></image>
      <image wx:elif="{{item == 1}}" src='/images/star-half.png'></image>
      <image wx:else="{{item == 2}}" src='/images/star-full.png'></image>
    </block>

<text class='rankNum'>{{rankNum}}</text>
```
    把固定好的静态代码通过循环遍历来判断
    wx:for:指的是后台传来的数组
    wx:for-item:是改变每个被循环值的命名

    2、回到index.wxml页面
        把引用模板的代码加上数据
```
    <template is="starsTpl" data="{{starArr:[2,2,0,1],rankNum:5}}"></template>
```

    以上，你就可以进行测试啦，看看效果有没有出来。

    3、但是上面的代码还是没办法通过后台传输数据呀，怎么办？
    继续修改，把它改成通过js来传输

    index.wxml:
```
    <template is="starsTpl" data="{{starArr:starArr,rankNum:rankNum}}"></template>
```

    index.js:

```
    Page({
        data: {
            starArr:[2,2,1,0],
            rankNum:5
        },
```

    那么这样的代码，就非常的nice了！

    4、如果你想更nice的话：

    stars.wxml
```
        <block wx:for="{{[2,4,6,8]}}" wx:for-item="item">
      <image wx:if="{{item > rankNum+1}}" src='/images/star-no.png'></image>
      <image wx:elif="{{item === rankNum+1}}" src='/images/star-half.png'></image>
      <image wx:else="{{item <= rankNum}}" src='/images/star-full.png'></image>
    </block>
```

## 卡片模板


    







