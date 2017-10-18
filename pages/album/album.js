// pages/album/album.js
import server from '../../common/server';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    kind:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取url传值
    // 设置标题
    wx.setNavigationBarTitle({
      title: options.title
    });

    // 根据id查询相册列表
    this.setData({
      id: options.id,
      kind: options.title
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData();
  },
  /**
   * 自定义事件
   */
  getData: function () {
    let that = this;
    wx.request({
      url: server + "/kinds/album",
      data: {
        id: that.data.id
      },
      success: function (result) {
        that.setData({
          albumList: result.data
        })
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
  },
  onShareAppMessage: function () {

  }
})