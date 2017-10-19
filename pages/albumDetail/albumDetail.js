// pages/albumDetail/albumDetail.js
const app = getApp();
import server from '../../common/server';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    kind:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasPraise: false, // 是否点赞
    praises: 0, // 点赞数
    views: 0, // 浏览量
    comments: 0,  // 评论数
    shares: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      kind: options.kind
    })
    wx.setNavigationBarTitle({
      title: options.title
    });
    this.getData()
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
  onShow: function () {
    this.getComments();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      success: function () {
        that.setData({
          shares: that.data.shares + 1
        })
        wx.request({
          url: server + "/albumShare",
          data: {
            id: that.data.id,
            shares: that.data.shares
          },
          success: function (res) {
            // console.log(res)
          }
        })
      }
    }
  },
  /**
   * 获取页面数据
   */
  getData: function () {
    var that = this;
    wx.request({
      url: server + "/albumDetail",
      data: { id: that.data.id },
      success: function (res) {
        that.setData({
          pageData: res.data,
          views: res.data.album.views,
          praises: res.data.album.praises,
          shares: res.data.album.shares
        })
        // 获取数据成功以后 调用浏览量统计
        that.viewCount();
        // 获取评论数据
        that.getComments();
      }
    })
  },
  
  /**
   * 浏览量统计
   */
  viewCount: function () {
    var that = this;
    that.setData({
      views: that.data.views + 1
    })
    wx.request({
      url: server + "/albumViews",
      data: {
        id: that.data.id,
        views: that.data.views
      },
      success: function (res) {
        // console.log(res) 统计成功
      }
    })
  },

  /** 
   * 用户点赞 
   */
  prises: function (el) {
    var that = this;
    if (!that.data.hasPraise) {
      that.setData({
        praises: that.data.praises + 1,
        hasPraise: true
      })
    } else {
      that.setData({
        praises: that.data.praises - 1,
        hasPraise: false
      })
    }
    wx.request({
      url: server + "/albumPraise",
      data: {
        id: that.data.id,
        praises: that.data.praises
      },
      success: function (res) {
        // console.log(res)
      }
    })
  },
  /**
   * 获取相册评论
   */
  getComments: function () {
    var that = this;
    wx.request({
      url: server + "/albumComments",
      data: { id: that.data.id },
      success: function (res) {
        that.setData({
          comments: res.data.comments.length
        })
      }
    })
  },
  
  /**
   * 图片预览
   */
  viewPhoto: function (el) {
    var imgs = [];
    var photos = this.data.pageData.albumPhoto;
    for (var item in photos) {
      imgs.push(photos[item].img);
    }
    wx.previewImage({
      current: el.target.dataset.url,
      urls: imgs
    })
  }
})