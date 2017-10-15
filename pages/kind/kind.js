// pages/kind/kind.js
import server from '../../common/server';


Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration:600
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDate();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 获取数据
   */
  getDate: function () {
    let that = this;
    // banner请求
    wx.request({
      url: server + "/mainShow",
      success: function (res) {
        that.setData({
          banner: res.data
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
    // 分类列表请求
    wx.request({
      url: server + "/kinds",
      success: function (res) {
        that.setData({
          kind: res.data
        })
        // 获取数据后暂停下拉刷新
        wx.stopPullDownRefresh();
      },
      error: function () {
        wx.showToast({
          title: '链接服务器失败！',
          icon: 'warn',
          duration: 2000
        })
      }
    })
  }

})