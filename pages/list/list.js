// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList: [
      '麻辣香锅',
      '麻辣烫',
      '盖浇饭',
      '馄饨',
      '水饺',
      '肉夹馍',
      '驴肉火烧'
    ],
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     console.log(options.id)
     var _this = this
     var array = []
     var id = options.id
     if (id.slice(0, 7) == 'default') {
       //自定义
       wx.getStorage({
         key: id,
         success: function (res) {
           console.log(res)
            res.data.tips.forEach(x=>{
         
              array= array.concat( [ x.value ] )
            })

            console.log(array)
 
           _this.setData({
             foodList: array
           })

           console.log(_this.data.foodList)
         }
       })
     }
  },
  startInterval() {
    var h = this.data.foodList.length
    var flag = 0

    console.log(this.data.timer)

    if (this.data.timer) { return }

    this.data.timer = setInterval(() => {

      this.setData({
        food: this.data.foodList[flag]
      })

      flag++

      if (flag == h) {
        flag = 0
      }
    }, 50)
  
  },
  confirm() {
    if (this.data.timer) {
      clearInterval(this.data.timer)
      this.data.timer = null
    } 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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