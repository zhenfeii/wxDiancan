//引入util.js
const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sellerid: null,
		uuid: '',     //订单号
		avatar: '',   //商家招牌图片
		name: '',     //商家名字
		deliveryPrice: '', //配送费
		totalPrice: 0,    //订单总费用
		cartArray: []   //购物车信息
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let sellerid = options.sellerid
		let avatar1 = options.avatar
		let name1 = options.name
		let deliveryPrice1 = options.deliveryPrice

		/**
		 * 把goods页面传过来的购物车数组解析
		 */
		let cartArrayString = options.cartArrayString
		let cartArray1 = JSON.parse(cartArrayString)
		this.setData({
			sellerid: sellerid,
			avatar: avatar1,
			name: name1,
			deliveryPrice: deliveryPrice1,
			cartArray: cartArray1
		})

		this.getTotalPrice()



	},

	/**
	 * 计算订单总费用
	 */
	getTotalPrice: function () {
		let totalPrice1 = 0

		//先算购物车商品的费用
		for (let i = 0; i < this.data.cartArray.length; i++) {
			totalPrice1 = totalPrice1 + this.data.cartArray[i].price * this.data.cartArray[i].num
		}

		//加上配送费
		//踩到坑了，deliverPrice是一个字符串，于是直接拼接 24 + '4' = 244
		totalPrice1 = totalPrice1 + parseInt(this.data.deliveryPrice)

		this.setData({
			totalPrice: totalPrice1
		})
	},


	/**
	 * 提交订单
	 */
	submitOrder: function(e){
		let app = getApp()

		let username = wx.getStorageSync('name')
		let useravatar = wx.getStorageSync('avatarUrl')
		let openid = wx.getStorageSync('openid')

		let sellerid = this.data.sellerid

		/**
		 * 随机生成20位数的订单号
		 */
		let ramdomNumber = util.getRamdomNumber(20)

		this.setData({
			uuid: ramdomNumber
		})

		wx.request({
			url: app.host + '/api/order',
			data: {
				uuid: ramdomNumber,
				//用户信息
				username: username,
				useravatar: useravatar,
				openid: openid,

				// 商家信息
				sellerid: sellerid,
				
				//商品信息
				cartArrayString: JSON.stringify(this.data.cartArray),
				deliveryPrice: this.data.deliveryPrice,
				totalPrice: this.data.totalPrice,
			},
			method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function(res){
				// success
				if(res.data.code == 200){
					console.log("订单提交成功")
					wx.reLaunch({
						url: '../order/order'
					})
				}
			},
			fail: function() {
				// fail
			},
			complete: function() {
				// complete
			}
		})
	}
})