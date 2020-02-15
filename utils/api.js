const api_base_url="http://118.25.2.21:3000"
const request=(url,data)=>{
  let _url=api_base_url+url
  return new Promise((resolve,reject)=>{
    wx.request({
      url: _url,
      data:data,
      header: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        resolve(res.data)
      },
      fail:function(error){
        reject(error)
      }
    })
  })
}
module.exports={
  getBanner:(data)=>{
    return request("/banner?type=1",data)//推荐banner轮播
  },
  getNewSong:(data)=>{
    return request('/personalized/newsong',data)//最新音乐接口
  },
  getNewMv:(data)=>{
    return request('/mv/first?limit='+data,data)//最新MV
  },
  getHotsongList:(data)=>{
    return request('/top/playlist?limit='+data,data)//热门歌单接口
  },
  searchSuggest:(data)=>{
    return request('/search/suggest?keywords='+data,data)//搜索建议接口
  },
  searchDefault:(data)=>{
    return request('/search/default',data)//defult搜索接口
  },
  searchHot:(data) =>{
    return request('/search/hot',data)//热搜接口
  },
  singerDesc:(data) =>{
    return request('/artist/desc?id='+data,data)//歌手描述
  },
  getSingerAlbum:(data)=>{
    return request('/artist/album?limit=30&id='+data,data)//获取歌手专辑
  },
  getSingerHotSong:(data)=>{
    return request("/artist/top/song?id="+data,data)//获取歌手热门歌曲
  },
  getSingerSong:(data)=>{
    return request("/artists?id="+data,data)//获取歌手单曲
  },
  getSingerMv:(data)=>{
    return request("/artist/mv?id="+data,data)//获取歌手MV
  },
  getSongDetail:(data)=>{
    return request("/song/detail?ids="+data,data)
  }
}