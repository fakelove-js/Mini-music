// pages/player/player.js
const audio=wx.createInnerAudioContext({})
const musicApi="https://music.163.com/song/media/outer/url?id="
const app=getApp()
const Api=require("../../utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fm:'',
    class:["icon-bofang1","icon-zhengzaibofang"],
    isPlay:false,
    progress:0,
    pro_Width:null,
    duration:'',
    zoom:false,
    playing:'playing',
    progressRate:0,
    songArray:[
      5368257,
      1328885619,
      471385043,
      1327055753,
      1420494877
    ],
    songIndex:0,
    curSongId:'',
    lyrics:[],
    lyricArray:[],
    songname:''
  },
  //播放暂停函数
  goPlay:function(e){
    this.setData({
      isPlay:!this.data.isPlay
    })
    if(this.data.isPlay==true){
      audio.play();
    }else{
      audio.pause()
    }
  },
  //点击跳转函数
  controlProgress:function(e){
    //歌曲偏移时长
    var jindu=e.changedTouches[0].pageX/this.data.pro_Width*this.data.duration
    //点击当前进度条播放位置（百分比）
    var bfb=e.changedTouches[0].pageX/this.data.pro_Width*100
    this.setData({
      progress:bfb.toFixed(2)
    })
    audio.seek(jindu)
  },
  //拖拽函数
  touchStart:function(e){
    this.setData({
      zoom:!this.data.zoom,
      isPlay:false
    })
    audio.pause()
  },
  touchMove:function(e){
    var distance=(e.changedTouches[0].pageX/this.data.pro_Width*100).toFixed(2)
    this.setData({
      progress:distance,
    })
  },
  touchEnd:function(e){
    var ended=(e.changedTouches[0].pageX/this.data.pro_Width*100)
    var songTime=e.changedTouches[0].pageX/this.data.pro_Width*this.data.duration
    audio.seek(songTime)
    this.setData({
      progress:ended,
      zoom:!this.data.zoom,
      isPlay:true
    })
    audio.play();

  },
  //下一首歌曲
  nextSong:function(){
    var add=this.data.songIndex+1
    this.setData({
      songIndex:add,
      isPlay:true
    })
    audio.src=musicApi+this.data.songArray[this.data.songIndex]
    audio.play()
    if(add>=this.data.songArray.length-1){
      this.setData({
        songIndex:-1
      })
    }
    this.getLyric(this.data.songArray[this.data.songIndex])
  },
  //上一首歌曲
  prevSong:function(){

  },
  getLyric:function(id){
    wx.request({
      url: 'http://118.25.2.21:3000/lyric?id='+id,
      success:(res)=>{
        this.setData({
          lyrics:res.data
        })
        this.lyricsFormat()
      }
    })
  },
  lyricsFormat:function(){
    var lrc=String(this.data.lyrics.lrc.lyric)
    if(lrc.length==0)return;
    var lyricArray=[]
    var lrcs=lrc.split('\n')
    for(var i in lrcs){
      lrcs[i]=lrcs[i].replace(/(^\s*)|(\s*$)/g, "")
      var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"))
      var s=t.split(":")
      if(!isNaN(parseInt(s[0]))){
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
        var start = 0;
        for(var k in arr){
            start += arr[k].length; //计算歌词位置
        }
        var content = lrcs[i].substring(start);//获取歌词内容
        lyricArray.push(content)
      }
    }
    this.setData({
      lyricArray:lyricArray
    })
    return lyricArray
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.id==''?'':this.getLyric(options.id)
    audio.src=musicApi+options.id
    audio.play()
    this.goPlay()

    audio.onTimeUpdate(()=>{
      var currentjindu=(audio.currentTime/audio.duration*100).toFixed(2);
      this.setData({
        progress:currentjindu,
        duration:audio.duration,
        progressRate:audio.currentTime.toFixed(0)
      })
    })
    
    audio.onEnded(()=>{
      audio.seek(0)
      this.setData({
        progress:0,
        isPlay:false
      })
    })

    Api.getSongDetail(options.id).then((res)=>{
      this.setData({
        songname:res.songs[0].name,
        fm:res.songs[0].al.picUrl+'?param=300y300'
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.request({
    //   url: 'https://music.163.com/song/media/outer/url?id=1420491717',
    //   success:function(res){

    //   }
    // })
    const query=wx.createSelectorQuery()
    query.select("#progress").boundingClientRect((rect)=>{
      this.setData({
        pro_Width:rect.width
      })
    }).exec()
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