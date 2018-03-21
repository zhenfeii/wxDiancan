Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sellerId: 0,
		seller: {},
		goods: [],
		toView: '0',
		cartArray: [],   //购物车内容
		totalCount: 0,   //已选择商品的个数
		totalPrice: 0,	//总价钱
		cartShow: "none", //购物车显示与否
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let sellerId = options.id
		this.setData({
			sellerId: sellerId
		})

		let app = getApp()
		var that = this

		/**
		 *  异步请求该商家的数据
		 */
		wx.request({
			url: app.host + '/api/seller/' + sellerId,
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				// success
				if (res.data.code == 200) {
					that.setData({
						seller: res.data.data
					})
				}
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})

		/**
		 * 请求商品数据
		 */
		wx.request({
			url: app.host + '/api/goods/' + sellerId,
			data: {},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				// success
				let rs = res.data.data
				that.setData({
					goods: rs
				})
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
	},

	/**
	 * 切换选项卡：商品，评论，商家
	 */
	tabChange: function (e) {
		var showtype = e.target.dataset.type;
		this.setData({
			status: showtype,
		});
	},

	/**
	 * 点击菜单类，定位到相应的商品
	 */
	selectMenu: function (e) {
		let index = e.currentTarget.dataset.itemIndex;
		this.setData({
			toView: 'order' + index.toString()
		})
	},

	/**
	 * 点击"+""功能
	 */
	addCart: function (e) {
		let index = e.currentTarget.dataset.itemIndex   //result: "index"
		let parentIndex = e.currentTarget.dataset.parentindex
		this.data.goods[parentIndex].foods[index].Count++


		/**
		 * 过滤
		 */
		var mark = 'a' + index + 'b' + parentIndex

		let name = this.data.goods[parentIndex].foods[index].name
		let price = this.data.goods[parentIndex].foods[index].price
		let num = this.data.goods[parentIndex].foods[index].Count
		let cartObj = { name: name, price: price, num: num, index: index, parentIndex: parentIndex, mark: mark }
		let cartArray1 = this.data.cartArray.filter(item => item.mark != mark)
		cartArray1.push(cartObj)



		//更新goods
		this.setData({
			goods: this.data.goods,
			cartArray: cartArray1,
		})

		this.calculateTotalPrice()

	},


	/**
	 * 点击"-""功能
	 */
	decreaseCart: function (e) {
		let index = e.currentTarget.dataset.itemIndex   //result: "index"
		let parentIndex = e.currentTarget.dataset.parentindex
		this.data.goods[parentIndex].foods[index].Count--

		let mark = 'a' + index + 'b' + parentIndex
		let price = this.data.goods[parentIndex].foods[index].price
		let num = this.data.goods[parentIndex].foods[index].Count
		let cartObj = { name: name, price: price, num: num, index: index, parentIndex: parentIndex, mark: mark }
		let cartArray1 = this.data.cartArray.filter(item => item.mark != mark)
		cartArray1.push(cartObj)

		//更新goods
		this.setData({
			goods: this.data.goods,
			cartArray: cartArray1
		})

		this.calculateTotalPrice()
	},

	/**
	 * 购物车显示与否
	 */
	cartShopShow: function (e) {
		if (this.data.cartShow == "none") {
			this.setData({
				cartShow: "true"
			})
			return;
		}
		if (this.data.cartShow == "true") {
			this.setData({
				cartShow: "none"
			})
			return;
		}
	},

	/**
	 * 计算购物车的总价钱
	 */
	calculateTotalPrice: function () {
		let totalPrice1 = 0
		let Count1 = 0
		for (let i = 0; i < this.data.cartArray.length; i++) {
			Count1 = Count1 + this.data.cartArray[i].num
			totalPrice1 = totalPrice1 + this.data.cartArray[i].price * this.data.cartArray[i].num
		}
		this.setData({
			totalPrice: totalPrice1,
			totalCount: Count1
		})
	},

	/**
	 * 结算
	 */
	account: function () {
		let sellerid =this.data.sellerId
		let seller = this.data.seller
		let avatar = seller.avatar
		let name = seller.name
		let deliveryPrice = seller.deliveryPrice

		//把购物车数据转为字符串
		let cartString = JSON.stringify(this.data.cartArray)

		wx.navigateTo({
			url: '../order_detail/order_detail?avatar='+avatar+'&name='+name+'&deliveryPrice='+deliveryPrice+'&sellerid='+sellerid+'&cartArrayString='+cartString+''
		})
		
	}

})