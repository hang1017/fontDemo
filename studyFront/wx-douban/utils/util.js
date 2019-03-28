const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var serverUrl = 'http://t.yushu.im';

function serverUrlFactory(url){
  return serverUrl+url;
}

function getTheraterMovieList(url, title, requestData, successCallBack) {
  var self = this;
  var d ;
  wx.request({
    url: self.serverUrlFactory(url),
    method: 'GET',
    header: {
      "content-type": 'json'
    },
    data: requestData,
    success: function (res) {
      // console.log(res);
      res.data.title = title;
      res.data.url = url;
      // console.log(res.data);

      d = successCallBack(res.data);
    },
    fail: function (err) {
      console.log(err);
    }
  })
}

function movieDataFactory(data) {
  var minData = [];
  for (var key in data.subjects) {
    minData.push({
      medium: data.subjects[key].images.large,
      title: data.subjects[key].title,
      average: data.subjects[key].rating.average,
      subject:data.subjects[key],
    })
  }
  // console.log(data.url);
  return {
    title: data.title,
    subjects: minData,
    url:data.url
  };
}

function goToDetail(event){
  wx.navigateTo({
    url: '../detail/detail?subject=' + JSON.stringify(event.currentTarget.dataset.imgSrc),
  })
}

function showImg(event){
  var imgSrc = event.target.dataset.imgSrc;
  wx.previewImage({
    urls: [imgSrc],
  })
}

module.exports = {
  formatTime: formatTime,
  serverUrlFactory:serverUrlFactory,
  movieDataFactory: movieDataFactory,
  getTheraterMovieList: getTheraterMovieList,
  goToDetail: goToDetail,
  showImg: showImg,
}
