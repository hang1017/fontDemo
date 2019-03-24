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

### 一、模板搭建

    这个很简单
    在public-tpl再建两个模板，分别为：
    moviecard.wxml、moviecard.wxss

### 二、编写moviecard.wxml和moviecard.wxss

    1、moviecard.wxml
```
    <import src="stars.wxml" />

    <template name="movieCardTpl">
        <view class='cardcontainer'>
            <image class="cardimg" src='{{imgUrl}}' background-size="cover"></image>
        <text>{{movieName}}</text>

        //引入星星评分模板
        <template is="starsTpl" data="{{rankNum:rankNum}}"></template>
  </view>
</template> 
```
    解释一下上面的代码：

    首先要导入星星评分模板

    搭建一个模板，并且建一个全局的view,name为：movieCardTpl

    并且最重要的是要引入星星评分模板
    并且data要写上去，不能因为moviecard模板右引用，就没把这里的data写上去

    2、moviecard.wxss
```
@import "stars.wxss";

.cardcontainer{
  display: flex;
  flex-direction: column;
  padding: 0 22rpx;
}
.cardimg{
  width: 200rpx;
  height:280rpx;
}
.cardname{
  font-size: 28rpx;
  padding-top: 20rpx;
  font-weight:500;
}
```
    解释一下上面的代码：
    
    1、再该wxss上要引用star.wxss的声明

    2、并且该模板可以使用felx属性的的column，呈现上下分布  

### 三、引用moviecard模板

    下面以index.wxml为例

    1、首先要先import声明！

    2、引用模板，代码如下：

    <template is="movieCardTpl" data="{{movieName:movieName,rankNum:rankNum,imgUrl:userInfo.avatarUrl}}"></template>

    3、记得要改index.wxss的声明！

    4、再index.js里调用数据
```
    Page({
        data: {
            userInfo: {},
            rankNum:5,
            movieName: '航航',
            imgUrl:'../images/touxiang.jpg'
        },
```


## 静态主页

### 一、全局配置文件的修改

    1、修改app.wxss下的代码(注释掉那两行代码)，如下：
```
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  /* padding: 200rpx 0; */
  box-sizing: border-box;
} 
```

    2、修改app.json下的代码：
```
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs",
    "pages/test/test"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#44bb57",
    "navigationBarTitleText": "航帅帅评分",
    "navigationBarTextStyle":"white"
  }
}
```

### 二、搜索模板

    1、再tpl里建两个文件，分别是searchBtn.wxml和searchBtn.wxss

    2、searchBtn.wxml
```
    <template name="searchBtnTpl">
        <view class='searchBtnView'>
            <view class='searchInput'>
                <icon type='search' size='13' color='#405f80'></icon>
                <text>搜索</text>
            </view>
        </view>
    </template>
```

    3、searchBtn.wxss

```
.searchBtnView{
  width: 100%;
  height: 86rpx;
  background-color: #44BB57;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.searchInput{
  background-color: white;
  width: 92%;
  height: 60rpx;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 4%;
}

.searchInput text{
  margin:auto 0;
  margin-left: 10rpx;
  font-size: 28rpx;
  color: #B4B4B4;
}

.searchInput icon{
  margin: auto 0;
  color: #B4B4B4;
}

```

### 三、引用模板

    1、先把index.wxml里没用的代码删除啦

    2、wxml声明、引用
        wxss声明

### 四、搭建主页模板

    1、tpl新建两个文件，分别是：movieList.wxml和movieList.wxss

    2、movieList.wxml

```
<import src="moviecard.wxml"  />

<template name="movieListTpl">
  <view class='movieListView'>
    <view class='mlHeader'>
      <text>{{mlhTitle}}</text>
      <text class='mlhMore'>查看更多 ></text>
    </view>
    <view class='mlBody'>
      <block wx:for="{{movielist}}" wx:key="item">
        <template is="movieCardTpl" data="{{...item}}"></template>
      </block>
    </view>
  </view>
</template>
```

    3、movieList.wxss
```
@import "moviecard.wxss";

.movieListView{
  margin-bottom: 20rpx;
  background-color: white;
}

.mlHeader{
 display: flex;
  flex-direction: row;
  justify-content:space-between;
  padding: 20rpx;
}

.mlBody{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.mlhMore{
  float: right;
  color: #44BB57;
  padding-right: 26rpx;
}
```

### 五、引用主页模板并配上数据

    1、index.wxml声明并引用模板
        index.wxss声明并引用模板

        <template is="movieListTpl" data="{{mlhTitle:mlhTitle,movielist:movielist}}"></template>

        如上那样配上数据格式

    2、通过index.js配上假数据
```
    mlhTitle:'最新上映',
    movielist:[
      {
        imgUrl:"",  
        movieName:"航帅帅",
        rankNum: 5,
      },
```

    好啦！至此，你的静态模板页面就已经出来啦，还差最下面的个人中心切换按钮，先不着急哈！
    







    







