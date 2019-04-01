// components/movieCardCom/movieCard.js
var util = require('../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    medium:String,
    item:Object,
    subject:Object
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
    goToDetail: function (event) {
      util.goToDetail(event);
    },

    
  }


  
})
