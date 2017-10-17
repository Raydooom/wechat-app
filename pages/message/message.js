//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    placeHolder: '请输入留言内容',
    focus: false,
    reply: false,
    msgId: '',
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
      // console.log(2)
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
  /**
   * get msg list
   */
  getMsg: function () {
    var that = this;
    wx.request({
      url: "https://api.raydom.wang/getMsg",
      success: function (res) {
        console.log(res)
        that.setData({
          msgList: res.data
        });
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * user send msg
   */
  sendMsg: function (msg) {
    var that = this;
    if (msg.detail.value != "") {
      if (!that.data.reply) {
        // 发布留言
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
        // 回复某人留言
        console.log(11)
        wx.request({
          url: "https://api.raydom.wang/replyMsg",
          data: {
            msgId: that.data.msgId,
            userInfo: that.data.userInfo,
            msg: msg.detail.value
          },
          success: function (res) {
            that.getMsg();
            that.setData({
              msg: ''
            })
            wx.showToast({
              title: '回复成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }

    } else {
      wx.showModal({
        title: '提示',
        content: '留言不能为空',
        showCancel: false
      })
    }
  },
  /**
   * 回复留言
   */
  reply: function (e) {
    this.setData({
      msgId: e.currentTarget.dataset.msgid,
      placeHolder: '回复 ' + e.currentTarget.dataset.user,
      focus: true,
      reply: true
    })
  },
  /**
   * 失去焦点
   */
  inputBlur: function () {
    this.setData({
      placeHolder: '请输入留言内容',
      focus: true,
      reply: false
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.getMsg();
  }
})
