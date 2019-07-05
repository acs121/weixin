//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bgImage:'../../images/bgImage01.png',
    musicName:'',
    author:'',
    musicSrc:'',
    musicId:''
  },
  onLoad:function(options){
    // console.log(options)
    this.setData({musicId: options.id})
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:5000/musicImfor',
      data: {
        musicId: that.data.musicId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        that.setData({ author: res.data.singer[that.data.musicId],
          musicName: res.data.songname[that.data.musicId],
          musicSrc: res.data.src[that.data.musicId]})
        var innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = that.data.musicSrc;
        innerAudioContext.play();
        innerAudioContext.onPlay(() => {
          console.log('开始播放');
        })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg);
          console.log(res.errCode);
        })
      }
    })
  }
})
