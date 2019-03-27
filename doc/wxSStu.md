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

```
https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJIWAnKOdQuz12KJMoib3kpGv9xqszicnAC0POLO3DpaEeYIpB8DxTicQuC41QmLFrubEQkVR9eOaBxw/0

这是图片的路径，如果没有图片路径的话可以参考这个。
```

    好啦！至此，你的静态模板页面就已经出来啦，还差最下面的个人中心切换按钮，先不着急哈！
    

## 读取接口数据并显示在主页上

### 一、统一地址变量

```util.js

var serverUrl = 'http://t.yushu.im';

function serverUrlFactory(url){
  return serverUrl+url;
}
module.exports = {
  formatTime: formatTime,
  serverUrlFactory:serverUrlFactory
}

```
```
先解释一下,第一步，不一定要做，如果你想提高代码的复用性可以这样做，你也可以在其他js页面直接调用接口

这里做一个统一的封装

稍微讲一下module.exports

每个wxss模块都有一个内置的module对象。属性为exports

通过该属性就可以对外共享本模块的私有变量和函数了。

所以一定要记得把要共享的变量和数据放到exports属性里

并且你要在哪个js里用，就在该js头部加上下面这段声明：
var util = require('../../utils/util.js');

上面的路径为豆瓣的数据路径。

本来应该为：https://api.douban.com

但是现在对小程序做了限制，所以你可以用我最上面的代码，比不过读取出来的是一些假数据


```
### 二、请求后台数据

```
在.js页面下编写请求代码，如（index.js）

首先先编写一个方法来调用这个请求：

在方法中调用wx.request({})

来看下面的代码
```

```js
getTheraterMovieList: function () {
    var self = this;
    wx.request({
      url:util+serverDataFactory('/v2/movie/in_theaters'),
      method:'post',
      header:{
        'content-type':'json'
      },
      data:requestsData,
      success:function(res){
        console.log(res);
        self.setData({
          theratersMovieList:self.movieDataFactory(res.data);
        })
      },
      fail:function(err){
        console.log(err);
      }
    })
```
```
这个用法和ajax差不多(我是这样理解的)

这个movieDataFactory(data),是下面的代码（一样写在index.js）
```
``` js
movieDataFactory:function(data){
    var minData= [];
    for(var key in data.subjects){
      minData.push({
        medium: data.subjects[key].images.large,
        title:data.subjects[key].title,
        average:data.subjects[key].rating.average
      })
    }
    return {
      title:data.title,
      subjects:minData
    };
  }
```
```
把读取接口数据的代码放到外面来提高了代码的复用性。

然后我们要在index.js---Onload方法里面调用方法

好了！至此，我们就把后台接口的数据读取出来了，你可以运行查看接口数据来验证是否操作成功。

如果接口数据没有显示出来不要着急，请参考四(下面)、

那么接下来，我们就要把接口中的数据放到模板和前台中，让它显示出来了。
```
### 三、显示数据

```
因为有模板，有很多嵌套，所以会很乱

但是我们一层一层往下走，就不会错

1、index.wxml：模板引用的数据要修改

<template is="movieListTpl" data="{{movielist:theraterMovieList}}"></template>

2、movielist.wxml:

<text>{{movielist.title}}</text>  //标题要修改

<block wx:for="{{movielist.subjects}}" wx:key="item"> //便利的数据要修改

3、moviecard.wxml:

<image bindtap="bindViewTap" class="cardimg" src='{{medium}}' background-size="cover"></image>  
<text class='cardname'>{{title}}</text>
<template is="starsTpl" data="{{rankNum:average}}"></template>

这里修改的是图片，电影名，评分。

至此，你的主页就应该已经能显示出最新上映的电影啦。
```
### 四、微信安全

```
微信为了数据安全，在后台配置了合法域名。

如果你只是自己写个demo测试的话，那么

点开设置--项目设置--勾选不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书

即可读取到数据

如果要配置合法域名的话：
你需要到微信公众号平台进行配置，具体自行百度。

```

