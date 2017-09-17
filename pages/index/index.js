//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [
      {
        "id":"msmx",
        "name":"面食 · 米线"
      },
      {
        "id": "jcbd",
        "name": "简餐 · 便当"
      },
      {
        "id": "hbps",
        "name": "汉堡 · 披萨"
      },
      {
        "id": "ldld",
        "name": "来点の辣的"
      },
      {
        "id": "random",
        "name": "随机の推荐"
      },
      {
        "id": "rhll",
        "name": "日韩の料理"
      },
      
    ],
    //大众点评
    // colorset:[
    //   '#f6bb2f',
    //   '#ff3263',
    //   '#348cd6',
    //   //lvse
    //   '#744bef',
    //   '#2dbcdc',
    //   '#f8373c',
    //   '#ce7297',
    //   '#6cd324'
    // ],
    colorset:[
      '#ff7670',
      '#ffd950',
      '#55d393',
      //lvse
      '#ffc4e2',
      '#81dafa',
      '#fd9788',
      '#f57bc7',
      '#9cddbb'
    ]
  },
  nextPage(e){
    var id = e.currentTarget.dataset.urlId
    wx.navigateTo({
      url: '../list/list?id='+id,
    })
  },
  customPage(e){
    wx.navigateTo({
      url: '../custom/custom',
    })
  },
  openSheet(e){
    var id = e.currentTarget.dataset.urlId
    var _this = this 

    if (id.slice(0, 7) !== 'default') {
        return
    }

    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: 'red',
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            var array = _this.data.grids
            array.forEach((v, k)=>{
              if (v.id == id ) {
                array.splice(k, 1)  //删除
                // 维护本地
                console.log('cancel')
                _this.setData({
                  grids: array
                })  
                //清除缓存
                wx.removeStorage({
                  key: id,
                  success: function (res) {
                    console.log('本地删除成功')
                  }
                })
              }
            })

            console.log(array)
          }
        }
      }
    });
  },
  onLoad: function () {
    // wx.clearStorage()
    var _this = this
    wx.getStorageInfo({
      success: function(res){
        console.log(res)
        console.log(res.keys)
        var keys = res.keys 
        if (keys) {
          keys.forEach(key => {
            if (key.slice(0, 7) == 'default') {
              wx.getStorage({
                key: key,
                success: function (res) {
                   var array = _this.data.grids
                   array.push({
                     id :key ,
                     name: res.data.title
                   })

                   _this.setData({
                     grids: array
                   })
                }
              })
            }
          })
         }
      }
    })


  },
 

})
