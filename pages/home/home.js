import server from '../../common/server';

Page({
  data: {
    imgList: "",
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 800
  },
  onLoad:function(){
    let that = this;
    // 主打图片展示
    wx.request({
      url: server + "/hotImg",
      success: function (res) {
        that.setData({
          imgList: res.data
        })
      },
      error: function () {
        wx.showToast({
          title: '链接服务器失败！',
          icon: 'warn',
          duration: 2000
        })
      }
    })
  },
  onShareAppMessage: function () {

  }
})