### 五、调整样式

```
1、你是不是发现有些电影名太长了，影响了布局

打开moviecard.wxss，去调整电影名的样式

让它过长不换行，且超过的长度隐藏掉，代码如下：
```
```wxss
width: 200rpx;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
```
```
2、你是不是还发现有些电影还没评分：

给“暂无分数”的文字加上wx.if的判断。

给星星图片也加个判断，<block wx.if>,如果分数为0，就不要显示出星星来了。代码如下：
```
```wxml
<text wx:if="{{rankNum == 0}}" class='noNum'>暂无分数</text>
    <block wx:if="{{rankNum!=0}}">
      <block  wx:for="{{[2,4,6,8,10]}}" wx:for-item="item">
        <image wx:if="{{item > rankNum+1}}" src='/images/star-no.png'></image>
        <image wx:elif="{{item === rankNum+1}}" src='/images/star-half.png'></image>
        <image wx:else="{{item <= rankNum}}" src='/images/star-full.png'></image>
      </block>
    </block>
```


### 六、完整主页
```
有了最新上映的片段还不够，我们要主页补充完整！

难道我们一个接口写一个wx.request吗？

可以是可以，但是我们可以通过修改之前的代码，完成代码的服用

看下面的代码：
```js
getTheraterMovieList: function (url,title,requestData,successCallBack) {
    var self = this;
    wx.request({
      url: util.serverUrlFactory(url),
      method:'GET',
      header:{
        "content-type":'json'
      },
      data:requestData,
      success:function(res){
        console.log(res);
        successCallBack(res.data);
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
```
```
记下来我们在onload上添加代码，完成所有接口的调用：
```
```js
var that = this;
that.getTheraterMovieList("/v2/movie/in_theaters","近期上映",{count:3},function(data1){
      that.getTheraterMovieList("/v2/movie/coming_soon", "即将上映", { count: 3 }, function (data2) {
        that.getTheraterMovieList("/v2/movie/top250", "热门电影", { count: 3 }, function (data3) {
          that.setData({
            topMovieList: that.movieDataFactory(data3),
            comingMovieList: that.movieDataFactory(data2),
            theraterMovieList: that.movieDataFactory(data1),
          })
        });
    });
```

### 七、tabbar简单操作

```json app.json
"tabBar": {
    "color": "#bfbfbf",
    "selectedColor": "#1afa29",
    "borderStyle": "white",
    "backgroungColor": "white",
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/firstN.png",
      "selectedIconPath": "images/firstY.png"
    },{
      "pagePath": "pages/user/user",
      "text": "我",
      "iconPath": "images/meNo.png",
      "selectedIconPath": "images/meYes.png"
    }]
  }
```
```
tabbar组件是官方支持的，所以我们可以直接调用

list:为tabbar里的一个数组，最少两个，最多5个，按顺序排列。

在list外的属性为该tabbar组件的全部属性

包含了文字选中与否的颜色，边框颜色，背景颜色

每个list的数组包含：页面url,文字，选中与否的图片样式

https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#tabbar

该路径为官方对于小程序tabbar说明哈。
```

```
至此！我们的主页就完成啦！！！
```

## 个人中心显示页面

### 一、上半部分

```
上半部分为背景+头像+用户名

该效果在我们刚刚创建完项目，运行起来的界面效果是一样的。

但是个人中心是在不同的页面上显示，所以我们要新建一个页面包

在上一小节中，我们已经建好了我们所要用的user页面。

如果忘记了，请直接打开app.json,你就能记起来

话不多说，我先把代码贴上去
```

```html
 <import src="../public/tpl/movieList.wxml"  />
 
<view class="container">
  <image class='header-bg' src = '../../images/touxiang.jpg'></image>
  <view class="userinfo"> 
    <image class="userinfo-avatar" src="{{userInfo.avatarUrl}}" background-size="cover"></image> 
    <text class="userinfo-nickname">{{userInfo.nickName}}</text> 
  </view>
  <template is="movieListTpl" data="{{movielist:wantMovieList}}"></template>
  <template is="movieListTpl" data="{{movielist:lookedMovieList}}"></template> 
</view>
```
```
上图为user.wxml的代码。
图片和文字的代码可以直接从index那里拷过来
```
```css
@import "../public/tpl/movieList.wxss";

.userinfo { 
display: flex; 
flex-direction: column; 
align-items: center; 
background-image: url("../../images/touxiang.jpg"); 
background-repeat: no-repeat; 
background-size:100% auto; 
height: 400rpx; 
background-color: green;
} 
.userinfo-avatar { 
width: 140rpx; 
height: 140rpx; 
margin: 20rpx; 
border-radius: 50%; 
margin-top: 75rpx; 
} 
.userinfo-nickname { 
color: #fff; 
} 

.header-bg{
  width: 100%;
  height: 100%;
}
```
```
上图为user.wxss的代码，也可以从index中拷过来

接下来编写user.js，这里才是重点：

首先先把

const app = getApp()

这段代码放在最上面，引入app.js获取一些全局的方法和信息

其次在data中加上下面的代码：

userInfo: {},

最后在onload中调用下面的代码，把userInfo附上全局变量的信息

this.setData({
//有所改动
userInfo: app.globalData.userInfo,
hasUserInfo: true
})

对于上条代码有不懂的小伙伴可以console.log(app)你就能懂

好了，那么现在你就能看到你的头像和文字显示出来了。
```
### 二、下半部分
```
那么现在我们开始编写，下面我想看和我看过的电影

模板和movieList是一样的。但是因为我们没办法调到该数据

所以我们就用最新上映和即将上映的数据来显示

好了，那么你可以把wx.request调取接口数据的代码拷到user.js下去使用。

在onload中实现即可。

但是如果我们想复用该接口的方法，那么我们就可以把代码拷贝到util.js公用的js中进行调用，代码如下：
```
```js
function getTheraterMovieList(url, title, requestData, successCallBack) {
  var self = this;
  var d ;
  wx.request({
    url: self.serverUrlFactory(url),  //此处的引用要把util改成slef
    method: 'GET',
    header: {
      "content-type": 'json'
    },
    data: requestData,
    success: function (res) {
      console.log(res);
      console.log("success~~~~~~~~~~");
      res.data.title = title;
      d = successCallBack(res.data);
    },
    fail: function (err) {
      console.log(err);
      console.log("fail~~~~~~~~~~~~");
    }
  })

  // return{
  //   d:d
  // };
}

function movieDataFactory(data) {
  var minData = [];
  for (var key in data.subjects) {
    minData.push({
      medium: data.subjects[key].images.large,
      title: data.subjects[key].title,
      average: data.subjects[key].rating.average
    })
  }
  return {
    title: data.title,
    subjects: minData
  };
}
```
```
稍微修改一下代码的格式

上面有处注释，请仔细看一下

一定要注意把这两个方法放到module.exports里面去。这样外部才能调用到他们

在user.js里声明util.js，并且调用的代码改成如下代码：
```
```js
util.getTheraterMovieList("/v2/movie/in_theaters", "已观看", { count: 3 },function(data1){
      util.getTheraterMovieList("/v2/movie/coming_soon", "即将上映", { count: 3 }, function (data2) {
        that.setData({
          wantMovieList: util.movieDataFactory(data1),
          lookedMovieList: util.movieDataFactory(data2),
        })
      });
    })
```

```
那么，完美的代码就完成啦。
```

## 查看更多页面跳转

### 一、跳转页面
```
先添加一个moviemore的页面包

在我们的模板页面movieList.wxml中修改如下的代码：
```
```html
<view class='mlHeader' catchtap='goToMoreMovie' data-movie-url='{{movielist.url}}'>
      <text>{{movielist.title}}</text>
      <text class='mlhMore'>查看更多 ></text>
    </view>
```
```
好了来解释一下新增的属性

catchtap:绑定点击事件方法名(会在第三点讲解catch和bind的差别)

data-:为给此点击事件传递的参数
data-后面名称，用‘-’接，会一驼峰命名的方式显示出来。
后期你们console一下就能知道。

写完了模板的点击事件，但是去哪个js里写这个方法呢？
我们的模板写在了public里，没有js

这里告诉大家，我们就不停的往上找，直到找到有js的页面中，写在那个js里即可

所以在这里我们就写在Index.js里，代码如下：
```
```js
goToMoreMovie: function (event) {
    var moreMovieUrl = event.currentTarget.dataset.movieUrl;
    wx.navigateTo({
      url: '../moviemore/moviemore?url='+moreMovieUrl,
    })
  }
```
```
wx.navigateTo:保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面

后面可以接参数

至此。你将你将实现页面跳转的功能。
```

### 二、参数传递
```
心细的小伙伴可能发现了，我们传递的参数是个空值

为什么呢？因为我们还没有传递的原因

现在我们来回顾一下我们是怎么一步步把后台的数据传递到前台来：

1、util.js--getTheraterMovieList
把获取到的数据用successCallBack(res.data);的方式传递到js中

2、index.js--onload
这里获取到的data数据就是第一步获取到的。又把数据回传到util.js

3、util.js--movieDataFactory
该步骤是取出data中我们所需要的数据

4、把获取到数据传递到index.js

5、index.wxml--movielist.wxml

那我们现在就把需要用到的url一层一层的传递出来。

先从1、开始，res.data.url = url;把需要用到的url一起封装到res

3、在取出需要的数据，返回时，加上url:data.url

5、最后在movielist.wxml中传递数据
```

### 三、bind和catch区别

```
举个例子：

有没有这样一种可能，两个view嵌套在一起，这里已外view和内view表示

外view和内view都各自有绑定的点击事件，那么问题来了，我点击内view时会不会导致外view的触发？
这也可以称为向上冒泡

bindTap和catchTap就是用来解决这个问题的。

bindTap:外view也会被点击，不阻止向上冒泡

catchTap:外view不会被点击，阻止了向上冒泡
```
 
 ## 下拉刷新、上拉加载

 ### 一、完成moviemore页面编写

```html
<import src="../public/tpl/searchBtn.wxml" />
<import src="../public/tpl/moviecard.wxml" />

<view class='container'>
<template is="searchBtnTpl"></template>
<view class='movielist'>
<block wx:for="{{movieList.subjects}}" wx:key="item">
  <template is="movieCardTpl" data="{{...item}}"></template> 
</block>
</view>
</view>
```
```
上面的代码为moviemore.wxml的代码

至于为什么不直接用movielist的模板而是自己手动在编写一次呢?

因为模板里的遍历是不换行的，这里我们需要让它换行

所以小伙伴们就自行编写wxss就好啦，只要felx-wrap:wrap;即可

---------------------------------

怎么修改最上面的标题？

怎么读取页面传递过来的参数？

1、修改页面标题

在onload函数中，加上下面的代码即可：
```
```js
wx.setNavigationBarTitle({
      title: "查看更多"
})
```
```
2、读取页面传递的参数：

在onload函数中加上下面的代码：
```
```js
var that = this;
    that.url=options.url;
    util.getTheraterMovieList(options.url, options.title, { count: 3 }, function (data1) {
      that.setData({
        movieList: util.movieDataFactory(data1),
        url: options.url, 
      })
    })
```
```
引用options.url即可读取到数据,并且调用该url，获取到值传递到前台
```
 ### 二、下拉刷新

 ```
 1、moviemore.json加上下面这句话:

 "enablePullDownRefresh": true  //开启该页面下拉刷新的功能

2、在moviemore.js中找到onPullDownRefresh函数

该函数就是用来实现下拉刷新的，加上下面的代码：
 ```
 ```js
 console.log("用户下拉动作")
    if (this.data.url === '') {
      return;
    }
    var that = this;
    console.log(that.data.url);
    util.getTheraterMovieList(this.data.url, "查看更多", { count: 3 }, function (data1) {
      that.setData({
        movieList: util.movieDataFactory(data1),
      })
    })
    wx.stopPullDownRefresh();   //结束刷新
 ```
 ```
 解释一下上面的代码：

 this.data.url：为之前我们设置的url,现在为该js下全局的url

 调用接口即可实现刷新

 但是要记得在最后加上：wx.stopPullDownRefresh();

 至此，下拉刷新的功能就算完成啦，如果你觉得标题全是查看更多不清晰的话，你可以在页面继续传递title进来，即可改变。 
 ```
 ### 三、上拉加载

```
首先我们需要在moviemore.js里的data里补几个参数：

url:"",
movieList:[], //电影数组
start:0,      //开始获取数据的位置
count:10,     //每次获取的条数
    
可能你还不清楚为什么要加这些东西，没关系，往下看你就明白了。
```

```js
onReachBottom: function () {
    console.log("到达底部啦~~~");
    if (this.data.url === '') {
      return;
    } 
    var that = this;

    util.getTheraterMovieList(that.data.url, "查看更多", {start:that.data.start,count: that.data.count}, function (data1) {
      var newdata = util.movieDataFactory(data1);
      var olddata = that.data.movieList;
      olddata.subjects = olddata.subjects.concat(newdata.subjects),
      that.setData({
        movieList: olddata,
        // movieList:newdata,
        start: that.data.start + that.data.count
      })
    })
  },
```
```
上面的代码为moviemore.js的代码，

js里找到onReachBottom函数，该函数为上拉触底的所执行的函数

当到达底部时，我们就调用接口获取更多的参数，但是获取哪些呢？

从start数后开始的，获取count个

然后把新数组和旧数组结合在一起：可以用到olddata.subjects.concat(newdata.subjects),

现在你们就可以尝试一下效果拉

如果你们发现第一次触及底部时获取到的数据和原来的一样，那么时因为你onload数据时没有加上start数，去加上就行拉！
```

## 正在加载、loading状态

### 一、正在加载

1、入侵式-wx.showToast

在onload函数，或者下拉刷新，上拉加载的函数中为了预防加载时间过久造成的等待

我们可以在为加载完成时提示'正在加载'，加载完成后才失去提示。代码如下：

```js
wx.showToast({ 
  title:'加载中', 
  icon:'loading', 
  mask:true 
}) 
```

记得在请求响应结束时加上：wx.hideToast(),隐藏调提示即可

### 二、loading状态

如果上述弹窗似的提示影响用户体验的话，那么只显示在标题栏会不会i更棒一点

并且代码更加简洁：

请求响应前：wx.showNavigationBarLoading(); 

请求响应后：wx.hideNavigationBarLoading();

如果你发现标题栏没有转起来的话，可能是因为请求响应太快了，所以你没看到

你可以先注释调隐藏的代码，进行测试，你就会看到效果。

## 点击查看大图

### 一、前端设置点击事件

1、在moviecard.wxml模板上修改如下代码：

```html
<image catchtap="showImg" class="cardimg" src='{{medium}}' data-img-src="{{medium}}"></image>
```

设置点击事件，把图片路径传过去

2、在index.js上增加点击的方法：

```js
showImg:function (event){
    // console.log(event);
    var imgSrc = event.currentTarget.dataset.imgSrc;
    wx.previewImage({
      // current:imgSrc,
      urls: [imgSrc],
    })
  }
```
如果你发现你放大的高清图很模糊，没关系，那是因为你之前读取参数回传回来的是小张的缩略图

你可以再回传一个lager类型的图片回来即可。

好了。感觉去测试一下呀！

## 











