// pages/detail/detail.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject:{},
    flag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let object = JSON.parse(options.subject);
    // console.log(object);
    var a = "";
    for (var i =0;i< object.genres.nv_length;i++){
      a += object.genres[i]+' ';
    }
    a += "/ " + object.countries[0]+" / "+object.year+"年上映 / 片长128分钟(片长为假数据)";
    // console.log(object.images.large);
    that.setData({ 
      title: object.title, 
      large:object.images.large,
      detail:a,
      detail_detail: object.summary,
      open:"展开",
      persons:object.casts,
    });
    // console.log(that.subject);
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  detail_open:function(){
    var that = this;
    var a = "";
    if(that.flag===true){
      a="收起";
      that.flag=false;
      
    }else{
      a="展开";
      that.flag=true;
    }
    that.setData({
      open: a,
      flag:that.flag,
    })
  },

  showImg:function(event){
    util.showImg(event);
  }
})