// pages/tool/index/index.js
Page({
  data: {
    userAvatar: '../../../icon/avatar.png',
    userName:'用户名'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: res => {
        // console.log(res)
        that.setData({
          userAvatar: res.userInfo.avatarUrl,
          userName: res.userInfo.nickName
        })
      }
    })
  },

  onShareAppMessage: function () {
    
  },
  cardNav(){
    wx.navigateTo({
      url: '../selectImg/selectImg',
    })
  }
})