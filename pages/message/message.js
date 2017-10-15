//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msg: ''
  },
  onLoad: function () {
    // 获取留言信息
    this.getMsg();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getMsg: function () {
    var that = this;
    wx.request({
      url: "https://api.raydom.wang/getMsg",
      success: function (res) {
        that.setData({
          msgList: res.data
        })
      }
    })
  },
  sendMsg: function (msg) {
    var that = this;
    console.log(msg)
    if (msg.detail.value != "") {
      wx.request({
        url: "https://api.raydom.wang/sendMsg",
        data: {
          userInfo: that.data.userInfo,
          msg: msg.detail.value
        },
        success: function (res) {
          that.getMsg();
          that.setData({
            msg: ''
          })
          wx.showToast({
            title: '留言成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '留言不能为空',
        showCancel: false
      })
    }
  }
})
