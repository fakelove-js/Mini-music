// component/singerMv/singerMv.js
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
    mvs:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    created:function(){
      Api.getSingerMv(app.globalData.singerDetail.id).then((res)=>{
        this.setData({
          mvs:res.mvs
        })
      })
    }
  }
})
