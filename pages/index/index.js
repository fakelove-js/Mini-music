
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lb_imgs:[],
    recoMusic:[],
    currentTab:1,
    curTab:'curTab'
  },

  switchTab:function(e){
    this.setData({ currentTab: e.detail.current});
  },
  clickTab(e){
    var index = e.currentTarget.dataset.cur;
    this.setData({currentTab:index});
  },
  /**
   * 生命周期函数--监听页面加载 只会调用一次
   */
  onLoad: function (options) {
    
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
    var _this = this;
    wx.request({
      url: 'http://118.25.2.21:3000/banner?type=1',
      header: {
        'Content-Type': 'appliction/json'
      },
      success: function (res) {
        res.data.banners.forEach((el, index) => {
          var ban = "lb_imgs[" + index + "]";
          _this.setData({
            [ban]: el.pic
          })
        })
      }
    })


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