// component/singerAlbum/singerAlbum.js
const app=getApp()
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
    albums:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    created:function(){
      Api.getSingerAlbum(app.globalData.singerDetail.id).then((res)=>{
        this.setData({
          albums:res.hotAlbums
        })
      })
    }
  }
})
