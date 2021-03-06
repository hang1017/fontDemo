//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {   
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // starArr:[2,2,1,0],
    rankNum:5,
    movieName: '航航',
    imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJIWAnKOdQuz12KJMoib3kpGv9xqszicnAC0POLO3DpaEeYIpB8DxTicQuC41QmLFrubEQkVR9eOaBxw/0',
    mlhTitle:'最新上映',
    movielist:[
      {
        imgUrl:"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJIWAnKOdQuz12KJMoib3kpGv9xqszicnAC0POLO3DpaEeYIpB8DxTicQuC41QmLFrubEQkVR9eOaBxw/0", 
        movieName:"航帅帅",
        rankNum: 2,
      },
      {
        imgUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJIWAnKOdQuz12KJMoib3kpGv9xqszicnAC0POLO3DpaEeYIpB8DxTicQuC41QmLFrubEQkVR9eOaBxw/0",
        movieName: "航帅帅",
        rankNum: 7,
      },
      {
        imgUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJIWAnKOdQuz12KJMoib3kpGv9xqszicnAC0POLO3DpaEeYIpB8DxTicQuC41QmLFrubEQkVR9eOaBxw/0",
        movieName: "航帅帅",
        rankNum: 5,
      },
      
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },  
  onLoad: function () {
    // console.log(app);
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          //调用应用实例的方法获取全局数据
          app.globalData.userInfo = res.userInfo
          //更新数据
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  

    util.getTheraterMovieList("/v2/movie/in_theaters","近期上映",{count:4},function(data1){
      // console.log(data1);
      util.getTheraterMovieList("/v2/movie/coming_soon", "即将上映", { count: 4 }, function (data2) {
        util.getTheraterMovieList("/v2/movie/top250", "热门电影", { count: 4 }, function (data3) {
          that.setData({
            topMovieList: util.movieDataFactory(data3),
            comingMovieList: util.movieDataFactory(data2),
            theraterMovieList: util.movieDataFactory(data1),
          })
          console.log(that.data.theraterMovieList);
        });
    });
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  goToMoreMovie: function (event) {
    var moreMovieUrl = event.currentTarget.dataset.movieUrl;
    // console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: '../moviemore/moviemore?url='+moreMovieUrl,
    })
  } ,

  goToDetail:function(event){
    util.goToDetail(event);
  },

  showImg:function (event){
    // console.log(event);
    var imgSrc = event.currentTarget.dataset.imgSrc;
    wx.previewImage({
      // current:imgSrc,
      urls: [imgSrc],
    })
  }
  
})



