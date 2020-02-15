// component/statusBar/statusBar.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   statusTitle:{
     type:String,
     value:''
   },
   txtcolor:{
     type:String,
     value:''
   },
   bgcolor:{
     type:String,
     value:''
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:app.globalData.statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backPreviousPage:function(e){
      wx.navigateBack({
        delta:1
      })
    }
  },
  lifetimes:{
    created:function(){

    }
  }
})
