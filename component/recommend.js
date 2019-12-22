// component/recommend.js
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
    
  },
  lifetimes:{
    attached:function(){
      var _this = this;
      //请求最新歌曲
      wx.request({
        url: 'http://118.25.2.21:3000/personalized/newsong',
        header: {
          'Content-Type': 'appliction/json'
        },
        success: function (res) {
          var len=res.data.result;
          for(var i=0;i<len.length-1;i++){
            var pre="recoMusic["+i+"]";
            _this.setData({
              [pre]:len[i]
            })
          }
        }
      })
      // 请求最新mv
      wx.request({
        url: 'http://118.25.2.21:3000/mv/first?limit=10',
        header: {
          'Content-Type': 'appliction/json'
        },
        success: function (res) {
          var len = res.data.data;
          for (var i = 0; i < len.length; i++) {
            var pre = "recoMv[" + i + "]";
            _this.setData({
              [pre]: len[i]
            })
          }
          console.log(res.data.data);
        }
      })
    }
  }
})
