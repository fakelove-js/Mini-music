// component/recommend.js
const Api=require("../../utils/api")
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true
  },
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    recoMuisc:[],
    recoMv:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playThis:function(e){
      wx.navigateTo({
        url: '../../pages/player/player?id='+e.currentTarget.dataset.songid,
      })
    }
  },
  lifetimes:{
    created:function(){
      var _this = this;
      //请求最新歌曲
      Api.getNewSong().then((res)=>{
        var len=res.result;
        for(var i=0;i<len.length-1;i++){
          var pre="recoMusic["+i+"]";
          _this.setData({
            [pre]:len[i]
          })
        }
      })
      // 请求最新mv
      Api.getNewMv(10).then((res)=>{
        var len = res.data;
        for (var i = 0; i < len.length-1; i++) {
          var pre = "recoMv[" + i + "]";
          _this.setData({
             [pre]: len[i]
          })
        }
      })
    },
    attached:function() {

    }
  }
})
