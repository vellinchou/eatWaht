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
    timer: null,
    animationRotate: {}
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
     }else {
       this.changeFoodList(id)
     }
  },
  changeFoodList(routeId){
    var array1 , array2, array3, array4, array5 ,arrayAll ;
    array1 = ['灌汤包汤汤汤', '肉夹馍', '锅贴', '水饺·妈妈包的', '过桥米线', '米粉', '豆腐脑',
      '萌萌哒小包子', '面·牛肉面', '面·西红柿鸡蛋面', '面·炒面', '香香哒肉火烧',
      '驴肉火烧', '面·兰州拉面', '面·刀削面', '牛肉粉', '冷面思密达', '老鸭粉丝汤', '沙县小吃']

    array2 = ['腻腻哒叉烧饭', '诱人的龙虾饭', '肥牛饭', '烤肉饭', '西红柿鸡蛋盖饭',
      '香喷喷哒烧肉饭', '鸡·叫个鸡', '牛排饭', '猪排饭', '盖浇饭', '卤肉饭配豆浆思密达', '猪肘饭', '黄焖鸡米饭', '鸡公煲', '鸡排饭', '叫个小炒菜']

    array3 = ['香辣鸡腿堡', '奥尔良鸡腿堡', '巨无霸爸爸', '奥尔良烤肉披萨', '开发者最爱の双层吉士汉堡', '夏威夷披萨', '深海鳕鱼堡', '菠萝芝士披萨', '至尊鲜虾堡', '开发者最爱の榴莲披萨', '墨西哥鸡肉卷', '老北京鸡肉卷', '金枪鱼培根披萨', '小皇堡', '烟熏皇堡', '培根芝士堡', 'N层皇堡', '超级至尊披萨', '海鲜至尊披萨', '田园风光披萨', '培根意大利面', '黑椒牛柳意大利面', '肉酱意大利面', '反正就是意大利面，口味你看着办吧', '就要吃披萨，口味你看着办吧', '反正就是汉堡，口味你看着办吧']

    array4 = ['麻辣香锅', '超级辣的麻辣香锅', '超级麻的麻辣香锅', '超级麻辣的麻辣香锅', '麻辣烫', '酸辣粉', '毛血旺', '来份川菜上上火', '就着鸭脖喝啤酒啊', '小龙虾盖饭', '开发者最爱の麻辣小龙虾', '水煮鱼', '开发者最爱の干锅辣鸭头']

    array5 = ['猪软骨拉面', '乌冬面', '鳗鱼寿司', '金枪鱼寿司', '鳗鱼盖饭', '海苔寿司', '蛋黄寿司', '肉松寿司', '樱花寿司', '章鱼饭', '开发者不爱の大酱汤', '石锅拌饭', '开发者不爱の嫩豆腐汤', '开发者不爱の牛尾汤', '五花肉盖饭', '韩式烤肉嘛，烤什么肉你随便啦']

    switch( routeId ){
      case 'msmx':
        this.setData({
          foodList: array1
        })
        break;
      case 'jcbd':
        this.setData({
          foodList: array2
        })
      break ;
      case 'hbps':
      
        this.setData({
          foodList: array3
        })
      break ;
      case 'ldld':
       
        this.setData({
          foodList: array4
        })
      break ;
      case 'rhll':
        this.setData({
          foodList: array5
        })
      break ;
      default :
        arrayAll = array1.concat(array2).concat(array3).concat(array4).concat(array5)
        this.setData({
          foodList: arrayAll
        })
        break;


    }


  },
  startInterval() {

    console.log(this.data.timer)

    var h = this.data.foodList.length

    if (this.data.timer) {
      clearInterval(this.data.timer)
      this.data.timer = null
      return
    } 

    this.data.timer = setInterval(() => {

      var random = Math.floor( Math.random() * h )

      this.setData({
        food: this.data.foodList[random]
      })

    
    }, 50)
  
  },
  confirm() {
    console.log('confirm')
    if (this.data.timer) {
      clearInterval(this.data.timer)
      this.data.timer = null
    } 
  },
  containerTap: function (res) {
    console.log(res.touches[0]);
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
    });
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