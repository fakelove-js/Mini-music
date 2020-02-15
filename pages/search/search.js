// pages/search/search.js
const Api=require("../../utils/api")
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult:'',
    defaultKeyword:'',
    defaulthotlist:'',
    inputValue:''
  },

  getKeyword:function(e) {
    this.setData({inputValue:e.detail.value})
    if(e.detail.value!=''){
      Api.searchSuggest(e.detail.value).then((res)=>{
        this.setData({
          searchResult:res.result
        })
      })
    }
  },
  playThis(e){
    wx.navigateTo({
      url: '../player/player?id='+e.currentTarget.dataset.songid,
    })
  },
  singerDetail:function(e){
    var singer={
      id:e.currentTarget.dataset.singer.id,
      name:e.currentTarget.dataset.singer.name,
      pic:e.currentTarget.dataset.singer.picUrl,
      albumSize:e.currentTarget.dataset.singer.albumSize
    }
    app.globalData.singerDetail=singer
    wx.navigateTo({
      url: '../singer/singer'
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Api.searchDefault().then((res)=>{
      this.setData({
        defaultKeyword:res.data.showKeyword
      })
    })
    Api.searchHot().then((res)=>{
      this.setData({
        defaulthotlist:res.result.hots
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