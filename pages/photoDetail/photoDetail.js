// pages/photoDetail/photoDetail.js
import server from '../../common/server';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取url传值
    // 设置标题
    let photo = options.title;
    wx.setNavigationBarTitle({
      title: photo
    });

    // 根据id查询相册列表
    let id = options.id;
    this.getData(id);
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
   * 自定义事件
   */
  getData: function (id) {
    let that = this;
    wx.request({
      url: server + "/album/photo",
      data: {
        id: id
      },
      success: function (result) {
        that.setData({
          photo: result.data,
          loaded: true
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
  /**
   * 查看图片
   */
  photoView: function (info){
    let url = info.target.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
})