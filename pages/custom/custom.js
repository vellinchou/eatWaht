// pages/custom/custom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    tips: [
      {
        id: 0
      },
      {
        id: 1
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      }
    ],
    tipsIndex: 6,
    inputValue: '',
    focusId: ''
  },

  bindFocus(event) {
    var id = event.currentTarget.dataset.id

    this.setData({
      focusId: id
    })
  },

  bindKeyInput(event) {
    var that = this;
    var value = event.detail.value
    var id = event.currentTarget.dataset.id
    var updateData = {
      inputValue: value
    };
    updateData['tips[' + id + '].value'] = value;

    this.setData(updateData)
  },

  bindTitle(e) {
    var value = e.detail.value
    this.setData({
      title: value
    })
  },

  getTips() {
    var array = this.data.tips
    var _this = this
    var uuid = require('../../utils/node-uuid/uuid.modified.js'); 
    // var uuid = require('./uuid.modified.js'); 

    console.log(uuid.v4());  

    var submitArray = array.filter((x) => {
      return typeof x.value !== 'undefined' && x.value !== ''
    })

    console.log(submitArray)

    if (submitArray.length < 2) {
      wx.showModal({
        content: '请填写至少两个选择项~',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('确定')
          }
        }
      });

      return
    }

    if (this.data.title == '') {
      this.setData({
        title: '自定义'
      })
      console.log(this.data.title)
    }

    try {
      wx.getStorageInfo({
        success: function (res) {
          var key = null
          var names = []
          
          key = 'default' + uuid.v4()
          wx.setStorageSync(key, {
            title: _this.data.title,  
            tips: submitArray
          })

        }
      })


    } catch (e) {
      wx.showModal({
        content: '操作失败，请重试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('确定')
          }
        }
      });
    }

    wx.navigateTo({
      url: '../index/index',
    })

  },

  addMore() {
    var array = this.data.tips

    for (var i = 0; i < array.length; i++) {
      if (typeof array[i].value == 'undefined' || array[i].value == "") {
        this.openAlert()
        return
      }
    }

    array.push({
      id: this.data.tipsIndex++
    })
    this.setData({
      tips: array
    })
    this.setData({
      tipsIndex: this.data.tipsIndex++
    })
    console.log(this.data.tips)
  },

  openAlert() {
    wx.showModal({
      content: '请填写完剩余列表~',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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