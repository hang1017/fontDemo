// components/movieListCom/movieList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subjects:Object,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToMoreMovie: function (event) {
      var moreMovieUrl = event.currentTarget.dataset.movieUrl;
      // console.log(event.currentTarget.dataset);
      wx.navigateTo({
        url: '../moviemore/moviemore?url=' + moreMovieUrl,
      })
    },

  }

  
})
