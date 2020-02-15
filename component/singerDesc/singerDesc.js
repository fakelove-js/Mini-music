// component/singer/singerDesc/singerDesc.js
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
    hotSong:[],
    currentPage:1,
    pageSize:20,
    scrollEvent:true,
    loading:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playThis:function(e){
      wx.navigateTo({
        url:"../../pages/player/player?id="
        +e.currentTarget.dataset.songid
      })
    },
    scrollBottom:function(){
      Api.getSingerHotSong(app.globalData.singerDetail.id).then((res)=>{
        var list=[]
        for(let i=0;i<this.data.pageSize;i++){
          list.push(res.songs[i+(this.data.currentPage-1)*this.data.pageSize])
        }
        if(this.data.currentPage>=(res.songs.length/this.data.pageSize)){
          this.setData({
            currentPage:this.data.currentPage,
            scrollEvent:false
          })
        }
        this.setData({
          loading:true
        })
        setTimeout(()=>{
          this.setData({
            hotSong:this.data.hotSong.concat(list).filter(Boolean),
            currentPage:this.data.currentPage+1,
            loading:false
          })
        },1000)
      })
    }
  },
  lifetimes:{
    created:function(){
      this.scrollBottom()
    },
    attached:function(){

    }
  }
})
