// pages/albumDetail/albumDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasPraise: false,
    praise: 0,
    views: 21,
    animationData: {},
    animationData2:{},
    focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      console.log(that.data.userInfo)
    }, 2000)

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    return {
      success: function () {
        
      }
    }
  },
  /** 
   * 用户点赞 
   */
  prise: function (el) {
    var that = this;
    var currentPraise = parseInt(el.currentTarget.dataset.praise);
    if (!that.data.hasPraise) {
      that.setData({
        praise: currentPraise++,
        hasPraise: true
      })
    } else {
      that.setData({
        praise: currentPraise - 1,
        hasPraise: false
      })
    }
  },
  /**
   * 评论
   */
  comment: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animation.bottom("0").step()
    this.setData({
      animationData: animation.export()
    })
  },
  /**
   * 隐藏评论框
   */
  hideCommentForm: function () {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    animation.bottom("-270rpx").step()
    this.setData({
      animationData: animation.export()
    })
  }
})