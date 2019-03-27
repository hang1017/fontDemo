// pages/moviemore/moviemore.js

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    movieList:[],
    start:0,
    count:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: "查看更多"
    })
    wx.showToast({
      title: '航航加载中~',
      icon:'loading',
      mask:true
    })
    var that = this;
    that.url=options.url;
    util.getTheraterMovieList(options.url, options.title, { count: 10 }, function (data1) {
      that.setData({
        movieList: util.movieDataFactory(data1),
        url: options.url, 
        start:10
      })
      wx.hideToast();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("用户下拉动作")
    if (this.data.url === '') {
      return;
    }
    // wx.showToast({
    //   title: '航航加载中~',
    //   icon: 'loading',
    //   mask: true
    // })
    wx.showNavigationBarLoading(); 
    var that = this;
    console.log(that.data.url);
    util.getTheraterMovieList(this.data.url, "查看更多", { start:0,count: 10 }, function (data1) {
      that.setData({
        movieList: util.movieDataFactory(data1),
        start:0+that.data.count,
      })
    })
    wx.stopPullDownRefresh(); 
    // wx.hideToast();
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  
})