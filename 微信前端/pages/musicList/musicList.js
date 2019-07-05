var that;

// songList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    musicName: ''
  },

  onLoad:function(options){
    this.setData({musicName:options.param});
    that=this;
    wx.request({
      url: 'http://127.0.0.1:5000/myMusicList',
      data: {
        musicOfExplore: that.data.musicName
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        var music='';
        for(var i=0;i<res.data.singer.length;i++){
          music+= '{"musicName":' +'"'+ res.data.songname[i] + '","author":' +'"'+ res.data.singer[i]
            + '","musicSrc":' +'"'+ res.data.src[i]+'"},';
        }
        music = '['+music.substring(0, music.length - 1)+']';
        music = JSON.parse(music);
        that.setData({ songList: music})
      }
    }) 
  },
  redirectPlayMusic:function(e){
    
    wx.navigateTo({
      url: '../play/play?id=' + e.currentTarget.id
    })
  }

})