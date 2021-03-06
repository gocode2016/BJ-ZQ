// pages/logs/index.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: {},
    // 轮播图控件
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    // 图片path 前面的地址
    host: getApp().host,
    // 判断 展开收起的 各个变量
    material: false,
    booking: false,
    service: false,
    prompt: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id
    wx.setStorageSync("id", options.id)
    var pdType = options.pdType
    this.setData({
      id: id,
      pdType: pdType
    })
    var url = 'api/B2C/product/' + id
    getApp().post(url, {}, res => {
      this.setData({
        res: res
      })
    })
    console.log(this)
  },

  // 点击 展开收起
  fold(e) {
    var target = e.currentTarget.dataset.title
    this.setData({
      [target]: !this.data[target]
    })
  },

  // 点击 进店咨询
  enterStore: function (e) {
    var productImgUrl0 = this.data.res.pd_detail['产品图片'][0].path
    var productTitle = this.data.res.pd_detail['产品名称']
    wx.navigateTo({
      url: `../store/store?productImgUrl0=${productImgUrl0}&productTitle=${productTitle}`,
    })
  },

  // 点击 立即预定
  selectDate: function (e) {
    console.log(e)
    util.showLoading()
    //  类型需要传过去,因为商品类型 支付页面需要不同显示
    // ['错误','跟团','签证','机票','酒店','门票','当地游']
    var pdType = this.data.pdType
    wx.navigateTo({
      url: `../orderSubmit/orderSubmit?pdType=${pdType}`
    })

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log("点击分享")
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    return {
      title: '旅游签证',
      path: '/pages/visaDetails/visaDetails?id=' + this.data.id,
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})