// component/songlist/songlist.js
const Api=require("../../utils/api")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
   songlist:{},
   songlistMore:{},
   curIndex:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back:function() {
      wx.redirectTo({
        url: 'index',
      })
    },
    indexChange:function(e) {
      this.setData({
        curIndex:e.detail.current
      })
    },
    arrFilter:function(params) {
      params.splice(0,3)
      this.setData({
        songlistMore:params
      })
    },
    lb_click:function(e){
      this.setData({
        curIndex:e.currentTarget.dataset.index
      })
    }
  },
  lifetimes:{
    created:function() {
       //热门歌单获取
      Api.getHotsongList(3).then((res)=>{
        this.setData({
          songlist:res.playlists
        })
      })
      Api.getHotsongList(21).then((res)=>{
        this.arrFilter(res.playlists)
      })
    }
  }
})
