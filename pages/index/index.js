const Api=require("../../utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lb_imgs:[],
    recoMusic:[],
    currentTab:1,
    isShow:0
  },

  switchTab:function(e){
    this.setData({ currentTab: e.detail.current});
  },
  clickTab:function(e){
    var index = e.currentTarget.dataset.cur;
    this.setData({currentTab:index});
  },
  showComponent:function(e){
    var cur=e.currentTarget.dataset.index;
    this.setData({
      isShow:cur
    })
  },
  /**
   * 生命周期函数--监听页面加载 只会调用一次
   */
  onLoad: function (options) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
      mask:false
    })
    setTimeout(function () {
      wx.hideLoading()
    },500)

    Api.getBanner().then((res)=>{
      _this.setData({
        lb_imgs:res.banners
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   * 
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
  onShareAppMessage: function () {
    
  }
})