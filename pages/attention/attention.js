// pages/attention/attention.js
import server from '../../common/server.js'

Page({
  data: {
    title: '关于我想学摄影',
    text: '关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影关于我想学摄影',
    code: ''
  },
  onLoad: function (options) {
    this.getData()
  },
  getData() {
    var that = this
    wx.request({
      url: server + "/other",
      success: function (res) {
        that.setData({
          title: res.data.about_title,
          text: res.data.about_text,
          code: res.data.about_code
        })
      }
    })
  }
})