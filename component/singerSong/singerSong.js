// component/singerSong/singerSong.js
const Api=require("../../utils/api")
const app=getApp()
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    created:()=>{
      Api.getSingerSong(app.globalData.singerDetail.id).then((res)=>{
        console.log(res)
      })
    }
  }
})
