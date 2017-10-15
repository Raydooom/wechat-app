// pages/photo/photo.js
import server from '../../common/server';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取url传值
    // 设置标题
    let kindName = options.title;
    wx.setNavigationBarTitle({
      title: kindName
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 自定义事件
   */
  getData: function (id) {
    let that = this;
    wx.request({
      url: server + "/album",
      data: {
        id: id
      },
      success: function (result) {
        that.setData({
          photoList: result.data,
          loaded:true
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
  imgload:function(a){
    // console.log(a)
  }
})